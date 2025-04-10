import { Award, User } from "lucide-react";
import { useAuthStore } from '@/store/authStore';

export const Header = ({ totalDays }: { totalDays: number }) => {
    const { user } = useAuthStore();
    
    return (
        <div className="bg-white px-6 py-4 border-b border-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-medium text-gray-800">Habit Flame</h1>
                        <div className="h-6 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                            <Award className="text-gray-400 w-4 h-4" />
                            <span className="text-sm text-gray-600">{totalDays} days streak</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <User className="text-gray-500 w-4 h-4" />
                            </div>
                            <div className="text-sm">
                                <div className="text-gray-500">Welcome back,</div>
                                <div className="text-gray-800 font-medium">{user?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
