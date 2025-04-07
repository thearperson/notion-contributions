# Notion Contributions

A GitHub-style contributions calendar for tracking task completion in Notion databases.

## Features

- GitHub-style contribution visualization with blue color palette
- Dynamic database integration via path parameters: `/{databaseId}`
- Automatic updates based on Notion database entries
- Daily streaks and productivity tracking
- Secure Notion API handling with environment variables
- Embeddable in Notion pages

## Getting Started

### Prerequisites

1. Create a Notion Integration
   - Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Create a new integration and copy the API key

2. Share your Notion database with the integration
   - Open your Notion database
   - Click "Share" in the top right
   - Add your integration by name
   - Make sure your database has a "Status" property that can be set to "Done"

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/notion-contributions.git
cd notion-contributions
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file with your Notion API key

```
NOTION_API_KEY=your_notion_api_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Find your Notion database ID from the URL:
   - It's in the format: `https://www.notion.so/workspace/[database-id]?v=...`
   - The database ID is a 32-character string with hyphens

2. View your contributions calendar:
   - Visit `http://localhost:3000/[database-id]`
   - The calendar shows your task completions over time

3. Embed in Notion:
   - Use Notion's `/embed` command
   - Paste your calendar URL
   - The embed automatically updates when tasks are completed

## Deployment

The easiest way to deploy this application is with [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Set environment variables:
   - `NOTION_API_KEY` - Your Notion API key
   - `NEXT_PUBLIC_BASE_URL` - Your deployment URL (e.g., `https://your-app.vercel.app`)

## Project Structure

```
notion-contributions/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── notion/
│   │   │       └── [databaseId]/
│   │   │           └── route.ts
│   │   ├── [databaseId]/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ContributionCalendar.tsx
│   │   └── Layout.tsx
│   └── lib/
│       ├── notion.ts
│       └── utils.ts
├── public/
├── .env.local
├── next.config.ts
└── package.json
```

## License

This project is licensed under the MIT License.
