import { createSignal, createEffect, For, Show } from "solid-js";
import { ChevronDown, X, Check } from "lucide-solid";
import clsx from "clsx";

interface Option {
    label: string;
    value: string;
}

interface SearchableSelectProps {
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    class?: string;
    disabled?: boolean;
}

export default function SearchableSelect(props: SearchableSelectProps) {
    const [isOpen, setIsOpen] = createSignal(false);
    const [search, setSearch] = createSignal("");
    const [filteredOptions, setFilteredOptions] = createSignal<Option[]>([]);

    let containerRef: HTMLDivElement | undefined;
    let inputRef: HTMLInputElement | undefined;

    // Initialize filtered options
    createEffect(() => {
        setFilteredOptions(props.options);
    });

    // Filter logic
    createEffect(() => {
        if (!search()) {
            setFilteredOptions(props.options);
        } else {
            const lower = search().toLowerCase();
            setFilteredOptions(props.options.filter(opt => opt.label.toLowerCase().includes(lower)));
        }
    });

    // Handle click outside
    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef && !containerRef.contains(e.target as Node)) {
            setIsOpen(false);
            setSearch(""); // Reset search on close
        }
    };

    createEffect(() => {
        if (isOpen()) {
            document.addEventListener("mousedown", handleClickOutside);
            // Focus input when opened
            setTimeout(() => inputRef?.focus(), 50);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        // Cleanup
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    const handleSelect = (val: string) => {
        props.onChange(val);
        setIsOpen(false);
        setSearch("");
    };

    const selectedLabel = () => props.options.find(o => o.value === props.value)?.label || "";

    return (
        <div class={clsx("relative w-full", props.class)} ref={containerRef}>
            {/* Trigger Button */}
            <div
                onClick={() => !props.disabled && setIsOpen(!isOpen())}
                class={clsx(
                    "flex items-center justify-between w-full px-4 py-3 bg-background border-4 border-black cursor-pointer transition-all",
                    "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
                    isOpen() ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]" : "",
                    props.disabled ? "opacity-50 cursor-not-allowed" : ""
                )}
            >
                <span class={clsx("font-mono text-lg truncate", !props.value && "text-neutral-500")}>
                    {props.value ? selectedLabel() : props.placeholder || "Select option..."}
                </span>
                <ChevronDown size={20} class={clsx("transition-transform duration-200", isOpen() ? "rotate-180" : "")} />
            </div>

            {/* Dropdown Menu */}
            <Show when={isOpen()}>
                <div class="absolute z-50 w-full mt-2 bg-background border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] animate-in fade-in zoom-in-95 duration-100">

                    {/* Search Input */}
                    <div class="p-2 border-b-4 border-black bg-surface">
                        <input
                            ref={inputRef}
                            type="text"
                            class="w-full px-3 py-2 bg-background border-2 border-black focus:border-primary outline-none font-mono text-sm"
                            placeholder="Search..."
                            value={search()}
                            onInput={(e) => setSearch(e.currentTarget.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Options List */}
                    <div class="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                        <Show
                            when={filteredOptions().length > 0}
                            fallback={
                                <div class="p-4 text-center text-neutral-500 font-mono text-sm italic">
                                    No results found.
                                </div>
                            }
                        >
                            <For each={filteredOptions()}>
                                {(option) => (
                                    <div
                                        onClick={() => handleSelect(option.value)}
                                        class={clsx(
                                            "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors hover:bg-primary/20",
                                            props.value === option.value ? "bg-primary/10 font-bold" : ""
                                        )}
                                    >
                                        <span class="font-mono">{option.label}</span>
                                        <Show when={props.value === option.value}>
                                            <Check size={16} class="text-primary" />
                                        </Show>
                                    </div>
                                )}
                            </For>
                        </Show>
                    </div>
                </div>
            </Show>

            {/* Inline styles for custom scrollbar for this component specifically */}
            <style>
                {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}
            </style>
        </div>
    );
}
