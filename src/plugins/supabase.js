import { createClient } from '@supabase/supabase-js'

const KEY = process.env.VUE_APP_SUPABASE_KEY;
// Create a single supabase client for interacting with your database 
const supabase = createClient('https://yjqlszjzacuzpqcwxzxa.supabase.co', KEY);

export default supabase