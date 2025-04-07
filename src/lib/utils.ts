// Utility functions

// Validate database ID format
export function isValidDatabaseId(id: string): boolean {
  // Notion database IDs are 32 characters long with hyphens
  const databaseIdPattern = /^[a-zA-Z0-9]{32}$/;
  return databaseIdPattern.test(id);
}

// Generate a color based on intensity level (0-4)
export function getIntensityColor(intensity: number): string {
  // Blue color palette (from light to dark)
  const colors = [
    '#f5f9ff', // Level 0 - Almost white/very light blue
    '#dbeafe', // Level 1 - Light blue
    '#93c5fd', // Level 2 - Medium blue
    '#3b82f6', // Level 3 - Blue
    '#1d4ed8', // Level 4 - Dark blue
  ];

  return colors[intensity] || colors[0];
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

interface DayData {
  date: string;
  count: number;
  intensity: number;
  month: string;
  day: string;
  isCurrentMonth: boolean;
}

// Get stats from contributions data
export function getContributionStats(weeks: DayData[][]): {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  bestDay: { date: string; count: number } | null;
} {
  let totalContributions = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let bestDay: { date: string; count: number } | null = null;

  // Flatten the weeks array to get all days
  const allDays = weeks.flat();

  // Calculate total contributions and find best day
  allDays.forEach(day => {
    if (day.count > 0) {
      totalContributions += day.count;

      // Check for best day
      if (!bestDay || day.count > bestDay.count) {
        bestDay = { date: day.date, count: day.count };
      }
    }
  });

  // Calculate streaks
  let tempStreak = 0;

  // Sort days by date in reverse to calculate current streak first
  const sortedDays = [...allDays].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate current streak (consecutive days with contributions from today backwards)
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  for (const day of sortedDays) {
    if (day.date > today) continue; // Skip future dates

    if (day.count > 0) {
      tempStreak++;
    } else {
      break; // Break at first day with no contributions
    }
  }

  currentStreak = tempStreak;

  // Calculate longest streak
  tempStreak = 0;
  for (const day of allDays) {
    if (day.count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  return {
    totalContributions,
    currentStreak,
    longestStreak,
    bestDay
  };
}