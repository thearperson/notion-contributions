'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="content">
        <h1>404</h1>
        <h2>Database Not Found</h2>
        <p>
          The Notion database you&apos;re looking for couldn&apos;t be found.
          Please check that you&apos;ve entered a valid database ID.
        </p>
        <div className="helpful-tips">
          <h3>Helpful Tips</h3>
          <ul>
            <li>Make sure the database ID is in the correct format (32 characters with hyphens)</li>
            <li>Verify that you have the correct permissions to access this database</li>
            <li>Check that the Notion integration token has access to this database</li>
          </ul>
        </div>
        <Link href="/" className="home-link">
          Return to Home
        </Link>
      </div>
      
      <style jsx>{`
        .not-found-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background-color: #f9fafb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .content {
          max-width: 600px;
          text-align: center;
          background-color: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        h1 {
          font-size: 5rem;
          margin: 0;
          color: #2563eb;
          line-height: 1;
        }
        
        h2 {
          font-size: 1.8rem;
          margin-top: 10px;
          color: #333;
        }
        
        p {
          color: #666;
          margin: 20px 0;
          font-size: 1.1rem;
        }
        
        .helpful-tips {
          text-align: left;
          margin: 30px 0;
          background-color: #f5f9ff;
          border-radius: 6px;
          padding: 20px;
        }
        
        .helpful-tips h3 {
          margin-top: 0;
          color: #2563eb;
          font-size: 1.2rem;
        }
        
        ul {
          padding-left: 20px;
        }
        
        li {
          margin-bottom: 10px;
          color: #4b5563;
        }
        
        .home-link {
          display: inline-block;
          background-color: #2563eb;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .home-link:hover {
          background-color: #1d4ed8;
        }
      `}</style>
    </div>
  );
}