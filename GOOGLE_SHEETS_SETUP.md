# Google Sheets API Setup Guide

Your NKA website is now configured to use Google Sheets for storing members and membership applications. Follow these steps to complete the setup.

## 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## 2. Create Service Account Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `nka-sheets-service`
   - Description: `Service account for NKA website Google Sheets integration`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"
6. Click on your newly created service account
7. Go to the "Keys" tab
8. Click "Add Key" > "Create New Key"
9. Select "JSON" format and click "Create"
10. Download and save the JSON file securely

## 3. Create Your Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "NKA Members and Applications"
4. Create two sheets (tabs):
   - `Members` (for displaying public member list)
   - `Applications` (for storing membership applications)
5. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

## 4. Share Spreadsheet with Service Account

1. In your Google Spreadsheet, click "Share"
2. Add the service account email (from the JSON file, field `client_email`)
3. Give it "Editor" permissions
4. Uncheck "Notify people" and click "Share"

## 5. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your `.env.local` file with values from the JSON credentials file:
   ```env
   GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
   GOOGLE_SHEETS_MEMBERS_SHEET=Members
   GOOGLE_SHEETS_APPLICATIONS_SHEET=Applications
   ```

   **Important**: 
   - Copy the entire private key including the BEGIN/END lines
   - Keep the quotes around the private key
   - Replace `\n` in the private key with actual newlines if needed

## 6. Set Up Spreadsheet Headers

After configuring your environment variables, run this command to set up the spreadsheet headers:

```bash
curl -X POST http://localhost:3000/api/setup-sheets
```

Or visit `http://localhost:3000/api/setup-sheets` in your browser after starting the development server.

## 7. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Try submitting a membership application through the form
4. Check your Google Spreadsheet to see if the data appears
5. Add some members to the Members sheet to test the member display

## Spreadsheet Structure

### Members Sheet (A1:C)
| Name | Type | URL |
|------|------|-----|
| Company AS | Selskap | https://company.no |
| John Doe | Selvstendig | |

### Applications Sheet (A1:G)
| Name | Email | Company | Role | Notes | Consent | Timestamp |
|------|-------|---------|------|-------|---------|-----------|
| Jane Doe | jane@example.com | Jane Consulting | Consultant | Looking forward to joining | Yes | 2025-01-01T10:00:00Z |

## Troubleshooting

### Common Issues:

1. **"Missing required Google Sheets environment variables"**
   - Check that all environment variables are set in `.env.local`
   - Restart your development server after adding environment variables

2. **"Error fetching members from Google Sheets"**
   - Verify the spreadsheet ID is correct
   - Check that the service account has access to the spreadsheet
   - Ensure the sheet names match your environment variables

3. **"Failed to save application"**
   - Check the Google Cloud Console for API quota limits
   - Verify the service account has "Editor" permissions on the spreadsheet

4. **Authentication errors**
   - Make sure the private key is formatted correctly in the environment variable
   - Check that the Google Sheets API is enabled in your Google Cloud project

### Need Help?

If you encounter issues, check the browser console and server logs for detailed error messages. The system includes fallback mechanisms, so the site will continue to work with demo data if Google Sheets is unavailable.
