import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ShieldCheck, TrendingUp, Info } from "lucide-react";

const notifications = [
  {
    id: '1',
    title: 'KYC Verified',
    description: 'Your account has been fully verified. You can now start investing!',
    type: 'success',
    icon: ShieldCheck,
    time: '2 hours ago',
  },
  {
    id: '2',
    title: 'New Fund Added',
    description: 'BNI-AM Indeks MSW (Equity Fund) is now available in the catalog.',
    type: 'info',
    icon: TrendingUp,
    time: '1 day ago',
  },
  {
    id: '3',
    title: 'System Maintenance',
    description: 'The platform will be undergoing maintenance on Sunday at 02:00 AM.',
    type: 'warning',
    icon: Info,
    time: '2 days ago',
  },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with your account activity and market news.</p>
      </header>

      <div className="space-y-4">
        {notifications.map((n) => (
          <Card key={n.id} className="border-border/50 shadow-sm hover:bg-accent/5 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    n.type === 'success' ? 'bg-green-100 text-green-600' :
                    n.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <n.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{n.title}</CardTitle>
                </div>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{n.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium">No new notifications</h3>
          <p className="text-sm text-muted-foreground">We&apos;ll let you know when something important happens.</p>
        </div>
      )}
    </div>
  );
}
