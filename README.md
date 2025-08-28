# Signup Journey App

A Next.js application that provides dynamic signup forms based on URL paths with automatic redirects to specific destinations.

## Features

- **Dynamic Routing**: Different signup forms based on URL path
- **Google Sheets Integration**: Form submissions are saved to Google Sheets
- **Automatic Redirects**: Users are redirected to specific URLs based on their entry point
- **Form Validation**: Client-side validation with error handling
- **Responsive Design**: Modern UI with dark theme

## URL Structure

The application supports the following routes:

### Main Route
- **URL**: `/` (root)
- **Description**: Landing page with two cards for choosing between TalentFlow and PayFlow
- **Navigation**: Users can click on either card to proceed to the respective signup form

### TalentFlow Route
- **URL**: `/talentflow`
- **Flow Type**: `talentflow`
- **Redirect**: `https://clickchain.ai/talentacquisition/talentflow`

### PayFlow Route
- **URL**: `/payflow`
- **Flow Type**: `payflow`
- **Redirect**: `https://clickchain.ai/accounting/payflow`

## Form Fields

All forms collect the same information:
- First Name (required, min 2 characters)
- Last Name (required, min 2 characters)
- Email (required, valid email format)
- Flow Type (automatically set based on URL)

## Google Sheets Integration

Form submissions are saved to Google Sheets with the following columns:
1. First Name
2. Last Name
3. Email
4. Flow Type
5. Timestamp

## Environment Variables

Make sure to set up the following environment variables:

```env
GOOGLE_CLIENT_EMAIL=your-service-account-email
GOOGLE_PRIVATE_KEY=your-private-key
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_SHEET_ID=your-sheet-id
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Examples

- Visit `domain.com/` to choose between TalentFlow and PayFlow
- Visit `domain.com/talentflow` for direct TalentFlow signup
- Visit `domain.com/payflow` for direct PayFlow signup

## Architecture

- **Shared Component**: `components/signup-form.tsx` - Reusable form component
- **API Route**: `app/api/submit-signup/route.ts` - Handles form submissions
- **Dynamic Pages**: 
  - `app/page.tsx` - Landing page with choice cards
  - `app/talentflow/page.tsx` - TalentFlow route
  - `app/payflow/page.tsx` - PayFlow route

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Sheets API
- React Hook Form (via shadcn/ui) 