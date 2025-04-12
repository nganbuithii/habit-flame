import { CheckCircle2 } from 'lucide-react';

interface CheckInButtonProps {
    isPending: boolean;
    checkedInToday: boolean;
    onClick: () => void;
}

export const CheckInButton: React.FC<CheckInButtonProps> = ({
    isPending,
    checkedInToday,
    onClick
}) => {
    return (
        <div className="flex justify-center mb-2">
            <button
                onClick={onClick}
                disabled={isPending || checkedInToday}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl shadow-md transition-all duration-200 text-lg font-medium
                    ${checkedInToday 
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' 
                        : 'bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:shadow-lg hover:translate-y-[-2px]'} 
                    disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-md`}
            >
                {checkedInToday ? (
                    <>
                        <CheckCircle2 className="w-6 h-6" />
                        <span>Already checked in today!</span>
                    </>
                ) : isPending ? (
                    <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Checking in...</span>
                    </>
                ) : (
                    <>
                        <CheckCircle2 className="w-6 h-6" />
                        <span>Check in for today</span>
                    </>
                )}
            </button>
        </div>
    );
}; 