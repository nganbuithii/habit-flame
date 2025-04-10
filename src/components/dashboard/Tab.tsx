export const TabSelector = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => (
    <div className="flex border-b border-gray-100 mb-6 space-x-1">
        {['flames', 'stats', 'achievements'].map(tab => (
            <button
                key={tab}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab 
                        ? 'text-gray-800 border-b-2 border-gray-800' 
                        : 'text-gray-500 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab(tab)}
            >
                {tab === 'flames' ? 'Your Flames' : tab === 'stats' ? 'Stats' : 'Achievements'}
            </button>
        ))}
    </div>
);