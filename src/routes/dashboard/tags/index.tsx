import { createSignal, onMount, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { articlesApi } from "~/lib/api";
import { formatDate } from "~/lib/utils";

export default function TagsIndex() {
    const [tags, setTags] = createSignal<any[]>([]);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal<string | null>(null);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const res = await articlesApi.getTags();
            if (res.data.status === 'success') {
                setTags(res.data.data);
            } else {
                setError(res.data.message || 'Failed to fetch tags');
            }
        } catch (err: any) {
            console.error(err);
            setError('Failed to load tags');
        } finally {
            setLoading(false);
        }
    };

    onMount(() => {
        fetchTags();
    });

    return (
        <div class="space-y-8 font-mono">
            <Title>Tags | Dashboard</Title>

            <header class="border-b-4 border-black pb-6">
                <h1 class="font-oswald text-4xl font-black uppercase tracking-tighter">
                    TAG <span class="bg-primary text-black px-2 border-2 border-black inline-block transform skew-y-3">CLOUD</span>
                </h1>
                <p class="text-neutral-500 font-bold uppercase tracking-widest mt-2">Manage content taxonomy</p>
            </header>

            <Show when={error()}>
                <div class="p-4 bg-red-500/10 border-4 border-red-500 text-red-500 font-bold uppercase">
                    {error()}
                </div>
            </Show>

            <div class="bg-surface border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                <Show when={loading()}>
                    <div class="p-8 text-center animate-pulse font-bold uppercase">Loading Tags...</div>
                </Show>

                <Show when={!loading() && tags().length === 0}>
                    <p class="text-center font-bold uppercase text-neutral-500">No tags found.</p>
                </Show>

                <div class="flex flex-wrap gap-4">
                    <For each={tags()}>
                        {(tag) => (
                            <div class="group relative bg-white border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="font-bold text-lg font-oswald uppercase">#{tag.name}</span>
                                    <span class="text-[10px] bg-neutral-200 px-1 font-mono">{tag.slug}</span>
                                </div>
                                <div class="text-[10px] text-neutral-500 font-mono">
                                    ID: {tag.id.substring(0, 8)}...
                                </div>
                                <div class="text-[10px] text-neutral-500 font-mono mt-1">
                                    Created: {formatDate(tag.created_at)}
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
}
