import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jtmueqlxzxoxjkckkeyi.supabase.co";
const supabaseKey = "sb_publishable_iPiDw-DNaN4iAd56MDTj3Q_OYf4zY4g";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});