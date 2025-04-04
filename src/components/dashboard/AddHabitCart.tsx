import { Plus } from 'lucide-react';

export const AddHabitCard = () => (
    <div className="bg-white border-2 border-dashed border-gray-200 p-5 rounded-lg flex items-center justify-center h-64 cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="text-center">
            <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Plus className="text-red-400" />
            </div>
            <div className="text-red-400 text-sm font-medium">Add New Habit</div>
        </div>
    </div>
);