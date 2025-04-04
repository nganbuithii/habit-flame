'use client';
import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { FlameDetails, Habit } from '@/lib/subabase/type';
import { TabSelector } from '@/components/dashboard/Tab';
import { StatsSection } from '@/components/dashboard/StatSection';
import { HabitCard } from '@/components/dashboard/HabitCard';
import { AddHabitCard } from '@/components/dashboard/AddHabitCart';
import { ActivityCalendar } from '@/components/dashboard/Calendar';
import { BottomNavigation } from '@/components/dashboard/BottomNav';
import { useAuthStore } from '@/store/authStore';

const Dashboard = () => {
  const { user } = useAuthStore();
  console.log("USER", user)
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Reading", streak: 7, bestStreak: 12, lastChecked: true, level: 2 },
    { id: 2, name: "Exercise", streak: 15, bestStreak: 15, lastChecked: true, level: 3 },
    { id: 3, name: "Learn English", streak: 3, bestStreak: 5, lastChecked: true, level: 1 },
    { id: 4, name: "Drink Water", streak: 0, bestStreak: 21, lastChecked: false, level: 0 },
  ]);

  const [activeTab, setActiveTab] = useState('flames');
  const [totalDays] = useState(28);

  const getFlameDetails = (streak: number, isChecked: boolean): FlameDetails => {
    if (!isChecked) return { color: "text-gray-300", size: "text-lg" };
    if (streak >= 30) return { color: "text-amber-500", size: "text-4xl" };
    if (streak >= 14) return { color: "text-orange-400", size: "text-3xl" };
    if (streak >= 7) return { color: "text-red-400", size: "text-2xl" };
    if (streak >= 1) return { color: "text-red-300", size: "text-xl" };
    return { color: "text-gray-300", size: "text-lg" };
  };

  const handleCheckIn = (id: number) => {
    setHabits(habits.map(habit =>
      habit.id === id
        ? { ...habit, streak: habit.lastChecked ? habit.streak : habit.streak + 1, lastChecked: true }
        : habit
    ));
  };

  const activityData = [
    3, 1, 3, 1, 0, 0, 0,
    4, 1, 1, 1, 1, 1, 4,
    2, 1, 3, 0, 4, 0, 1,
    4, 3, 3, 3, 0, 4, 4,
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans antialiased">
      <Header totalDays={totalDays} />
      <div className="container mx-auto p-6 max-w-5xl">
        <div className="mb-10">
          <h2 className="text-2xl font-medium text-gray-800">
            Hello, <span className="text-red-400">{user?.email}</span>!
          </h2>
          <div className="h-1 bg-gradient-to-r from-red-300 to-orange-300 w-20 mt-2 mb-4 rounded-full"></div>
          <p className="text-gray-500 text-sm">A great day to nurture your habits!</p>
        </div>
        <StatsSection habits={habits} />
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              flameDetails={getFlameDetails(habit.streak, habit.lastChecked)}
              onCheckIn={handleCheckIn}
            />
          ))}
          <AddHabitCard />
        </div>
        <ActivityCalendar activityData={activityData} />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;