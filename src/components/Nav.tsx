import { A } from '@solidjs/router';
import { createSignal, createEffect, onCleanup, Show } from 'solid-js';
import { Menu, X, Sun, Moon, Skull, Monitor } from 'lucide-solid';
import ThemeModal from '~/components/ui/ThemeModal';
import { currentTheme } from '~/lib/theme';
import siteData from '~/data/site.json';

export default function Nav() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [isThemeOpen, setIsThemeOpen] = createSignal(false);
  const theme = currentTheme;

  const toggle = () => setIsOpen(!isOpen());

  createEffect(() => {
    if (isOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  onCleanup(() => {
    document.body.style.overflow = '';
  });

  return (
    <>
      <nav class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 mix-blend-difference text-white">
        <div class="text-2xl font-bold tracking-tighter uppercase font-oswald text-white">
          <A href="/">{siteData.navBrand}</A>
        </div>

        {/* Desktop Menu */}
        <ul class="hidden md:flex gap-12 font-medium tracking-wide text-xs uppercase text-white items-center">
          <li>
            <A href="/" class="hover:text-primary transition-colors">
              Work
            </A>
          </li>
          <li>
            <button
              onClick={() => setIsThemeOpen(true)}
              class="w-10 h-10 flex items-center justify-center border-2 border-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              title={`Change Theme (Current: ${theme()})`}
            >
              <Show
                when={theme() === 'light'}
                fallback={
                  <Show
                    when={theme() === 'dark'}
                    fallback={
                      <Show
                        when={theme() === 'rebel'}
                        fallback={<Monitor size={20} />}
                      >
                        <Skull size={20} />
                      </Show>
                    }
                  >
                    <Moon size={20} />
                  </Show>
                }
              >
                <Sun size={20} />
              </Show>
            </button>
          </li>
          <li>
            <A href="/about" class="hover:text-primary transition-colors">
              Studio
            </A>
          </li>
          <li>
            <A href="/blog" class="hover:text-primary transition-colors">
              Blog
            </A>
          </li>
          <li>
            <A href="/contact" class="hover:text-primary transition-colors">
              Contact
            </A>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggle}
          class="md:hidden flex items-center gap-2 bg-primary text-black px-4 py-2 font-bold uppercase text-xs tracking-wider hover:bg-white transition-colors cursor-pointer z-50"
        >
          <span>{isOpen() ? 'Close' : 'Menu'}</span>
          {isOpen() ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        class={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isOpen()
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
      >
        <nav class="flex flex-col gap-8 text-center">
          <A
            href="/"
            onClick={toggle}
            class="text-4xl font-oswald uppercase text-white hover:text-primary transition-colors transform hover:scale-105 duration-300"
          >
            Work
          </A>
          <button
            onClick={() => {
              toggle();
              setIsThemeOpen(true);
            }}
            class="text-4xl font-oswald uppercase text-white hover:text-primary transition-colors transform hover:scale-105 duration-300"
          >
            Image Changer
          </button>
          <A
            href="/about"
            onClick={toggle}
            class="text-4xl font-oswald uppercase text-white hover:text-primary transition-colors transform hover:scale-105 duration-300"
          >
            Studio
          </A>
          <A
            href="/blog"
            onClick={toggle}
            class="text-4xl font-oswald uppercase text-white hover:text-primary transition-colors transform hover:scale-105 duration-300"
          >
            Blog
          </A>
          <A
            href="/contact"
            onClick={toggle}
            class="text-4xl font-oswald uppercase text-white hover:text-primary transition-colors transform hover:scale-105 duration-300"
          >
            Contact
          </A>
        </nav>
      </div>

      <ThemeModal
        isOpen={isThemeOpen()}
        onClose={() => setIsThemeOpen(false)}
      />
    </>
  );
}
