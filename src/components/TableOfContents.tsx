import { Component, For } from 'solid-js';
import { type TocItem } from '~/lib/toc';

interface TableOfContentsProps {
  headings: TocItem[];
  activeId?: string;
}

const TableOfContents: Component<TableOfContentsProps> = (props) => {
  const handleClick = (e: MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky headers if any, roughly 80px
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div class="space-y-4">
      <h4 class="font-oswald font-black text-xs uppercase tracking-widest text-black mb-4 border-l-4 border-black pl-3">
        On This Page
      </h4>
      <nav>
        <ul class="space-y-3">
          <For each={props.headings}>
            {(heading) => (
              <li
                style={{
                  'padding-left': `${(heading.level - 1) * 12}px`
                }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  class={`
                    block text-xs font-mono transition-colors duration-200 uppercase
                    ${props.activeId === heading.id
                      ? 'text-black font-bold border-l-4 border-black pl-2 -ml-2.5'
                      : 'text-neutral-500 hover:text-foreground'
                    }
                  `}
                >
                  {heading.text}
                </a>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;
