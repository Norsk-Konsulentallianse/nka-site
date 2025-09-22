import { NextResponse } from "next/server";
import { setupSpreadsheetsHeaders } from "@/lib/google-sheets";

// This endpoint helps set up the Google Sheets headers
// Call this once after setting up your Google Sheets credentials
export async function POST() {
  try {
    await setupSpreadsheetsHeaders();
    return NextResponse.json({ 
      ok: true, 
      message: "Spreadsheet headers set up successfully" 
    });
  } catch (error) {
    console.error("Error setting up spreadsheet headers:", error);
    return NextResponse.json(
      { 
        ok: false, 
        error: "Failed to set up spreadsheet headers",
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}
