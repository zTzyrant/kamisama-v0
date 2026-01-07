import { A } from '@solidjs/router';
import { createSignal, Show, For } from 'solid-js';
import { Title } from '@solidjs/meta';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-solid';
import Button from '~/components/ui/Button';

// Admin Sidebar Items
const SIDEBAR_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Articles', href: '/dashboard/articles', icon: FileText },
  { label: 'Media Library', href: '/dashboard/media', icon: ImageIcon },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings }
];

export default function DashboardLayout(props: { children?: any }) {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true);

  // Toggle for mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen());

  return (
    <div class="min-h-screen bg-background text-foreground font-inter flex transition-colors duration-300">
      <Title>DAKOPI DASHBOARD</Title>

      {/* Sidebar */}
      <aside
        class={`fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-surface border-r-2 border-accent transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen()
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div class="h-full flex flex-col">
          {/* Header */}
          <div class="h-20 border-b-2 border-accent flex items-center px-6 justify-between">
            <div class="flex items-center gap-2">
              <span class="bg-primary text-black px-2 py-0.5 font-oswald font-black text-xl italic tracking-tighter">
                DAKOPI
              </span>
              <span class="font-oswald font-black text-xl text-foreground">
                ADMIN
              </span>
            </div>
            <button onClick={toggleSidebar} class="lg:hidden text-foreground">
              <X size={24} />
            </button>
          </div>

          {/* Nav */}
          <nav class="flex-1 p-6 space-y-2 overflow-y-auto">
            <For each={SIDEBAR_ITEMS}>
              {(item) => (
                <A
                  href={item.href}
                  class="flex items-center gap-3 px-4 py-3 font-oswald font-bold text-sm uppercase text-foreground/60 hover:text-foreground hover:bg-background border-2 border-transparent hover:border-accent transition-all group"
                  activeClass="bg-primary! text-black! border-black!"
                  end={item.href === '/dashboard'} // Only exact match for Overview
                >
                  <item.icon
                    size={18}
                    class="group-hover:scale-110 transition-transform"
                  />
                  {item.label}
                </A>
              )}
            </For>

            <div class="pt-8 mt-8 border-t-2 border-accent">
              <A href="/dashboard/articles/create" class="block w-full">
                <Button
                  variant="primary"
                  size="lg"
                  class="w-full justify-center"
                >
                  + New Article
                </Button>
              </A>
            </div>
          </nav>

          {/* Footer */}
          <div class="p-6 border-t-2 border-accent">
            <button class="flex items-center gap-3 w-full px-4 py-3 font-oswald font-bold text-sm uppercase text-red-500 hover:bg-red-500/10 border-2 border-transparent transition-all">
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div class="flex-1 flex flex-col min-h-screen relative">
        {/* Mobile Header */}
        <header class="lg:hidden h-20 border-b-2 border-accent bg-background flex items-center px-6 justify-between sticky top-0 z-30">
          <div class="flex items-center gap-2">
            <span class="font-oswald font-black text-xl text-foreground">
              DASHBOARD
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            class="text-foreground p-2 border-2 border-accent/20"
          >
            <Menu size={24} />
          </button>
        </header>

        <main class="flex-1 bg-background p-6 lg:p-12 overflow-x-hidden">
          {props.children}
        </main>
      </div>

      {/* Overlay for mobile */}
      <Show when={isSidebarOpen()}>
        <div
          class="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      </Show>
    </div>
  );
}
