export default function Footer() {
  return (
    <footer class="bg-primary text-black pt-16 pb-8 px-6 rounded-t-[2rem] md:rounded-t-[4rem] relative -mt-10 z-30">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start mb-20">
          <div>
            <h3 class="font-oswald text-4xl font-bold uppercase mb-2">
              Always
              <br />
              Building.
            </h3>
          </div>
          <div class="mt-8 md:mt-0 flex flex-col text-right">
            <span class="font-bold uppercase tracking-wider text-sm mb-4">Follow On</span>
            <div class="flex flex-col gap-2">
              <a href="#" class="font-oswald text-2xl uppercase hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" class="font-oswald text-2xl uppercase hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" class="font-oswald text-2xl uppercase hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" class="font-oswald text-2xl uppercase hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center border-t border-black/10 pt-8 gap-4">
          <div class="flex gap-8 opacity-70">
            {/* Placeholder Icons */}
            <span class="font-bold">HTML</span>
            <span class="font-bold">CSS</span>
            <span class="font-bold">JS</span>
          </div>
          <div class="flex items-center gap-6 font-bold text-xs uppercase tracking-wider">
            <a href="#" class="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" class="hover:text-white transition-colors">
              Terms
            </a>
          </div>
          <p class="text-xs font-bold uppercase tracking-wider opacity-60">
            © 2026 Dakopi Studio. All rights reserved.
          </p>
        </div>

        <div class="mt-12 w-full overflow-hidden">
          <h2 class="font-oswald font-bold text-[14vw] leading-none tracking-tighter text-center opacity-10 select-none pointer-events-none">
            DAKOPI
          </h2>
        </div>
      </div>
    </footer>
  );
}
