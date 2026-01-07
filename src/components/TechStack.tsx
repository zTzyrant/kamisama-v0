import { For } from 'solid-js';

export default function TechStack() {
  const stack = {
    frontend: ['SolidStart', 'Tailwind CSS', 'React / Next.js', 'Three.js'],
    backend: ['Node.js', 'PostgreSQL', 'Figma', 'Git / CI/CD']
  };

  return (
    <section class="bg-background py-32 border-t border-white/5 overflow-hidden">
      {/* Marquee */}
      <div class="mb-20 bg-primary text-black py-4 -rotate-1 scale-105 border-y-4 border-black overflow-hidden flex whitespace-nowrap">
        <div class="font-oswald text-6xl uppercase font-bold tracking-tighter animate-marquee px-4">
          Development • Design • Strategy • Performance • Development • Design •
          Strategy • Performance •
        </div>
        <div class="font-oswald text-6xl uppercase font-bold tracking-tighter animate-marquee px-4">
          Development • Design • Strategy • Performance • Development • Design •
          Strategy • Performance •
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div class="md:col-span-4">
          <h2 class="font-oswald text-5xl text-white uppercase leading-none sticky top-32">
            Tech
            <br />
            Stack
          </h2>
        </div>
        <div class="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
          <div>
            <h3 class="text-neutral-500 text-sm font-bold uppercase tracking-widest mb-6 border-b border-neutral-800 pb-2">
              Frontend
            </h3>
            <ul class="space-y-4">
              <For each={stack.frontend}>
                {(tech) => (
                  <li class="flex items-center justify-between group cursor-default border-b border-transparent hover:border-primary/20 pb-2 transition-colors">
                    <span class="text-xl md:text-2xl font-oswald uppercase group-hover:text-primary transition-colors">
                      {tech}
                    </span>
                  </li>
                )}
              </For>
            </ul>
          </div>
          <div>
            <h3 class="text-neutral-500 text-sm font-bold uppercase tracking-widest mb-6 border-b border-neutral-800 pb-2">
              Backend & Tools
            </h3>
            <ul class="space-y-4">
              <For each={stack.backend}>
                {(tech) => (
                  <li class="flex items-center justify-between group cursor-default border-b border-transparent hover:border-primary/20 pb-2 transition-colors">
                    <span class="text-xl md:text-2xl font-oswald uppercase group-hover:text-primary transition-colors">
                      {tech}
                    </span>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
