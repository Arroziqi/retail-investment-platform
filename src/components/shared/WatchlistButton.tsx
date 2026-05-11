'use client';

import { useState } from 'react';
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useWatchlistStore } from '@/lib/stores/watchlist-store';
import { watchlistService } from '@/services/watchlistService';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface WatchlistButtonProps {
  assetId: string;
  assetType: string;
  assetName: string;
  assetCategory: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function WatchlistButton({
  assetId,
  assetType,
  assetName,
  assetCategory,
  variant = 'outline',
  size = 'sm',
  className,
}: WatchlistButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const { items, addItem, removeItem } = useWatchlistStore();
  const { track } = useAnalytics();
  
  const isWatched = items.some((item) => item.assetId === assetId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPending) return;

    setIsPending(true);
    try {
      if (isWatched) {
        const itemToRemove = items.find(i => i.assetId === assetId);
        if (itemToRemove) {
          await watchlistService.removeFromWatchlist(itemToRemove.id);
          removeItem(itemToRemove.id);
          track({ type: 'WATCHLIST_ACTION', payload: { action: 'remove', assetId } });
          toast.success(`${assetName} removed from watchlist`);
        }
      } else {
        if (items.length >= 20) {
          toast.error('Watchlist limit reached', {
            description: 'You can only have up to 20 items in your watchlist.',
          });
          return;
        }

        const newItem = await watchlistService.addToWatchlist({
          userId: 'u1', // Default mock user
          assetId,
          assetType,
          assetName,
          assetCategory,
        });
        addItem(newItem);
        track({ type: 'WATCHLIST_ACTION', payload: { action: 'add', assetId } });
        toast.success(`${assetName} added to watchlist`);
      }
    } catch {
      toast.error('Failed to update watchlist');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "transition-all duration-200",
        isWatched && "text-primary border-primary/50 bg-primary/5",
        className
      )}
      onClick={handleToggle}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isWatched ? (
        <BookmarkCheck className="h-4 w-4 fill-primary" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {size !== 'icon' && (
        <span className="ml-2">{isWatched ? 'Watched' : 'Watchlist'}</span>
      )}
    </Button>
  );
}
