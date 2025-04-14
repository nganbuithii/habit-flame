'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';
import { useAuthStore } from '@/store/authStore';
import BottomNavigation from '@/components/dashboard/BottomNav';
import { supabase } from '@/lib/subabase/client';
import { Spinner } from '@/components/ui/spinner';
import OverviewTab from '@/components/stats/OverviewTab';
import HabitsTab from '@/components/stats/HabitsTab';
import AchievementsTab from '@/components/stats/AchievementsTab';
import { Achievement, CategoryDataItem, Habit, HabitCheckIn,WeeklyDataItem } from '@/lib/subabase/type';



const StatsPage = () => {
    const { user } = useAuthStore()
    const [activeTab, setActiveTab] = useState<'overview' | 'habits' | 'achievements'>('overview');
    const [habits, setHabits] = useState<Habit[]>([]);
    const [checkIns, setCheckIns] = useState<HabitCheckIn[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [weeklyData, setWeeklyData] = useState<WeeklyDataItem[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryDataItem[]>([]);
    // const [monthlyTrendData, setMonthlyTrendData] = useState<MonthlyTrendDataItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id) return;

            setIsLoading(true);

            try {
                const { data: habitsData, error: habitsError } = await supabase
                    .from('habits')
                    .select('*')
                    .eq('user_id', user.id);

                if (habitsError) throw habitsError;

                let allCheckIns: HabitCheckIn[] = [];
                if (habitsData && habitsData.length > 0) {
                    const habitIds = habitsData.map(habit => habit.id);

                    const { data: checkInsData, error: checkInsError } = await supabase
                        .from('habit_checkins')
                        .select('*')
                        .in('habit_id', habitIds);

                    if (checkInsError) throw checkInsError;
                    allCheckIns = checkInsData || [];
                }

                const { data: achievementsData, error: achievementsError } = await supabase
                    .from('achievements')
                    .select('*')
                    .eq('user_id', user.id);

                if (achievementsError) throw achievementsError;

                setHabits(habitsData || []);
                setCheckIns(allCheckIns);
                setAchievements(achievementsData || []);

                processChartData(habitsData as Habit[], allCheckIns as HabitCheckIn[]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user?.id]);

    const processChartData = (habits: Habit[], checkIns: HabitCheckIn[]): void => {
        if (!habits || habits.length === 0) return;

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const dayOfWeek = today.getDay(); 

        const weekData: WeeklyDataItem[] = days.map((day, index) => {
            const targetDate = new Date();
            targetDate.setDate(today.getDate() - (dayOfWeek - index + 7) % 7);
            const targetDateStr = targetDate.toISOString().split('T')[0]; 

            const completedHabits = new Set<string>();

            checkIns.forEach(checkIn => {
                const checkInDate = new Date(checkIn.checkin_date).toISOString().split('T')[0];
                if (checkInDate === targetDateStr) {
                    completedHabits.add(checkIn.habit_id);
                }
            });

            return {
                name: day,
                completed: completedHabits.size,
                total: habits.length
            };
        });

        setWeeklyData(weekData);

        const categories: Record<string, number> = {};

        habits.forEach(habit => {
            const category = habit.description || 'General';
            categories[category] = (categories[category] || 0) + 1;
        });

        const categoryChartData: CategoryDataItem[] = Object.keys(categories).map(cat => ({
            name: cat,
            value: categories[cat]
        })).filter(item => item.value > 0);

        setCategoryData(categoryChartData);

        // const last30Days: MonthlyTrendDataItem[] = Array.from({ length: 30 }, (_, i) => {
        //     const date = new Date();
        //     date.setDate(date.getDate() - (29 - i));
        //     const dateStr = date.toISOString().split('T')[0];

        //     let completedHabits = 0;
        //     const habitIds = new Set<string>();

        //     checkIns.forEach(checkIn => {
        //         const checkInDate = new Date(checkIn.checkin_date).toISOString().split('T')[0];
        //         if (checkInDate === dateStr) {
        //             habitIds.add(checkIn.habit_id);
        //         }
        //     });

        //     completedHabits = habitIds.size;

        //     const completionRate = habits.length > 0
        //         ? (completedHabits / habits.length) * 100
        //         : 0;

        //     return {
        //         day: i + 1,
        //         date: `${date.getMonth() + 1}/${date.getDate()}`,
        //         completionRate: Math.round(completionRate)
        //     };
        // });

        // setMonthlyTrendData(last30Days);
    };

    const totalHabits = habits.length || 0;

    const totalCompletions = checkIns.length || 0;

    const longestStreak = habits.reduce((max, habit) =>
        Math.max(max, habit.max_streak || 0), 0);

    const currentStreak = habits.reduce((max, habit) =>
        Math.max(max, habit.current_streak || 0), 0);

    const COLORS = ['#FF8FAB', '#FFC2D1', '#FFB3C6', '#FFC8DD', '#FFCFD2'];
    const CHART_COLORS = {
        primary: '#FF8FAB',
        secondary: '#FFC2D1',
        accent: '#FFB3C6',
        background: '#FFF0F5'
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="bg-pink-50 min-h-screen text-gray-800 font-sans antialiased pb-20">
            <Header />
            <div className="container mx-auto p-6 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-pink-600">Your Statistics</h1>
                    <div className="h-1.5 bg-pink-300 w-20 mt-2 mb-4 rounded-full"></div>
                    <p className="text-gray-600 text-sm">Track your progress and celebrate achievements!</p>
                </div>

                <div className="mb-6">
                    <div className="flex space-x-1 p-1 bg-white  border border-pink-100 shadow-sm">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-all ${activeTab === 'overview'
                                ? 'bg-pink-400 text-white shadow-sm rounded-full'
                                : 'hover:bg-pink-50 text-gray-600'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('habits')}
                            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-all ${activeTab === 'habits'
                                ? 'bg-pink-400 text-white shadow-sm'
                                : 'hover:bg-pink-50 text-gray-600'}`}
                        >
                            Habits
                        </button>
                        <button
                            onClick={() => setActiveTab('achievements')}
                            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-all ${activeTab === 'achievements'
                                ? 'bg-pink-400 text-white shadow-sm'
                                : 'hover:bg-pink-50 text-gray-600'}`}
                        >
                            Achievements
                        </button>
                    </div>
                </div>

                {activeTab === 'overview' && <OverviewTab totalCompletions={totalCompletions} currentStreak={currentStreak} totalHabits={totalHabits} longestStreak={longestStreak} weeklyData={weeklyData} categoryData={categoryData} COLORS={COLORS} CHART_COLORS={CHART_COLORS} />}
                {activeTab === 'habits' && <HabitsTab habits={habits} checkIns={checkIns} />}
                {activeTab === 'achievements' && <AchievementsTab achievements={achievements} habits={habits} totalHabits={totalHabits} totalCompletions={totalCompletions} checkIns={checkIns} />}

            </div>
            <BottomNavigation />
        </div>
    );
};

export default StatsPage;