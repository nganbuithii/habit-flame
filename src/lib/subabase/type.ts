export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  icon?: string | null;
  created_at: string;
  flame_intensity: number;
  current_streak: number;
  max_streak: number;
}


export type FlameDetails = {
  color: string;
  size: string;
};
