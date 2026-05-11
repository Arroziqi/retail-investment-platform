'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Bookmark, 
  User 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Explore',
    href: '/funds',
    icon: TrendingUp,
  },
  {
    name: 'Watch',
    href: '/watchlist',
    icon: Bookmark,
  },
  {
    name: 'Profile',
    href: '/settings',
    icon: User,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background/90 px-2 backdrop-blur-lg md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "h-6 w-6",
              isActive && "fill-primary/20"
            )} />
            <span className="text-[10px] font-medium uppercase tracking-tighter">
              {item.name}
            </span>
            {isActive && (
              <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
