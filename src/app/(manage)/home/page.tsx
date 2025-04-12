'use client';
import React, { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { FlameDetails, Habit } from '@/lib/subabase/type';
import { TabSelector } from '@/components/dashboard/Tab';
import { HabitCard } from '@/components/dashboard/HabitCard';
import { AddHabitCard } from '@/components/dashboard/AddHabitCart';
import { BottomNavigation } from '@/components/dashboard/BottomNav';
import { useAuthStore } from '@/store/authStore';
import { useGetListHabit } from '@/queries/useHabit';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [activeHabitId, setActiveHabitId] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('flames');
  const { data: fetchedHabits} = useGetListHabit({
    id: user?.id || '',
    enabled: !!user?.id,
  });
  const getFlameDetails = (streak: number): FlameDetails => {
    if (streak >= 30) return { color: "text-amber-500", size: "text-4xl" };
    if (streak >= 14) return { color: "text-orange-400", size: "text-3xl" };
    if (streak >= 7) return { color: "text-red-400", size: "text-2xl" };
    if (streak >= 1) return { color: "text-red-300", size: "text-xl" };
    return { color: "text-gray-300", size: "text-lg" };
  };


  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans antialiased">
      <Header  />
      <div className="container mx-auto p-6 max-w-5xl">
        <div className="mb-10">

          <div className="h-1 bg-gradient-to-r from-red-300 to-orange-300 w-20 mt-2 mb-4 rounded-full"></div>
          <p className="text-gray-500 text-sm">A great day to nurture your habits!</p>
        </div>
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {fetchedHabits?.map((habit: Habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              flameDetails={getFlameDetails(habit.current_streak)}
              activeHabitId={activeHabitId}
              setActiveHabitId={setActiveHabitId}
            />
          ))}
          <AddHabitCard />
        </div>

      </div>
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;