'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Award, Flame, Settings, TrendingUp } from 'lucide-react';

interface NavButtonProps {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`p-2 ${active ? 'text-pink-600' : 'text-pink-400'} flex flex-col items-center`}
    >
        {icon}
        <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
);

const BottomNavigation: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { icon: <Flame />, label: 'Streaks', path: '/streaks' },
        { icon: <Award />, label: 'Achievements', path: '/achievements' },
        { icon: <TrendingUp />, label: 'Stats', path: '/stats' },
        { icon: <Settings />, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-lg p-2 flex justify-around">
            {navItems.map(({ icon, label, path }) => (
                <NavButton
                    key={path}
                    icon={icon}
                    label={label}
                    active={pathname === path}
                    onClick={() => router.push(path)}
                />
            ))}
        </div>
    );
};

export default BottomNavigation;
