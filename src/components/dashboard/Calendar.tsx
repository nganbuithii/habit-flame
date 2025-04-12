import React, { useState } from 'react';
import { Calendar,  ArrowLeft, ArrowRight} from 'lucide-react';

interface ActivityCalendarProps {
  activityData?: {
    checkin_date: string;
    intensity?: number;
  }[];
  flameIntensity?: number;
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ 
  activityData = [], 
}) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const generateCalendarDates = () => {
    const dates = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = new Date(year, month, -i);
      dates.unshift(prevDate.toISOString().split('T')[0]);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    const remainingDays = 42 - dates.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      dates.push(nextDate.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const calendarDates = generateCalendarDates();
  
  const dateActivityMap = activityData.reduce((acc, activity) => {
    const date = activity.checkin_date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {} as Record<string, number>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getIntensityLevel = (count: number) => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    return 3;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="bg-pink-100 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-pink-500 rounded-full p-2">
            <Calendar className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl text-pink-600 font-bold">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={handlePrevMonth}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-pink-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-pink-400 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-medium text-slate-500 mb-1">
              {day}
            </div>
          ))}
          
          {calendarDates.map((date) => {
            const dateObj = new Date(date);
            const count = dateActivityMap[date] || 0;
            const intensity = getIntensityLevel(count);
            const isToday = date === new Date().toISOString().split('T')[0];
            const isCurrentMonth = dateObj.getMonth() === currentMonth.getMonth();
            
            const bgStyles = [
              isCurrentMonth ? 'bg-slate-300' : 'bg-slate-200',
              'bg-pink-300', 
              'bg-pink-300', 
              'bg-pink-300',
            ];
            
            return (
              <div 
                key={date}
                className={`aspect-square rounded-md ${bgStyles[intensity]} p-1 flex flex-col justify-center items-center 
                  transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-pink-300 relative
                  ${isToday ? 'ring-2 ring-pink-300' : ''}
                  ${!isCurrentMonth ? 'opacity-50' : ''}`}
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
              >
                <div className={`text-xs font-medium ${isCurrentMonth ? 'text-slate-400' : 'text-slate-500'}`}>
                  {dateObj.getDate()}
                </div>
              
                {/* Tooltip */}
                {hoveredDate === date && (
                  <div className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2 
                    bg-slate-800 text-white py-2 px-3 rounded-md shadow-lg text-xs whitespace-nowrap">
                    <div className="font-medium">{formatDate(date)}</div>
                    <div className="text-pink-300 mt-1">
                      {count ? `${count} check-in${count > 1 ? 's' : ''}` : 'No activity'}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};