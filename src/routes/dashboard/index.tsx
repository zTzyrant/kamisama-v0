import { Title } from '@solidjs/meta';
import { A } from '@solidjs/router';
import { FileText, Eye, MessageSquare, TrendingUp, Clock } from 'lucide-solid';

const STATS = [
  {
    label: 'Total Articles',
    value: '42',
    icon: FileText,
    change: '+12% this month'
  },
  {
    label: 'Total Views',
    value: '128.5K',
    icon: Eye,
    change: '+5.4% this month'
  },
  {
    label: 'Comments',
    value: '1,248',
    icon: MessageSquare,
    change: '+2.1% this month'
  },
  {
    label: 'Avg. Read Time',
    value: '4m 32s',
    icon: Clock,
    change: '-12s this month'
  }
];

const RECENT_ACTIVITY = [
  {
    action: 'New comment on "The Future of Web Simplicity"',
    time: '2 mins ago',
    user: 'Sarah L.'
  },
  {
    action: 'Article "Brutalist Design Patterns" published',
    time: '4 hours ago',
    user: 'Alex C.'
  },
  {
    action: 'New subscriber joined the newsletter',
    time: '5 hours ago',
    user: 'john@example.com'
  },
  { action: 'System maintenance completed', time: '1 day ago', user: 'System' }
];

export default function DashboardHome() {
  return (
    <div class="space-y-12">
      <Title>Dashboard Overview | DAKOPI</Title>

      {/* Header */}
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="font-oswald font-black text-4xl lg:text-6xl uppercase italic text-foreground leading-[0.85]">
            Welcome Back, <span class="text-primary">Admin</span>
          </h1>
          <p class="font-oswald font-bold text-foreground/40 uppercase mt-2">
            Here's what's happening with your content today.
          </p>
        </div>
        <div class="flex gap-2">
          <button class="bg-foreground text-background font-oswald font-bold uppercase px-6 py-2 hover:bg-primary hover:text-black transition-colors">
            View Analytics
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div class="bg-surface border-2 border-accent p-6 group hover:border-primary transition-colors">
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 bg-background border-2 border-accent text-foreground group-hover:bg-primary group-hover:border-black group-hover:text-black transition-colors">
                <stat.icon size={24} />
              </div>
              <span class="font-oswald font-bold text-[10px] text-green-500 bg-green-500/10 px-2 py-1 uppercase">
                {stat.change}
              </span>
            </div>
            <h3 class="font-oswald font-black text-4xl text-foreground mb-1">
              {stat.value}
            </h3>
            <p class="font-oswald font-bold text-xs text-foreground/60 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Activity & Quick Links */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div class="lg:col-span-2 border-2 border-accent bg-background p-8">
          <h2 class="font-oswald font-black text-2xl uppercase italic text-foreground mb-8 flex items-center gap-2">
            <TrendingUp size={24} class="text-primary" />
            Recent Activity
          </h2>
          <div class="space-y-6">
            {RECENT_ACTIVITY.map((item, i) => (
              <div class="flex items-start gap-4 pb-6 border-b border-accent/20 last:border-0 last:pb-0">
                <span class="font-oswald font-black text-sm text-foreground/20">
                  0{i + 1}
                </span>
                <div>
                  <p class="font-oswald font-bold text-sm text-foreground uppercase mb-1">
                    {item.action}
                  </p>
                  <p class="font-oswald font-bold text-xs text-foreground/40 uppercase">
                    {item.time} • {item.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div class="border-2 border-accent bg-surface p-8">
          <h2 class="font-oswald font-black text-2xl uppercase italic text-foreground mb-8">
            System Status
          </h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-background border-2 border-accent">
              <span class="font-oswald font-bold text-xs uppercase text-foreground">
                Database
              </span>
              <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <div class="flex items-center justify-between p-4 bg-background border-2 border-accent">
              <span class="font-oswald font-bold text-xs uppercase text-foreground">
                API Gateway
              </span>
              <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <div class="flex items-center justify-between p-4 bg-background border-2 border-accent">
              <span class="font-oswald font-bold text-xs uppercase text-foreground">
                Storage
              </span>
              <span class="w-3 h-3 bg-yellow-500 rounded-full"></span>
            </div>
          </div>

          <div class="mt-8 pt-8 border-t-2 border-accent/20">
            <p class="font-oswald font-bold text-xs text-foreground/40 uppercase mb-4">
              Storage Usage
            </p>
            <div class="w-full bg-background border-2 border-accent h-4 p-0.5">
              <div class="h-full bg-primary w-[75%]"></div>
            </div>
            <div class="flex justify-between mt-2 font-oswald font-bold text-[10px] text-foreground/60 uppercase">
              <span>750MB Used</span>
              <span>1GB Total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
