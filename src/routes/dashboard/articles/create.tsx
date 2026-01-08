import { createSignal, createEffect, Show, For, onCleanup } from "solid-js";
import { Title } from "@solidjs/meta";
import { marked } from "marked";
import DOMPurify from "dompurify";
import {
  Bold, Italic, Link, Image as ImageIcon, Code, List, Save, Youtube, Eye, Upload,
  Calendar, X, Plus, Box, Table as TableIcon, Quote, Heading, Search, AlignCenter, AlignLeft, AlignRight
} from "lucide-solid";
import InputModal from "~/components/ui/InputModal";
import SearchableSelect from "~/components/ui/SearchableSelect";
import DatePicker from "~/components/ui/DatePicker";

marked.setOptions({
  breaks: true,
  gfm: true
});

export default function CreateArticle() {
  const [content, setContent] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [isPreviewOpen, setIsPreviewOpen] = createSignal(false);
  const [htmlContent, setHtmlContent] = createSignal("");
  const [isUploading, setIsUploading] = createSignal(false);

  // Media Modal State
  const [isMediaModalOpen, setIsMediaModalOpen] = createSignal(false);
  const [mediaModalTarget, setMediaModalTarget] = createSignal<'editor' | 'featured'>('editor');
  const [featuredImage, setFeaturedImage] = createSignal<string | null>(null);
  const [mediaSearch, setMediaSearch] = createSignal("");

  // Image Options State
  const [imgWidth, setImgWidth] = createSignal("100%");
  const [imgAlign, setImgAlign] = createSignal<'left' | 'center' | 'right'>('center');
  const [imgAlt, setImgAlt] = createSignal("");

  // Input Modal State
  const [inputModalOpen, setInputModalOpen] = createSignal(false);
  const [inputModalConfig, setInputModalConfig] = createSignal({
    title: "",
    placeholder: "",
    onSubmit: (value: string) => { },
  });

  // Article Meta State
  const [status, setStatus] = createSignal("draft");
  const [visibility, setVisibility] = createSignal("public");
  const [scheduledDate, setScheduledDate] = createSignal<Date | null>(new Date());
  const [tags, setTags] = createSignal<string[]>(["Brutalism", "Design"]);
  const [toolbarDateRange, setToolbarDateRange] = createSignal<{ start: Date | null, end: Date | null }>({ start: null, end: null });

  const availableTags = [
    { label: "BRUTALISM", value: "Brutalism" },
    { label: "DESIGN", value: "Design" },
    { label: "DEVELOPMENT", value: "Development" },
    { label: "TUTORIAL", value: "Tutorial" },
    { label: "NEWS", value: "News" },
    { label: "SOLIDJS", value: "SolidJS" },
    { label: "TAILWIND", value: "Tailwind" },
  ];

  const addTag = (tag: string) => {
    if (tag && !tags().includes(tag)) {
      setTags([...tags(), tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags().filter(t => t !== tagToRemove));
  };

  // Dummy Media Items
  const allMediaItems = [
    { id: 1, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", name: "abstract_01.jpg" },
    { id: 2, url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200", name: "neon_signs.png" },
    { id: 3, url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200", name: "grid_structure.jpg" },
    { id: 4, url: "https://images.unsplash.com/photo-1620641788421-7f1c338e4200?q=80&w=1200", name: "gradient_flow.png" },
    { id: 5, url: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1200", name: "brutalist_arch.jpg" },
    { id: 6, url: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200", name: "cyber_texture.jpg" },
  ];

  let textareaRef: HTMLTextAreaElement | undefined;
  let fileInputRef: HTMLInputElement | undefined;

  // Scroll Lock Efffect
  createEffect(() => {
    if (typeof document !== 'undefined') {
      if (isPreviewOpen() || isMediaModalOpen() || inputModalOpen()) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  });

  onCleanup(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('overflow-hidden');
    }
  });

  const getFilteredMedia = () => {
    if (!mediaSearch()) return allMediaItems;
    return allMediaItems.filter(item => item.name.toLowerCase().includes(mediaSearch().toLowerCase()));
  };

  const handlePreview = async () => {
    const raw = content();
    const parsed = await marked.parse(raw);
    const clean = DOMPurify.sanitize(parsed);
    setHtmlContent(clean);
    setIsPreviewOpen(true);
  };

  const openInput = (title: string, placeholder: string, onSubmit: (value: string) => void) => {
    setInputModalConfig({ title, placeholder, onSubmit });
    setInputModalOpen(true);
  };

  const insertText = (before: string, after: string = "") => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const text = textareaRef.value;
    const selection = text.substring(start, end);

    const newText = text.substring(0, start) + before + selection + after + text.substring(end);

    setContent(newText);

    setTimeout(() => {
      if (textareaRef) {
        textareaRef.focus();
        textareaRef.setSelectionRange(start + before.length, end + before.length);
      }
    }, 0);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          insertText('**', '**');
          break;
        case 'i':
          e.preventDefault();
          insertText('*', '*');
          break;
        case 'k':
          e.preventDefault();
          handleToolbar('link');
          break;
        case 's':
          e.preventDefault();
          // Mock Save
          alert("Draft Saved (Mock)!");
          break;
      }
    }
  };

  const mockUploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const url = URL.createObjectURL(file);
    setIsUploading(false);
    return url;
  };

  const handleImageSelect = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      try {
        const url = await mockUploadImage(file);
        insertText(`![${file.name}](${url})`);
      } catch (err) {
        console.error(err);
        alert("Failed to upload image");
      }
    }
  };

  const handlePaste = async (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          const file = items[i].getAsFile();
          if (file) {
            const url = await mockUploadImage(file);
            insertText(`![${file.name}](${url})`);
          }
          return;
        }
      }
    }
  };

  const handleEmbed = () => {
    openInput("Enter Embed URL", "CodePen, CodeSandbox, JSFiddle...", (url) => {
      if (!url) return;

      let embedCode = "";
      if (url.includes("codepen.io")) {
        const slug = url.split('/').pop();
        // Remove query params if any in slug, though usually robust logic handles it.
        // The replace logic below handles the URL structure.
        embedCode = `\n<iframe height="300" style="width: 100%;" scrolling="no" title="CodePen Embed" src="${url.replace('/pen/', '/embed/').split('?')[0]}?default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>\n`;
      } else if (url.includes("codesandbox.io")) {
        embedCode = `\n<iframe src="${url.replace('/s/', '/embed/')}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>\n`;
      } else if (url.includes("jsfiddle.net")) {
        let embedUrl = url;
        if (!embedUrl.endsWith('/')) embedUrl += '/';
        if (!embedUrl.includes('embedded')) embedUrl += 'embedded/';
        embedCode = `\n<iframe width="100%" height="300" src="${embedUrl}" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>\n`;
      } else {
        alert("Unsupported URL. Please use CodePen, CodeSandbox, or JSFiddle.");
        return;
      }
      insertText(embedCode);
    });
  };

  const openMediaModal = (target: 'editor' | 'featured') => {
    setMediaModalTarget(target);
    setIsMediaModalOpen(true);
    // Reset Image Options defaults
    setImgWidth("100%");
    setImgAlign("center");
    setImgAlt("");
  };

  const selectMediaItem = (url: string, name: string) => {
    if (mediaModalTarget() === 'editor') {
      // Generate customized HTML for image
      const alt = imgAlt() || name;
      let style = `width: ${imgWidth()};`;
      let classes = "block";

      if (imgAlign() === 'center') {
        style += " margin-left: auto; margin-right: auto;";
        classes += " mx-auto";
      } else if (imgAlign() === 'left') {
        style += " float: left; margin-right: 1rem; margin-bottom: 0.5rem;";
        classes += " float-left mr-4 mb-2";
      } else if (imgAlign() === 'right') {
        style += " float: right; margin-left: 1rem; margin-bottom: 0.5rem;";
        classes += " float-right ml-4 mb-2";
      }

      const imgTag = `<img src="${url}" alt="${alt}" style="${style}" class="${classes}" />`;
      insertText(imgTag);
    } else {
      setFeaturedImage(url);
    }
    setIsMediaModalOpen(false);
  };

  const handleToolbar = (action: string) => {
    switch (action) {
      case 'bold': insertText('**', '**'); break;
      case 'italic': insertText('*', '*'); break;
      case 'heading': insertText('### '); break;
      case 'quote': insertText('> '); break;
      case 'link':
        openInput('Insert Link URL', 'https://...', (url) => {
          if (url) insertText('[', `](${url})`);
        });
        break;
      case 'image':
        openMediaModal('editor');
        break;
      case 'youtube':
        openInput('Insert YouTube URL', 'https://youtube.com/watch?v=...', (vidUrl) => {
          if (vidUrl) insertText(`\n<iframe width="560" height="315" src="${vidUrl.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>\n`);
        });
        break;
      case 'embed':
        handleEmbed();
        break;
      case 'codepen':
        openInput('Enter CodePen URL', 'https://codepen.io/user/pen/slug', (cpUrl) => {
          if (cpUrl) {
            let embedUrl = cpUrl;
            if (cpUrl.includes('/pen/')) {
              embedUrl = cpUrl.replace('/pen/', '/embed/').split('?')[0];
              embedUrl += "?default-tab=html%2Cresult";
            }
            const embedCode = `\n<iframe height="300" style="width: 100%;" scrolling="no" title="CodePen Embed" src="${embedUrl}" frameborder="no" loading="lazy" allowtransparency="true"></iframe>\n`;
            insertText(embedCode);
          }
        });
        break;
      case 'jsfiddle':
        openInput('Enter JSFiddle URL', 'https://jsfiddle.net/user/slug/', (jsUrl) => {
          if (jsUrl) {
            let embedUrl = jsUrl;
            if (!embedUrl.endsWith('/')) embedUrl += '/';
            if (!embedUrl.includes('embedded')) embedUrl += 'embedded/';

            const embedCode = `\n<iframe style="width: 100%; height: 300px; border: 1px solid #ddd;" src="${embedUrl}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>\n`;
            insertText(embedCode);
          }
        });
        break;
      case 'code': insertText('`', '`'); break;
      case 'list': insertText('\n- '); break;
      case 'table':
        const tableTemplate = `\n| Header 1 | Header 2 |\n| :--- | :--- |\n| Row 1 | Row 2 |\n`;
        insertText(tableTemplate);
        break;
    }
  };

  return (
    <>
      <Title>New Article | DAKOTA ADMIN</Title>

      <InputModal
        isOpen={inputModalOpen()}
        onClose={() => setInputModalOpen(false)}
        onSubmit={inputModalConfig().onSubmit}
        title={inputModalConfig().title}
        placeholder={inputModalConfig().placeholder}
      />

      <input
        type="file"
        ref={fileInputRef}
        class="hidden"
        accept="image/*"
        onChange={handleImageSelect}
      />

      {/* Header */}
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 class="text-5xl md:text-7xl font-oswald font-black italic uppercase leading-none text-foreground">
            New Article
          </h1>
        </div>
        <div class="flex gap-4">
          <button class="bg-background border-2 border-accent text-foreground font-oswald font-bold uppercase py-3 px-6 hover:bg-accent/10 transition-colors">
            Save Draft
          </button>
          <button class="bg-primary text-black border-2 border-primary font-oswald font-bold uppercase py-3 px-6 hover:bg-transparent hover:text-primary transition-colors">
            Publish Live
          </button>
        </div>
      </div>

      <main class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Area */}
        <div class="lg:col-span-8 flex flex-col gap-8">
          {/* Title Input */}
          <div class="bg-background border-2 border-accent p-6 group focus-within:border-primary transition-colors">
            <label class="block text-xs font-mono font-bold uppercase text-neutral-500 mb-2 group-focus-within:text-primary transition-colors">Article Title</label>
            <input
              type="text"
              placeholder="ENTER TITLE HERE..."
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
              class="w-full bg-transparent border-none text-3xl md:text-5xl font-oswald font-bold uppercase text-foreground placeholder-neutral-500 focus:ring-0 outline-none"
            />
          </div>

          {/* Markdown Editor */}
          <div class="flex-1 bg-background border-2 border-accent flex flex-col min-h-[600px] focus-within:border-primary transition-colors">
            {/* Toolbar */}
            <div class="border-b-2 border-accent p-2 flex flex-wrap gap-2 bg-accent/5">
              <button onClick={() => handleToolbar('bold')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Bold (Ctrl+B)"><Bold class="w-4 h-4" /></button>
              <button onClick={() => handleToolbar('italic')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Italic (Ctrl+I)"><Italic class="w-4 h-4" /></button>
              <button onClick={() => handleToolbar('heading')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Heading"><Heading class="w-4 h-4" /></button>
              <button onClick={() => handleToolbar('quote')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Quote"><Quote class="w-4 h-4" /></button>
              <div class="w-px h-6 bg-accent mx-2 self-center"></div>
              <button onClick={() => handleToolbar('link')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Link (Ctrl+K)"><Link class="w-4 h-4" /></button>
              <button onClick={() => handleToolbar('image')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Media Library"><ImageIcon class="w-4 h-4" /></button>
              <button onClick={() => handleToolbar('youtube')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="YouTube"><Youtube class="w-4 h-4" /></button>
              <button onClick={() => handleToolbar('embed')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Generic Embed"><Box class="w-4 h-4" /></button>
              <button onClick={() => handleToolbar('codepen')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="CodePen"><span class="font-bold text-xs">CP</span></button>
              <button onClick={() => handleToolbar('jsfiddle')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="JSFiddle"><span class="font-bold text-xs">JS</span></button>
              <div class="w-px h-6 bg-accent mx-2 self-center"></div>
              <button onClick={() => handleToolbar('code')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Code"><Code class="w-4 h-4" /></button>
              <button onClick={() => handleToolbar('list')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="List"><List class="w-4 h-4" /></button>
              <button onClick={() => handleToolbar('table')} class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Table"><TableIcon class="w-4 h-4" /></button>
              <div class="w-px h-6 bg-accent mx-2 self-center"></div>

              <DatePicker
                class="w-auto self-center"
                mode="range"
                value={toolbarDateRange()}
                trigger={
                  <button class="p-2 hover:bg-accent/10 text-neutral-500 hover:text-foreground transition-colors" title="Insert Date Range">
                    <Calendar class="w-4 h-4" />
                  </button>
                }
                onChange={(val) => {
                  const range = val as { start: Date | null, end: Date | null };
                  setToolbarDateRange(range);
                  if (range.start && range.end) {
                    const startStr = range.start.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
                    const endStr = range.end.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
                    insertText(`${startStr} - ${endStr}`);
                    // Optional: clear selection after a delay so it's fresh next time
                    setTimeout(() => setToolbarDateRange({ start: null, end: null }), 200);
                  }
                }}
              />

              <div class="flex-1"></div>

              <Show when={isUploading()}>
                <span class="text-xs font-mono font-bold text-accent animate-pulse mr-4 self-center">UPLOADING...</span>
              </Show>
              <button
                onClick={handlePreview}
                class="px-4 py-1 bg-accent/10 text-xs font-mono font-bold uppercase text-foreground hover:bg-primary hover:text-black transition-colors flex items-center gap-2"
              >
                <Eye class="w-3 h-3" /> Preview
              </button>
            </div>
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={content()}
              onInput={(e) => setContent(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              class="flex-1 w-full bg-transparent p-6 font-mono text-sm leading-relaxed resize-none outline-none text-foreground placeholder-neutral-500"
              placeholder="Start writing your masterpiece... (Paste images supported)"
            ></textarea>
            <div class="border-t-2 border-accent p-2 px-6 flex justify-between items-center bg-accent/5">
              <span class="text-[10px] font-mono font-bold text-neutral-500 uppercase">Markdown Supported</span>
              <span class="text-[10px] font-mono font-bold text-neutral-500 uppercase">{content().length} Chars</span>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div class="lg:col-span-4 flex flex-col gap-6">
          {/* Publish Meta */}
          <div class="bg-background border-2 border-accent p-6">
            <h3 class="font-oswald text-xl font-bold uppercase italic mb-6 flex items-center gap-2">
              <span class="w-2 h-2 bg-primary"></span>
              Publishing
            </h3>

            <div class="space-y-4">
              <div class="flex flex-col gap-2 group">
                <span class="font-mono text-xs font-bold uppercase text-neutral-500">Status</span>
                <SearchableSelect
                  options={[
                    { label: "DRAFT", value: "draft" },
                    { label: "PUBLISHED", value: "published" },
                    { label: "SCHEDULED", value: "scheduled" }
                  ]}
                  value={status()}
                  onChange={setStatus}
                  placeholder="SELECT STATUS"
                />
              </div>
              <div class="flex flex-col gap-2 group">
                <span class="font-mono text-xs font-bold uppercase text-neutral-500">Visibility</span>
                <SearchableSelect
                  options={[
                    { label: "PUBLIC", value: "public" },
                    { label: "PRIVATE", value: "private" },
                    { label: "MEMBERS ONLY", value: "members" }
                  ]}
                  value={visibility()}
                  onChange={setVisibility}
                  placeholder="SELECT VISIBILITY"
                />
              </div>
              <div class="flex flex-col gap-2 group">
                <span class="font-mono text-xs font-bold uppercase text-neutral-500">Schedule</span>
                <DatePicker
                  value={scheduledDate()}
                  onChange={setScheduledDate}
                  placeholder="PICK A DATE"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div class="bg-background border-2 border-accent p-6">
            <h3 class="font-oswald text-xl font-bold uppercase italic mb-6">Tags</h3>
            <div class="flex flex-wrap gap-2 mb-4">
              <For each={tags()}>
                {(tag) => (
                  <span class="px-2 py-1 bg-accent/20 border border-accent text-[10px] font-mono font-bold uppercase flex items-center gap-1 text-foreground">
                    {tag}
                    <button onClick={() => removeTag(tag)} class="hover:text-red-500"><X class="w-3 h-3" /></button>
                  </span>
                )}
              </For>
            </div>
            <div class="relative">
              <SearchableSelect
                options={availableTags.filter(t => !tags().includes(t.value))}
                onChange={addTag}
                placeholder="ADD TAG..."
              />
              <div class="mt-2 text-[10px] text-neutral-500 font-mono">* Select to add</div>
            </div>
          </div>

          {/* Featured Image */}
          <div class="bg-background border-2 border-accent p-6">
            <h3 class="font-oswald text-xl font-bold uppercase italic mb-6">Featured Image</h3>
            <div
              onClick={() => openMediaModal('featured')}
              class="border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-accent/5 aspect-video flex flex-col items-center justify-center hover:border-primary hover:bg-accent/10 transition-all cursor-pointer group relative overflow-hidden"
            >
              <Show when={featuredImage()} fallback={
                <>
                  <Upload class="w-6 h-6 text-neutral-500 group-hover:text-primary mb-2 transition-colors" />
                  <span class="font-mono text-[10px] font-bold uppercase text-neutral-500 group-hover:text-foreground transition-colors">Select from Library</span>
                </>
              }>
                <img src={featuredImage()!} class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold uppercase text-xs">Change</div>
              </Show>
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal (Full Width) */}
      <Show when={isPreviewOpen()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-background border-0 w-full h-full overflow-hidden">
          <div class="w-full h-full flex flex-col relative bg-background">
            {/* Modal Header */}
            <div class="h-16 border-b-2 border-accent flex items-center justify-between px-8 bg-surface shrink-0">
              <h2 class="font-oswald font-bold uppercase italic text-2xl text-foreground">Preview Mode</h2>
              <button onClick={() => setIsPreviewOpen(false)} class="bg-primary text-black hover:bg-foreground hover:text-background p-2 transition-colors">
                <X class="w-6 h-6" />
              </button>
            </div>
            {/* Modal Content */}
            <div class="flex-1 overflow-y-auto p-8 md:p-16 max-w-6xl mx-auto w-full prose prose-invert prose-lg">
              <h1 class="font-oswald text-5xl md:text-7xl font-black uppercase italic leading-none text-foreground mb-12 border-b-4 border-primary pb-8">
                {title() || 'Untitled Transmission'}
              </h1>
              {featuredImage() && (
                <img src={featuredImage()!} class="w-full max-h-[600px] object-cover mb-12 border-2 border-accent grayscale hover:grayscale-0 transition-all duration-500" />
              )}
              <div
                class="text-foreground [&>h1]:font-oswald [&>h1]:font-black [&>h1]:text-4xl [&>h1]:uppercase [&>h1]:mb-6 [&>h2]:font-oswald [&>h2]:font-bold [&>h2]:text-3xl [&>h2]:uppercase [&>h2]:mb-4 [&>h3]:font-oswald [&>h3]:font-bold [&>h3]:text-2xl [&>h3]:uppercase [&>h3]:mb-3 [&>p]:mb-6 [&>p]:leading-loose [&>p]:text-lg [&>pre]:bg-black [&>pre]:p-6 [&>pre]:text-white [&>pre]:border [&>pre]:border-accent [&>pre]:overflow-x-auto [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-2xl [&>blockquote]:font-serif [&>blockquote]:my-8 [&>img]:border-2 [&>img]:border-accent [&>table]:w-full [&>table]:border-collapse [&>table]:border-2 [&>table]:border-accent [&>th]:border-2 [&>th]:border-accent [&>th]:p-3 [&>th]:bg-accent/10 [&>th]:font-bold [&>th]:uppercase [&>td]:border-2 [&>td]:border-accent [&>td]:p-3"
                innerHTML={htmlContent()}
              />
            </div>
          </div>
        </div>
      </Show>

      {/* Media Modal */}
      <Show when={isMediaModalOpen()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8">
          <div class="bg-background border-2 border-accent w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl relative">
            <div class="h-16 border-b-2 border-accent flex items-center justify-between px-6 bg-surface shrink-0">
              <div class="flex items-center gap-4">
                <h2 class="font-oswald font-bold uppercase italic text-2xl text-foreground">Select Media</h2>
                <div class="relative hidden md:block">
                  <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="SEARCH..."
                    value={mediaSearch()}
                    onInput={(e) => setMediaSearch(e.currentTarget.value)}
                    class="bg-background border border-accent pl-10 pr-4 py-1 text-xs font-bold uppercase focus:border-primary outline-none text-foreground w-64"
                  />
                </div>
              </div>
              <button onClick={() => setIsMediaModalOpen(false)} class="text-neutral-500 hover:text-red-500 transition-colors">
                <X class="w-8 h-8" />
              </button>
            </div>

            <div class="flex flex-1 overflow-hidden">
              {/* Media Grid */}
              <div class="flex-1 overflow-y-auto p-6 border-r border-accent">
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div
                    onClick={() => fileInputRef?.click()}
                    class="aspect-square bg-accent/10 border-2 border-dashed border-accent hover:border-primary flex flex-col items-center justify-center cursor-pointer group"
                  >
                    <Upload class="w-8 h-8 text-neutral-500 group-hover:text-primary mb-2" />
                    <span class="text-[10px] font-bold uppercase text-neutral-500 group-hover:text-foreground">Upload New</span>
                  </div>

                  <For each={getFilteredMedia()}>
                    {(item) => (
                      <div
                        onClick={() => selectMediaItem(item.url, item.name)}
                        class="aspect-square border-2 border-transparent hover:border-primary cursor-pointer relative group overflow-hidden bg-accent/5"
                      >
                        <img src={item.url} class="w-full h-full object-cover" />
                        <div class="absolute inset-x-0 bottom-0 bg-black/80 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                          <p class="text-[10px] text-white font-mono truncate">{item.name}</p>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              {/* Sidebar Options (Only for Editor) */}
              <Show when={mediaModalTarget() === 'editor'}>
                <div class="w-64 bg-surface p-6 overflow-y-auto shrink-0 border-l-2 border-accent shadow-xl">
                  <h3 class="font-oswald font-bold uppercase mb-6 text-lg border-b border-accent pb-2 text-foreground">Image Options</h3>

                  <div class="mb-6">
                    <label class="block text-xs font-mono font-bold uppercase text-neutral-500 mb-2">Width</label>
                    <div class="flex gap-2">
                      <button onClick={() => setImgWidth("100%")} class={`flex-1 py-1 text-xs border ${imgWidth() === '100%' ? 'bg-primary text-black border-primary' : 'border-accent text-neutral-500'}`}>Full</button>
                      <button onClick={() => setImgWidth("50%")} class={`flex-1 py-1 text-xs border ${imgWidth() === '50%' ? 'bg-primary text-black border-primary' : 'border-accent text-neutral-500'}`}>50%</button>
                      <button onClick={() => setImgWidth("25%")} class={`flex-1 py-1 text-xs border ${imgWidth() === '25%' ? 'bg-primary text-black border-primary' : 'border-accent text-neutral-500'}`}>25%</button>
                    </div>
                    <input
                      type="text"
                      value={imgWidth()}
                      onInput={(e) => setImgWidth(e.currentTarget.value)}
                      class="w-full mt-2 bg-background border border-accent p-2 text-xs font-mono outline-none focus:border-primary text-foreground"
                    />
                  </div>

                  <div class="mb-6">
                    <label class="block text-xs font-mono font-bold uppercase text-neutral-500 mb-2">Alignment</label>
                    <div class="flex gap-2">
                      <button onClick={() => setImgAlign('left')} class={`p-2 border ${imgAlign() === 'left' ? 'bg-primary text-black border-primary' : 'border-accent text-neutral-500'}`} title="Left"><AlignLeft class="w-4 h-4" /></button>
                      <button onClick={() => setImgAlign('center')} class={`p-2 border ${imgAlign() === 'center' ? 'bg-primary text-black border-primary' : 'border-accent text-neutral-500'}`} title="Center"><AlignCenter class="w-4 h-4" /></button>
                      <button onClick={() => setImgAlign('right')} class={`p-2 border ${imgAlign() === 'right' ? 'bg-primary text-black border-primary' : 'border-accent text-neutral-500'}`} title="Right"><AlignRight class="w-4 h-4" /></button>
                    </div>
                  </div>

                  <div class="mb-6">
                    <label class="block text-xs font-mono font-bold uppercase text-neutral-500 mb-2">Alt Text</label>
                    <input
                      type="text"
                      placeholder="Description..."
                      value={imgAlt()}
                      onInput={(e) => setImgAlt(e.currentTarget.value)}
                      class="w-full bg-background border border-accent p-2 text-xs font-mono outline-none focus:border-primary text-foreground"
                    />
                  </div>

                  <div class="text-xs text-neutral-500 font-mono italic">
                    * Selecting an image will insert it with these settings as an HTML tag.
                  </div>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
