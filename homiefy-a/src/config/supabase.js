import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://btplownypmhutcwucfhr.supabase.co";
const supabaseAnonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDMyNDY5NSwiZXhwIjoxOTQ5OTAwNjk1fQ.oOpYCUC7JyPCW740m00-XesajCGfhnZD0Elk9s2CuB8";
export const supabase = createClient(supabaseUrl, supabaseAnonkey);
