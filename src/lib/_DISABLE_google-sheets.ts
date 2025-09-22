import { google } from 'googleapis';

// Google Sheets service configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

interface SheetsConfig {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  membersSheet: string;
  applicationsSheet: string;
}

function getConfig(): SheetsConfig {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const membersSheet = process.env.GOOGLE_SHEETS_MEMBERS_SHEET || 'Members';
  const applicationsSheet = process.env.GOOGLE_SHEETS_APPLICATIONS_SHEET || 'Applications';

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error('Missing required Google Sheets environment variables. Check .env file.');
  }

  return {
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, '\n'),
    spreadsheetId,
    membersSheet,
    applicationsSheet,
  };
}

async function getAuthenticatedClient() {
  const config = getConfig();
  
  const auth = new google.auth.JWT(
    config.clientEmail,
    undefined,
    config.privateKey,
    SCOPES
  );

  await auth.authorize();
  return auth;
}

export async function getSheetsClient() {
  const auth = await getAuthenticatedClient();
  return google.sheets({ version: 'v4', auth });
}

export interface Member {
  name: string;
  type: 'Selskap' | 'Selvstendig';
  url?: string;
}

export interface MembershipApplication {
  name: string;
  email: string;
  company: string;
  role: string;
  notes: string;
  consent: boolean;
  timestamp: string;
}

export async function getMembers(): Promise<Member[]> {
  try {
    const config = getConfig();
    const sheets = await getSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: `${config.membersSheet}!A2:C`, // Skip header row, get columns A-C
    });

    const rows = response.data.values || [];
    
    return rows.map((row): Member => ({
      name: row[0] || '',
      type: (row[1] === 'Selvstendig' ? 'Selvstendig' : 'Selskap') as 'Selskap' | 'Selvstendig',
      url: row[2] || undefined,
    })).filter(member => member.name.trim() !== '');
    
  } catch (error) {
    console.error('Error fetching members from Google Sheets:', error);
    // Return fallback data if Sheets API fails
    return [
      { name: "JProfessionals AS", type: "Selskap", url: "https://jpro.no" },
      { name: "Blank AS", type: "Selskap", url: "https://blank.no" },
      { name: "Compute AS", type: "Selskap" },
      { name: "KodeKari (ENK)", type: "Selvstendig" },
      { name: "DevOla (ENK)", type: "Selvstendig" },
    ];
  }
}

export async function addMembershipApplication(application: Omit<MembershipApplication, 'timestamp'>): Promise<boolean> {
  try {
    const config = getConfig();
    const sheets = await getSheetsClient();
    
    const timestamp = new Date().toISOString();
    const row = [
      application.name,
      application.email,
      application.company,
      application.role,
      application.notes,
      application.consent ? 'Yes' : 'No',
      timestamp,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range: `${config.applicationsSheet}!A:G`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    return true;
  } catch (error) {
    console.error('Error adding membership application to Google Sheets:', error);
    return false;
  }
}

// Utility function to create the spreadsheet headers if needed
export async function setupSpreadsheetsHeaders(): Promise<void> {
  try {
    const config = getConfig();
    const sheets = await getSheetsClient();

    // Set up Members sheet headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: config.spreadsheetId,
      range: `${config.membersSheet}!A1:C1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [['Name', 'Type', 'URL']],
      },
    });

    // Set up Applications sheet headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: config.spreadsheetId,
      range: `${config.applicationsSheet}!A1:G1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [['Name', 'Email', 'Company', 'Role', 'Notes', 'Consent', 'Timestamp']],
      },
    });

    console.log('Spreadsheet headers set up successfully');
  } catch (error) {
    console.error('Error setting up spreadsheet headers:', error);
  }
}
