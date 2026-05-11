import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WatchlistItem } from "@/types/watchlist";

interface WatchlistState {
  items: WatchlistItem[];
  isLoading: boolean;
  error: string | null;
  setItems: (items: WatchlistItem[]) => void;
  addItem: (item: WatchlistItem) => void;
  removeItem: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set) => ({
      items: [],
      isLoading: false,
      error: null,
      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => {
        if (state.items.length >= 20) return state;
        if (state.items.some(i => i.assetId === item.assetId)) return state;
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id && item.assetId !== id),
      })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "watchlist-storage",
    }
  )
);
