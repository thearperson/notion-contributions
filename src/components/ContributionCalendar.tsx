'use client';

import React from 'react';
import { format } from 'date-fns';
import { getIntensityColor } from '../lib/utils';

interface DayData {
  date: string;
  count: number;
  intensity: number;
  month: string;
  day: string;
  isCurrentMonth: boolean;
}

interface CalendarProps {
  calendarData: DayData[][];
  isCompletion: boolean;
}

const ContributionCalendar: React.FC<CalendarProps> = ({ calendarData, isCompletion }) => {
  // Months for top labels
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Function to get month label positions
  const getMonthLabelPosition = (month: string) => {
    for (let i = 0; i < calendarData.length; i++) {
      const weekIndex = calendarData[i].findIndex(day => day.month === month && parseInt(day.day) <= 7);
      if (weekIndex !== -1) {
        return i;
      }
    }
    return 0;
  };

  return (
    <div className="calendar-container">
      <div className="month-labels">
        {monthLabels.map((month) => (
          <div
            key={month}
            className="month-label"
            style={{
              gridColumnStart: getMonthLabelPosition(month) + 1,
              opacity: month === format(new Date(), 'MMM') ? 1 : 0.6
            }}
          >
            {month}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {/* Day labels (left side) */}
        <div className="day-labels">
          <div>Mon</div>
          <div>Wed</div>
          <div>Fri</div>
        </div>

        {/* Calendar cells */}
        <div className="weeks-container">
          {calendarData.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="week">
              {week.map((day) => (
                <div
                  key={`day-${day.date}`}
                  className="day-cell"
                  style={{
                    backgroundColor: getIntensityColor(day.intensity, isCompletion),
                    border: day.isCurrentMonth ?
                      isCompletion ? '1px solid rgba(0, 0, 255, 0.2)' :
                      '1px solid rgba(255, 128, 128, 0.2)' :
                      '1px solid transparent'
                  }}
                  title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="calendar-legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={`legend-${level}`}
            className="legend-cell"
            style={{ backgroundColor: getIntensityColor(level, isCompletion) }}
          />
        ))}
        <span>More</span>
      </div>

      <style jsx>{`
        .calendar-container {
          margin: 20px auto;
          width: 772px;
          overflow-x: auto;
        }

        .month-labels {
          width: 742px;
          display: grid;
          grid-template-columns: repeat(53, 1fr);
          text-align: start;
          font-size: 12px;
          color: #666;
          margin-bottom: 5px;
          margin-left: 30px;
        }

        .month-label {
          grid-column: span 4;
        }

        .calendar-grid {
          display: flex;
          width: 100%;
        }

        .day-labels {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px 5px 10px 0;
          color: #666;
          opacity: 0.6;
          font-size: 12px;
          height: 120px;
        }

        .weeks-container {
          display: flex;
          flex-grow: 1;
        }

        .week {
          display: flex;
          flex-direction: column;
          width: 11px;
          margin-right: 3px;
        }

        .day-cell {
          height: 11px;
          width: 11px;
          margin: 2px 0;
          border-radius: 2px;
          cursor: pointer;
          transition: transform 0.1s ease;
        }

        .day-cell:hover {
          transform: scale(1.2);
        }

        .calendar-legend {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 10px;
          font-size: 12px;
          color: #666;
        }

        .legend-cell {
          width: 11px;
          height: 11px;
          margin: 0 3px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default ContributionCalendar;