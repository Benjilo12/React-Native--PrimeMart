import {
  EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_ANON_KEY,
} from "../config";
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const CHUNK_SIZE = 1900; // safely under 2048 byte limit

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    if (Platform.OS === "web") return localStorage.getItem(key);

    const chunks: string[] = [];
    let index = 0;
    while (true) {
      const chunk = await SecureStore.getItemAsync(`${key}_chunk_${index}`);
      if (chunk === null) break;
      chunks.push(chunk);
      index++;
    }
    return chunks.length > 0 ? chunks.join("") : null;
  },

  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") return localStorage.setItem(key, value);

    // Delete old chunks first
    let index = 0;
    while (true) {
      const existing = await SecureStore.getItemAsync(`${key}_chunk_${index}`);
      if (existing === null) break;
      await SecureStore.deleteItemAsync(`${key}_chunk_${index}`);
      index++;
    }

    // Write new chunks
    let chunkIndex = 0;
    for (let i = 0; i < value.length; i += CHUNK_SIZE) {
      await SecureStore.setItemAsync(
        `${key}_chunk_${chunkIndex}`,
        value.slice(i, i + CHUNK_SIZE),
      );
      chunkIndex++;
    }
  },

  removeItem: async (key: string) => {
    if (Platform.OS === "web") return localStorage.removeItem(key);

    let index = 0;
    while (true) {
      const existing = await SecureStore.getItemAsync(`${key}_chunk_${index}`);
      if (existing === null) break;
      await SecureStore.deleteItemAsync(`${key}_chunk_${index}`);
      index++;
    }
  },
};

const supabaseUrl = EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
