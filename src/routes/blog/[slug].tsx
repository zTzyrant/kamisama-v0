import { createMemo, Show, For } from "solid-js";
import { useParams, A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { blogPosts } from "~/lib/blog-data";
import Button from "~/components/ui/Button";
import { ArrowLeft, Share2, Clock, MessageSquare, Heart } from "lucide-solid";

export default function BlogDetail() {
    const params = useParams();
    const post = createMemo(() => blogPosts.find((p) => p.slug === params.slug));

    return (
        <Show when={post()} fallback={<div class="pt-40 text-center font-oswald text-4xl uppercase italic">Post Not Found</div>}>
            {(p) => (
                <div class="bg-white text-black min-h-screen font-inter">
                    <Title>{p().title} | DAKOPI BLOG</Title>

                    {/* Grid Background Overlay for that premium feel */}
                    <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
                        style={{ "background-image": "radial-gradient(#000 1px, transparent 1px)", "background-size": "40px 40px" }}></div>

                    <article class="relative z-10 max-w-[1400px] mx-auto border-x-2 border-black bg-white min-h-screen">

                        {/* Top Navigation */}
                        <div class="border-b-2 border-black px-6 py-6 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-50">
                            <A href="/blog" class="flex items-center gap-2 font-oswald font-black text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                                <ArrowLeft size={16} class="group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </A>
                            <div class="flex items-center gap-4">
                                <div class="hidden md:flex gap-2">
                                    <span class="border-2 border-black/10 px-3 py-1 text-[8px] font-oswald font-black uppercase">DESIGN</span>
                                    <span class="border-2 border-black/10 px-3 py-1 text-[8px] font-oswald font-black uppercase">UX</span>
                                    <span class="border-2 border-black/10 px-3 py-1 text-[8px] font-oswald font-black uppercase">BRUTALIST</span>
                                </div>
                                <Button variant="primary" size="sm">Sign In</Button>
                                <Button variant="black" size="sm">Register</Button>
                            </div>
                        </div>

                        {/* Article Header */}
                        <header class="p-8 lg:p-20 border-b-2 border-black">
                            <h1 class="font-oswald text-6xl lg:text-[100px] font-black uppercase tracking-tighter leading-[0.85] mb-12 italic">
                                {p().title}
                            </h1>

                            <div class="flex flex-wrap items-center justify-between gap-8 border-t-2 border-black pt-8">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 border-2 border-black bg-primary flex items-center justify-center font-oswald font-black text-xl italic">
                                        {p().author.initials}
                                    </div>
                                    <div>
                                        <p class="font-oswald font-black text-xs uppercase leading-none mb-1">{p().author.name}</p>
                                        <p class="font-oswald font-bold text-[9px] text-black/40 uppercase">Published: JAN 06, 2026 • 8 MIN READ</p>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <button class="w-10 h-10 border-2 border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                        <Heart size={16} />
                                    </button>
                                    <button class="w-10 h-10 border-2 border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                        <Share2 size={16} />
                                    </button>
                                    <button class="w-10 h-10 border-2 border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                        <MessageSquare size={16} />
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div class="p-8 lg:p-12 border-b-2 border-black bg-[#f0f0f0]">
                            <div class="aspect-[21/9] border-2 border-black overflow-hidden relative group">
                                <img src={p().image} class="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" alt="" />
                            </div>
                        </div>

                        {/* Content Body */}
                        <div class="grid grid-cols-1 lg:grid-cols-12">
                            <div class="lg:col-span-8 p-8 lg:p-20 border-r-2 border-black prose-brutalist">
                                <div class="bg-primary/10 border-2 border-primary p-8 mb-12">
                                    <p class="font-oswald font-black text-xl lg:text-2xl uppercase italic leading-tight text-black/80">
                                        {p().excerpt}
                                    </p>
                                </div>

                                <div class="space-y-12">
                                    <section>
                                        <h2 class="font-oswald font-black text-3xl lg:text-4xl uppercase italic mb-6">What is Brutalist Design?</h2>
                                        <p class="font-oswald font-bold text-lg text-black/60 uppercase leading-relaxed mb-6">
                                            Brutalist web design draws inspiration from the brutalist architecture movement of the 1950s-1970s. It's characterized by bold typography, high-contrast colors, thick borders, and a rejection of subtle, polished aesthetics.
                                        </p>
                                        <p class="font-oswald font-bold text-lg text-black/60 uppercase leading-relaxed">
                                            The key principles include embracing rawness, prioritizing function over form, using bold visual elements, and breaking conventional design rules.
                                        </p>
                                    </section>

                                    <div class="bg-black p-10 relative overflow-hidden group">
                                        <div class="relative z-10 text-white font-mono text-sm leading-relaxed">
                                            <pre class="whitespace-pre-wrap">
                                                {`.brutalis-card {
  background: #d1f432;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px #000;
  font-family: 'Oswald', sans-serif;
  font-weight: 900;
}`}
                                            </pre>
                                        </div>
                                        <div class="absolute top-0 right-0 p-2 text-white/20 font-oswald font-black text-[8px] uppercase">css_snippet_v1.0.cfg</div>
                                    </div>

                                    <section>
                                        <h2 class="font-oswald font-black text-3xl lg:text-4xl uppercase italic mb-8">Key Design Elements</h2>
                                        <div class="space-y-4">
                                            <div class="border-2 border-black p-6 flex items-start gap-4">
                                                <span class="w-8 h-8 bg-black text-white flex items-center justify-center font-oswald font-black text-xs">01</span>
                                                <div>
                                                    <h4 class="font-oswald font-black text-xl uppercase mb-2">Typography</h4>
                                                    <p class="text-[10px] font-oswald font-bold text-black/40 uppercase">Big, bold, condensed fonts. Hierarchy is provided not by finesse, but by sheer scale and contrast.</p>
                                                </div>
                                            </div>
                                            <div class="border-2 border-black p-6 flex items-start gap-4">
                                                <span class="w-8 h-8 bg-black text-white flex items-center justify-center font-oswald font-black text-xs">02</span>
                                                <div>
                                                    <h4 class="font-oswald font-black text-xl uppercase mb-2">Color Palette</h4>
                                                    <p class="text-[10px] font-oswald font-bold text-black/40 uppercase">Stark, high-contrast colors like neon green, deep black, and bright white are the heart of the aesthetic.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <div class="bg-primary p-12 lg:p-16 border-4 border-black box-shadow-brutal relative">
                                        <div class="absolute top-0 right-0 w-16 h-1 bg-black"></div>
                                        <div class="absolute top-0 right-0 w-1 h-16 bg-black"></div>
                                        <h3 class="font-oswald font-black text-4xl lg:text-6xl text-center uppercase tracking-tighter italic leading-[0.85]">
                                            "BRUTALISM ISN'T JUST A TREND—IT'S A REBELLION AGAINST HOMOGENEOUS DESIGN"
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Post Navigation Sidebar */}
                            <aside class="lg:col-span-4 p-8 lg:p-12 space-y-12">
                                <div class="bg-[#f5f5f5] p-8 border-2 border-black">
                                    <h4 class="font-oswald font-black text-xl uppercase italic mb-6">Share This Article</h4>
                                    <div class="grid grid-cols-2 gap-4">
                                        <Button variant="secondary" size="sm" class="flex gap-2"><span class="text-xs">𝕏</span> Twitter</Button>
                                        <Button variant="secondary" size="sm" class="flex gap-2"><span>Ṁ</span> Medium</Button>
                                        <Button variant="secondary" size="sm" class="col-span-2">Copy Link</Button>
                                    </div>
                                </div>

                                <div>
                                    <div class="flex items-center gap-2 mb-8">
                                        <div class="w-12 h-12 bg-primary border-2 border-black flex items-center justify-center font-oswald font-black text-2xl italic">!</div>
                                        <h4 class="font-oswald font-black text-xl uppercase italic">About Alex Chen</h4>
                                    </div>
                                    <p class="text-xs font-oswald font-bold text-black/40 uppercase leading-relaxed mb-6">
                                        Senior Designer at DAKOPI STUDIO with 10+ years of experience in brutalist and experimental web design.
                                    </p>
                                    <Button variant="outline" size="sm" class="w-full">Follow</Button>
                                </div>

                                <div class="pt-12 border-t-2 border-black">
                                    <h4 class="font-oswald font-black text-xl uppercase italic mb-8 italic">Related Articles</h4>
                                    <div class="space-y-6">
                                        <For each={blogPosts.slice(2)}>
                                            {(p) => (
                                                <A href={`/blog/${p.slug}`} class="block group">
                                                    <div class="border-2 border-black p-4 group-hover:bg-primary transition-colors">
                                                        <h5 class="font-oswald font-black text-sm uppercase leading-tight mb-2 italic">{p.title}</h5>
                                                        <div class="flex justify-between items-center text-[8px] font-oswald font-bold text-black/40 uppercase">
                                                            <span>By {p.author.name}</span>
                                                            <span>8 MIN READ</span>
                                                        </div>
                                                    </div>
                                                </A>
                                            )}
                                        </For>
                                    </div>
                                </div>
                            </aside>
                        </div>

                        {/* Comments Section */}
                        <section class="p-8 lg:p-20 border-t-2 border-black bg-[#fafafa]">
                            <div class="flex items-center justify-between mb-12">
                                <h3 class="font-oswald font-black text-4xl uppercase italic">Comments (42)</h3>
                                <Button variant="primary" size="sm">Add Comment</Button>
                            </div>

                            <div class="border-2 border-black p-8 bg-white mb-12">
                                <textarea placeholder="Write your thoughts..." class="w-full h-32 font-oswald font-bold text-xs uppercase outline-none resize-none"></textarea>
                                <div class="mt-4 flex justify-end gap-3">
                                    <Button variant="ghost" size="sm">Cancel</Button>
                                    <Button variant="primary" size="sm">Post</Button>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <div class="border-2 border-black p-6 bg-white">
                                    <div class="flex items-center gap-3 mb-4">
                                        <div class="w-6 h-6 bg-primary border-2 border-black flex items-center justify-center font-oswald font-black text-[8px]">SL</div>
                                        <span class="font-oswald font-black text-[10px] uppercase">Sarah Ledger</span>
                                        <span class="text-[8px] font-oswald font-bold text-black/20 uppercase ml-auto">Jan 07, 2026</span>
                                    </div>
                                    <p class="font-oswald font-bold text-xs text-black/60 uppercase">This is exactly what I needed. The brutalist approach really stands out in today's web.</p>
                                    <div class="mt-4 flex gap-4 text-[8px] font-oswald font-black uppercase text-black/40">
                                        <span class="cursor-pointer hover:text-black transition-colors">Like</span>
                                        <span class="cursor-pointer hover:text-black transition-colors">Reply</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            )}
        </Show>
    );
}
