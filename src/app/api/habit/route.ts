import { supabase } from "@/lib/subabase/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, name, description, icon } = await request.json();

    const { data, error } = await supabase
      .from("habits")
      .insert([
        {
          user_id: userId,
          name,
          description,
          icon,
          flame_intensity: 1,
          current_streak: 0,
          max_streak: 0,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ habit: data[0] }, { status: 201 });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}