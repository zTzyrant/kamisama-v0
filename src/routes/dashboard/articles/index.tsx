import { Title } from "@solidjs/meta";
import { Link, Eye, Search, ChevronLeft, ChevronRight, Info, Filter, Calendar, User, Edit, BarChart2, Trash2, Plus } from "lucide-solid";
import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";

export default function ArticlesList() {
    const [filterStatus, setFilterStatus] = createSignal("all");

    // Dummy data for articles
    const [articles] = createSignal([
        {
            id: 0,
            title: "Markdown Features Showcase",
            status: "Published",
            date: "Jan 07, 2026",
            author: "System Admin",
            views: "0"
        },
        {
            id: 1,
            title: "The Rise of Brutalism in 2024",
            status: "Published",
            date: "Oct 24, 2023",
            author: "John Doe",
            views: "1.2k"
        },
        {
            id: 2,
            title: "Typography Rules for Developers",
            status: "Draft",
            date: "Oct 12, 2023",
            author: "Jane Smith",
            views: "0"
        },
        {
            id: 3,
            title: "Understanding SolidJS Signals",
            status: "Published",
            date: "Sep 28, 2023",
            author: "John Doe",
            views: "854"
        }
    ]);

    return (
        <>
            <Title>Articles | DAKOTA ADMIN</Title>

            <header class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 class="text-5xl md:text-7xl font-oswald font-bold italic uppercase leading-none text-foreground">
                        Articles
                    </h2>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right hidden md:block">
                        <div class="text-3xl font-oswald font-bold text-primary">24</div>
                        <div class="text-xs uppercase font-bold text-neutral-500">Published</div>
                    </div>
                    <div class="h-10 w-[2px] bg-accent hidden md:block"></div>
                    <A
                        href="/dashboard/articles/create"
                        class="bg-foreground text-background font-oswald font-bold uppercase py-3 px-6 hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                        <Plus class="w-4 h-4" />
                        Create New Article
                    </A>
                </div>
            </header>

            {/* Toolbar */}
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div class="flex gap-4 w-full md:w-auto">
                    <div class="relative flex-1 md:w-80">
                        <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                        <input
                            class="w-full bg-background border-2 border-accent text-sm font-bold p-4 pl-12 uppercase focus:ring-0 focus:border-primary placeholder-neutral-500 transition-colors text-foreground outline-none"
                            placeholder="SEARCH ARTICLES..."
                            type="text"
                        />
                    </div>
                    <button class="bg-background border-2 border-accent p-4 text-neutral-500 hover:border-primary hover:text-foreground transition-colors">
                        <Filter class="w-5 h-5" />
                    </button>
                </div>

                <div class="flex gap-2">
                    <button class="px-4 py-2 font-mono text-xs font-bold uppercase bg-primary text-black border-2 border-transparent">All Posts</button>
                    <button class="px-4 py-2 font-mono text-xs font-bold uppercase bg-background border-2 border-accent text-neutral-500 hover:text-foreground hover:border-foreground transition-colors">Published</button>
                    <button class="px-4 py-2 font-mono text-xs font-bold uppercase bg-background border-2 border-accent text-neutral-500 hover:text-foreground hover:border-foreground transition-colors">Drafts</button>
                </div>
            </div>

            <div class="mb-6 flex items-start gap-3 text-xs text-neutral-500 border-l-2 border-primary pl-3 py-1">
                <Info class="w-4 h-4" />
                <p>NOTE: EDITING OR DELETING CONTENT IS ONLY AVAILABLE IN THE "VIEW ARTICLE" SCREEN TO PREVENT ACCIDENTAL DATA LOSS.</p>
            </div>

            {/* Articles List */}
            <div class="space-y-4">
                <For each={articles()}>
                    {(article) => (
                        <div class="group relative border-2 border-accent bg-background hover:border-primary transition-colors p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
                            {/* Status Indicator */}
                            <div class="absolute top-0 left-0 w-1 h-full bg-accent group-hover:bg-primary transition-colors"></div>

                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class={`font-mono text-[10px] font-bold uppercase px-2 py-1 ${article.status === 'Published' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                        {article.status}
                                    </span>
                                    <span class="font-mono text-[10px] text-neutral-500 uppercase flex items-center gap-1">
                                        <Calendar class="w-3 h-3" /> {article.date}
                                    </span>
                                </div>
                                <h3 class="font-oswald text-2xl md:text-3xl font-bold uppercase italic text-foreground mb-2 group-hover:underline decoration-primary decoration-4 underline-offset-4 cursor-pointer">
                                    {article.title}
                                </h3>
                                <div class="flex items-center gap-4 text-xs font-mono text-neutral-500">
                                    <span class="flex items-center gap-1"><User class="w-3 h-3" /> {article.author}</span>
                                    <span class="flex items-center gap-1"><Eye class="w-3 h-3" /> {article.views}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div class="flex items-center gap-3 md:border-l-2 md:border-accent md:pl-6 md:h-16">
                                <button
                                    class="w-10 h-10 flex items-center justify-center border-2 border-accent text-neutral-500 hover:bg-primary hover:text-black hover:border-primary transition-colors"
                                    title="Edit"
                                >
                                    <Edit class="w-4 h-4" />
                                </button>
                                <button
                                    class="w-10 h-10 flex items-center justify-center border-2 border-accent text-neutral-500 hover:bg-primary hover:text-black hover:border-primary transition-colors"
                                    title="View Stats"
                                >
                                    <BarChart2 class="w-4 h-4" />
                                </button>
                                <button
                                    class="w-10 h-10 flex items-center justify-center border-2 border-accent text-neutral-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </For>
            </div>

            {/* Pagination (Visual) */}
            <div class="flex items-center justify-between mt-12 border-t-2 border-accent pt-6">
                <span class="font-mono text-xs text-neutral-500 uppercase font-bold">Showing 1-5 of 12</span>
                <div class="flex gap-2">
                    <button class="w-10 h-10 border-2 border-accent flex items-center justify-center hover:bg-foreground hover:text-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
                        <ChevronLeft class="w-5 h-5" />
                    </button>
                    <div class="flex items-center justify-center w-10 h-10 bg-primary font-mono font-bold text-black border-2 border-accent">1</div>
                    <button class="w-10 h-10 border-2 border-accent flex items-center justify-center hover:bg-foreground hover:text-background transition-colors text-foreground">2</button>
                    <button class="w-10 h-10 border-2 border-accent flex items-center justify-center hover:bg-foreground hover:text-background transition-colors text-foreground">3</button>
                    <button class="w-10 h-10 border-2 border-accent flex items-center justify-center hover:bg-foreground hover:text-background transition-colors text-foreground">
                        <ChevronRight class="w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    );
}
