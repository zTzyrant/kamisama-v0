import { Title } from "@solidjs/meta";
import { ArrowUpRight, ArrowDownRight, ArrowRight, ExternalLink } from "lucide-solid";

export default function DashboardHome() {
  return (
    <>
      <Title>Dashboard | DAKOTA ADMIN</Title>

      {/* Header Area in Body (as per design, though Title is now in Navbar, visual header text is still good) */}
      <h1 class="font-oswald italic text-6xl mb-8 uppercase text-foreground tracking-tighter">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-8 border border-accent bg-background">
        <div class="p-6 border-r border-accent relative group">
          <div class="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 mb-2">Total Views</div>
          <div class="font-oswald text-5xl font-bold text-foreground group-hover:text-primary transition-colors">1.2M</div>
          <div class="absolute top-6 right-6 text-green-500 text-xs font-mono flex items-center">
            <ArrowUpRight class="w-3.5 h-3.5 mr-1" /> +12%
          </div>
        </div>
        <div class="p-6 border-r border-accent relative group">
          <div class="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 mb-2">Unique Visitors</div>
          <div class="font-oswald text-5xl font-bold text-foreground group-hover:text-primary transition-colors">842K</div>
          <div class="absolute top-6 right-6 text-green-500 text-xs font-mono flex items-center">
            <ArrowUpRight class="w-3.5 h-3.5 mr-1" /> +5%
          </div>
        </div>
        <div class="p-6 border-r border-accent relative group">
          <div class="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 mb-2">Avg Read Time</div>
          <div class="font-oswald text-5xl font-bold text-foreground group-hover:text-primary transition-colors">4:12</div>
          <div class="absolute top-6 right-6 text-red-500 text-xs font-mono flex items-center">
            <ArrowDownRight class="w-3.5 h-3.5 mr-1" /> -1.2%
          </div>
        </div>
        <div class="p-6 relative group">
          <div class="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 mb-2">Comments</div>
          <div class="font-oswald text-5xl font-bold text-foreground group-hover:text-primary transition-colors">3.8K</div>
          <div class="absolute top-6 right-6 text-green-500 text-xs font-mono flex items-center">
            <ArrowUpRight class="w-3.5 h-3.5 mr-1" /> +24%
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feature (8 cols) */}
        <div class="lg:col-span-8 flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <h2 class="font-mono text-sm uppercase text-neutral-500 dark:text-neutral-400 tracking-wider">Latest Drop</h2>
            <a class="text-xs font-mono text-primary hover:underline cursor-pointer">VIEW ALL</a>
          </div>
          <div class="flex-1 border border-accent bg-background flex flex-col">
            <div class="h-64 bg-accent/20 border-b border-accent flex items-center justify-center relative overflow-hidden group">
              <div class="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-400 via-neutral-900 to-black"></div>
              {/* Placeholder Image using CSS pattern or just div since external images might break */}
              <div class="absolute inset-0 bg-accent/10 flex items-center justify-center text-neutral-600">
                <span class="font-oswald text-4xl opacity-20">FEATURED IMAGE</span>
              </div>
              <div class="absolute bottom-0 left-0 bg-primary text-black px-4 py-1 font-mono text-xs font-bold uppercase">Published</div>
            </div>
            <div class="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-4">
                  <span>JUNE 24, 2024</span>
                  <span>/</span>
                  <span>DESIGN THEORY</span>
                  <span>/</span>
                  <span>4 MIN READ</span>
                </div>
                <h3 class="font-oswald italic font-bold text-4xl lg:text-5xl uppercase leading-none mb-6 text-foreground">
                  Why Brutalism Never<br />Truly Dies
                </h3>
                <p class="font-sans text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  Start writing your brutalist masterpiece here... Minimalist interfaces are stripping away the personality of the web. Here is why we need to bring back the raw, unpolished aesthetic of the early internet.
                </p>
              </div>
              <div class="mt-8 flex gap-4">
                <button class="bg-transparent border border-accent text-foreground px-6 py-3 font-mono text-xs uppercase hover:bg-accent/10 transition-colors">
                  Edit Article
                </button>
                <button class="bg-transparent border border-transparent text-primary px-6 py-3 font-mono text-xs uppercase flex items-center gap-2 hover:opacity-80">
                  View Live <ExternalLink class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement / Sidebar (4 cols) */}
        <div class="lg:col-span-4 flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <h2 class="font-mono text-sm uppercase text-neutral-500 dark:text-neutral-400 tracking-wider">Engagement</h2>
            <button class="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-white">FILTER</button>
          </div>
          <div class="border border-accent bg-background">
            {/* Comment Item 1 */}
            <div class="p-5 border-b border-accent hover:bg-accent/10 transition-colors cursor-pointer group">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-primary rounded-none flex items-center justify-center text-[10px] font-bold text-black">JD</div>
                  <span class="font-mono text-xs text-foreground font-bold">John Doe</span>
                </div>
                <span class="font-mono text-[10px] text-neutral-500">2m ago</span>
              </div>
              <p class="font-sans text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-2">
                "The typography choices here are absolutely savage. I love how the layout breaks the conventional grid..."
              </p>
              <div class="flex items-center gap-2">
                <ArrowRight class="w-3 h-3 text-neutral-500" />
                <span class="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-500 group-hover:text-primary transition-colors">On: Modern Grid Systems</span>
              </div>
            </div>
            {/* Comment Item 2 */}
            <div class="p-5 border-b border-accent hover:bg-accent/10 transition-colors cursor-pointer group">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-neutral-700 rounded-none flex items-center justify-center text-[10px] font-bold text-white">AS</div>
                  <span class="font-mono text-xs text-foreground font-bold">Alice Smith</span>
                </div>
                <span class="font-mono text-[10px] text-neutral-500">1h ago</span>
              </div>
              <p class="font-sans text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-2">
                Is there a dark mode version of this template available? I can't seem to find the toggle in the settings.
              </p>
              <div class="flex items-center gap-2">
                <ArrowRight class="w-3 h-3 text-neutral-500" />
                <span class="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-500 group-hover:text-primary transition-colors">On: UX Patterns 2024</span>
              </div>
            </div>
            {/* View All */}
            <a class="block p-4 text-center bg-accent/5 hover:bg-primary hover:text-black transition-colors font-mono text-xs uppercase font-bold text-neutral-500 dark:text-neutral-400 cursor-pointer">
              View All Comments
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
