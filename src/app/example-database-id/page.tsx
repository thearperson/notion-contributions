'use client';

import React from 'react';
import Link from 'next/link';
import ContributionCalendar from '@/components/ContributionCalendar';
import { formatDate } from '@/lib/utils';

// Generate example data
function generateExampleData() {
  // Create a mock calendar data structure
  const weeks = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Generate random contribution counts for the last 52 weeks
  for (let i = 0; i < 53; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      // Generate more contributions for weekdays, fewer for weekends
      const isWeekend = j === 0 || j === 6;
      const max = isWeekend ? 2 : 5;

      // More recent dates have higher probability of contributions
      const recency = Math.min(1, i / 26); // 0 for most recent, 1 for oldest
      const probability = 0.7 - recency * 0.5; // 70% for recent, 20% for oldest

      // Generate random count based on the day and recency
      const hasContribution = Math.random() < probability;
      const count = hasContribution ? Math.floor(Math.random() * max) + 1 : 0;

      // Determine intensity based on count (0-4 scale)
      let intensity = 0;
      if (count > 0) {
        if (count === 1) intensity = 1;
        else if (count <= 3) intensity = 2;
        else if (count <= 5) intensity = 3;
        else intensity = 4;
      }

      // Calculate the date (going backwards from today)
      const date = new Date(year, month, now.getDate() - (i * 7 + j));
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD

      week.push({
        date: dateString,
        count,
        intensity,
        month: date.toLocaleString('default', { month: 'short' }),
        day: date.getDate().toString(),
        isCurrentMonth: date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear(),
      });
    }
    weeks.push(week);
  }

  return weeks;
}

// Example stats
const exampleStats = {
  totalContributions: 237,
  currentStreak: 5,
  longestStreak: 12,
  bestDay: {
    date: new Date().toISOString().split('T')[0],
    count: 8
  }
};

export default function ExamplePage() {
  const calendarData = generateExampleData();

  return (
    <div className="database-container">
      <header>
        <div className="header-content">
          <h1>
            <Link href="/">
              Notion Contributions
            </Link>
          </h1>
          <p className="subtitle">Track your task completions like GitHub contributions</p>
        </div>
      </header>

      <main>
        <div className="main-content">
          <div className="example-notice">
            <p>⚠️ This is an example page with randomly generated data. Connect your own Notion database to see your actual contributions.</p>
          </div>

          <div className="database-header">
            <h2>Example Task Database</h2>
            <p className="database-id">Database ID: example-database-id</p>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <h3>{exampleStats.totalContributions}</h3>
              <p>Total Completions</p>
            </div>
            <div className="stat-card">
              <h3>{exampleStats.currentStreak}</h3>
              <p>Current Streak</p>
            </div>
            <div className="stat-card">
              <h3>{exampleStats.longestStreak}</h3>
              <p>Longest Streak</p>
            </div>
            <div className="stat-card">
              <h3>{exampleStats.bestDay.count}</h3>
              <p>Best Day: {formatDate(exampleStats.bestDay.date)}</p>
            </div>
          </div>

          <div className="calendar-wrapper">
            <h3>Contribution Calendar</h3>
            <ContributionCalendar calendarData={calendarData} isCompletion={true} />
          </div>

          <div className="get-started-section">
            <h3>Ready to set up your own contribution calendar?</h3>
            <ol>
              <li>Create a Notion Integration and get your API key</li>
              <li>Share your Notion database with the integration</li>
              <li>Find your Notion database ID</li>
              <li>Visit <code>/{"{your-database-id}"}</code> to see your contributions</li>
            </ol>
            <Link href="/" className="back-link">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-content">
          <p>Built with Next.js and the Notion API</p>
        </div>
      </footer>

      <style jsx>{`
        .database-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        header {
          background-color: #f5f5f5;
          padding: 20px 0;
          border-bottom: 1px solid #eaeaea;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        header h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 600;
          color: #333;
        }

        .subtitle {
          margin: 5px 0 0;
          color: #666;
        }

        main {
          flex: 1;
          padding: 30px 0;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .example-notice {
          background-color: #fff8db;
          border: 1px solid #f0e0a2;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 25px;
        }

        .example-notice p {
          margin: 0;
          color: #856404;
        }

        .database-header {
          margin-bottom: 25px;
        }

        .database-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }

        .database-id {
          margin: 5px 0 0;
          color: #666;
          font-size: 0.9rem;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background-color: #f5f9ff;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .stat-card h3 {
          margin: 0;
          font-size: 2rem;
          color: #2563eb;
        }

        .stat-card p {
          margin: 5px 0 0;
          color: #666;
        }

        .calendar-wrapper {
          margin-bottom: 40px;
        }

        .calendar-wrapper h3 {
          margin-bottom: 15px;
          font-size: 1.3rem;
          color: #333;
        }

        .get-started-section {
          margin-top: 40px;
          border-top: 1px solid #eaeaea;
          padding-top: 30px;
        }

        .get-started-section h3 {
          margin-bottom: 15px;
          font-size: 1.3rem;
          color: #333;
        }

        .get-started-section ol {
          margin-bottom: 20px;
          padding-left: 20px;
        }

        .get-started-section li {
          margin-bottom: 10px;
        }

        .back-link {
          display: inline-block;
          background-color: #2563eb;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .back-link:hover {
          background-color: #1d4ed8;
          text-decoration: none;
        }

        footer {
          background-color: #f5f5f5;
          padding: 20px 0;
          border-top: 1px solid #eaeaea;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
          color: #666;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}