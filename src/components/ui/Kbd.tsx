import { type Component, type ComponentProps, splitProps } from 'solid-js';

const Kbd: Component<ComponentProps<'kbd'>> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children']);

  return (
    <kbd
      class={`pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-200 bg-neutral-100 px-1.5 font-mono text-[10px] font-medium text-neutral-900 opacity-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 ${
        local.class || ''
      }`}
      {...others}
    >
      {local.children}
    </kbd>
  );
};

export default Kbd;
