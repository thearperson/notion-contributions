import { Client } from '@notionhq/client';
import { format, startOfYear, endOfYear, eachDayOfInterval, getDay, addDays } from 'date-fns';

// Define types
interface NotionDatabaseInfo {
  title: Array<{
    plain_text: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

interface NotionEntry {
  properties: {
    [key: string]: {
      date: {
        start: string;
      };
      status: {
        name: string;
      };
    };
  };
}

interface DayData {
  date: string;
  count: number;
  intensity: number;
  month: string;
  day: string;
  isCurrentMonth: boolean;
}

// Initialize Notion client
export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Fetch database info
export async function getDatabaseInfo(databaseId: string): Promise<NotionDatabaseInfo> {
  try {
    const response = await notionClient.databases.retrieve({
      database_id: databaseId,
    });
    return response as NotionDatabaseInfo;
  } catch (error) {
    console.error('Error fetching database info:', error);
    throw error;
  }
}

// Fetch database entries
export async function getDatabaseEntries(databaseId: string): Promise<NotionEntry[]> {
  try {
    const response = await notionClient.databases.query({
      database_id: databaseId,
    });
    // @ts-expect-error: NotionEntry is not fully typed
    return response.results as NotionEntry[];
  } catch (error) {
    console.error('Error fetching database entries:', error);
    throw error;
  }
}

export function processDataForToto(entries: NotionEntry[]): Map<string, number> {
  // Count entries by date
  const dateCountMap = new Map<string, number>();

  entries.forEach((entry: NotionEntry) => {
    const status = entry.properties['Status']['status']['name'];
    if (status === 'Done') {
      return;
    }
    const dateString = entry.properties['Due']['date']['start'];

    // Increment count for this date
    const currentCount = dateCountMap.get(dateString) || 0;
    dateCountMap.set(dateString, currentCount + 1);
  });

  return dateCountMap;
}

// Process data for completion calendar
export function processDataForCompletion(entries: NotionEntry[]): Map<string, number> {
  // Count entries by date
  const dateCountMap = new Map<string, number>();

  entries.forEach((entry: NotionEntry) => {
    const status = entry.properties['Status']['status']['name'];
    if (status !== 'Done') {
      return;
    }
    const dateString = entry.properties['Complete']['date']['start'];

    // Increment count for this date
    const currentCount = dateCountMap.get(dateString) || 0;
    dateCountMap.set(dateString, currentCount + 1);
  });

  return dateCountMap;
}

// Generate calendar data structure (GitHub style)
export function generateCalendarData(dateCountMap: Map<string, number>): DayData[][] {
  // Get current year's date range
  const now = new Date();
  const yearStart = startOfYear(now);
  const yearEnd = endOfYear(now);

  // Generate all days in the year (not used directly)
  eachDayOfInterval({ start: yearStart, end: yearEnd });

  // Find the first Sunday to start the calendar
  let calendarStart = yearStart;
  while (getDay(calendarStart) !== 0) {
    calendarStart = addDays(calendarStart, -1);
  }

  // Structure weeks and days
  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];

  // Create calendar grid (7 days per week)
  for (let i = 0; i < 53; i++) {
    currentWeek = [];
    for (let j = 0; j < 7; j++) {
      const currentDate = addDays(calendarStart, i * 7 + j);
      const dateString = format(currentDate, 'yyyy-MM-dd');
      const count = dateCountMap.get(dateString) || 0;

      // Determine intensity based on count (0-4 scale)
      let intensity = 0;
      if (count > 0) {
        if (count === 1) intensity = 1;
        else if (count <= 3) intensity = 2;
        else if (count <= 5) intensity = 3;
        else intensity = 4;
      }

      currentWeek.push({
        date: dateString,
        count,
        intensity,
        month: format(currentDate, 'MMM'),
        day: format(currentDate, 'd'),
        isCurrentMonth: format(currentDate, 'yyyy-MM') === format(now, 'yyyy-MM'),
      });
    }
    weeks.push(currentWeek);
  }

  return weeks;
}