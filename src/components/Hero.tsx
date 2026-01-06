import { createSignal, onMount, onCleanup } from "solid-js";
import { animate } from "motion";

export default function Hero() {
  const [scrollY, setScrollY] = createSignal(0);

  onMount(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial reveal animation
    animate(".hero-reveal", { opacity: [0, 1], y: [60, 0] }, {
      duration: 1.4,
      easing: [0.16, 1, 0.3, 1],
      delay: 0.1,
    } as any);

    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  return (
    <section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background">
      {/* Background Ambience */}
      <div class="absolute inset-0 z-0 pointer-events-none text-white">
        <div class="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')]"></div>
        <div class="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[100px] mix-blend-overlay"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] mix-blend-overlay"></div>
      </div>

      {/* Main Content */}
      <div class="relative z-10 w-full px-4 flex flex-col items-center justify-center text-center hero-reveal">
        <div class="mb-4 flex items-center gap-4">
          <span class="h-[1px] w-12 bg-primary"></span>
          <span class="text-primary uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">
            Digital Experiences
          </span>
          <span class="h-[1px] w-12 bg-primary"></span>
        </div>

        <h1 class="font-oswald font-bold text-[15vw] leading-[0.8] tracking-tighter uppercase text-foreground mix-blend-overlay selection:bg-primary selection:text-black">
          DAKOPI
          <br />
          <span class="text-primary">STUDIO</span>
        </h1>

        {/* Abstract Liquid Image */}
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] pointer-events-none opacity-40 mix-blend-screen z-[-1]">
          <img
            alt="Abstract liquid texture"
            class="w-full h-auto object-cover grayscale contrast-125 brightness-75 rounded-full blur-sm"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRqcm1dEjNKsFozG9vQMM5VODpDdXxCCAVpvYDYlmVU8p46aRXwgSDnKLhA_tqQ2ZZZ-BDrxeg3xCBW7tgFDrL78nWuDpAEd6O2tgqLQSI0vqJDO7HRBICUD_OY3o-dEqe-Y16WQK-0MDabSFowCxqUwjb-63r1g1MmKidGxqM-_xG3jeXbL01mwPUSuzXbGICPfe5aEbkOuls6I-Tm-1OVnBTV3OoaK1fZQxBAJF03egATgyKbSGuj5Ylt6Bmi21P4_1SQOi_RqY"
            style={{
              transform: `translateY(${scrollY() * 0.2}px)`,
            }}
          />
        </div>

        <div class="mt-12 max-w-2xl mx-auto">
          <p class="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
            Redefining boundaries in digital design. We craft heavy hitting interfaces with a smooth
            finish.
            <span class="text-white font-medium"> Built for the bold.</span>
          </p>
        </div>

        <div class="mt-12">
          <a
            href="#"
            class="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-neutral-700 overflow-hidden transition-all duration-300 hover:border-primary"
          >
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
            <span class="relative flex items-center gap-3">
              <span class="text-sm font-bold uppercase tracking-widest text-white group-hover:text-primary transition-colors">
                Explore Work
              </span>
              <span class="material-icons text-primary text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div class="absolute bottom-10 left-6 md:left-20 flex flex-col items-center gap-2 mix-blend-difference hero-reveal">
        <span
          class="text-[10px] uppercase tracking-widest text-neutral-400 rotate-180"
          style={{ "writing-mode": "vertical-rl" }}
        >
          Scroll Down
        </span>
        <div class="h-16 w-[1px] bg-neutral-600 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[pulseslide_2s_linear_infinite]"></div>
        </div>
      </div>

      {/* Status Badge */}
      <div class="absolute bottom-10 right-6 md:right-20 border border-neutral-800 p-4 w-32 hidden md:block hero-reveal">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] text-neutral-500 uppercase">Status</span>
          <span class="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
        </div>
        <div class="text-2xl font-oswald font-bold text-white leading-none">
          OPEN
          <br />
          FOR
          <br />
          WORK
        </div>
        <div class="mt-2 text-[9px] text-neutral-600 border-t border-neutral-800 pt-2 flex justify-between">
          <span>2026</span>
          <span>V.1.0</span>
        </div>
      </div>

      <style>
        {`
            @keyframes pulseslide {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
            }
        `}
      </style>
    </section>
  );
}
