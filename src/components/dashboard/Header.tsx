import { Award, User } from "lucide-react";

export const Header = ({ totalDays }: { totalDays: number }) => (
    <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-3 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-1">
            <h1 className="text-lg font-semibold text-white">Nanies Habit</h1>
        </div>
        <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-white text-pink-500 rounded-full flex items-center gap-1.5 shadow-md">
                <Award className="text-pink-500 w-5 h-5" />
                <span className="font-semibold text-sm">{totalDays} days</span>
            </div>
            <div className="bg-white p-1.5 rounded-full shadow-md">
                <User className="text-pink-500 w-5 h-5" />
            </div>
        </div>
    </div>
);
