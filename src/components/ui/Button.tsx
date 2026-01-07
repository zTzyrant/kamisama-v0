import { JSX, splitProps } from 'solid-js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'black';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, [
    'variant',
    'size',
    'class',
    'children'
  ]);

  const variants = {
    primary:
      'bg-primary text-black hover:bg-black hover:text-primary transition-colors border-2 border-primary',
    secondary:
      'bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors',
    outline:
      'bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-colors',
    black:
      'bg-black text-white hover:bg-primary hover:text-black transition-colors border-2 border-black',
    ghost: 'bg-transparent text-black hover:bg-black/5 transition-colors'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px] font-bold uppercase',
    md: 'px-6 py-3 text-xs font-bold uppercase',
    lg: 'px-10 py-4 text-sm font-bold uppercase tracking-widest'
  };

  return (
    <button
      class={cn(
        'inline-flex items-center justify-center font-oswald cursor-pointer whitespace-nowrap',
        variants[local.variant || 'primary'],
        sizes[local.size || 'md'],
        local.class
      )}
      {...others}
    >
      {local.children}
    </button>
  );
}
