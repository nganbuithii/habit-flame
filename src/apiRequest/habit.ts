
interface HabitPayload {
    userId: string;
    name: string;
    description?: string;
}

export const habitApiRequest = {
    getListHabit: async (userId: string) => {
        const res = await fetch(`/api/habit/${userId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch habits");

        return data.habits;
    },

    addHabit: async (payload: HabitPayload) => {
        const res = await fetch("/api/habit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to add habit");

        return data.habit;
    },
    getHabitDetail: async (habitId: string) => {
        const res = await fetch(`/api/habit/details/${habitId}`);
        const data = await res.json();
        console.log("Habit Detail Response:", data);
        if (!res.ok) throw new Error(data.error || "Failed to fetch habit detail");

        return {
            habit: data.habit,
            activities: data.activities || []
        };
    },
    checkInHabit : async (habitId: string) => {
        const res = await fetch(`/api/habit/details/${habitId}/checkin`, {
            method: 'POST',
        });
    
        if (!res.ok) throw new Error("Check-in failed");
    
        return res.json();
    },
    deleteHabit: async (habitId: string) => {
        const res = await fetch(`/api/habit/details/${habitId}`, {
            method: "DELETE",
        });
    
        const data = await res.json();
    
        if (!res.ok) throw new Error(data.error || "Failed to delete habit");
    
        return data;
    },
    editHabitName: async (habitId: string, name: string) => {
        const res = await fetch(`/api/habit/details/${habitId}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
        if (!res.ok) {
            throw new Error('Failed to update habit name');
        }

        return res.json(); 
    },
    
};
