export default function Manifesto() {
  return (
    <section class="bg-background py-24 px-6 relative z-10">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="font-oswald text-6xl md:text-8xl text-foreground uppercase leading-[0.9] mb-8">
              Limits <br />
              <span
                class="text-transparent"
                style={{ '-webkit-text-stroke': '1px var(--color-foreground)' }}
              >
                Redefined
              </span>
            </h2>
          </div>
          <div class="space-y-6">
            <p class="text-neutral-500 font-medium text-lg leading-relaxed">
              Just like a high-performance vehicle, our designs are tuned for
              speed, impact, and precision. We strip away the unnecessary to
              reveal the essential core of your brand's digital identity.
            </p>
            <a
              href="#"
              class="inline-block text-primary border-b border-primary pb-1 text-sm font-bold uppercase tracking-wider hover:text-foreground hover:border-foreground transition-colors"
            >
              Read Manifesto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
