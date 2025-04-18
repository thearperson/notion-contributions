'use client';

import React from 'react';
import ContributionCalendar from '@/components/ContributionCalendar';
import { formatDate } from '@/lib/utils';

interface NotionDatabaseInfo {
  title?: Array<{
    plain_text: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

interface DayData {
  date: string;
  count: number;
  intensity: number;
  month: string;
  day: string;
  isCurrentMonth: boolean;
}

interface DatabasePageClientProps {
  databaseId: string;
  databaseInfo: NotionDatabaseInfo;
  stats: {
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
    bestDay: { date: string; count: number } | null;
  };
  completionData: DayData[][];
  totoData: DayData[][];
}

const DatabasePageClient: React.FC<DatabasePageClientProps> = ({
  databaseId,
  stats,
  completionData,
  totoData
}) => {
  return (
    <div className="database-container">
      <main>
        <div className="main-content">
          <div className="stats-container">
            <div className="stat-card">
              <h3>{stats.totalContributions}</h3>
              <p>Total Completions</p>
            </div>
            <div className="stat-card">
              <h3>{stats.currentStreak}</h3>
              <p>Current Streak</p>
            </div>
            <div className="stat-card">
              <h3>{stats.longestStreak}</h3>
              <p>Longest Streak</p>
            </div>
            {stats.bestDay && (
              <div className="stat-card">
                <h3>{stats.bestDay.count}</h3>
                <p>Best Day: {formatDate(stats.bestDay.date)}</p>
              </div>
            )}
          </div>

          <ContributionCalendar calendarData={completionData} isCompletion={true} />
          <ContributionCalendar calendarData={totoData} isCompletion={false} />

          <div className="database-footer">
            <p className="database-id">Database ID: {databaseId}</p>
          </div>
        </div>
      </main>

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
          padding: 10px 0;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .database-footer {
          margin-bottom: 5px;
        }

        .database-id {
          margin: 5px 0 0;
          color: #666;
          font-size: 0.6rem;
          text-align: right;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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

        .embed-instructions {
          margin-top: 40px;
          border-top: 1px solid #eaeaea;
          padding-top: 30px;
        }

        .embed-instructions h3 {
          margin-bottom: 15px;
          font-size: 1.3rem;
          color: #333;
        }

        .embed-instructions ol {
          margin-bottom: 20px;
          padding-left: 20px;
        }

        .embed-instructions li {
          margin-bottom: 10px;
        }

        code {
          background-color: #f5f5f5;
          padding: 2px 5px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9rem;
        }

        .embed-preview {
          border: 1px solid #eaeaea;
          border-radius: 8px;
          overflow: hidden;
          margin-top: 20px;
        }

        .preview-header {
          background-color: #f5f5f5;
          padding: 8px 12px;
          border-bottom: 1px solid #eaeaea;
          font-size: 0.9rem;
          color: #666;
        }

        .preview-content {
          padding: 20px;
        }

        .preview-placeholder {
          background-color: #f9f9f9;
          border: 2px dashed #e5e5e5;
          border-radius: 5px;
          padding: 40px 20px;
          text-align: center;
          color: #999;
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
};

export default DatabasePageClient;