import { supabase } from "@/lib/subabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{  userId: string}> },
) {
  try {
    const userId = (await params).userId;
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ habits: data }, { status: 200 });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
