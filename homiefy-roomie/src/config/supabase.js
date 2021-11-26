import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mzsaosavxltlwjxourqt.supabase.co";
const supabaseAnonkey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzA1NTg3MCwiZXhwIjoxOTUyNjMxODcwfQ.SYNKxhBJehU2D36I_44nBK3SbPLeXn1fQpteJrAOFOI";
export const supabase = createClient(supabaseUrl, supabaseAnonkey);
