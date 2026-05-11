'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/lib/stores/user-store';

import { 
  LayoutDashboard, 
  TrendingUp, 
  Bookmark, 
  Settings, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Mutual Funds',
    href: '/funds',
    icon: TrendingUp,
  },
  {
    name: 'Watchlist',
    href: '/watchlist',
    icon: Bookmark,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { kycStatus } = useUserStore();


  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight text-sidebar-foreground">Arroziqi</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 group",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60"
                )} />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-sidebar-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/30 rounded-xl p-4">
          <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">
            Compliance Status
          </p>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              kycStatus === 'Verified' ? "bg-green-500" : 
              kycStatus === 'Pending' ? "bg-yellow-500" : "bg-destructive"
            )} />
            <span className="text-sm font-medium text-sidebar-foreground">
              KYC {kycStatus}
            </span>
          </div>

        </div>
      </div>
    </aside>
  );
}
