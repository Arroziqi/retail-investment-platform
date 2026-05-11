import { WatchlistItem } from '@/types/watchlist';

export const watchlistService = {
  async getWatchlist(): Promise<WatchlistItem[]> {
    const response = await fetch('/api/watchlist');
    if (!response.ok) {
      throw new Error('Failed to fetch watchlist');
    }
    return response.json();
  },

  async addToWatchlist(item: Omit<WatchlistItem, 'id' | 'addedAt'>): Promise<WatchlistItem> {
    const response = await fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add to watchlist');
    }
    
    return response.json();
  },

  async removeFromWatchlist(id: string): Promise<void> {
    const response = await fetch(`/api/watchlist/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove from watchlist');
    }
  }
};
