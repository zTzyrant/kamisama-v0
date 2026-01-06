import { For } from "solid-js";
import { Title } from "@solidjs/meta";
import { blogPosts, BlogPost } from "~/lib/blog-data";
import Button from "~/components/ui/Button";
import { A } from "@solidjs/router";
import { Search } from "lucide-solid";

export default function BlogList() {
    const featured = blogPosts[0];
    const listPosts = blogPosts.slice(1);

    return (
        <div class="bg-white text-black min-h-screen font-inter">
            <Title>DAKOPI BLOG</Title>

            {/* Header */}
            <header class="border-b-2 border-black sticky top-0 bg-white z-50">
                <div class="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">
                    <div class="flex items-center gap-2">
                        <span class="bg-black text-primary px-2 py-0.5 font-oswald font-black text-2xl italic">DAKOPI</span>
                        <span class="font-oswald font-black text-2xl">BLOG</span>
                    </div>

                    <nav class="hidden lg:flex items-center gap-10 font-oswald font-bold text-xs uppercase tracking-widest">
                        <A href="/blog" class="hover:text-primary transition-colors">Articles</A>
                        <A href="#" class="hover:text-primary transition-colors">Projects</A>
                        <A href="#" class="hover:text-primary transition-colors">Community</A>
                    </nav>

                    <div class="flex items-center gap-4">
                        <div class="relative hidden sm:block">
                            <input
                                type="text"
                                placeholder="SEARCH..."
                                class="bg-[#f0f0f0] border-2 border-black/10 px-4 py-2 text-[10px] font-oswald font-bold w-64 outline-none focus:border-black"
                            />
                            <Search size={14} class="absolute right-3 top-1/2 -translate-y-1/2 text-black/40" />
                        </div>
                        <Button variant="black" size="sm">Sign In</Button>
                    </div>
                </div>
            </header>

            <main class="max-w-[1400px] mx-auto border-x-2 border-black min-h-screen">

                {/* Featured Hero */}
                <section class="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-black">
                    <div class="lg:col-span-7 p-8 lg:p-16 flex flex-col justify-center">
                        <div class="mb-8">
                            <span class="bg-primary text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{featured.category}</span>
                            <span class="ml-4 text-xs font-oswald font-bold text-black/40">{featured.date}</span>
                        </div>
                        <h1 class="font-oswald text-7xl lg:text-[120px] font-black leading-[0.85] uppercase tracking-tighter mb-8 italic">
                            THE FUTURE OF<br />
                            <span class="text-primary italic">WEB SIMPLICITY</span>
                        </h1>
                        <p class="font-oswald font-bold text-lg text-black/60 max-w-lg mb-10 leading-tight uppercase">
                            {featured.excerpt}
                        </p>
                        <div class="flex gap-4">
                            <Button variant="primary" size="lg">Read Article</Button>
                            <Button variant="secondary" size="lg">View Showcase</Button>
                        </div>
                    </div>
                    <div class="lg:col-span-5 bg-[#e0e0e0] relative min-h-[400px] border-l-2 border-black">
                        <img src={featured.image} class="w-full h-full object-cover grayscale" />
                        <div class="absolute bottom-4 left-4 bg-primary text-black px-2 py-1 text-[10px] font-bold uppercase">
                            Digital Art by @AlexChen
                        </div>
                    </div>
                </section>

                {/* Tags Bar */}
                <div class="bg-primary border-b-2 border-black overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div class="flex items-center px-4 py-3 gap-8">
                        <For each={featured.tags}>
                            {(tag) => (
                                <div class="flex items-center gap-8">
                                    <span class="font-oswald font-black text-xs uppercase tracking-widest hover:underline cursor-pointer">{tag}</span>
                                    <span class="font-oswald font-black text-xs text-black/20">//</span>
                                </div>
                            )}
                        </For>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12">
                    {/* Sidebar */}
                    <aside class="lg:col-span-3 border-r-2 border-black p-8">
                        <div class="mb-12">
                            <div class="flex items-center gap-2 mb-4">
                                <span class="w-1 h-8 bg-primary"></span>
                                <h3 class="font-oswald font-black text-xl uppercase italic">About</h3>
                            </div>
                            <p class="text-xs font-bold font-oswald text-black/60 leading-relaxed uppercase">
                                Dakopi is a digital playground for bold ideas. We challenge conventional design norms and celebrate the raw beauty of code.
                            </p>
                            <button class="mt-4 font-oswald font-black text-[10px] uppercase underline tracking-widest">More About Us →</button>
                        </div>

                        <div class="mb-12">
                            <div class="flex items-center gap-2 mb-6">
                                <span class="w-1 h-8 bg-primary"></span>
                                <h3 class="font-oswald font-black text-xl uppercase italic">Top Voices</h3>
                            </div>
                            <div class="space-y-6">
                                <For each={blogPosts.map(p => p.author).slice(0, 3)}>
                                    {(author) => (
                                        <div class="flex items-center gap-4">
                                            <div class="w-10 h-10 border-2 border-black flex items-center justify-center font-oswald font-black text-xs bg-[#f0f0f0]">
                                                {author.initials}
                                            </div>
                                            <div>
                                                <p class="font-oswald font-black text-xs uppercase leading-none">{author.name}</p>
                                                <p class="font-oswald font-bold text-[9px] text-black/40 uppercase mt-1">{author.role}</p>
                                            </div>
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>

                        <div class="bg-black p-6 text-white border-2 border-black">
                            <h4 class="font-oswald font-black text-sm uppercase italic mb-4">Join the Rebellion</h4>
                            <div class="space-y-3">
                                <input type="text" placeholder="EMAIL ADDRESS" class="w-full bg-white/10 border-2 border-white/20 px-4 py-2 font-oswald font-bold text-xs text-white outline-none" />
                                <Button variant="primary" class="w-full" size="sm">Subscribe</Button>
                            </div>
                        </div>
                    </aside>

                    {/* Post List */}
                    <div class="lg:col-span-9">
                        <div class="border-b-2 border-black px-6 py-4 flex items-center justify-between">
                            <div class="flex gap-2">
                                <button class="bg-black text-white px-4 py-1.5 text-[10px] font-oswald font-black uppercase">Latest</button>
                                <button class="border-2 border-black/10 px-4 py-1.5 text-[10px] font-oswald font-black uppercase hover:border-black">Popular</button>
                                <button class="border-2 border-black/10 px-4 py-1.5 text-[10px] font-oswald font-black uppercase hover:border-black">Devlog</button>
                            </div>
                            <span class="text-[9px] font-oswald font-bold text-black/40 uppercase">Displaying 1-10 of 42</span>
                        </div>

                        <div class="divide-y-2 divide-black">
                            <For each={listPosts}>
                                {(post) => (
                                    <article class="p-8 lg:p-12 hover:bg-primary/5 transition-colors group">
                                        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                            <div class="md:col-span-2 text-center md:text-left">
                                                <span class="font-oswald font-black text-5xl text-black/10 group-hover:text-primary transition-colors italic">{post.number}</span>
                                                <p class="text-[9px] font-oswald font-bold text-black/40 uppercase mt-2">{post.date}</p>
                                            </div>
                                            <div class="md:col-span-10">
                                                <div class="flex flex-wrap gap-2 mb-4">
                                                    <For each={post.tags}>
                                                        {(tag) => <span class="border-2 border-black/10 px-2 py-0.5 text-[8px] font-oswald font-black uppercase">{tag}</span>}
                                                    </For>
                                                </div>
                                                <A href={`/blog/${post.slug}`} class="block group-hover:translate-x-2 transition-transform duration-300">
                                                    <h2 class="font-oswald text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic">
                                                        {post.title}
                                                    </h2>
                                                    <p class="font-oswald font-bold text-xs text-black/40 uppercase max-w-2xl line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                </A>
                                                <div class="mt-6 flex items-center justify-between">
                                                    <div class="flex items-center gap-3">
                                                        <div class="w-6 h-6 border-2 border-black bg-primary flex items-center justify-center text-[8px] font-oswald font-black">
                                                            {post.author.initials}
                                                        </div>
                                                        <span class="font-oswald font-black text-[9px] uppercase">{post.author.name}</span>
                                                    </div>
                                                    <div class="flex gap-4 text-[9px] font-oswald font-bold text-black/40 uppercase">
                                                        <span class="flex items-center gap-1"><span class="text-black">♡</span> {post.comments_count}</span>
                                                        <span class="flex items-center gap-1"><span class="text-black">◷</span> {post.read_time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )}
                            </For>
                        </div>

                        <div class="p-12 text-center border-t-2 border-black">
                            <Button variant="primary" size="lg">Load More Articles</Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer class="bg-black text-white p-12 lg:p-20 border-t-4 border-primary">
                <div class="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div class="col-span-1 md:col-span-1">
                        <div class="flex items-center gap-2 mb-8">
                            <span class="bg-primary text-black px-2 py-0.5 font-oswald font-black text-xl italic">DAKOPI</span>
                            <span class="font-oswald font-black text-xl">BLOG</span>
                        </div>
                        <p class="text-[10px] font-oswald font-bold text-white/40 uppercase leading-relaxed mb-8">
                            The boldest developer community on the web. No fluff, just code and design.
                        </p>
                        <div class="flex gap-4">
                            <div class="w-10 h-10 border-2 border-white/20 flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
                                <span class="text-xs">{"<>"}</span>
                            </div>
                            <div class="w-10 h-10 border-2 border-white/20 flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
                                <span class="text-xs">{"@"}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-oswald font-black text-xs uppercase mb-8 tracking-widest text-primary italic">Community</h4>
                        <ul class="space-y-4 text-[10px] font-oswald font-bold uppercase text-white/40">
                            <li class="hover:text-white cursor-pointer transition-colors">Home</li>
                            <li class="hover:text-white cursor-pointer transition-colors">Articles</li>
                            <li class="hover:text-white cursor-pointer transition-colors">Videos</li>
                            <li class="hover:text-white cursor-pointer transition-colors">Podcasts</li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-oswald font-black text-xs uppercase mb-8 tracking-widest text-primary italic">Resources</h4>
                        <ul class="space-y-4 text-[10px] font-oswald font-bold uppercase text-white/40">
                            <li class="hover:text-white cursor-pointer transition-colors">Documentation</li>
                            <li class="hover:text-white cursor-pointer transition-colors">Guides</li>
                            <li class="hover:text-white cursor-pointer transition-colors">FAQ</li>
                            <li class="hover:text-white cursor-pointer transition-colors">About</li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-oswald font-black text-xs uppercase mb-8 tracking-widest text-primary italic">Connect</h4>
                        <ul class="space-y-4 text-[10px] font-oswald font-bold uppercase text-white/40">
                            <li class="hover:text-white cursor-pointer transition-colors">Twitter / X</li>
                            <li class="hover:text-white cursor-pointer transition-colors">Github</li>
                            <li class="hover:text-white cursor-pointer transition-colors">Discord</li>
                            <li class="hover:text-white cursor-pointer transition-colors">LinkedIn</li>
                        </ul>
                    </div>
                </div>
                <div class="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/10 flex justify-between items-center text-[8px] font-oswald font-bold uppercase text-white/20">
                    <span>© 2026 DAKOPI STUDIO - ALL RIGHTS RESERVED</span>
                    <div class="flex gap-6">
                        <span class="hover:text-white cursor-pointer transition-colors">Privacy</span>
                        <span class="hover:text-white cursor-pointer transition-colors">Terms</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
