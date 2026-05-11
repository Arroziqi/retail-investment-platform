import { useWatchlistStore } from '@/store/useWatchlistStore';
import { WatchlistItem } from '@/types/watchlist';

describe('useWatchlistStore', () => {
  beforeEach(() => {
    useWatchlistStore.setState({ items: [], isLoading: false, error: null });
  });

  it('should add an item to the watchlist', () => {
    const item: WatchlistItem = {
      id: 'w1',
      userId: 'u1',
      assetId: 'f1',
      assetType: 'Fund',
      addedAt: new Date().toISOString(),
      assetName: 'Test Fund',
      assetCategory: 'Equity',
    };

    useWatchlistStore.getState().addItem(item);
    expect(useWatchlistStore.getState().items).toHaveLength(1);
    expect(useWatchlistStore.getState().items[0].assetId).toBe('f1');
  });

  it('should not add more than 20 items', () => {
    const store = useWatchlistStore.getState();
    for (let i = 0; i < 25; i++) {
      store.addItem({
        id: `w${i}`,
        userId: 'u1',
        assetId: `f${i}`,
        assetType: 'Fund',
        addedAt: new Date().toISOString(),
        assetName: `Fund ${i}`,
        assetCategory: 'Equity',
      });
    }
    expect(useWatchlistStore.getState().items).toHaveLength(20);
  });

  it('should remove an item from the watchlist', () => {
    const store = useWatchlistStore.getState();
    store.addItem({
      id: 'w1',
      userId: 'u1',
      assetId: 'f1',
      assetType: 'Fund',
      addedAt: new Date().toISOString(),
      assetName: 'Test Fund',
      assetCategory: 'Equity',
    });

    store.removeItem('w1');
    expect(useWatchlistStore.getState().items).toHaveLength(0);
  });
});
