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
};
