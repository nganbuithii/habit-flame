
import { supabase } from "@/lib/subabase/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ habitId: string }> },
) {
  try {
    const habitId = (await params).habitId;
    const { data: habitData, error: habitError } = await supabase
      .from("habits")
      .select("*")
      .eq("id", habitId)
      .single();

    if (habitError) {
      return NextResponse.json({ error: habitError.message }, { status: 500 });
    }

    if (!habitData) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    const { data: activitiesData, error: activitiesError } = await supabase
      .from("habit_checkins")
      .select("*")
      .eq("habit_id", habitId)

    if (activitiesError) {
      return NextResponse.json({ error: activitiesError.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        habit: habitData,
        activities: activitiesData || []
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Internal server error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ habitId: string }> },
) {
  try {
    const habitId = (await params).habitId;
    const { error: checkinDeleteError } = await supabase
      .from("habit_checkins")
      .delete()
      .eq("habit_id", habitId);

    if (checkinDeleteError) {
      return NextResponse.json(
        { error: checkinDeleteError.message },
        { status: 500 }
      );
    }

    const { error: habitDeleteError } = await supabase
      .from("habits")
      .delete()
      .eq("id", habitId);

    if (habitDeleteError) {
      return NextResponse.json(
        { error: habitDeleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Habit deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Delete habit error:", err);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ habitId: string }> }

) {
  try {
    const habitId = (await params).habitId;
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("habits")
      .update({ name })
      .eq("id", habitId)
      .select()
      .single();


    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Habit updated successfully", habit: data }, { status: 200 });
  } catch (err) {
    console.error("Patch habit error:", err);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}