import { A } from '@solidjs/router';
import Button from '~/components/ui/Button';
import { Search, Moon, Sun, Zap, Menu, X } from 'lucide-solid';
import { currentTheme, cycleTheme } from '~/lib/theme';
import { Show, createSignal, For } from 'solid-js';
import { Portal } from 'solid-js/web';

const NAV_ITEMS = [
  { label: 'Articles', href: '/blog' },
  { label: 'Projects', href: '#' },
  { label: 'Community', href: '#' }
];

export default function BlogHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen());

  return (
    <header class="border-b-2 border-accent sticky top-0 bg-background/90 backdrop-blur-sm z-50 transition-colors duration-300 mix-blend-difference">
      <div class="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-8 py-4 relative">
        {/* Logo */}
        <div class="flex items-center gap-2 relative z-50">
          <span class="bg-foreground text-background px-2 py-0.5 font-oswald font-black text-2xl italic tracking-tighter">
            DAKOPI
          </span>
          <span class="font-oswald font-black text-2xl text-foreground">
            BLOG
          </span>
        </div>

        {/* Desktop Nav */}
        <nav class="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 font-oswald font-bold text-xs uppercase tracking-widest text-foreground/80">
          <For each={NAV_ITEMS}>
            {(item) => (
              <A
                href={item.href}
                class="hover:text-primary transition-colors hover:underline decoration-2 decoration-primary underline-offset-4"
              >
                {item.label}
              </A>
            )}
          </For>
        </nav>

        {/* Desktop Actions */}
        <div class="hidden lg:flex items-center gap-4">
          <div class="relative hidden sm:block">
            <input
              type="text"
              placeholder="SEARCH..."
              class="bg-accent/10 border-2 border-accent/20 px-4 py-2 text-[10px] font-oswald font-bold w-64 outline-none focus:border-primary text-foreground placeholder:text-foreground/40 transition-colors"
            />
            <Search
              size={14}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40"
            />
          </div>

          <button
            onClick={cycleTheme}
            class="w-8 h-8 flex items-center justify-center border-2 border-accent hover:bg-primary hover:text-black hover:border-primary transition-all active:scale-95 group relative overflow-hidden"
            title={`Current theme: ${currentTheme()}`}
          >
            <div class="relative z-10">
              <Show when={currentTheme() === 'light'}>
                <Sun size={16} class="text-foreground group-hover:text-black" />
              </Show>
              <Show when={currentTheme() === 'dark'}>
                <Moon
                  size={16}
                  class="text-foreground group-hover:text-black"
                />
              </Show>
              <Show when={currentTheme() === 'rebel'}>
                <Zap size={16} class="text-foreground group-hover:text-black" />
              </Show>
            </div>
          </button>

          <Button
            variant="black"
            size="sm"
            class="bg-foreground! text-background! hover:bg-primary! hover:text-black! transition-colors"
          >
            Sign In
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleSidebar}
          class="lg:hidden relative z-60 p-2 text-foreground hover:text-primary transition-colors"
        >
          <Show when={!isSidebarOpen()} fallback={<X size={24} />}>
            <Menu size={24} />
          </Show>
        </button>

        {/* Mobile Sidebar */}
        <Portal>
          <div
            class={`fixed inset-0 z-50 bg-background/95 backdrop-blur-xl mix-blend-normal flex flex-col pt-24 px-8 transition-transform duration-300 ease-in-out lg:hidden ${
              isSidebarOpen() ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Sidebar Content */}
            <nav class="flex flex-col gap-6 font-oswald font-black text-3xl uppercase tracking-tighter mb-8">
              <For each={NAV_ITEMS}>
                {(item) => (
                  <A
                    href={item.href}
                    class="text-foreground hover:text-primary transition-colors hover:translate-x-4 duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.label}
                  </A>
                )}
              </For>
            </nav>

            <div class="flex flex-col gap-6 mt-auto mb-12">
              <div class="relative">
                <input
                  type="text"
                  placeholder="SEARCH..."
                  class="w-full bg-accent/10 border-2 border-accent/20 px-4 py-3 text-xs font-oswald font-bold outline-none focus:border-primary text-foreground placeholder:text-foreground/40 transition-colors"
                />
                <Search
                  size={16}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40"
                />
              </div>

              <div class="flex items-center justify-between">
                <span class="font-oswald font-bold text-sm text-foreground/60 uppercase">
                  Theme
                </span>
                <button
                  onClick={cycleTheme}
                  class="flex items-center gap-2 border-2 border-accent px-4 py-2 hover:bg-primary hover:text-black hover:border-primary transition-all group"
                >
                  <span class="font-oswald font-bold text-xs uppercase text-foreground group-hover:text-black">
                    {currentTheme()}
                  </span>
                  <Show when={currentTheme() === 'light'}>
                    <Sun
                      size={14}
                      class="text-foreground group-hover:text-black"
                    />
                  </Show>
                  <Show when={currentTheme() === 'dark'}>
                    <Moon
                      size={14}
                      class="text-foreground group-hover:text-black"
                    />
                  </Show>
                  <Show when={currentTheme() === 'rebel'}>
                    <Zap
                      size={14}
                      class="text-foreground group-hover:text-black"
                    />
                  </Show>
                </button>
              </div>

              <Button
                variant="black"
                size="lg"
                class="w-full bg-foreground! text-background! hover:bg-primary! hover:text-black! transition-colors justify-center"
              >
                Sign In
              </Button>
            </div>

            {/* Close Button overlay or absolute positioned inside sidebar if needed, but the toggle button is on header. 
                 Wait, the toggle button is on the Header (behind the sidebar if sidebar is full screen).
                 We need a close button INSIDE the sidebar because the header button might be covered or z-index problematic if sidebar is in Portal (on top of everything).
                 Let's add a Close Button inside the sidebar top right.
             */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              class="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors"
            >
              <X size={32} />
            </button>
          </div>
        </Portal>
      </div>
    </header>
  );
}
