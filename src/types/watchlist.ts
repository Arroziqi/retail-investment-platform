export interface WatchlistItem {
  id: string;
  userId: string;
  assetId: string;
  assetType: string;
  addedAt: string;
  assetName: string;
  assetCategory: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

export interface Watchlist {
  id: string;
  userId: string;
  items: WatchlistItem[];
  updatedAt: string;
}
