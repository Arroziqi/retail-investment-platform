"use client";


import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { watchlistService } from "@/lib/services/watchlist-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Search, TrendingUp, EyeOff } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function WatchlistPage() {
  const { items, setItems } = useWatchlistStore();
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const data = await watchlistService.getWatchlist();
      setItems(data);
      return data;
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => watchlistService.removeFromWatchlist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      toast.success("Removed from watchlist");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Watchlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-muted/30 rounded-3xl border border-dashed border-border">
        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
          <EyeOff className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your watchlist is empty</h1>
        <p className="text-muted-foreground max-w-sm mb-8">
          Start adding stocks and mutual funds to track their performance and never miss an investment opportunity.
        </p>
        <Button size="lg" className="rounded-full px-8" render={<Link href="/catalog" />}>
          <Search className="mr-2 h-4 w-4" />
          Explore Assets
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Watchlist</h1>
          <p className="text-muted-foreground">{items.length} of 20 items saved</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
          <TrendingUp className="h-4 w-4" />
          Real-time tracking
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-md border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Badge variant="secondary" className="font-semibold uppercase tracking-wider text-[10px]">
                    {item.assetType}
                  </Badge>
                  <CardTitle className="text-lg line-clamp-1">{item.assetName}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                  onClick={() => removeMutation.mutate(item.id)}
                  disabled={removeMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-muted-foreground">
                  Added on {new Date(item.addedAt).toLocaleDateString()}
                </div>
                <Button variant="outline" size="sm" className="rounded-full text-xs h-8 px-4" render={<Link href={`/catalog/${item.assetId}`} />}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
