import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Image = {
  id: string;
  url: string;
  thumbnail_url: string;
  title: string;
  author: string;
  width: number;
  height: number;
  category: string;
  created_at: string;
};
