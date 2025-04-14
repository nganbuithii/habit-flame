import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, CheckCircle, Award, Flame, Book,  } from 'lucide-react';

interface OverviewTabProps {
    totalCompletions: number;
    currentStreak: number;
    totalHabits: number;
    longestStreak: number;
    weeklyData: { name: string; completed: number; total: number }[]; 
    categoryData: { name: string; value: number }[]; 
    COLORS: string[];
    CHART_COLORS: { primary: string; secondary: string }; 
}

const OverviewTab: React.FC<OverviewTabProps> = ({
    totalCompletions,
    currentStreak,
    totalHabits,
    longestStreak,
    weeklyData,
    CHART_COLORS,
}) => {
    return (
        <div className="space-y-6">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5 transition-all hover:shadow text-center">
                    <div className="flex justify-center mb-3">
                        <div className="bg-pink-100 p-3 rounded-full">
                            <Book className="text-pink-500" size={24} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-pink-600">{totalHabits}</p>
                    <p className="text-sm text-gray-500 mt-1">Total Habits</p>
                </div>
                {/* Check-ins */}
                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5 transition-all hover:shadow text-center">
                    <div className="flex justify-center mb-3">
                        <div className="bg-pink-100 p-3 rounded-full">
                            <CheckCircle className="text-pink-500" size={24} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-pink-600">{totalCompletions}</p>
                    <p className="text-sm text-gray-500 mt-1">Check-ins</p>
                </div>
                {/* Current Streak */}
                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5 transition-all hover:shadow text-center">
                    <div className="flex justify-center mb-3">
                        <div className="bg-pink-100 p-3 rounded-full">
                            <Flame className="text-pink-500" size={24} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-pink-600">{currentStreak}</p>
                    <p className="text-sm text-gray-500 mt-1">Current Streak</p>
                </div>
                {/* Longest Streak */}
                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5 transition-all hover:shadow text-center">
                    <div className="flex justify-center mb-3">
                        <div className="bg-pink-100 p-3 rounded-full">
                            <Award className="text-pink-500" size={24} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-pink-600">{longestStreak}</p>
                    <p className="text-sm text-gray-500 mt-1">Longest Streak</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
                <h3 className="text-lg font-bold mb-4 text-pink-600 flex items-center">
                    <Calendar size={20} className="mr-2" />
                    Weekly Progress
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyData}>
                        <Bar dataKey="completed" name="Completed" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="total" name="Total" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        
        </div>
    );
};

export default OverviewTab;
