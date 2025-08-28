import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

// Loads environment variables from .env automatically in Next.js

export async function POST(request: NextRequest) {
  try {
    console.log("[v1] API route called")
    const { firstName, lastName, email } = await request.json()
    console.log("[v1] Received data:", { firstName, lastName, email })

    // Validate required fields
    if (!firstName || !lastName || !email) {
      console.log("[v1] Validation failed: missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check environment variables
    const {
      GOOGLE_CLIENT_EMAIL,
      GOOGLE_PRIVATE_KEY,
      GOOGLE_CLIENT_ID,
      GOOGLE_SHEET_ID,
    } = process.env

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_ID || !GOOGLE_SHEET_ID) {
      console.log("[v1] Missing environment variables")
      return NextResponse.json({ error: "Missing Google API credentials" }, { status: 500 })
    }

    // Set up Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_id: GOOGLE_CLIENT_ID,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    console.log("[v1] Google Auth configured")
    const sheets = google.sheets({ version: "v4", auth })

    // Add data to Google Sheet
    const spreadsheetId = GOOGLE_SHEET_ID
    const range = "Sheet1!A:D" // Includes timestamp column

    console.log("[v1] Attempting to append to sheet:", spreadsheetId)
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[firstName, lastName, email, new Date().toISOString()]],
      },
    })

    console.log("[v1] Successfully added to Google Sheets")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v1] Error submitting to Google Sheets:", error)
    return NextResponse.json(
      {
        error: "Failed to submit data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
