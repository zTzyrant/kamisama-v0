import { createSignal, onMount, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { articlesApi } from "~/lib/api";
import { formatDate } from "~/lib/utils"; // Assuming utils exists, or I will create it. If not, I'll inline.
// I will inline formatDate for now to avoid dependency issues if utils doesn't exist.



export default function ArticlesIndex() {
    const [articles, setArticles] = createSignal<any[]>([]);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal<string | null>(null);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const res = await articlesApi.list({ limit: 100 }); // Fetch 100 for now
            if (res.data.status === 'success') {
                setArticles(res.data.data.data);
            } else {
                setError(res.data.message || 'Failed to fetch articles');
            }
        } catch (err: any) {
            console.error(err);
            setError('Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;

        try {
            await articlesApi.delete(id);
            // Optimistic update or refetch
            setArticles(articles().filter(a => a.id !== id));
        } catch (err) {
            alert('Failed to delete article');
        }
    };

    onMount(() => {
        fetchArticles();
    });

    return (
        <div class="space-y-8 font-mono">
            <Title>Articles | Dashboard</Title>

            <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black pb-6">
                <div>
                    <h1 class="font-oswald text-4xl font-black uppercase tracking-tighter">
                        ARTICLE <span class="bg-primary text-black px-2 border-2 border-black inline-block transform skew-x-12">ARCHIVE</span>
                    </h1>
                    <p class="text-neutral-500 font-bold uppercase tracking-widest mt-2">Manage your content stream</p>
                </div>
                <A
                    href="/dashboard/articles/create"
                    class="bg-black text-white font-oswald font-bold uppercase py-3 px-6 border-2 border-transparent hover:bg-primary hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    + Create New
                </A>
            </header>

            <Show when={error()}>
                <div class="p-4 bg-red-500/10 border-4 border-red-500 text-red-500 font-bold uppercase">
                    {error()}
                </div>
            </Show>

            <div class="bg-surface border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-black text-white uppercase text-xs tracking-wider font-oswald">
                                <th class="p-4 border-r border-neutral-700">Title</th>
                                <th class="p-4 border-r border-neutral-700">Status</th>
                                <th class="p-4 border-r border-neutral-700">Tags</th>
                                <th class="p-4 border-r border-neutral-700">Date</th>
                                <th class="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y-2 divide-black">
                            <Show when={loading()}>
                                <tr>
                                    <td colspan="5" class="p-8 text-center animate-pulse font-bold uppercase">Loading Archive...</td>
                                </tr>
                            </Show>

                            <Show when={!loading() && articles().length === 0}>
                                <tr>
                                    <td colspan="5" class="p-8 text-center font-bold uppercase text-neutral-500">No articles found. Create one to get started.</td>
                                </tr>
                            </Show>

                            <For each={articles()}>
                                {(article) => (
                                    <tr class="hover:bg-primary/5 transition-colors group">
                                        <td class="p-4 border-r-2 border-black font-bold">
                                            <div class="truncate max-w-xs">{article.title}</div>
                                            <div class="text-[10px] text-neutral-500 font-mono mt-1">{article.id}</div>
                                        </td>
                                        <td class="p-4 border-r-2 border-black">
                                            <span class={`px-2 py-1 text-xs font-bold uppercase border border-black ${article.status === 'published' ? 'bg-green-400' : 'bg-neutral-200'
                                                }`}>
                                                {article.status}
                                            </span>
                                        </td>
                                        <td class="p-4 border-r-2 border-black">
                                            <div class="flex flex-wrap gap-1">
                                                <For each={article.tags}>
                                                    {(tag: any) => (
                                                        <span class="text-[10px] bg-black text-white px-1">#{tag.slug}</span>
                                                    )}
                                                </For>
                                            </div>
                                        </td>
                                        <td class="p-4 border-r-2 border-black text-sm">
                                            {formatDate(article.created_at)}
                                        </td>
                                        <td class="p-4">
                                            <div class="flex justify-center gap-2">
                                                <A
                                                    href={`/dashboard/articles/${article.id}`}
                                                    class="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
                                                    title="Edit"
                                                >
                                                    ✎
                                                </A>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    class="p-2 border-2 border-black hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </For>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
