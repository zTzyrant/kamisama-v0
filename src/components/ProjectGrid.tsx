import { For } from "solid-js";

export default function ProjectGrid() {
  const projects = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `Project 0${i + 1}`,
    image: `https://placehold.co/600x800/1a1a1a/FFF?text=Project+0${i + 1}`,
  }));

  return (
    <section class="px-6 py-20 bg-background text-foreground">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1600px] mx-auto">
        <For each={projects}>
          {(project) => (
            <div class="group relative overflow-hidden aspect-[3/4] cursor-pointer bg-neutral-900">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 class="text-4xl md:text-6xl font-oswald uppercase tracking-tighter text-white translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.title}
                </h3>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}
