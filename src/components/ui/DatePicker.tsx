import { createSignal, createEffect, For, Show } from "solid-js";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-solid";
import clsx from "clsx";

interface DateRange {
    start: Date | null;
    end: Date | null;
}

interface DatePickerProps {
    value?: Date | DateRange | null;
    onChange: (date: Date | DateRange) => void;
    placeholder?: string;
    class?: string;
    disabled?: boolean;
    trigger?: any; // JSX Element
    mode?: 'single' | 'range';
}

export default function DatePicker(props: DatePickerProps) {
    const [isOpen, setIsOpen] = createSignal(false);
    // Base month for the left calendar
    const [currentMonth, setCurrentMonth] = createSignal(new Date().getMonth());
    const [currentYear, setCurrentYear] = createSignal(new Date().getFullYear());

    let containerRef: HTMLDivElement | undefined;

    // Helper to get raw date object safely
    const getDate = () => {
        if (!props.value) return null;
        if (props.mode === 'range') return props.value as DateRange;
        return props.value as Date;
    };

    // Sync internal state with props.value if present
    createEffect(() => {
        const val = getDate();
        if (val) {
            if (props.mode === 'range') {
                const range = val as DateRange;
                if (range.start) {
                    setCurrentMonth(range.start.getMonth());
                    setCurrentYear(range.start.getFullYear());
                }
            } else {
                const d = val as Date;
                setCurrentMonth(d.getMonth());
                setCurrentYear(d.getFullYear());
            }
        }
    });

    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef && !containerRef.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    createEffect(() => {
        if (isOpen()) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

    const getDaysArray = (month: number, year: number) => {
        const days = [];
        const totalDays = daysInMonth(month, year);
        const startDay = firstDayOfMonth(month, year);

        for (let i = 0; i < startDay; i++) days.push(null);
        for (let i = 1; i <= totalDays; i++) days.push(i);
        return days;
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    const handleDateClick = (day: number, monthOffset: number) => {
        // Calculate correctly handling year rollover
        let targetMonth = currentMonth() + monthOffset;
        let targetYear = currentYear();

        if (targetMonth > 11) {
            targetMonth -= 12;
            targetYear += 1;
        }

        const newDate = new Date(targetYear, targetMonth, day);

        if (props.mode === 'range') {
            const currentRange = (props.value as DateRange) || { start: null, end: null };

            // Logic: 
            // 1. If empty or full range -> Start new range
            // 2. If start exists but no end -> Set end (swap if needed)
            if ((!currentRange.start && !currentRange.end) || (currentRange.start && currentRange.end)) {
                props.onChange({ start: newDate, end: null });
            }
            else if (currentRange.start && !currentRange.end) {
                if (newDate < currentRange.start) {
                    props.onChange({ start: newDate, end: currentRange.start });
                } else {
                    props.onChange({ ...currentRange, end: newDate });
                }
                setIsOpen(false);
            }
        } else {
            props.onChange(newDate);
            setIsOpen(false);
        }
    };

    const nextMonth = () => {
        if (currentMonth() === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear() + 1);
        } else {
            setCurrentMonth(currentMonth() + 1);
        }
    };

    const prevMonth = () => {
        if (currentMonth() === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear() - 1);
        } else {
            setCurrentMonth(currentMonth() - 1);
        }
    };

    const formatDate = (val: Date | DateRange | null | undefined) => {
        if (!val) return "";
        if (props.mode === 'range') {
            const range = val as DateRange;
            if (!range.start) return "";
            const startStr = range.start.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
            if (!range.end) return startStr;
            const endStr = range.end.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
            return `${startStr} - ${endStr}`;
        }
        return (val as Date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const isInRange = (day: number, monthOffset: number) => {
        if (props.mode !== 'range' || !props.value) return false;
        const range = props.value as DateRange;
        if (!range.start || !range.end) return false;

        let targetMonth = currentMonth() + monthOffset;
        let targetYear = currentYear();
        if (targetMonth > 11) {
            targetMonth -= 12;
            targetYear += 1;
        }

        const current = new Date(targetYear, targetMonth, day);
        return current > range.start && current < range.end;
    };

    const isSelected = (day: number, monthOffset: number) => {
        let targetMonth = currentMonth() + monthOffset;
        let targetYear = currentYear();
        if (targetMonth > 11) {
            targetMonth -= 12;
            targetYear += 1;
        }

        const current = new Date(targetYear, targetMonth, day);

        if (props.mode === 'range') {
            const range = (props.value as DateRange);
            return (range?.start && isSameDay(range.start, current)) || (range?.end && isSameDay(range.end, current));
        }
        return props.value && isSameDay(props.value as Date, current);
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const renderMonth = (offset: number) => {
        let m = currentMonth() + offset;
        let y = currentYear();
        if (m > 11) { m -= 12; y += 1; }

        return (
            <div class="flex-1 min-w-[280px]">
                <div class="font-oswald font-bold text-lg select-none mb-4 text-center">
                    {monthNames[m]} {y}
                </div>
                <div class="grid grid-cols-7 mb-2 text-center">
                    <For each={["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}>
                        {(d) => <div class="text-xs font-mono font-bold text-neutral-500">{d}</div>}
                    </For>
                </div>
                <div class="grid grid-cols-7 gap-1 text-center">
                    <For each={getDaysArray(m, y)}>
                        {(day) => (
                            <div class="aspect-square flex items-center justify-center p-0.5">
                                <Show when={day !== null}>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDateClick(day as number, offset); }}
                                        class={clsx(
                                            "w-full h-full flex items-center justify-center rounded-sm font-mono text-sm transition-all duration-200",
                                            isSelected(day as number, offset)
                                                ? "bg-primary text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transform scale-105"
                                                : isInRange(day as number, offset)
                                                    ? "bg-primary/20 text-foreground"
                                                    : "hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:shadow-sm"
                                        )}
                                    >
                                        {day}
                                    </button>
                                </Show>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        );
    };

    return (
        <div class={clsx("relative", props.class)} ref={containerRef}>
            {/* Trigger */}
            <div onClick={() => !props.disabled && setIsOpen(!isOpen())}>
                <Show when={!props.trigger} fallback={props.trigger}>
                    <div
                        class={clsx(
                            "flex items-center justify-between w-full px-4 py-3 bg-background border-2 border-accent cursor-pointer transition-all",
                            "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
                            isOpen() ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]" : "",
                            props.disabled ? "opacity-50 cursor-not-allowed" : ""
                        )}
                    >
                        <span class={clsx("font-mono text-lg", !props.value && "text-neutral-500")}>
                            {props.value ? formatDate(props.value as any) : props.placeholder || "Select date..."}
                        </span>
                        <Calendar size={20} class="text-neutral-600 dark:text-neutral-400" />
                    </div>
                </Show>
            </div>

            {/* Calendar Dropdown */}
            <Show when={isOpen()}>
                <div class={clsx(
                    "absolute z-50 mt-2 bg-background border-2 border-accent shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] animate-in fade-in zoom-in-95 duration-100 p-6",
                    props.mode === 'range' ? "w-[660px] -right-24 md:left-0" : "w-[320px]"
                )}>
                    <div class="flex items-start gap-6">
                        <div class="absolute top-6 left-4">
                            <button onClick={(e) => { e.stopPropagation(); prevMonth(); }} class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded">
                                <ChevronLeft size={20} />
                            </button>
                        </div>

                        {renderMonth(0)}

                        <Show when={props.mode === 'range'}>
                            <div class="hidden md:block w-px bg-accent self-stretch"></div>
                            {renderMonth(1)}
                        </Show>

                        <div class="absolute top-6 right-4">
                            <button onClick={(e) => { e.stopPropagation(); nextMonth(); }} class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    );
}
