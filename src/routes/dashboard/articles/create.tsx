import { createSignal, createEffect, onMount } from 'solid-js';
import { Title } from '@solidjs/meta';
import { marked } from 'marked';
import {
  Bold,
  Italic,
  Link,
  Image as ImageIcon,
  Code,
  List,
  Type,
  Save,
  Eye,
  PenTool,
  Youtube
} from 'lucide-solid';
import Button from '~/components/ui/Button';

// Setup marked with syntax highlighting (basic integration)
// In a real app we might want to configure highlight.js more deeply or use a plugin
marked.setOptions({
  breaks: true,
  gfm: true
});

export default function CreateArticle() {
  const [content, setContent] = createSignal(
    '# Hello World\n\nStart writing your brutalist masterpiece here...'
  );
  const [title, setTitle] = createSignal('');
  const [slug, setSlug] = createSignal('');
  const [coverImage, setCoverImage] = createSignal('');
  const [isPreviewMode, setIsPreviewMode] = createSignal(false); // Mobile toggle
  const [htmlContent, setHtmlContent] = createSignal('');

  // Update HTML when content changes
  createEffect(async () => {
    const raw = content();
    // Parse markdown (async in marked 12+ if using async extensions, but usually sync)
    const parsed = await marked.parse(raw);
    setHtmlContent(parsed);
  });

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById(
      'markdown-editor'
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end);

    const newText =
      text.substring(0, start) +
      before +
      selection +
      after +
      text.substring(end);
    setContent(newText);

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div class="h-[calc(100vh-8rem)] flex flex-col font-inter">
      <Title>New Article | DAKOPI ADMIN</Title>

      {/* Top Bar: Metadata & Actions */}
      <div class="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div class="flex-1 w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="ARTICLE TITLE"
            class="bg-surface border-2 border-accent p-3 font-oswald font-bold text-lg uppercase text-foreground focus:border-primary outline-none"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="URL SLUG"
            class="bg-background border-2 border-accent p-3 font-oswald font-bold text-sm text-foreground focus:border-primary outline-none"
            value={slug()}
            onInput={(e) => setSlug(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="COVER IMAGE URL"
            class="bg-background border-2 border-accent p-3 font-oswald font-bold text-sm text-foreground focus:border-primary outline-none"
            value={coverImage()}
            onInput={(e) => setCoverImage(e.currentTarget.value)}
          />
        </div>
        <div class="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            class="hidden lg:flex"
            onClick={() => alert('Saved to Drafts (Simulated)')}
          >
            Save Draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => alert('Published (Simulated)')}
          >
            <Save size={16} class="mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {/* Editor Container */}
      <div class="flex-1 flex flex-col border-2 border-accent bg-surface overflow-hidden relative">
        {/* Toolbar */}
        <div class="bg-background border-b-2 border-accent p-2 flex gap-1 flex-wrap items-center">
          <div class="flex items-center gap-1 border-r-2 border-accent/20 pr-2 mr-2">
            <button
              onClick={() => insertText('**', '**')}
              class="p-2 hover:bg-primary hover:text-black transition-colors"
              title="Bold"
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => insertText('*', '*')}
              class="p-2 hover:bg-primary hover:text-black transition-colors"
              title="Italic"
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => insertText('# ')}
              class="p-2 hover:bg-primary hover:text-black transition-colors"
              title="Heading 1"
            >
              <Type size={16} />
            </button>
          </div>
          <div class="flex items-center gap-1 border-r-2 border-accent/20 pr-2 mr-2">
            <button
              onClick={() => insertText('- ')}
              class="p-2 hover:bg-primary hover:text-black transition-colors"
              title="List"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => insertText('[', '](url)')}
              class="p-2 hover:bg-primary hover:text-black transition-colors"
              title="Link"
            >
              <Link size={16} />
            </button>
            <button
              onClick={() => insertText('![alt](', ')')}
              class="p-2 hover:bg-primary hover:text-black transition-colors"
              title="Image"
            >
              <ImageIcon size={16} />
            </button>
          </div>
          <div class="flex items-center gap-1">
            <button
              onClick={() => insertText('```\n', '\n```')}
              class="p-2 hover:bg-primary hover:text-black transition-colors"
              title="Code Block"
            >
              <Code size={16} />
            </button>
            <button
              onClick={() =>
                insertText(
                  '<iframe width="100%" height="400" src="',
                  '"></iframe>'
                )
              }
              class="p-2 hover:bg-primary hover:text-black transition-colors"
              title="Embed"
            >
              <Youtube size={16} />
            </button>
          </div>

          {/* Mobile View Toggle */}
          <div class="ml-auto lg:hidden flex border-2 border-accent">
            <button
              onClick={() => setIsPreviewMode(false)}
              class={`p-2 font-oswald font-bold text-xs uppercase ${
                !isPreviewMode()
                  ? 'bg-primary text-black'
                  : 'bg-background text-foreground'
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setIsPreviewMode(true)}
              class={`p-2 font-oswald font-bold text-xs uppercase ${
                isPreviewMode()
                  ? 'bg-primary text-black'
                  : 'bg-background text-foreground'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Split View */}
        <div class="flex-1 flex overflow-hidden">
          {/* Editor Pane (Left) */}
          <div
            class={`flex-1 flex flex-col h-full bg-[#1e1e1e] ${
              isPreviewMode() ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <textarea
              id="markdown-editor"
              value={content()}
              onInput={(e) => setContent(e.currentTarget.value)}
              class="flex-1 w-full h-full bg-transparent text-[#d4d4d4] p-6 font-mono text-sm resize-none outline-none focus:ring-0 leading-relaxed scrollbar-hide"
              placeholder="Start writing..."
              spellcheck={false}
            ></textarea>
            <div class="bg-black/50 text-white/40 text-[10px] p-1 px-4 font-mono text-right">
              MARKDOWN
            </div>
          </div>

          {/* Preview Pane (Right) */}
          <div
            class={`flex-1 flex-col h-full bg-background border-l-2 border-accent overflow-hidden ${
              !isPreviewMode() ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div class="flex-1 p-8 overflow-y-auto prose-brutalist">
              {/* Simulated Article Header for Preview Context */}
              <div class="mb-8 border-b-2 border-accent pb-8">
                <h1 class="font-oswald text-4xl lg:text-6xl font-black uppercase italic leading-tight text-foreground">
                  {title() || 'Untitled Article'}
                </h1>
              </div>

              {/* Rendered Content */}
              <div
                class="text-foreground [&>h1]:font-oswald [&>h1]:font-black [&>h1]:text-4xl [&>h1]:uppercase [&>h1]:mb-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>pre]:bg-black [&>pre]:p-4 [&>pre]:text-white [&>pre]:overflow-x-auto [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>img]:border-2 [&>img]:border-accent [&>img]:w-full"
                innerHTML={htmlContent()}
              />
            </div>
            <div class="bg-primary text-black text-[10px] p-1 px-4 font-oswald font-bold text-right uppercase">
              Live Preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
