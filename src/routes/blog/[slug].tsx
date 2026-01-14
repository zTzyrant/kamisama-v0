import {
  createMemo,
  Show,
  For,
  createEffect,
  createSignal,
  onCleanup
} from 'solid-js';
import { useParams, A } from '@solidjs/router';
import DOMPurify from 'dompurify';
import { Title } from '@solidjs/meta';
import { blogPosts } from '~/lib/blog-data';
import Button from '~/components/ui/Button';
import { ArrowLeft, Share2, Clock, MessageSquare, Heart } from 'lucide-solid';
import BlogHeader from '~/components/BlogHeader';
import BlogFooter from '~/components/BlogFooter';
import TableOfContents from '~/components/TableOfContents';
import { extractHeadings, slugify, type TocItem } from '~/lib/toc';
import { configureMarkdown } from '~/lib/markdown';

const marked = configureMarkdown();

export default function BlogDetail() {
  const params = useParams();
  const post = createMemo(() => blogPosts.find((p) => p.slug === params.slug));
  const [htmlContent, setHtmlContent] = createSignal('');
  const [tocHeadings, setTocHeadings] = createSignal<TocItem[]>([]);

  createEffect(async () => {
    const p = post();
    if (p && p.content) {
      // Parse markdown/html content
      const raw = p.content;

      const headings = extractHeadings(raw);
      setTocHeadings(headings);

      const parsed = await marked.parse(raw);
      // Configure allowed domains for iframes
      const allowedDomains = [
        'www.youtube.com',
        'youtube.com',
        'player.vimeo.com',
        'codepen.io',
        'jsfiddle.net'
      ];

      DOMPurify.addHook('uponSanitizeElement', (node, data) => {
        if (data.tagName === 'iframe' || data.tagName === 'IFRAME') {
          // Explicitly cast to Element to resolve TypeScript errors
          const element = node as Element;

          const src = element.getAttribute('src');
          // console.log('Sanitizing iframe:', src);
          if (src) {
            try {
              const url = new URL(src);
              const isAllowed = allowedDomains.some((d) =>
                url.hostname.endsWith(d)
              );

              if (!isAllowed) {
                console.warn('Blocked domain:', url.hostname);
                element.remove();
              }
            } catch (e) {
              console.error('Invalid URL:', src);
              element.remove();
            }
          } else {
            console.warn('No src attribute found');
            element.remove();
          }
        }
      });

      const clean = DOMPurify.sanitize(parsed, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: [
          'allow',
          'allowfullscreen',
          'frameborder',
          'scrolling',
          'src',
          'width',
          'height',
          'title',
          'referrerpolicy',
          'style',
          'loading',
          'allowtransparency'
        ]
      });

      // Remove hook after usage to avoid memory leaks or affecting other sanitizations if global
      DOMPurify.removeHook('uponSanitizeElement');

      setHtmlContent(clean);
    }
  });

  // Global Copy Button Handler
  createEffect(() => {
    const handleCopy = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('.copy-code-btn')) {
        const code = decodeURIComponent(target.dataset.code || '');
        navigator.clipboard.writeText(code).then(() => {
          const originalText = target.innerText;
          target.innerText = 'COPIED!';
          setTimeout(() => (target.innerText = originalText), 2000);
        });
      }
    };

    document.addEventListener('click', handleCopy);
    onCleanup(() => document.removeEventListener('click', handleCopy));
  });

  return (
    <Show
      when={post()}
      fallback={
        <div class="pt-40 text-center font-oswald text-4xl uppercase italic text-foreground">
          Post Not Found
        </div>
      }
    >
      {(p) => (
        <div class="bg-background text-foreground min-h-screen font-inter transition-colors duration-300">
          <Title>{p().title} | DAKOPI BLOG</Title>

          {/* Grid Background Overlay */}
          <div
            class="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              'background-image':
                'radial-gradient(currentColor 1px, transparent 1px)',
              'background-size': '40px 40px'
            }}
          ></div>

          <BlogHeader />

          <article class="relative z-10 max-w-[1400px] mx-auto border-x-2 border-accent bg-background min-h-screen">
            {/* Article Header */}
            <header class="p-8 lg:p-20 border-b-2 border-accent">
              <A
                href="/blog"
                class="inline-flex items-center gap-2 font-oswald font-black text-xs uppercase tracking-widest hover:text-primary transition-colors group mb-8"
              >
                <ArrowLeft
                  size={16}
                  class="group-hover:-translate-x-1 transition-transform"
                />
                Back to Blog
              </A>

              <h1 class="font-oswald text-6xl lg:text-[100px] font-black uppercase tracking-tighter leading-[0.85] mb-12 italic text-foreground">
                {p().title}
              </h1>

              <div class="flex flex-wrap items-center justify-between gap-8 border-t-2 border-accent pt-8">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 border-2 border-accent bg-primary flex items-center justify-center font-oswald font-black text-xl italic text-black">
                    {p().author.initials}
                  </div>
                  <div>
                    <p class="font-oswald font-black text-xs uppercase leading-none mb-1 text-foreground">
                      {p().author.name}
                    </p>
                    <p class="font-oswald font-bold text-[9px] text-foreground/40 uppercase">
                      Published: {p().date} • {p().read_time} READ
                    </p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <button class="w-10 h-10 border-2 border-accent/20 flex items-center justify-center hover:bg-accent hover:text-background transition-colors text-foreground">
                    <Heart size={16} />
                  </button>
                  <button class="w-10 h-10 border-2 border-accent/20 flex items-center justify-center hover:bg-accent hover:text-background transition-colors text-foreground">
                    <Share2 size={16} />
                  </button>
                  <button class="w-10 h-10 border-2 border-accent/20 flex items-center justify-center hover:bg-accent hover:text-background transition-colors text-foreground">
                    <MessageSquare size={16} />
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div class="p-8 lg:p-12 border-b-2 border-accent bg-surface">
              <div class="aspect-[21/9] border-2 border-accent overflow-hidden relative group">
                <img
                  src={p().image}
                  class="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  alt=""
                />
              </div>
            </div>

            {/* Content Body */}
            <div class="grid grid-cols-1 lg:grid-cols-12">
              <div class="lg:col-span-8 p-8 lg:p-20 border-r-2 border-accent prose-brutalist">
                {/* Excerpt */}
                <div class="bg-primary/10 border-2 border-primary p-8 mb-12">
                  <p class="font-oswald font-black text-xl lg:text-2xl uppercase italic leading-tight text-foreground/90">
                    {p().excerpt}
                  </p>
                </div>

                {/* Dynamic Content */}
                <div
                  class="
                        text-foreground 
                        space-y-6
                        [&>h1]:font-oswald [&>h1]:font-black [&>h1]:text-4xl [&>h1]:uppercase [&>h1]:mb-6 [&>h1]:mt-8
                        [&>h2]:font-oswald [&>h2]:font-black [&>h2]:text-3xl [&>h2]:uppercase [&>h2]:mb-6 [&>h2]:mt-10 [&>h2]:italic
                        [&>h3]:font-oswald [&>h3]:font-bold [&>h3]:text-2xl [&>h3]:uppercase [&>h3]:mb-4 [&>h3]:mt-8
                        [&>h4]:font-oswald [&>h4]:font-bold [&>h4]:text-xl [&>h4]:uppercase [&>h4]:mb-3 [&>h4]:mt-6
                        
                        [&>p]:font-inter [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-lg
                        
                        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
                        [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
                        [&>li]:text-lg
                        
                        [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:font-serif [&>blockquote]:my-8 [&>blockquote]:bg-accent/5 [&>blockquote]:p-4
                        
                        [&>pre]:bg-black [&>pre]:p-6 [&>pre]:text-white [&>pre]:border-2 [&>pre]:border-accent [&>pre]:overflow-x-auto [&>pre]:mb-8 [&>pre]:font-mono [&>pre]:text-sm
                        
                        [&>img]:border-2 [&>img]:border-accent [&>img]:max-w-full [&>img]:h-auto [&>img]:mb-6
                        
                        [&>table]:w-full [&>table]:border-collapse [&>table]:border-2 [&>table]:border-accent [&>table]:mb-8
                        [&>th]:border-2 [&>th]:border-accent [&>th]:p-3 [&>th]:bg-accent/10 [&>th]:font-oswald [&>th]:font-bold [&>th]:uppercase [&>th]:text-left
                        [&>td]:border-2 [&>td]:border-accent [&>td]:p-3 [&>td]:font-mono [&>td]:text-sm
                        
                        [&>iframe]:w-full [&>iframe]:aspect-video [&>iframe]:mb-8 [&>iframe]:border-2 [&>iframe]:border-accent
                        
                        [&>a]:text-primary [&>a]:underline [&>a]:font-bold hover:[&>a]:no-underline
                    "
                  innerHTML={htmlContent()}
                />
              </div>

              {/* Post Navigation Sidebar */}
              <aside class="lg:col-span-4 p-8 lg:p-12 space-y-12">
                <div class="bg-surface p-8 border-2 border-accent">
                  <h4 class="font-oswald font-black text-xl uppercase italic mb-6 text-foreground">
                    Share This Article
                  </h4>
                  <div class="grid grid-cols-2 gap-4">
                    <Button variant="secondary" size="sm" class="flex gap-2">
                      <span class="text-xs">𝕏</span> Twitter
                    </Button>
                    <Button variant="secondary" size="sm" class="flex gap-2">
                      <span>Ṁ</span> Medium
                    </Button>
                    <Button variant="secondary" size="sm" class="col-span-2">
                      Copy Link
                    </Button>
                  </div>
                </div>

                <div class="bg-surface p-8 border-2 border-accent sticky top-24">
                  <TableOfContents headings={tocHeadings()} />
                </div>

                <div>
                  <div class="flex items-center gap-2 mb-8">
                    <div class="w-12 h-12 bg-primary border-2 border-accent flex items-center justify-center font-oswald font-black text-2xl italic text-black">
                      {p().author.initials}
                    </div>
                    <h4 class="font-oswald font-black text-xl uppercase italic text-foreground">
                      About {p().author.name}
                    </h4>
                  </div>
                  <p class="text-xs font-oswald font-bold text-foreground/40 uppercase leading-relaxed mb-6">
                    {p().author.role} at DAKOPI STUDIO with experience in
                    experimental web design.
                  </p>
                  <Button variant="outline" size="sm" class="w-full">
                    Follow
                  </Button>
                </div>

                <div class="pt-12 border-t-2 border-accent">
                  <h4 class="font-oswald font-black text-xl uppercase italic mb-8 italic text-foreground">
                    Related Articles
                  </h4>
                  <div class="space-y-6">
                    <For each={blogPosts.slice(2)}>
                      {(rel) => (
                        <A href={`/blog/${rel.slug}`} class="block group">
                          <div class="border-2 border-accent p-4 group-hover:bg-primary transition-colors">
                            <h5 class="font-oswald font-black text-sm uppercase leading-tight mb-2 italic text-foreground group-hover:text-black">
                              {rel.title}
                            </h5>
                            <div class="flex justify-between items-center text-[8px] font-oswald font-bold text-foreground/40 group-hover:text-black/60 uppercase">
                              <span>By {rel.author.name}</span>
                              <span>{rel.read_time} READ</span>
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
            <section class="p-8 lg:p-20 border-t-2 border-accent bg-surface">
              <div class="flex items-center justify-between mb-12">
                <h3 class="font-oswald font-black text-4xl uppercase italic text-foreground">
                  Comments ({p().comments_count})
                </h3>
                <Button variant="primary" size="sm">
                  Add Comment
                </Button>
              </div>

              {/* Comment form omitted for brevity but standard logic applies */}
              <div class="border-2 border-accent p-8 bg-background mb-12">
                <textarea
                  placeholder="Write your thoughts..."
                  class="w-full h-full font-oswald font-bold text-xs uppercase outline-none resize-none bg-background text-foreground p-4"
                ></textarea>
                <div class="mt-4 flex justify-end gap-3">
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm">
                    Post
                  </Button>
                </div>
              </div>
            </section>
          </article>

          <BlogFooter />
        </div>
      )}
    </Show>
  );
}
