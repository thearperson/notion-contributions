import { NextRequest, NextResponse } from 'next/server';
import {
  getDatabaseInfo,
  getDatabaseEntries,
  processDataForCompletion,
  generateCalendarData
} from '@/lib/notion';
import { isValidDatabaseId, getContributionStats } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ databaseId: string }> }
) {
  const { databaseId } = await params;

  // Validate the database ID format
  if (!isValidDatabaseId(databaseId)) {
    return NextResponse.json(
      { error: 'Invalid database ID format' },
      { status: 400 }
    );
  }

  // Get database information and entries
  const [databaseInfo, databaseEntries] = await Promise.all([
    getDatabaseInfo(databaseId),
    getDatabaseEntries(databaseId)
  ]);

  // Process the entries for the calendar
  const dateCountMap = processDataForCompletion(databaseEntries);

  // Generate calendar data
  const calendarData = generateCalendarData(dateCountMap);

  // Calculate statistics
  const stats = getContributionStats(calendarData);

  // Return the processed data
  return NextResponse.json({
    databaseId,
    databaseTitle: databaseInfo.title[0]?.plain_text || 'Untitled Database',
    stats,
    calendarData
  });
}