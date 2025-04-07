import { NextRequest, NextResponse } from 'next/server';
import { 
  getDatabaseInfo, 
  getDatabaseEntries,
  processDataForCalendar,
  generateCalendarData
} from '@/lib/notion';
import { isValidDatabaseId, getContributionStats } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { databaseId: string } }
) {
  const { databaseId } = params;
  
  // Validate the database ID format
  if (!isValidDatabaseId(databaseId)) {
    return NextResponse.json(
      { error: 'Invalid database ID format' },
      { status: 400 }
    );
  }
  
  try {
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
    
    // Return the processed data
    return NextResponse.json({
      databaseId,
      databaseTitle: databaseInfo.title[0]?.plain_text || 'Untitled Database',
      stats,
      calendarData
    });
    
  } catch (error) {
    console.error('Error processing Notion database:', error);
    
    // Check if the error is from Notion API
    if (error.code === 'object_not_found') {
      return NextResponse.json(
        { error: 'Database not found. Please check the database ID.' },
        { status: 404 }
      );
    }
    
    if (error.code === 'unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized. Please check your Notion API key.' },
        { status: 401 }
      );
    }
    
    // Generic error response
    return NextResponse.json(
      { error: 'Error processing Notion database' },
      { status: 500 }
    );
  }
}