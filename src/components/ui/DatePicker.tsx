import { createSignal, createEffect, For, Show, onCleanup } from 'solid-js';
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-solid';
import clsx from 'clsx';

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
  position?: 'left' | 'center' | 'right'; // Position for range mode
}

export default function DatePicker(props: DatePickerProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [currentMonth, setCurrentMonth] = createSignal(new Date().getMonth());
  const [currentYear, setCurrentYear] = createSignal(new Date().getFullYear());
  const [usePopup, setUsePopup] = createSignal(false); // Whether to use popup mode
  const [triggerWidth, setTriggerWidth] = createSignal(0);

  let containerRef: HTMLDivElement | undefined;
  let triggerRef: HTMLDivElement | undefined;
  let calendarRef: HTMLDivElement | undefined;

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

  // Check if calendar will overflow viewport
  const checkOverflow = () => {
    if (!triggerRef || !isOpen()) return;

    const triggerRect = triggerRef.getBoundingClientRect();
    setTriggerWidth(triggerRect.width);

    if (props.mode === 'range') {
      // For range mode: check if double calendar fits
      const calendarWidth = 280 * 2 + 48 + 32; // Two calendars + gap + padding
      const viewportWidth = window.innerWidth;

      // Check position based on props.position
      const position = props.position || 'right';
      let willOverflow = false;

      if (position === 'left') {
        willOverflow = triggerRect.left + calendarWidth > viewportWidth - 16;
      } else if (position === 'center') {
        const centerLeft = triggerRect.left + triggerRect.width / 2 - calendarWidth / 2;
        willOverflow = centerLeft < 16 || centerLeft + calendarWidth > viewportWidth - 16;
      } else { // right
        willOverflow = triggerRect.right - calendarWidth < 16;
      }

      // Also check bottom overflow
      const calendarHeight = 400; // Approximate height
      const bottomOverflow = triggerRect.bottom + calendarHeight > window.innerHeight - 16;

      setUsePopup(willOverflow || bottomOverflow || viewportWidth < 768);
    } else {
      // For single mode: always use dropdown with parent width
      setUsePopup(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef && !containerRef.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  createEffect(() => {
    if (typeof window !== 'undefined') {
      if (isOpen()) {
        checkOverflow();
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', checkOverflow);
        window.addEventListener('scroll', checkOverflow, true);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('resize', checkOverflow);
        window.removeEventListener('scroll', checkOverflow, true);
      }

      onCleanup(() => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('resize', checkOverflow);
        window.removeEventListener('scroll', checkOverflow, true);
      });
    }
  });

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const getDaysArray = (month: number, year: number) => {
    const days = [];
    const totalDays = daysInMonth(month, year);
    const startDay = firstDayOfMonth(month, year);

    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);
    return days;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const handleDateClick = (day: number, monthOffset: number) => {
    let targetMonth = currentMonth() + monthOffset;
    let targetYear = currentYear();

    if (targetMonth > 11) {
      targetMonth -= 12;
      targetYear += 1;
    }

    const newDate = new Date(targetYear, targetMonth, day);

    if (props.mode === 'range') {
      const currentRange = (props.value as DateRange) || {
        start: null,
        end: null
      };

      if (
        (!currentRange.start && !currentRange.end) ||
        (currentRange.start && currentRange.end)
      ) {
        props.onChange({ start: newDate, end: null });
      } else if (currentRange.start && !currentRange.end) {
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
    if (!val) return '';
    if (props.mode === 'range') {
      const range = val as DateRange;
      if (!range.start) return '';
      const startStr = range.start.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
      });
      if (!range.end) return startStr;
      const endStr = range.end.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
      });
      return `${startStr} - ${endStr}`;
    }
    return (val as Date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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
      const range = props.value as DateRange;
      return (
        (range?.start && isSameDay(range.start, current)) ||
        (range?.end && isSameDay(range.end, current))
      );
    }
    return props.value && isSameDay(props.value as Date, current);
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const renderMonth = (offset: number) => {
    let m = currentMonth() + offset;
    let y = currentYear();
    if (m > 11) {
      m -= 12;
      y += 1;
    }

    return (
      <div class={clsx(
        "flex-1",
        props.mode === 'range' ? 'min-w-[280px]' : 'w-full'
      )}>
        <div class="font-oswald font-bold text-lg select-none mb-4 text-center">
          {monthNames[m]} {y}
        </div>
        <div class="grid grid-cols-7 mb-2 text-center gap-1">
          <For each={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}>
            {(d) => (
              <div class="text-xs font-mono font-bold text-neutral-500">
                {d}
              </div>
            )}
          </For>
        </div>
        <div class="grid grid-cols-7 gap-1 text-center">
          <For each={getDaysArray(m, y)}>
            {(day) => (
              <div class="aspect-square flex items-center justify-center">
                <Show when={day !== null}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDateClick(day as number, offset);
                    }}
                    class={clsx(
                      'w-full h-full flex items-center justify-center font-mono text-sm transition-all duration-200',
                      isSelected(day as number, offset)
                        ? 'bg-primary text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transform scale-105'
                        : isInRange(day as number, offset)
                          ? 'bg-primary/20 text-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:shadow-sm'
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

  // Get position classes based on props.position
  const getPositionClasses = () => {
    if (props.mode !== 'range' || usePopup()) return '';

    const position = props.position || 'right';
    if (position === 'left') {
      return 'left-0';
    } else if (position === 'center') {
      return 'left-1/2 -translate-x-1/2';
    } else {
      return 'right-0';
    }
  };

  return (
    <div class={clsx('relative', props.class)} ref={containerRef}>
      {/* Trigger */}
      <div ref={triggerRef} onClick={() => !props.disabled && setIsOpen(!isOpen())}>
        <Show when={!props.trigger} fallback={props.trigger}>
          <div
            class={clsx(
              'flex items-center justify-between w-full px-4 py-3 bg-background border-4 border-black cursor-pointer transition-all',
              'hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]',
              isOpen()
                ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                : '',
              props.disabled ? 'opacity-50 cursor-not-allowed' : ''
            )}
          >
            <span
              class={clsx(
                'font-mono text-sm sm:text-base md:text-lg',
                !props.value && 'text-neutral-500'
              )}
            >
              {props.value
                ? formatDate(props.value as any)
                : props.placeholder || 'Select date...'}
            </span>
            <Calendar
              size={20}
              class="text-neutral-600 dark:text-neutral-400 flex-shrink-0"
            />
          </div>
        </Show>
      </div>

      {/* Calendar Dropdown */}
      <Show when={isOpen()}>
        {/* Backdrop for Popup Mode */}
        {usePopup() && (
          <div
            class="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        <div
          ref={calendarRef}
          class={clsx(
            'z-50 bg-background border-4 border-black animate-in fade-in zoom-in-95 duration-200',

            // Popup Mode (for range when overflow detected)
            usePopup() && props.mode === 'range' && clsx(
              'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'p-4 sm:p-6',
              'shadow-2xl',
              'w-[95vw] max-w-[640px]'
            ),

            // Dropdown Mode for Range (when no overflow)
            !usePopup() && props.mode === 'range' && clsx(
              'absolute top-full mt-2',
              'p-4 sm:p-6',
              'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]',
              getPositionClasses()
            ),

            // Single Mode (always dropdown, matches parent width)
            props.mode !== 'range' && clsx(
              'absolute top-full mt-2 left-0',
              'p-3 sm:p-4',
              'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]'
            )
          )}
          style={props.mode !== 'range' ? { width: `${triggerWidth()}px` } : {}}
        >
          {/* Close button for popup mode */}
          <Show when={usePopup() && props.mode === 'range'}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              class="absolute top-4 right-4 z-10 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded"
            >
              <X size={20} />
            </button>
          </Show>

          <div class={clsx(
            "flex items-start gap-4 sm:gap-6 relative",
            props.mode === 'range' ? 'flex-col sm:flex-row' : 'flex-col'
          )}>
            {/* Navigation Buttons */}
            <div class={clsx(
              "flex justify-between w-full mb-2",
              props.mode === 'range' && 'sm:absolute sm:inset-x-0 sm:top-0 sm:mb-0'
            )}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevMonth();
                }}
                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextMonth();
                }}
                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded z-10"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Calendar(s) */}
            <div class={clsx(
              "flex items-start gap-4 sm:gap-6 w-full",
              props.mode === 'range' ? 'flex-col sm:flex-row' : 'flex-col',
              props.mode === 'range' && 'sm:mt-8'
            )}>
              {renderMonth(0)}

              <Show when={props.mode === 'range'}>
                <div class="hidden sm:block w-px bg-accent self-stretch"></div>
                <div class="block sm:hidden h-px w-full bg-accent"></div>
                {renderMonth(1)}
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}