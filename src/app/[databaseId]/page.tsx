import React from 'react';
import { notFound } from 'next/navigation';
import {
  getDatabaseInfo,
  getDatabaseEntries,
  processDataForCompletion,
  processDataForToto,
  generateCalendarData
} from '@/lib/notion';
import { isValidDatabaseId, getContributionStats } from '@/lib/utils';
import DatabasePageClient from './client';

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
    const completedTaskMap = processDataForCompletion(databaseEntries);
    const totoTaskMap = processDataForToto(databaseEntries);

    // Generate calendar data
    const completionData = generateCalendarData(completedTaskMap);
    const totoData = generateCalendarData(totoTaskMap);
    // Calculate statistics
    const stats = getContributionStats(completionData);

    return {
      databaseInfo,
      stats,
      completionData,
      totoData
    };
  } catch (error) {
    console.error('Error fetching database data:', error);
    return null;
  }
}

export default async function DatabasePage(
  { params }: { params: Promise<{ databaseId: string }> }
) {
  const { databaseId } = await params;

  // Fetch data for the specified database
  const data = await fetchDatabaseData(databaseId);

  // If data is null, either the database ID is invalid or there was an error
  if (!data) {
    notFound();
  }

  const { databaseInfo, stats, completionData, totoData } = data;

  // Pass the data to the client component
  return <DatabasePageClient
    databaseId={databaseId}
    databaseInfo={databaseInfo}
    stats={stats}
    completionData={completionData}
    totoData={totoData}
  />;
}