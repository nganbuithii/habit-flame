'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/dashboard/Header';
import { useCheckInHabit, useGetDetailHabit } from '@/queries/useHabit';
import { Spinner } from '@/components/ui/spinner';
import { ActivityCalendar } from '@/components/dashboard/Calendar';
import { useAuthStore } from '@/store/authStore';
import { HabitHeader } from '@/components/habit-detail/HabitHeader';
import { StreakCard } from '@/components/habit-detail/StreakCard';
import { ProgressSection } from '@/components/habit-detail/ProgressSection';
import { CheckInButton } from '@/components/habit-detail/CheckInButton';
import BottomNavigation from '@/components/dashboard/BottomNav';

interface Activity {
    id: string;
    habit_id: string;
    checkin_date: string;
}

interface HabitData {
    id: string;
    user_id: string;
    name: string;
    description: string;
    icon: string | null;
    created_at: string;
    flame_intensity: number;
    current_streak: number;
    max_streak: number;
}

const HabitDetailPage = () => {
    const params = useParams();
    const habitId = params.id as string;
    const { user } = useAuthStore();

    const { data, isLoading } = useGetDetailHabit({
        id: habitId,
        enabled: !!habitId
    });
    
    const habit: HabitData | undefined = data?.habit;
    const activities: Activity[] | undefined = data?.activities;
    
    const { mutate: checkIn, isPending } = useCheckInHabit();

    const handleCheckIn = () => {
        if (!user) return;
        checkIn(habitId);
    };

    if (isLoading || !habit) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white ">
                <Spinner />
            </div>
        );
    }

    const today = new Date().toLocaleDateString('sv-SE');
console.log("today", today)

    const checkedInToday = activities?.some(activity => activity.checkin_date === today) ?? false;
    const level = Math.floor(habit.current_streak / 7) + 1;

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-800 font-sans antialiased">
            <Header  />
            <div className="container mx-auto p-4 max-w-5xl">
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-md border border-pink-100 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-100/30 to-pink-200/20 rounded-bl-full -z-10"></div>
                    
                    <HabitHeader 
                        name={habit.name}
                        description={habit.description}
                        created_at={habit.created_at}
                        flame_intensity={habit.flame_intensity}
                    />

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <StreakCard type="current" value={habit.current_streak} />
                        <StreakCard type="best" value={habit.max_streak} />
                    </div>

                    <ProgressSection 
                        current_streak={habit.current_streak}
                        flame_intensity={habit.flame_intensity}
                        level={level}
                    />

                    <CheckInButton 
                        isPending={isPending}
                        checkedInToday={checkedInToday}
                        onClick={handleCheckIn}
                    />
                </div>

                <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-md border border-pink-100 mb-6">
                    <ActivityCalendar 
                        activityData={activities} 
                        flameIntensity={habit.flame_intensity}
                    />
                </div>
            </div>
            <BottomNavigation />
        </div>
    );
};

export default HabitDetailPage;