'use client';

import { Bell, Search, User, LogOut, LayoutGrid } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/lib/stores/user-store';
import { clearAuthSession } from '@/lib/auth/actions';
import { useState } from 'react';
import { cn } from '@/lib/utils';



const routeNames: Record<string, string> = {
  '/dashboard': 'Overview',
  '/funds': 'Mutual Funds',
  '/watchlist': 'Watchlist',
  '/settings': 'Settings',
  '/settings/profile': 'Profile Settings',
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, kycStatus, logout } = useUserStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const pageTitle = routeNames[pathname] || 'Dashboard';

  const handleSignOut = async () => {
    logout();
    await clearAuthSession();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold md:text-xl">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center relative md:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search funds..."
            className="h-9 w-64 rounded-md border border-input bg-background pl-9 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <Link href="/notifications" className="relative rounded-full p-2 hover:bg-accent transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Link>

        <div className="relative">
          <button 
            className="flex items-center gap-2 rounded-full border p-1 pr-3 hover:bg-accent transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden flex-col items-start md:flex text-left">
              <span className="text-xs font-semibold leading-none">{user?.fullName || 'Investor'}</span>
              <div className="mt-1 flex items-center gap-1">
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  kycStatus === 'Verified' ? "bg-green-500" : 
                  kycStatus === 'Pending' ? "bg-yellow-500" : "bg-destructive"
                )} />
                <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">{kycStatus}</span>
              </div>
            </div>
          </button>

          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md z-50 animate-in fade-in zoom-in duration-200">
                <Link 
                  href="/settings/profile" 
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                  onClick={() => setShowDropdown(false)}
                >
                  <User className="h-4 w-4" />
                  Profile Settings
                </Link>
                <Link 
                  href="/catalog" 
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                  onClick={() => setShowDropdown(false)}
                >
                  <LayoutGrid className="h-4 w-4" />
                  Fund Catalog
                </Link>
                <div className="my-1 h-px bg-muted" />
                <button 
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
