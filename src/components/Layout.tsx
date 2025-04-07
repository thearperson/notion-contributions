'use client';

import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  return (
    <div className="layout-container">
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
          <h2>{title}</h2>
          {description && <p className="description">{description}</p>}
          {children}
        </div>
      </main>
      
      <footer>
        <div className="footer-content">
          <p>Built with Next.js and the Notion API</p>
        </div>
      </footer>
      
      <style jsx>{`
        .layout-container {
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

export default Layout;