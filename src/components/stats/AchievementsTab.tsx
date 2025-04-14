import React from 'react';
import { Calendar, CheckCircle, Award, Flame, TrendingUp } from 'lucide-react';
import { Achievement, Habit, HabitCheckIn } from '@/lib/subabase/type';


interface Props {
  achievements: Achievement[];
  habits: Habit[];
  totalHabits: number;
  totalCompletions: number;
  checkIns: HabitCheckIn[]; 
}

const AchievementsTab: React.FC<Props> = ({ achievements, habits, totalHabits, totalCompletions, checkIns }) => {
  const achievementDefinitions = [
    {
      type: 'first_habit',
      name: 'First Steps',
      description: 'Created your first habit',
      condition: () => totalHabits > 0,
      icon: <CheckCircle size={28} />
    },
    {
      type: 'streak_7',
      name: '7-Day Streak',
      description: 'Maintained a habit for 7 days',
      condition: () => habits.some(habit => habit.current_streak >= 7),
      icon: <Flame size={28} />
    },
    {
      type: 'streak_30',
      name: '30-Day Master',
      description: 'Maintained a habit for 30 days',
      condition: () => habits.some(habit => habit.max_streak >= 30),
      icon: <Award size={28} />
    },
    {
      type: 'habit_collector',
      name: 'Habit Collector',
      description: 'Created 5 different habits',
      condition: () => totalHabits >= 5,
      icon: <TrendingUp size={28} />
    },
    {
      type: 'check_in_100',
      name: 'Century Club',
      description: 'Checked in 100 times total',
      condition: () => totalCompletions >= 100,
      icon: <CheckCircle size={28} />
    },
    {
      type: 'all_habits',
      name: 'Perfect Day',
      description: 'Complete all habits in a single day',
      condition: () => {
        if (habits.length === 0) return false;

        const checkInsByDate: Record<string, Set<string>> = {};

        checkIns.forEach(checkIn => {
          const dateStr = new Date(checkIn.checkin_date).toISOString().split('T')[0];
          if (!checkInsByDate[dateStr]) {
            checkInsByDate[dateStr] = new Set();
          }
          checkInsByDate[dateStr].add(checkIn.habit_id);
        });

        return Object.values(checkInsByDate).some(
          habitSet => habitSet.size === habits.length
        );
      },
      icon: <Calendar size={28} />
    },
  ];

  const unlockedAchievementTypes = new Set(
    achievements.map(achievement => achievement.type)
  );

  achievementDefinitions.forEach(achievement => {
    if (!unlockedAchievementTypes.has(achievement.type) && achievement.condition()) {
      unlockedAchievementTypes.add(achievement.type);
    }
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-pink-600 flex items-center">
        <Award size={20} className="mr-2" />
        Your Achievements
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {achievementDefinitions.map((achievement, index) => {
          const isUnlocked = unlockedAchievementTypes.has(achievement.type);

          return (
            <div
              key={index}
              className={`p-5 rounded-2xl border ${isUnlocked
                ? 'border-pink-200 bg-white shadow-sm'
                : 'border-gray-100 bg-gray-50'}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-3 p-4 rounded-full ${isUnlocked
                  ? 'bg-pink-100 text-pink-500'
                  : 'bg-gray-100 text-gray-300'}`}>
                  {achievement.icon}
                </div>
                <h4 className={`font-medium text-lg ${isUnlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                  {achievement.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                <div className={`mt-4 text-xs font-medium px-3 py-1 rounded-full 
                ${isUnlocked ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400'}`}>
                  {isUnlocked ? 'Unlocked!' : 'Locked'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsTab;
