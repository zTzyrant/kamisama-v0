import { createSignal, onMount, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { useNavigate, useParams } from "@solidjs/router";
import { articlesApi } from "~/lib/api";

export default function EditArticle() {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = createSignal(false);
    const [fetching, setFetching] = createSignal(true);
    const [error, setError] = createSignal<string | null>(null);

    const [title, setTitle] = createSignal("");
    const [content, setContent] = createSignal("");
    const [excerpt, setExcerpt] = createSignal("");
    const [status, setStatus] = createSignal("draft");
    const [visibility, setVisibility] = createSignal("public");
    const [availableTags, setAvailableTags] = createSignal<any[]>([]);
    const [selectedTags, setSelectedTags] = createSignal<string[]>([]);

    onMount(async () => {
        const articleId = params.id;
        if (!articleId) {
            setError("No article ID provided");
            return;
        }

        try {
            // Fetch Tags
            const tagsRes = await articlesApi.getTags();
            if (tagsRes.data.status === 'success') {
                setAvailableTags(tagsRes.data.data);
            }

            // Fetch Article
            const articleRes = await articlesApi.get(articleId);
            if (articleRes.data.status === 'success') {
                const article = articleRes.data.data;
                setTitle(article.title);
                setContent(article.content);
                setExcerpt(article.excerpt || "");
                setStatus(article.status);
                setVisibility(article.visibility);
                setSelectedTags(article.tags.map((t: any) => t.id));
            } else {
                setError(articleRes.data.message || 'Failed to fetch article');
            }
        } catch (err: any) {
            console.error("Failed to fetch data", err);
            setError('Failed to load article data');
        } finally {
            setFetching(false);
        }
    });

    const toggleTag = (tagId: string) => {
        if (selectedTags().includes(tagId)) {
            setSelectedTags(selectedTags().filter(id => id !== tagId));
        } else {
            setSelectedTags([...selectedTags(), tagId]);
        }
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            title: title(),
            content: content(),
            excerpt: excerpt(),
            status: status(),
            visibility: visibility(),
            tags: selectedTags()
        };

        try {
            if (!params.id) throw new Error("Article ID is missing");
            const res = await articlesApi.update(params.id, payload);
            if (res.data.status === 'success') {
                navigate('/dashboard/articles');
            } else {
                setError(res.data.message || 'Failed to update article');
            }
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data) {
                const data = err.response.data;
                if (Array.isArray(data.data)) {
                    const messages = data.data.map((e: any) => `${e.field}: ${e.message}`).join(', ');
                    setError(messages);
                } else {
                    setError(data.message || 'An error occurred');
                }
            } else {
                setError('Network error');
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetching()) {
        return <div class="p-12 text-center font-bold font-oswald text-xl animate-pulse uppercase">Loading Article...</div>;
    }

    return (
        <div class="max-w-4xl mx-auto space-y-8 font-mono pb-12">
            <Title>Edit Article | Dashboard</Title>

            <header class="border-b-4 border-black pb-6">
                <h1 class="font-oswald text-4xl font-black uppercase tracking-tighter">
                    EDIT <span class="bg-primary text-black px-2 border-2 border-black inline-block transform -skew-x-12">TRANSMISSION</span>
                </h1>
            </header>

            <Show when={error()}>
                <div class="p-4 bg-red-500/10 border-4 border-red-500 text-red-500 font-bold uppercase">
                    {error()}
                </div>
            </Show>

            <form onSubmit={handleSubmit} class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div class="md:col-span-2 space-y-6">
                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase text-neutral-500">Title</label>
                            <input
                                type="text"
                                value={title()}
                                onInput={(e) => setTitle(e.currentTarget.value)}
                                class="w-full bg-background border-4 border-black p-4 font-bold text-xl text-foreground focus:bg-white focus:text-black outline-none transition-colors placeholder-neutral-500"
                                placeholder="ENTER TITLE HERE"
                                required
                            />
                        </div>

                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase text-neutral-500">Content (Markdown)</label>
                            <textarea
                                value={content()}
                                onInput={(e) => setContent(e.currentTarget.value)}
                                class="w-full h-96 bg-background border-4 border-black p-4 font-mono text-foreground focus:bg-white focus:text-black outline-none transition-colors placeholder-neutral-500 resize-none"
                                placeholder="# Write your content here..."
                                required
                            ></textarea>
                        </div>

                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase text-neutral-500">Excerpt</label>
                            <textarea
                                value={excerpt()}
                                onInput={(e) => setExcerpt(e.currentTarget.value)}
                                class="w-full h-24 bg-background border-4 border-black p-4 font-mono text-foreground focus:bg-white focus:text-black outline-none transition-colors placeholder-neutral-500 resize-none"
                                placeholder="Brief summary..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div class="space-y-6">
                        <div class="bg-surface border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4">
                            <h3 class="font-oswald font-bold uppercase border-b-2 border-black pb-2">Publishing</h3>

                            <div>
                                <label class="block text-xs font-bold uppercase text-neutral-500 mb-2">Status</label>
                                <select
                                    value={status()}
                                    onChange={(e) => setStatus(e.currentTarget.value)}
                                    class="w-full border-2 border-black bg-white p-2 font-bold uppercase"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs font-bold uppercase text-neutral-500 mb-2">Visibility</label>
                                <select
                                    value={visibility()}
                                    onChange={(e) => setVisibility(e.currentTarget.value)}
                                    class="w-full border-2 border-black bg-white p-2 font-bold uppercase"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="members">Members Only</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading()}
                                class="w-full bg-primary text-black font-oswald font-bold uppercase text-lg py-3 border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 mt-4"
                            >
                                {loading() ? 'Saving...' : 'Update Article'}
                            </button>
                        </div>

                        <div class="bg-surface border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4">
                            <h3 class="font-oswald font-bold uppercase border-b-2 border-black pb-2">Tags</h3>
                            <div class="flex flex-wrap gap-2">
                                <For each={availableTags()}>
                                    {(tag) => (
                                        <button
                                            type="button"
                                            onClick={() => toggleTag(tag.id)}
                                            class={`px-2 py-1 text-xs font-bold uppercase border-2 border-black transition-all ${selectedTags().includes(tag.id)
                                                ? 'bg-black text-white'
                                                : 'bg-white text-black hover:bg-neutral-200'
                                                }`}
                                        >
                                            {tag.name}
                                        </button>
                                    )}
                                </For>
                                <Show when={availableTags().length === 0}>
                                    <p class="text-xs text-neutral-500 italic">No tags available.</p>
                                </Show>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
