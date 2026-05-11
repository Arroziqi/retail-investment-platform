import { apiClient } from "@/lib/api-client";
import { WatchlistItem } from "@/types/watchlist";

export const watchlistService = {
  getWatchlist: () => apiClient<WatchlistItem[]>("/api/watchlist"),
  
  addToWatchlist: (assetId: string, assetType: 'Fund' | 'Stock', assetName: string, assetCategory?: string) => 
    apiClient<WatchlistItem>("/api/watchlist", {
      body: { assetId, assetType, assetName, assetCategory },
    }),
    
  removeFromWatchlist: (id: string) => 
    apiClient<WatchlistItem>(`/api/watchlist/${id}`, {
      method: "DELETE",
    }),
};
