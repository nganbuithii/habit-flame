// src/app/(manage)/stats/HabitsTab.tsx
import React from 'react';
import { Book, Flame, Heart } from 'lucide-react';
import { Habit, HabitCheckIn } from '@/lib/subabase/type';

interface Props {
    habits: Habit[];
    checkIns: HabitCheckIn[]; 
  }
const HabitsTab: React.FC<Props> = ({ habits, checkIns }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-pink-600 flex items-center">
                <Book size={20} className="mr-2" />
                Your Habits Performance
            </h3>

            {habits.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-pink-100 p-4 rounded-full">
                            <Heart className="text-pink-500" size={32} />
                        </div>
                    </div>
                    <h4 className="text-lg font-medium text-gray-700">No habits yet!</h4>
                    <p className="text-gray-500 mt-2">Start creating habits to see your progress here</p>
                </div>
            ) : (
                habits.map(habit => {
                    const habitCheckIns = checkIns.filter(checkIn => checkIn.habit_id === habit.id);
                    const completions = habitCheckIns.length || 0;

                    return (
                        <div key={habit.id} className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="bg-pink-100 p-2 rounded-full mr-3">
                                        {habit.icon ? (
                                            <span className="text-pink-500 text-xl">{habit.icon}</span>
                                        ) : (
                                            <Book className="text-pink-500" size={20} />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-lg text-gray-700">{habit.name}</h4>
                                        <p className="text-xs text-gray-500">{habit.description || 'No description'}</p>
                                    </div>
                                </div>
                                <div className={`${habit.current_streak > 0 ? 'text-pink-500' : 'text-gray-300'} flex items-center bg-pink-50 py-1 px-3 rounded-full`}>
                                    <Flame size={18} />
                                    <span className="ml-1 font-bold">{habit.current_streak || 0}</span>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-3 gap-4 text-center">
                                <div className="bg-pink-50 rounded-xl p-3">
                                    <p className="text-gray-600 text-xs">Total check-ins</p>
                                    <p className="font-bold text-pink-600 text-lg">{completions}</p>
                                </div>
                                <div className="bg-pink-50 rounded-xl p-3">
                                    <p className="text-gray-600 text-xs">Longest streak</p>
                                    <p className="font-bold text-pink-600 text-lg">{habit.max_streak || 0}</p>
                                </div>
                                <div className="bg-pink-50 rounded-xl p-3">
                                    <p className="text-gray-600 text-xs">Flame intensity</p>
                                    <p className="font-bold text-pink-600 text-lg">{habit.flame_intensity || 1}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default HabitsTab;