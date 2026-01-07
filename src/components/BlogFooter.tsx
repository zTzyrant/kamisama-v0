export default function BlogFooter() {
  return (
    <footer class="bg-black dark:bg-[#050505] text-white py-16 lg:py-20 border-t-2 border-primary dark:border-white/20">
      <div class="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 px-6 lg:px-8">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-8">
            <span class="bg-primary text-black px-2 py-0.5 font-oswald font-black text-xl italic">
              DAKOPI
            </span>
            <span class="font-oswald font-black text-xl">BLOG</span>
          </div>
          <p class="text-[10px] lg:text-xs font-oswald font-bold text-white/40 uppercase leading-relaxed mb-8">
            The boldest developer community on the web. No fluff, just code and
            design.
          </p>
          <div class="flex gap-4">
            <div class="w-10 h-10 border-2 border-white/20 flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
              <span class="text-xs">{'<>'}</span>
            </div>
            <div class="w-10 h-10 border-2 border-white/20 flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
              <span class="text-xs">{'@'}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-oswald font-black text-xs lg:text-sm uppercase mb-8 tracking-widest text-primary italic">
            Community
          </h4>
          <ul class="space-y-4 text-[10px] lg:text-xs font-oswald font-bold uppercase text-white/40">
            <li class="hover:text-white cursor-pointer transition-colors">
              Home
            </li>
            <li class="hover:text-white cursor-pointer transition-colors">
              Articles
            </li>
            <li class="hover:text-white cursor-pointer transition-colors">
              Videos
            </li>
            <li class="hover:text-white cursor-pointer transition-colors">
              Podcasts
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-oswald font-black text-xs lg:text-sm uppercase mb-8 tracking-widest text-primary italic">
            Resources
          </h4>
          <ul class="space-y-4 text-[10px] lg:text-xs font-oswald font-bold uppercase text-white/40">
            <li class="hover:text-white cursor-pointer transition-colors">
              Documentation
            </li>
            <li class="hover:text-white cursor-pointer transition-colors">
              Guides
            </li>
            <li class="hover:text-white cursor-pointer transition-colors">
              FAQ
            </li>
            <li class="hover:text-white cursor-pointer transition-colors">
              About
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-oswald font-black text-xs lg:text-sm uppercase mb-8 tracking-widest text-primary italic">
            Connect
          </h4>
          <ul class="space-y-4 text-[10px] lg:text-xs font-oswald font-bold uppercase text-white/40">
            <li class="hover:text-white cursor-pointer transition-colors">
              Twitter / X
            </li>
            <li class="hover:text-white cursor-pointer transition-colors">
              Github
            </li>
            <li class="hover:text-white cursor-pointer transition-colors">
              Discord
            </li>
            <li class="hover:text-white cursor-pointer transition-colors">
              LinkedIn
            </li>
          </ul>
        </div>
      </div>
      <div class="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/10 flex justify-between items-center text-[8px] lg:text-[10px] font-oswald font-bold uppercase text-white/20 px-6 lg:px-8">
        <span>© 2026 DAKOPI STUDIO - ALL RIGHTS RESERVED</span>
        <div class="flex gap-6">
          <span class="hover:text-white cursor-pointer transition-colors">
            Privacy
          </span>
          <span class="hover:text-white cursor-pointer transition-colors">
            Terms
          </span>
        </div>
      </div>
    </footer>
  );
}
