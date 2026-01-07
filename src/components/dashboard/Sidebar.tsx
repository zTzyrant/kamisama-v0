import { A } from "@solidjs/router";
import { LayoutGrid, FileText, Image as ImageIcon, Settings, LogOut, Plus, X } from "lucide-solid";
import { Show, createEffect, onCleanup } from "solid-js";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar(props: SidebarProps) {
    // Scroll lock effect
    createEffect(() => {
        if (typeof document !== 'undefined') {
            if (props.isOpen) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        }
    });

    onCleanup(() => {
        if (typeof document !== 'undefined') {
            document.body.classList.remove('overflow-hidden');
        }
    });

    return (
        <>
            {/* Mobile Overlay (Optional now since sidebar is full width, but good to keep for z-index separation or just remove if fully opaque) */}
            <Show when={props.isOpen}>
                <div
                    class="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={props.onClose}
                ></div>
            </Show>

            {/* Sidebar */}
            {/* Changed w-64 to w-full for mobile, kept md:w-64 for desktop */}
            <aside
                class={`fixed inset-y-0 left-0 z-40 w-full md:w-64 bg-background border-r-2 border-accent flex flex-col font-mono transition-transform duration-300 ease-in-out md:translate-x-0 ${props.isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div class="h-20 flex items-center justify-between px-6 border-b-2 border-accent shrink-0">
                    <h1 class="font-oswald text-2xl font-bold tracking-wider italic text-foreground">
                        <span class="bg-primary text-black px-1 mr-1">DAKOTA</span> ADMIN
                    </h1>
                    {/* Mobile Close Button */}
                    <button onClick={props.onClose} class="md:hidden text-foreground hover:text-red-500">
                        <X size={24} />
                    </button>
                </div>

                <nav class="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
                    <A
                        href="/dashboard"
                        end
                        onClick={props.onClose}
                        activeClass="bg-primary text-black shadow-[4px_4px_0px_0px_#000000] border-2 border-black transform translate-x-1"
                        inactiveClass="text-neutral-500 hover:bg-accent/10 hover:text-foreground hover:border-l-4 hover:border-primary border-2 border-transparent"
                        class="group flex items-center px-4 py-3 text-sm font-bold uppercase transition-all duration-200"
                    >
                        <LayoutGrid class="mr-3 w-5 h-5" />
                        Overview
                    </A>
                    <A
                        href="/dashboard/articles"
                        onClick={props.onClose} // Auto close on mobile nav
                        activeClass="bg-primary text-black shadow-[4px_4px_0px_0px_#000000] border-2 border-black transform translate-x-1"
                        inactiveClass="text-neutral-500 hover:bg-accent/10 hover:text-foreground hover:border-l-4 hover:border-primary border-2 border-transparent"
                        class="group flex items-center px-4 py-3 text-sm font-bold uppercase transition-all duration-200"
                    >
                        <FileText class="mr-3 w-5 h-5" />
                        Articles
                    </A>
                    <A
                        href="/dashboard/media"
                        onClick={props.onClose}
                        activeClass="bg-primary text-black shadow-[4px_4px_0px_0px_#000000] border-2 border-black transform translate-x-1"
                        inactiveClass="text-neutral-500 hover:bg-accent/10 hover:text-foreground hover:border-l-4 hover:border-primary border-2 border-transparent"
                        class="group flex items-center px-4 py-3 text-sm font-bold uppercase transition-all duration-200"
                    >
                        <ImageIcon class="mr-3 w-5 h-5" />
                        Media Library
                    </A>
                    <A
                        href="/dashboard/settings"
                        onClick={props.onClose}
                        activeClass="bg-primary text-black shadow-[4px_4px_0px_0px_#000000] border-2 border-black transform translate-x-1"
                        inactiveClass="text-neutral-500 hover:bg-accent/10 hover:text-foreground hover:border-l-4 hover:border-primary border-2 border-transparent"
                        class="group flex items-center px-4 py-3 text-sm font-bold uppercase transition-all duration-200"
                    >
                        <Settings class="mr-3 w-5 h-5" />
                        Settings
                    </A>
                </nav>

                <div class="p-4 border-t-2 border-accent shrink-0">
                    <A
                        href="/dashboard/articles/create"
                        onClick={props.onClose}
                        class="w-full bg-primary hover:bg-foreground hover:text-background text-black font-oswald font-bold uppercase py-4 px-4 text-center transition-colors border-2 border-transparent flex items-center justify-center gap-2"
                    >
                        <Plus class="w-5 h-5" />
                        New Article
                    </A>
                </div>
                <div class="p-6 shrink-0">
                    <button class="flex items-center text-red-600 dark:text-red-500 text-xs font-bold uppercase tracking-widest hover:underline w-full">
                        <LogOut class="mr-2 w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}
