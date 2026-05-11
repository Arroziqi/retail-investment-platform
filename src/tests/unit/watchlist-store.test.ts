import { renderHook, act } from '@testing-library/react'
import { useWatchlistStore } from '@/lib/stores/watchlist-store'

describe('useWatchlistStore', () => {
  beforeEach(() => {
    act(() => {
      useWatchlistStore.getState().setItems([])
    })
  })

  it('should add an item to the watchlist', () => {
    const { result } = renderHook(() => useWatchlistStore())
    const mockItem = {
      id: 'w1',
      userId: 'u1',
      assetId: 'a1',
      assetType: 'Fund' as const,
      addedAt: new Date().toISOString(),
      assetName: 'Test Fund',
      assetCategory: 'Equity',
    }

    act(() => {
      result.current.addItem(mockItem)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].assetId).toBe('a1')
  })

  it('should not exceed 20 items', () => {
    const { result } = renderHook(() => useWatchlistStore())
    
    act(() => {
      for (let i = 0; i < 25; i++) {
        result.current.addItem({
          id: `w${i}`,
          userId: 'u1',
          assetId: `a${i}`,
          assetType: 'Fund',
          addedAt: new Date().toISOString(),
          assetName: `Fund ${i}`,
          assetCategory: 'Equity',
        })
      }
    })

    expect(result.current.items).toHaveLength(20)
  })

  it('should remove an item by assetId', () => {
    const { result } = renderHook(() => useWatchlistStore())
    
    act(() => {
      result.current.addItem({
        id: 'w1',
        userId: 'u1',
        assetId: 'a1',
        assetType: 'Fund',
        addedAt: new Date().toISOString(),
        assetName: 'Test Fund',
        assetCategory: 'Equity',
      })
    })

    act(() => {
      result.current.removeItem('a1')
    })

    expect(result.current.items).toHaveLength(0)
  })
})
