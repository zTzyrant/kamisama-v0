import { useLocation } from '@solidjs/router';
import { Moon, Sun, User, Zap, Menu } from 'lucide-solid';
import { Show } from 'solid-js';
import { currentTheme, cycleTheme } from '~/lib/theme';
import siteData from '~/data/site.json';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar(props: NavbarProps) {
  const location = useLocation();
  const theme = currentTheme;

  // Determine Page Title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return `${siteData.dashboardTitle} // Overview`;
    if (path.includes('/dashboard/articles/create'))
      return `${siteData.dashboardTitle} // Articles // Create`;
    if (path.includes('/dashboard/articles'))
      return `${siteData.dashboardTitle} // Articles`;
    if (path.includes('/dashboard/settings'))
      return `${siteData.dashboardTitle} // Settings`;
    if (path.includes('/dashboard/media'))
      return `${siteData.dashboardTitle} // Media`;
    return siteData.dashboardTitle;
  };

  return (
    <header class="h-20 flex items-center justify-between px-4 md:px-8 border-b-2 border-accent bg-background sticky top-0 z-10 w-full transition-colors">
      {/* Left: Hamburger & Page Title */}
      <div class="flex items-center gap-4">
        <button
          onClick={props.onToggleSidebar}
          class="md:hidden p-2 text-foreground hover:bg-accent/10 transition-colors"
        >
          <Menu size={24} />
        </button>

        <div class="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 truncate max-w-[200px] md:max-w-none">
          {getPageTitle()}
        </div>
      </div>

      {/* Right: Actions */}
      <div class="flex items-center gap-4 md:gap-6">
        {/* Theme Toggle */}
        <button
          onClick={cycleTheme}
          class="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border-2 border-accent hover:bg-accent/10 transition-colors text-foreground"
          title={`Current Theme: ${theme()}`}
        >
          <Show
            when={theme() === 'light'}
            fallback={
              <Show when={theme() === 'dark'} fallback={<Zap size={16} />}>
                <Moon size={16} />
              </Show>
            }
          >
            <Sun size={16} />
          </Show>
        </button>

        {/* User Profile */}
        <div class="flex items-center gap-3 pl-4 md:pl-6 border-l-2 border-accent">
          <div class="text-right hidden md:block">
            <div class="text-xs font-bold uppercase text-foreground">
              {siteData.dashboardUser}
            </div>
            <div class="text-[10px] font-mono text-neutral-500 uppercase">
              {siteData.dashboardRole}
            </div>
          </div>
          <div class="w-8 h-8 md:w-10 md:h-10 bg-primary border-2 border-black flex items-center justify-center overflow-hidden">
            {/* Placeholder Avatar or User Icon */}
            <User size={18} class="text-black" />
          </div>
        </div>
      </div>
    </header>
  );
}
