import { For, onMount } from 'solid-js';
import { ArrowRight } from 'lucide-solid';
import { animate, stagger } from 'motion';

export default function SelectedWorks() {
  const works = [
    { title: 'Neon Flux', category: 'E-Commerce / Web3', id: '01' },
    {
      title: 'Void Scape',
      category: 'Portfolio / Three.js',
      id: '02',
      mt: 'lg:mt-24'
    },
    { title: 'Mono Type', category: 'Editorial / Archive', id: '03' },
    {
      title: 'Grid Lock',
      category: 'Agency / Branding',
      id: '04',
      mt: 'lg:mt-24'
    }
  ];

  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              entry.target.querySelectorAll('.work-item') as any,
              { opacity: [0, 1], x: [100, 0] },
              {
                duration: 1.2,
                delay: stagger(0.2),
                ease: [0.16, 1, 0.3, 1]
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef) {
      observer.observe(containerRef);
    }
  });

  return (
    <section class="bg-surface relative py-32 border-t border-accent overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')]"></div>
      <div class="max-w-[1920px] mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-accent pb-8">
          <h2 class="font-oswald text-6xl md:text-8xl text-foreground uppercase tracking-tighter leading-none">
            My
            <br />
            <span
              class="text-transparent opacity-50"
              style={{ '-webkit-text-stroke': '1px var(--color-foreground)' }}
            >
              Creations
            </span>
          </h2>
          <div class="mt-8 md:mt-0 flex gap-4">
            <button class="w-12 h-12 rounded-full border border-accent flex items-center justify-center hover:bg-foreground hover:text-background transition-all">
              <ArrowRight class="rotate-180" />
            </button>
            <button class="w-12 h-12 rounded-full border border-accent flex items-center justify-center hover:bg-foreground hover:text-background transition-all">
              <ArrowRight />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <For each={works}>
            {(work) => (
              <div
                class={`group relative cursor-pointer work-item opacity-0 ${work.mt || ''
                  }`}
              >
                <div class="relative aspect-4/3 bg-surface overflow-hidden mb-6 border border-accent">
                  <div class="absolute inset-0 bg-accent/20 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center text-accent text-9xl font-oswald opacity-20">
                    {work.id}
                  </div>
                  <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div class="flex justify-between items-start border-t border-accent pt-4">
                  <div>
                    <h3 class="font-oswald text-3xl uppercase text-foreground mb-1 group-hover:text-primary transition-colors">
                      {work.title}
                    </h3>
                    <p class="text-xs text-neutral-500 uppercase tracking-widest">
                      {work.category}
                    </p>
                  </div>
                  <ArrowRight class="text-neutral-500 group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
