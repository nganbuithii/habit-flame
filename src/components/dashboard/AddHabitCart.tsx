import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddHabitModal } from './AddHabitModal';

export const AddHabitCard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div 
                onClick={() => setIsOpen(true)}
                className="bg-white border border-dashed border-gray-200 p-5 rounded-lg flex items-center justify-center h-64 cursor-pointer hover:bg-gray-50 transition-colors group"
            >
                <div className="text-center">
                    <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-100 transition-colors">
                        <Plus className="text-gray-400 group-hover:text-gray-600 w-6 h-6" />
                    </div>
                    <div className="text-gray-500 text-sm font-medium group-hover:text-gray-700">Add New Habit</div>
                </div>
            </div>
            <AddHabitModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};