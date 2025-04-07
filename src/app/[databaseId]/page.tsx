import React from 'react';
import { notFound } from 'next/navigation';
import {
  getDatabaseInfo,
  getDatabaseEntries,
  processDataForCalendar,
  generateCalendarData
} from '@/lib/notion';
import { isValidDatabaseId, getContributionStats } from '@/lib/utils';
import DatabasePageClient from './client';

// Define the page props with a parameter for the database ID
interface PageProps {
  params: {
    databaseId: string;
  };
}

// Function to fetch all necessary data for the page
async function fetchDatabaseData(databaseId: string) {
  try {
    // Validate the database ID format
    if (!isValidDatabaseId(databaseId)) {
      return null;
    }

    // Get database information and entries
    const [databaseInfo, databaseEntries] = await Promise.all([
      getDatabaseInfo(databaseId),
      getDatabaseEntries(databaseId)
    ]);

    // Process the entries for the calendar
    const dateCountMap = processDataForCalendar(databaseEntries);

    // Generate calendar data
    const calendarData = generateCalendarData(dateCountMap);

    // Calculate statistics
    const stats = getContributionStats(calendarData);

    return {
      databaseInfo,
      stats,
      calendarData
    };
  } catch (error) {
    console.error('Error fetching database data:', error);
    return null;
  }
}

export default async function DatabasePage({ params }: PageProps) {
  const { databaseId } = await params;

  // Fetch data for the specified database
  const data = await fetchDatabaseData(databaseId);

  // If data is null, either the database ID is invalid or there was an error
  if (!data) {
    notFound();
  }

  const { databaseInfo, stats, calendarData } = data;

  // Pass the data to the client component
  return <DatabasePageClient
    databaseId={databaseId}
    databaseInfo={databaseInfo}
    stats={stats}
    calendarData={calendarData}
  />;
}