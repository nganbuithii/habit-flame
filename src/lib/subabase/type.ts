export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  icon?: string;
  created_at?: string;
  flame_intensity: number;
  current_streak: number;
  max_streak: number;
}
export interface HabitCheckIn {
  id: string;
  habit_id: string;
  checkin_date: string;
}
export interface Achievement {
  id: string;
  user_id: string;
  habit_id?: string;
  type: string;
  description: string;
  unlocked_at: string;
}

export type FlameDetails = {
  color: string;
  size: string;
};

export interface WeeklyDataItem {
  name: string;
  completed: number;
  total: number;
}

export interface CategoryDataItem {
  name: string;
  value: number;
}

// export interface MonthlyTrendDataItem {
//   day: number;
//   date: string;
//   completionRate: number;
// }
