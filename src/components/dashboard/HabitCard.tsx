import { Flame, TrendingUp, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { FlameDetails, Habit } from '@/lib/subabase/type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeleteConfirmation } from '../ui/DeleteConfirmation';
import { useDeleteHabit, useEditHabit } from '@/queries/useHabit';

export const HabitCard = ({ habit, flameDetails, activeHabitId, setActiveHabitId }: {
    habit: Habit;
    flameDetails: FlameDetails,
    activeHabitId: string | null;
    setActiveHabitId: (id: string | null) => void;
}) => {
    const router = useRouter();
    const showActions = activeHabitId === habit.id;
    const [isEditing, setIsEditing] = useState(false);
    const [habitName, setHabitName] = useState(habit.name);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const { mutate: deleteHabit } = useDeleteHabit();
    const { mutate: editHabit } = useEditHabit();
    const toggleActions = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveHabitId(showActions ? null : habit.id);
    };

    const handleCardClick = () => {
        if (!isEditing) {
            router.push(`/habit/${habit.id}`);
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
        setActiveHabitId(null);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDeleteDialog(true);
        setActiveHabitId(null);
    };

    const handleConfirmDelete = () => {
        console.log('Deleting habit:', habit.id);
        deleteHabit(habit.id);
        setShowDeleteDialog(false);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (habitName.trim()) {
            editHabit({ id: habit.id, name: habitName }); 
        }
        setActiveHabitId(null); 
        setIsEditing(false);
    };

    return (
        <>
            <div
                onClick={handleCardClick}
                className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 relative group cursor-pointer border border-gray-100"
            >
                <div className="absolute top-2 right-2 z-10">
                    <button
                        onClick={toggleActions}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>

                    {showActions && (
                        <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                            >
                                <Edit2 className="w-4 h-4 text-blue-500" />
                                Edit name
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                                Delete habit
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center text-center">
                    <div className="h-14 w-14 bg-pink-50 rounded-xl flex items-center justify-center group-hover:bg-pink-100 transition-colors mb-2">
                        <Flame className={`${flameDetails.color} ${flameDetails.size}`} />
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSave} onClick={e => e.stopPropagation()} className="w-full mb-2">
                            <input
                                type="text"
                                value={habitName}
                                onChange={(e) => setHabitName(e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
                                autoFocus
                            />
                            <div className="flex gap-2 mt-2 justify-center">
                                <button
                                    type="submit"
                                    className="px-3 py-1 bg-pink-500 text-white text-xs rounded-lg hover:bg-pink-600"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(false);
                                        setHabitName(habit.name);
                                    }}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <h3
                            title={habit.name}
                            className="text-sm font-medium text-gray-800 mb-0.5 w-full overflow-hidden whitespace-nowrap text-ellipsis"
                        >
                            {habit.name}
                        </h3>
                    )}

                    {!isEditing && (
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <TrendingUp className="w-3 h-3" />
                            <span>{habit.current_streak || 0} days</span>
                        </div>
                    )}
                </div>

                <div className={`${isEditing ? 'mt-0' : 'mt-3'}`}>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="bg-pink-400 h-full transition-all duration-300"
                            style={{ width: `${Math.min(100, (habit.current_streak / 30) * 100)}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                        <span>{habit.current_streak || 0}/365</span>
                    </div>
                </div>
            </div>

            <DeleteConfirmation
                habit={habit}
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};
