import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://sljtbnadefnjcjhorpgw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsanRibmFkZWZuamNqaG9ycGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5NzU5MDYsImV4cCI6MjAxODU1MTkwNn0.o0zW9EjjX0EGkluTe6ds0Fhi5jzARbJvrGYozEeUCEU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
