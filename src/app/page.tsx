'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <header>
        <div className="header-content">
          <h1>Notion Contributions</h1>
          <p className="subtitle">Track your task completions like GitHub contributions</p>
        </div>
      </header>
      
      <main>
        <div className="main-content">
          <h2>Welcome to Notion Contributions</h2>
          <p className="description">A GitHub-style contribution calendar for your Notion tasks</p>
          
          <section className="introduction">
            <h3>Track Your Task Completions with a Beautiful Calendar</h3>
            <p>
              Notion Contributions creates a visual representation of your Notion task completions,
              similar to GitHub&apos;s contribution graph. See your productivity patterns over time
              and track your daily streaks.
            </p>
          </section>
          
          <section className="getting-started">
            <h3>Getting Started</h3>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Find Your Notion Database ID</h4>
                  <p>
                    Open your Notion database in the browser. The URL will look like:
                    <code>https://www.notion.so/workspace/[database-id]?v=...</code>
                  </p>
                  <p>
                    The database ID is the part after your workspace name and before the question mark.
                    It&apos;s a 32-character string with hyphens (e.g., <code>a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6</code>).
                  </p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>View Your Contribution Calendar</h4>
                  <p>
                    Visit <code>yourdomain.com/[database-id]</code> to see your contributions calendar.
                    The calendar automatically updates when you complete tasks in your Notion database.
                  </p>
                  <div className="example-box">
                    <p>Try an example:</p>
                    <Link href="/example-database-id" className="example-link">
                      View Example Calendar
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Embed in Notion</h4>
                  <p>
                    Use Notion&apos;s /embed command to add your contribution calendar directly
                    to any Notion page. Simply paste your calendar URL and the embed will
                    automatically update whenever you complete tasks.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="features">
            <h3>Features</h3>
            <ul className="feature-list">
              <li>GitHub-style contribution calendar visualization</li>
              <li>Automatic updates when tasks are completed</li>
              <li>Track daily streaks and productivity patterns</li>
              <li>Blue color palette for visual distinction</li>
              <li>Support for multiple Notion databases</li>
              <li>Embeddable in Notion pages</li>
            </ul>
          </section>
        </div>
      </main>
      
      <footer>
        <div className="footer-content">
          <p>Built with Next.js and the Notion API</p>
        </div>
      </footer>
      
      <style jsx>{`
        .home-container {
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
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        main h2 {
          margin-top: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
        }
        
        .description {
          color: #666;
          margin-bottom: 25px;
        }
        
        section {
          margin-bottom: 40px;
        }
        
        h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #2563eb;
        }
        
        .steps {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        
        .step {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }
        
        .step-number {
          width: 30px;
          height: 30px;
          background-color: #2563eb;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }
        
        .step-content {
          flex: 1;
        }
        
        h4 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        code {
          background-color: #f5f5f5;
          padding: 2px 5px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9rem;
          word-break: break-all;
        }
        
        .example-box {
          margin-top: 15px;
          background-color: #f5f9ff;
          border: 1px solid #dbeafe;
          padding: 15px;
          border-radius: 5px;
        }
        
        .example-link {
          display: inline-block;
          background-color: #2563eb;
          color: white;
          padding: 8px 15px;
          border-radius: 5px;
          text-decoration: none;
          margin-top: 10px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .example-link:hover {
          background-color: #1d4ed8;
        }
        
        .feature-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 15px;
          padding-left: 20px;
        }
        
        .feature-list li {
          margin-bottom: 10px;
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
