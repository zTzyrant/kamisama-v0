export default function ContactCta() {
  return (
    <section class="relative bg-background border-t border-accent/10">
      <div class="h-[60vh] w-full relative overflow-hidden group">
        <div class="absolute inset-0 bg-surface">
          <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')]"></div>
          <div class="w-full h-full flex items-center justify-center relative overflow-hidden">
            <div class="absolute w-[150%] h-[150%] bg-[conic-gradient(at_bottom_left,var(--tw-gradient-stops))] from-neutral-900 via-neutral-800 to-black animate-spin-slow opacity-50"></div>
            <div class="z-10 text-[15vw] font-oswald font-bold text-foreground/5 select-none pointer-events-none">
              CONTACT
            </div>
          </div>
        </div>
        <div class="absolute inset-0 flex flex-col items-center justify-center z-20">
          <h2 class="font-oswald text-6xl md:text-9xl text-foreground uppercase tracking-tighter text-center leading-[0.85] mb-8 mix-blend-difference">
            Start A<br />
            Project
          </h2>
          <a
            href="mailto:hello@dakopi.studio"
            class="inline-block bg-primary text-black font-oswald font-bold uppercase text-lg md:text-xl px-12 py-4 tracking-wider hover:bg-white hover:scale-105 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
