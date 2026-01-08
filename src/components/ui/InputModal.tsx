import { createEffect, createSignal, Show, onCleanup } from "solid-js";
import { X } from "lucide-solid";
import Button from "./Button";

interface InputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: string) => void;
    title: string;
    placeholder?: string;
    initialValue?: string;
}

export default function InputModal(props: InputModalProps) {
    const [value, setValue] = createSignal("");
    let inputRef!: HTMLInputElement;

    createEffect(() => {
        if (props.isOpen) {
            setValue(props.initialValue || "");
            // Focus input after a short delay to ensure modal is rendered
            setTimeout(() => inputRef?.focus(), 50);

            // Aggressive Scroll Lock
            document.body.style.setProperty('overflow', 'hidden', 'important');
            document.documentElement.style.setProperty('overflow', 'hidden', 'important');
            document.body.style.setProperty('touch-action', 'none', 'important');
        } else {
            document.body.style.removeProperty('overflow');
            document.documentElement.style.removeProperty('overflow');
            document.body.style.removeProperty('touch-action');
        }
    });

    onCleanup(() => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.touchAction = '';
        }
    });

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        props.onSubmit(value());
        props.onClose();
    };

    return (
        <Show when={props.isOpen}>
            <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <style>
                    {`
            @keyframes brutalist-pop {
              0% { transform: scale(0.9) translateY(20px); opacity: 0; }
              60% { transform: scale(1.02) translateY(-5px); opacity: 1; }
              100% { transform: scale(1) translateY(0); opacity: 1; }
            }
          `}
                </style>
                <div
                    class="w-full max-w-lg bg-background border-2 border-accent shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
                    style={{ animation: "brutalist-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards" }}
                >
                    {/* Header */}
                    <div class="flex items-center justify-between border-b-2 border-accent p-4 bg-surface">
                        <h3 class="font-oswald font-black text-xl uppercase italic text-foreground tracking-wide">{props.title}</h3>
                        <button
                            type="button"
                            onClick={props.onClose}
                            class="text-neutral-500 hover:text-red-500 transition-colors hover:rotate-90 duration-300"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} class="p-8">
                        <input
                            ref={inputRef}
                            type="text"
                            value={value()}
                            onInput={(e) => setValue(e.currentTarget.value)}
                            placeholder={props.placeholder}
                            class="w-full bg-transparent border-b-2 border-accent py-4 text-xl font-mono font-bold text-foreground placeholder-neutral-600 outline-none focus:border-primary transition-colors mb-8"
                        />

                        <div class="flex justify-end gap-4">
                            <Button type="button" variant="ghost" onClick={props.onClose}>Cancel</Button>
                            <Button type="submit" variant="primary">Confirm</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Show>
    );
}
