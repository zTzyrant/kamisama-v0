import { For } from 'solid-js';
import { Title } from '@solidjs/meta';
import { blogPosts } from '~/lib/blog-data';
import Button from '~/components/ui/Button';
import { A } from '@solidjs/router';
import BlogHeader from '~/components/BlogHeader';
import BlogFooter from '~/components/BlogFooter';

export default function BlogList() {
  const featured = blogPosts[0];
  const listPosts = blogPosts.slice(1);

  return (
    <div class="bg-background text-foreground min-h-screen font-inter transition-colors duration-300">
      <Title>DAKOPI BLOG</Title>

      <BlogHeader />

      <main class="max-w-[1400px] mx-auto border-x-2 border-accent min-h-screen">
        {/* Featured Hero */}
        <section class="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-accent">
          <div class="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-center">
            <div class="mb-8">
              <span class="bg-primary text-black px-3 py-1 text-[10px] lg:text-xs font-bold uppercase tracking-widest">
                FEATURED
              </span>
              <span class="ml-4 text-xs lg:text-sm font-oswald font-bold text-foreground/40">
                {featured.date}
              </span>
            </div>
            <h1 class="font-oswald text-7xl lg:text-[100px] font-black leading-[0.85] uppercase tracking-tighter mb-8 italic">
              THE FUTURE OF
              <br />
              <span class="text-primary italic">WEB SIMPLICITY</span>
            </h1>
            <p class="font-oswald font-bold text-lg lg:text-xl text-foreground/60 max-w-lg mb-10 leading-tight uppercase">
              {featured.excerpt}
            </p>
            <div class="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Read Article
              </Button>
              <Button variant="secondary" size="lg">
                View Showcase
              </Button>
            </div>
          </div>
          <div class="lg:col-span-5 bg-surface relative min-h-[400px] border-l-2 border-accent">
            <img
              src={featured.image}
              class="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
            />
            <div class="absolute bottom-4 left-4 bg-primary text-black px-2 py-1 text-[10px] lg:text-xs font-bold uppercase">
              Digital Art by @AlexChen
            </div>
          </div>
        </section>

        {/* Tags Bar */}
        <div class="bg-primary border-b-2 border-accent overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div class="flex items-center px-6 py-3 gap-8">
            <For each={featured.tags}>
              {(tag) => (
                <div class="flex items-center gap-8">
                  <span class="font-oswald font-black text-xs lg:text-sm text-black uppercase tracking-widest hover:underline cursor-pointer">
                    {tag}
                  </span>
                  <span class="font-oswald font-black text-xs text-black/20">
                    //
                  </span>
                </div>
              )}
            </For>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12">
          {/* Sidebar */}
          <aside class="lg:col-span-3 border-r-2 border-accent p-6 lg:p-8">
            <div class="mb-12">
              <div class="flex items-center gap-2 mb-4">
                <span class="w-1 h-8 bg-primary"></span>
                <h3 class="font-oswald font-black text-xl lg:text-2xl uppercase italic">
                  About
                </h3>
              </div>
              <p class="text-xs lg:text-sm font-bold font-oswald text-foreground/60 leading-relaxed uppercase">
                Dakopi is a digital playground for bold ideas. We challenge
                conventional design norms and celebrate the raw beauty of code.
              </p>
              <button class="mt-4 font-oswald font-black text-[10px] lg:text-xs uppercase underline tracking-widest text-foreground">
                More About Us →
              </button>
            </div>

            <div class="mb-12">
              <div class="flex items-center gap-2 mb-6">
                <span class="w-1 h-8 bg-primary"></span>
                <h3 class="font-oswald font-black text-xl lg:text-2xl uppercase italic">
                  Top Voices
                </h3>
              </div>
              <div class="space-y-6">
                <For each={blogPosts.map((p) => p.author).slice(0, 3)}>
                  {(author) => (
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 border-2 border-accent flex items-center justify-center font-oswald font-black text-xs bg-surface text-foreground">
                        {author.initials}
                      </div>
                      <div>
                        <p class="font-oswald font-black text-xs lg:text-sm uppercase leading-none text-foreground">
                          {author.name}
                        </p>
                        <p class="font-oswald font-bold text-[9px] lg:text-[10px] text-foreground/40 uppercase mt-1">
                          {author.role}
                        </p>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div class="bg-surface p-6 text-foreground border-2 border-accent">
              <h4 class="font-oswald font-black text-sm uppercase italic mb-4">
                Join the Rebellion
              </h4>
              <div class="space-y-3">
                <input
                  type="text"
                  placeholder="EMAIL ADDRESS"
                  class="w-full bg-accent/10 border-2 border-accent/20 px-4 py-2 font-oswald font-bold text-xs text-foreground outline-none focus:border-primary transition-colors"
                />
                <Button variant="primary" class="w-full" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </aside>

          {/* Post List */}
          <div class="lg:col-span-9">
            <div class="border-b-2 border-accent px-6 py-4 flex items-center justify-between">
              <div class="flex gap-2">
                <button class="bg-accent/80 text-background px-4 py-1.5 text-[10px] lg:text-xs font-oswald font-black uppercase">
                  Latest
                </button>
                <button class="border-2 border-accent/20 px-4 py-1.5 text-[10px] lg:text-xs font-oswald font-black uppercase hover:border-accent text-foreground transition-colors">
                  Popular
                </button>
                <button class="border-2 border-accent/20 px-4 py-1.5 text-[10px] lg:text-xs font-oswald font-black uppercase hover:border-accent text-foreground transition-colors">
                  Devlog
                </button>
              </div>
              <span class="text-[9px] sm:text-[10px] font-oswald font-bold text-foreground/40 uppercase">
                Displaying 1-10 of 42
              </span>
            </div>

            <div class="divide-y-2 divide-accent">
              <For each={listPosts}>
                {(post) => (
                  <article class="p-6 lg:p-12 hover:bg-primary/5 transition-colors group">
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div class="md:col-span-2 text-center md:text-left">
                        <span class="font-oswald font-black text-5xl lg:text-6xl text-foreground/10 group-hover:text-primary transition-colors italic">
                          {post.number}
                        </span>
                        <p class="text-[9px] lg:text-[10px] font-oswald font-bold text-foreground/40 uppercase mt-2">
                          {post.date}
                        </p>
                      </div>
                      <div class="md:col-span-10">
                        <div class="flex flex-wrap gap-2 mb-4">
                          <For each={post.tags}>
                            {(tag) => (
                              <span class="border-2 border-accent/20 px-2 py-0.5 text-[8px] lg:text-[10px] font-oswald font-black uppercase text-foreground">
                                {tag}
                              </span>
                            )}
                          </For>
                        </div>
                        <A
                          href={`/blog/${post.slug}`}
                          class="block group-hover:translate-x-2 transition-transform duration-300"
                        >
                          <h2 class="font-oswald text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic text-foreground">
                            {post.title}
                          </h2>
                          <p class="font-oswald font-bold text-xs lg:text-sm text-foreground/40 uppercase max-w-2xl line-clamp-2">
                            {post.excerpt}
                          </p>
                        </A>
                        <div class="mt-6 flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="w-6 h-6 border-2 border-accent bg-primary flex items-center justify-center text-[8px] font-oswald font-black text-black">
                              {post.author.initials}
                            </div>
                            <span class="font-oswald font-black text-xs uppercase text-foreground">
                              {post.author.name}
                            </span>
                          </div>
                          <div class="flex gap-4 text-xs font-oswald font-bold text-foreground/40 uppercase">
                            <span class="flex items-center gap-1">
                              <span class="text-foreground">♡</span>{' '}
                              {post.comments_count}
                            </span>
                            <span class="flex items-center gap-1">
                              <span class="text-foreground">◷</span>{' '}
                              {post.read_time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )}
              </For>
            </div>

            <div class="p-12 text-center border-t-2 border-accent">
              <Button variant="primary" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
}
