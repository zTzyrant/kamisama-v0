import { createSignal, Show, createEffect, onCleanup } from "solid-js";
import { X, Sun, Moon, Monitor, Skull } from "lucide-solid";
import { getTheme, setTheme } from "~/lib/theme";
import clsx from "clsx";

interface ThemeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ThemeModal(props: ThemeModalProps) {
    const [activeTheme, setActiveTheme] = createSignal(getTheme() || 'system');

    // Sync with actual theme on mount/open
    createEffect(() => {
        if (typeof window !== 'undefined') {
            if (props.isOpen) {
                setActiveTheme(getTheme() || 'system');
                // Lock scroll
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });

    onCleanup(() => {
        if (typeof window !== 'undefined') {
            document.body.style.overflow = '';
        }
    });

    const handleSetTheme = (theme: 'light' | 'dark' | 'rebel' | 'system') => {
        setTheme(theme);
        setActiveTheme(theme);
        // Optional: Close on select? Or let user admire the change.
        // User requested "prefer tema apa", usually implies selection.
    };

    return (
        <Show when={props.isOpen}>
            <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">

                {/* Modal Content */}
                <div class="w-full max-w-4xl bg-background border-4 border-accent shadow-[16px_16px_0px_0px_rgba(255,255,255,0.1)] relative flex flex-col p-8 md:p-12">

                    {/* Close Button */}
                    <button
                        onClick={props.onClose}
                        class="absolute top-4 right-4 p-2 bg-accent/10 hover:bg-primary hover:text-black transition-colors border-2 border-transparent hover:border-black"
                    >
                        <X size={32} />
                    </button>

                    {/* Header */}
                    <h2 class="font-oswald font-black text-5xl md:text-7xl uppercase italic text-center mb-16 text-foreground tracking-tighter">
                        What is your <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Vibe?</span>
                    </h2>

                    {/* Options Grid */}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Dark */}
                        <button
                            onClick={() => handleSetTheme('dark')}
                            class={clsx(
                                "group relative aspect-[4/5] border-4 border-accent flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_currentColor]",
                                activeTheme() === 'dark' ? "bg-black text-white border-primary shadow-[8px_8px_0px_0px_rgba(var(--primary),0.5)]" : "bg-neutral-900 text-neutral-400 hover:text-white"
                            )}
                        >
                            <Moon size={64} class={clsx("transition-transform duration-500 group-hover:-rotate-12", activeTheme() === 'dark' ? "animate-pulse text-primary" : "")} />
                            <span class="font-oswald font-bold text-3xl uppercase tracking-widest">Dark</span>
                        </button>

                        {/* Light */}
                        <button
                            onClick={() => handleSetTheme('light')}
                            class={clsx(
                                "group relative aspect-[4/5] border-4 border-accent flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_currentColor]",
                                activeTheme() === 'light' ? "bg-white text-black border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]" : "bg-black text-white hover:bg-neutral-900"
                            )}
                        >
                            <Sun size={64} class={clsx("transition-transform duration-500 group-hover:rotate-90", activeTheme() === 'light' ? "animate-pulse" : "")} />
                            <span class="font-oswald font-bold text-3xl uppercase tracking-widest">Light</span>
                        </button>

                        {/* Rebels (Red) */}
                        <button
                            onClick={() => handleSetTheme('rebel')}
                            class={clsx(
                                "group relative aspect-[4/5] border-4 border-accent flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_currentColor]",
                                activeTheme() === 'rebel' ? "bg-[#ff3333] text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]" : "bg-black text-white hover:bg-neutral-900"
                            )}
                        >
                            <Skull size={64} class={clsx("transition-transform duration-500 group-hover:scale-110", activeTheme() === 'rebel' ? "animate-bounce" : "")} />
                            <span class="font-oswald font-bold text-3xl uppercase tracking-widest">Rebels</span>
                        </button>

                    </div>

                    <div class="mt-12 text-center">
                        <p class="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                            Select a theme to customize your experience in the Dakota Admin.
                        </p>
                    </div>
                </div>
            </div>
        </Show>
    );
}
