import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://btplownypmhutcwucfhr.supabase.co";
// const supabaseAnonkey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM0MzI0Njk1LCJleHAiOjE5NDk5MDA2OTV9.ROB97SdO6hJelPH6HJk70PUTmOZfpAgWcOS0je0n11E";
// export const supabase = createClient(supabaseUrl, supabaseAnonkey);
//edmunds dev
export const supabase = createClient(
  "https://btplownypmhutcwucfhr.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDMyNDY5NSwiZXhwIjoxOTQ5OTAwNjk1fQ.oOpYCUC7JyPCW740m00-XesajCGfhnZD0Elk9s2CuB8"
  );
