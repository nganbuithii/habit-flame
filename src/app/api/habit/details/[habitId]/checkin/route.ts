import { supabase } from "@/lib/subabase/client";
import { NextResponse } from "next/server";
import { format, subDays, isSameDay, startOfToday } from "date-fns";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ habitId: string }> },

) {
  try {
    const habitId = (await params).habitId;

    const today = format(startOfToday(), "yyyy-MM-dd");


    const { data: habit, error: habitError } = await supabase
      .from("habits")
      .select("*")
      .eq("id", habitId)
      .single();

    if (habitError || !habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }


    const { data: todayCheckin, error: todayError } = await supabase
      .from("habit_checkins")
      .select("*")
      .eq("habit_id", habitId)
      .eq("checkin_date", today)
      .maybeSingle();

    if (todayError) {
      return NextResponse.json({ error: todayError.message }, { status: 500 });
    }

    if (todayCheckin) {
      return NextResponse.json({ message: "Already checked in today" }, { status: 200 });
    }


    const { data: lastCheckin} = await supabase
      .from("habit_checkins")
      .select("*")
      .eq("habit_id", habitId)
      .lt("checkin_date", today)
      .order("checkin_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    const yesterday = subDays(new Date(today), 1);
    const isStreakContinued = lastCheckin && isSameDay(new Date(lastCheckin.checkin_date), yesterday);


    let newCurrentStreak = 1;
    let newMaxStreak = habit.max_streak;

    if (isStreakContinued) {
      newCurrentStreak = habit.current_streak + 1;
    }

    if (newCurrentStreak > habit.max_streak) {
      newMaxStreak = newCurrentStreak;
    }


    const { error: insertError } = await supabase
      .from("habit_checkins")
      .insert([{ habit_id: habitId, checkin_date: today }]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }


    const { error: updateError } = await supabase
      .from("habits")
      .update({
        current_streak: newCurrentStreak,
        max_streak: newMaxStreak,
      })
      .eq("id", habitId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: "Check-in successful",
        current_streak: newCurrentStreak,
        max_streak: newMaxStreak,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Check-in error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
