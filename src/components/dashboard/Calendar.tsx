import { Calendar } from 'lucide-react';

export const ActivityCalendar = ({ activityData }: { activityData: number[] }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-10">
        <div className="flex items-center mb-4">
            <Calendar className="text-red-400 w-5 h-5 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">Activity Calendar</h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
            {activityData.map((activity, i) => {
                let bgColor = "bg-gray-100";
                if (activity === 1) bgColor = "bg-red-100";
                if (activity === 2) bgColor = "bg-red-200";
                if (activity === 3) bgColor = "bg-red-300";
                if (activity === 4) bgColor = "bg-red-400";
                return (
                    <div
                        key={i}
                        className={`${bgColor} h-6 w-full rounded-sm hover:opacity-80 transition-opacity`}
                        title={`${activity} activities`}
                    ></div>
                );
            })}
        </div>
    </div>
);