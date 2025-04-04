export const TabSelector = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => (
    <div className="flex border-b border-gray-200 mb-8 space-x-2">
        {['flames', 'stats', 'achievements'].map(tab => (
            <button
                key={tab}
                className={`px-4 py-2 rounded-t-md text-sm font-medium transition-colors ${activeTab === tab ? 'bg-red-400 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab(tab)}
            >
                {tab === 'flames' ? 'Your Flames' : tab === 'stats' ? 'Stats' : 'Achievements'}
            </button>
        ))}
    </div>
);