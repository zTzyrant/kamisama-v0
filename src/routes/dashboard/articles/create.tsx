import {
  createSignal,
  createEffect,
  Show,
  For,
  onCleanup,
  onMount
} from 'solid-js';
import { Title } from '@solidjs/meta';
import { useNavigate } from '@solidjs/router';

import DOMPurify from 'dompurify';
import {
  Bold,
  Italic,
  Link,
  Image as ImageIcon,
  Code,
  List,
  Save,
  Youtube,
  Eye,
  Upload,
  Calendar,
  X,
  Plus,
  Box,
  Table as TableIcon,
  Quote,
  Heading,
  Search,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Info
} from 'lucide-solid';
import InputModal from '~/components/ui/InputModal';
import SearchableSelect from '~/components/ui/SearchableSelect';
import DatePicker from '~/components/ui/DatePicker';
import Kbd from '~/components/ui/Kbd';
import TableOfContents from '~/components/TableOfContents';
import { extractHeadings, slugify, type TocItem } from '~/lib/toc';
import { articlesApi } from '~/lib/api';
import { configureMarkdown } from '~/lib/markdown';

const marked = configureMarkdown();

export default function CreateArticle() {
  const navigate = useNavigate();

  // API State
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [availableApiTags, setAvailableApiTags] = createSignal<any[]>([]);

  const [content, setContent] = createSignal('');
  const [title, setTitle] = createSignal('');
  const [excerpt, setExcerpt] = createSignal('');
  const [isPreviewOpen, setIsPreviewOpen] = createSignal(false);
  const [htmlContent, setHtmlContent] = createSignal('');
  const [tocHeadings, setTocHeadings] = createSignal<TocItem[]>([]);
  const [isUploading, setIsUploading] = createSignal(false);

  // Shortcuts Modal State
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = createSignal(false);

  // History State
  const [history, setHistory] = createSignal<string[]>(['']);
  const [historyIndex, setHistoryIndex] = createSignal(0);

  // Media Modal State
  const [isMediaModalOpen, setIsMediaModalOpen] = createSignal(false);
  const [mediaModalTarget, setMediaModalTarget] = createSignal<
    'editor' | 'featured'
  >('editor');
  const [featuredImage, setFeaturedImage] = createSignal<string | null>(null);
  const [mediaSearch, setMediaSearch] = createSignal('');

  // Image Options State
  const [imgWidth, setImgWidth] = createSignal('100%');
  const [imgAlign, setImgAlign] = createSignal<'left' | 'center' | 'right'>(
    'center'
  );
  const [imgAlt, setImgAlt] = createSignal('');

  // Input Modal State
  const [inputModalOpen, setInputModalOpen] = createSignal(false);
  const [inputModalConfig, setInputModalConfig] = createSignal({
    title: '',
    placeholder: '',
    onSubmit: (value: string) => {}
  });

  // Article Meta State
  const [status, setStatus] = createSignal('draft');
  const [visibility, setVisibility] = createSignal('public');
  const [scheduledDate, setScheduledDate] = createSignal<Date | null>(
    new Date()
  );
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);
  const [toolbarDateRange, setToolbarDateRange] = createSignal<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  // Load tags from API
  onMount(async () => {
    try {
      const res = await articlesApi.getTags();
      if (res.data.status === 'success') {
        setAvailableApiTags(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch tags', err);
    }
  });

  const availableTags = () => {
    return availableApiTags().map((tag) => ({
      label: tag.name.toUpperCase(),
      value: tag.id
    }));
  };

  const addTag = (tagId: string) => {
    if (tagId && !selectedTags().includes(tagId)) {
      setSelectedTags([...selectedTags(), tagId]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags().filter((t) => t !== tagToRemove));
  };

  const getTagName = (tagId: string) => {
    const tag = availableApiTags().find((t) => t.id === tagId);
    return tag ? tag.name : tagId;
  };

  // Dummy Media Items
  const allMediaItems = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
      name: 'abstract_01.jpg'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200',
      name: 'neon_signs.png'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200',
      name: 'grid_structure.jpg'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1620641788421-7f1c338e4200?q=80&w=1200',
      name: 'gradient_flow.png'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1200',
      name: 'brutalist_arch.jpg'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200',
      name: 'cyber_texture.jpg'
    }
  ];

  let textareaRef: HTMLTextAreaElement | undefined;
  let fileInputRef: HTMLInputElement | undefined;

  // Scroll Lock Effect
  createEffect(() => {
    if (typeof document !== 'undefined') {
      if (
        isPreviewOpen() ||
        isMediaModalOpen() ||
        inputModalOpen() ||
        isShortcutsModalOpen()
      ) {
        document.body.classList.add('overflow-hidden');
        window.lenis?.stop();
      } else {
        document.body.classList.remove('overflow-hidden');
        window.lenis?.start();
      }
    }
  });

  onCleanup(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('overflow-hidden');
      window.lenis?.start();
    }
  });

  // History Management
  const addToHistory = (newContent: string) => {
    const currentHist = history();
    const currentIndex = historyIndex();

    // If we're not at the end of history, slice it
    const newHistory = currentHist.slice(0, currentIndex + 1);

    if (newHistory[newHistory.length - 1] !== newContent) {
      newHistory.push(newContent);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const undo = () => {
    const currentIndex = historyIndex();
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setHistoryIndex(newIndex);
      const newContent = history()[newIndex];
      setContent(newContent);
      if (textareaRef) textareaRef.value = newContent;
    }
  };

  const redo = () => {
    const currentIndex = historyIndex();
    const currentHist = history();
    if (currentIndex < currentHist.length - 1) {
      const newIndex = currentIndex + 1;
      setHistoryIndex(newIndex);
      const newContent = currentHist[newIndex];
      setContent(newContent);
      if (textareaRef) textareaRef.value = newContent;
    }
  };

  const updateContent = (newContent: string) => {
    setContent(newContent);
    addToHistory(newContent);
  };

  const getFilteredMedia = () => {
    if (!mediaSearch()) return allMediaItems;
    return allMediaItems.filter((item) =>
      item.name.toLowerCase().includes(mediaSearch().toLowerCase())
    );
  };

  const handlePreview = async () => {
    const raw = content();

    // Extract headings for TOC
    const headings = extractHeadings(raw);
    setTocHeadings(headings);

    // headings are already extracted above

    const parsed = await marked.parse(raw);
    const clean = DOMPurify.sanitize(parsed);
    setHtmlContent(clean);
    setIsPreviewOpen(true);
  };

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

    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleCopy);
      onCleanup(() => document.removeEventListener('click', handleCopy));
    }
  });

  const openInput = (
    title: string,
    placeholder: string,
    onSubmit: (value: string) => void
  ) => {
    setInputModalConfig({ title, placeholder, onSubmit });
    setInputModalOpen(true);
  };

  const insertText = (before: string, after: string = '') => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const text = textareaRef.value;
    const selection = text.substring(start, end);

    const newText =
      text.substring(0, start) +
      before +
      selection +
      after +
      text.substring(end);

    updateContent(newText);

    setTimeout(() => {
      if (textareaRef) {
        textareaRef.focus();
        textareaRef.setSelectionRange(
          start + before.length,
          end + before.length
        );
      }
    }, 0);
  };

  const insertBlock = (prefix: string, suffix: string = '') => {
    if (!textareaRef) return;
    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const text = textareaRef.value;

    let lineStart = text.lastIndexOf('\n', start - 1);
    if (lineStart === -1) lineStart = 0;
    else lineStart += 1;

    let lineEnd = text.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = text.length;

    const lineContent = text.substring(lineStart, lineEnd);
    const newLineContent = prefix + lineContent + suffix;

    const newText =
      text.substring(0, lineStart) + newLineContent + text.substring(lineEnd);

    updateContent(newText);

    setTimeout(() => {
      if (textareaRef) {
        textareaRef.focus();
        textareaRef.setSelectionRange(
          lineStart + newLineContent.length,
          lineStart + newLineContent.length
        );
      }
    }, 0);
  };

  const moveLine = (direction: 'up' | 'down') => {
    if (!textareaRef) return;
    const start = textareaRef.selectionStart;
    const text = textareaRef.value;

    let lineStart = text.lastIndexOf('\n', start - 1);
    if (lineStart === -1) lineStart = 0;
    else lineStart += 1;

    let lineEnd = text.indexOf('\n', start);
    if (lineEnd === -1) lineEnd = text.length;

    const currentLine = text.substring(lineStart, lineEnd);

    if (direction === 'up') {
      if (lineStart === 0) return;

      let prevLineStart = text.lastIndexOf('\n', lineStart - 2);
      if (prevLineStart === -1) prevLineStart = 0;
      else prevLineStart += 1;

      const prevLine = text.substring(prevLineStart, lineStart - 1);

      const before = text.substring(0, prevLineStart);
      const after = text.substring(lineEnd);

      const newText = before + currentLine + '\n' + prevLine + after;
      updateContent(newText);

      setTimeout(() => {
        if (textareaRef) {
          const newCursor = prevLineStart + (start - lineStart);
          textareaRef.setSelectionRange(newCursor, newCursor);
        }
      }, 0);
    } else {
      if (lineEnd === text.length) return;

      let nextLineEnd = text.indexOf('\n', lineEnd + 1);
      if (nextLineEnd === -1) nextLineEnd = text.length;

      const nextLine = text.substring(lineEnd + 1, nextLineEnd);

      const before = text.substring(0, lineStart);
      const after = text.substring(nextLineEnd);

      const newText = before + nextLine + '\n' + currentLine + after;
      updateContent(newText);

      setTimeout(() => {
        if (textareaRef) {
          const newCursor =
            lineStart + nextLine.length + 1 + (start - lineStart);
          textareaRef.setSelectionRange(newCursor, newCursor);
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (!e.shiftKey && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            insertText('**', '**');
            break;
          case 'i':
            e.preventDefault();
            insertText('*', '*');
            break;
          case 'u':
            e.preventDefault();
            break;
          case '\\':
            e.preventDefault();
            console.log('Clear formatting triggered');
            break;
          case ' ':
            if (e.ctrlKey) {
              e.preventDefault();
            }
            break;
          case 'z':
            e.preventDefault();
            undo();
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
        }
      }
    }

    if (
      (e.altKey && e.key.toLowerCase() === 's') ||
      (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x')
    ) {
      e.preventDefault();
      insertText('~~', '~~');
    }

    if (e.ctrlKey && e.altKey) {
      switch (e.key) {
        case '1':
          e.preventDefault();
          insertBlock('# ');
          break;
        case '2':
          e.preventDefault();
          insertBlock('## ');
          break;
        case '3':
          e.preventDefault();
          insertBlock('### ');
          break;
        case '4':
          e.preventDefault();
          insertBlock('#### ');
          break;
        case '5':
          e.preventDefault();
          insertBlock('##### ');
          break;
        case '6':
          e.preventDefault();
          insertBlock('###### ');
          break;
        case 'c':
          e.preventDefault();
          insertText('\n```\n', '\n```\n');
          break;
      }
    }

    if (e.ctrlKey && e.shiftKey) {
      switch (e.key) {
        case '*':
        case '8':
          e.preventDefault();
          insertBlock('- ');
          break;
        case '&':
        case '7':
          e.preventDefault();
          insertBlock('1. ');
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          insertBlock('- [ ] ');
          break;
        case '(':
        case '9':
          e.preventDefault();
          insertBlock('> ');
          break;
        case '_':
        case '-':
          e.preventDefault();
          insertText('\n---\n');
          break;
        case 'k':
        case 'K':
          e.preventDefault();
          insertText('\n```\n', '\n```\n');
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          insertText('\n$$\n', '\n$$\n');
          break;
        case 'z':
        case 'Z':
          e.preventDefault();
          redo();
          break;
      }
    }

    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      insertText('`', '`');
    }
    if (e.ctrlKey && e.shiftKey && e.key === '\\') {
      e.preventDefault();
      insertText('`', '`');
    }

    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      insertText('\n\n');
    }

    if (e.altKey) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveLine('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveLine('down');
      }
    }
  };

  const mockUploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
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
        alert('Failed to upload image');
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
    openInput('Enter Embed URL', 'CodePen, CodeSandbox, JSFiddle...', (url) => {
      if (!url) return;

      let embedCode = '';
      if (url.includes('codepen.io')) {
        embedCode = `\n<iframe height="300" style="width: 100%;" scrolling="no" title="CodePen Embed" src="${
          url.replace('/pen/', '/embed/').split('?')[0]
        }?default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>\n`;
      } else if (url.includes('codesandbox.io')) {
        embedCode = `\n<iframe src="${url.replace(
          '/s/',
          '/embed/'
        )}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>\n`;
      } else if (url.includes('jsfiddle.net')) {
        let embedUrl = url;
        if (!embedUrl.endsWith('/')) embedUrl += '/';
        if (!embedUrl.includes('embedded')) embedUrl += 'embedded/';
        embedCode = `\n<iframe width="100%" height="300" src="${embedUrl}" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>\n`;
      } else {
        alert('Unsupported URL. Please use CodePen, CodeSandbox, or JSFiddle.');
        return;
      }
      insertText(embedCode);
    });
  };

  const openMediaModal = (target: 'editor' | 'featured') => {
    setMediaModalTarget(target);
    setIsMediaModalOpen(true);
    setImgWidth('100%');
    setImgAlign('center');
    setImgAlt('');
  };

  const selectMediaItem = (url: string, name: string) => {
    if (mediaModalTarget() === 'editor') {
      const alt = imgAlt() || name;
      let style = `width: ${imgWidth()};`;
      let classes = 'block';

      if (imgAlign() === 'center') {
        style += ' margin-left: auto; margin-right: auto;';
        classes += ' mx-auto';
      } else if (imgAlign() === 'left') {
        style += ' float: left; margin-right: 1rem; margin-bottom: 0.5rem;';
        classes += ' float-left mr-4 mb-2';
      } else if (imgAlign() === 'right') {
        style += ' float: right; margin-left: 1rem; margin-bottom: 0.5rem;';
        classes += ' float-right ml-4 mb-2';
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
      case 'bold':
        insertText('**', '**');
        break;
      case 'italic':
        insertText('*', '*');
        break;
      case 'heading':
        insertBlock('### ');
        break;
      case 'quote':
        insertBlock('> ');
        break;
      case 'link':
        openInput('Insert Link URL', 'https://...', (url) => {
          if (url) insertText('[', `](${url})`);
        });
        break;
      case 'image':
        openMediaModal('editor');
        break;
      case 'youtube':
        openInput(
          'Insert YouTube URL',
          'https://youtube.com/watch?v=...',
          (vidUrl) => {
            if (vidUrl)
              insertText(
                `\n<iframe width="560" height="315" src="${vidUrl.replace(
                  'watch?v=',
                  'embed/'
                )}" frameborder="0" allowfullscreen></iframe>\n`
              );
          }
        );
        break;
      case 'embed':
        handleEmbed();
        break;
      case 'codepen':
        openInput(
          'Enter CodePen URL',
          'https://codepen.io/user/pen/slug',
          (cpUrl) => {
            if (cpUrl) {
              let embedUrl = cpUrl;
              if (cpUrl.includes('/pen/')) {
                embedUrl = cpUrl.replace('/pen/', '/embed/').split('?')[0];
                embedUrl += '?default-tab=html%2Cresult';
              }
              const embedCode = `\n<iframe height="300" style="width: 100%;" scrolling="no" title="CodePen Embed" src="${embedUrl}" frameborder="no" loading="lazy" allowtransparency="true"></iframe>\n`;
              insertText(embedCode);
            }
          }
        );
        break;
      case 'jsfiddle':
        openInput(
          'Enter JSFiddle URL',
          'https://jsfiddle.net/user/slug/',
          (jsUrl) => {
            if (jsUrl) {
              let embedUrl = jsUrl;
              if (!embedUrl.endsWith('/')) embedUrl += '/';
              if (!embedUrl.includes('embedded')) embedUrl += 'embedded/';

              const embedCode = `\n<iframe style="width: 100%; height: 300px; border: 1px solid #ddd;" src="${embedUrl}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>\n`;
              insertText(embedCode);
            }
          }
        );
        break;
      case 'code':
        insertText('`', '`');
        break;
      case 'list':
        insertText('\n- ');
        break;
      case 'table':
        const tableTemplate = `\n| Header 1 | Header 2 |\n| :--- | :--- |\n| Row 1 | Row 2 |\n`;
        insertText(tableTemplate);
        break;
    }
  };

  // Handle Save Draft
  const handleSaveDraft = async () => {
    await handleSubmit('draft');
  };

  // Handle Publish
  const handlePublish = async () => {
    await handleSubmit('published');
  };

  // Submit to API
  const handleSubmit = async (submitStatus: string) => {
    setLoading(true);
    setError(null);

    const payload = {
      title: title(),
      content: content(),
      excerpt: excerpt(),
      status: submitStatus,
      visibility: visibility(),
      tags: selectedTags()
    };

    try {
      const res = await articlesApi.create(payload);
      if (res.data.status === 'success') {
        navigate('/dashboard/articles');
      } else {
        setError(res.data.message || 'Failed to create article');
      }
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (Array.isArray(data.data)) {
          const messages = data.data
            .map((e: any) => `${e.field}: ${e.message}`)
            .join(', ');
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
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-4">
        <div>
          <h1 class="text-5xl md:text-7xl font-oswald font-black uppercase leading-none text-black tracking-tighter">
            New{' '}
            <span class="bg-primary px-2 transform -skew-x-6 inline-block border-4 border-black">
              Transmission
            </span>
          </h1>
        </div>
        <div class="flex gap-4">
          <button
            onClick={handleSaveDraft}
            disabled={loading()}
            class="bg-white text-black border-4 border-black font-oswald font-bold uppercase py-3 px-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
          >
            {loading() && status() === 'draft' ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={handlePublish}
            disabled={loading()}
            class="bg-black text-white border-4 border-black font-oswald font-bold uppercase py-3 px-6 hover:bg-primary hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
          >
            {loading() && status() === 'published'
              ? 'Publishing...'
              : 'Publish Live'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      <Show when={error()}>
        <div class="mb-6 p-4 bg-red-100 border-4 border-red-600 text-red-600 font-bold uppercase text-sm shadow-[4px_4px_0px_0px_#dc2626]">
          {error()}
        </div>
      </Show>

      <main class="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
        {/* Editor Area */}
        <div class="lg:col-span-8 flex flex-col gap-8">
          {/* Title Input */}
          <div class="bg-white dark:bg-neutral-900 border-4 border-black dark:border-neutral-700 p-6 group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[1px] hover:translate-y-[1px] transition-transform">
            <label class="block text-xs font-mono font-bold uppercase text-black dark:text-white mb-2 bg-primary/20 dark:bg-primary/40 inline-block px-1">
              Article Title
            </label>
            <input
              type="text"
              placeholder="ENTER TITLE HERE..."
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
              class="w-full bg-transparent border-b-4 border-black dark:border-neutral-700 text-3xl md:text-5xl font-oswald font-bold uppercase text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary py-2"
            />
          </div>

          {/* Excerpt Input */}
          <div class="bg-white dark:bg-neutral-900 border-4 border-black dark:border-neutral-700 p-6 group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
            <label class="block text-xs font-mono font-bold uppercase text-black dark:text-white mb-2 bg-primary/20 dark:bg-primary/40 inline-block px-1">
              Excerpt (Optional)
            </label>
            <textarea
              placeholder="Brief summary of your article..."
              value={excerpt()}
              onInput={(e) => setExcerpt(e.currentTarget.value)}
              class="w-full bg-neutral-100 dark:bg-black/50 border-2 border-black dark:border-neutral-700 p-4 text-base font-mono text-black dark:text-white placeholder-neutral-500 focus:outline-none focus:bg-white dark:focus:bg-black resize-none"
              rows="3"
            ></textarea>
          </div>

          {/* Markdown Editor */}
          <div class="flex-1 bg-white dark:bg-neutral-900 border-4 border-black dark:border-neutral-700 flex flex-col min-h-[600px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
            {/* Toolbar */}
            <div class="border-b-4 border-black dark:border-neutral-700 p-2 flex flex-wrap gap-2 bg-neutral-100 dark:bg-neutral-800">
              <button
                onClick={() => handleToolbar('bold')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="Bold"
              >
                <Bold class="w-4 h-4" />
              </button>
              <button
                onClick={() => handleToolbar('italic')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="Italic"
              >
                <Italic class="w-4 h-4" />
              </button>
              <button
                onClick={() => handleToolbar('heading')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="Heading"
              >
                <Heading class="w-4 h-4" />
              </button>
              <button
                onClick={() => handleToolbar('quote')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="Quote"
              >
                <Quote class="w-4 h-4" />
              </button>

              <div class="w-px h-6 bg-black mx-2 self-center"></div>

              <button
                onClick={() => handleToolbar('link')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="Link"
              >
                <Link class="w-4 h-4" />
              </button>
              <button
                onClick={() => handleToolbar('image')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="Media Library"
              >
                <ImageIcon class="w-4 h-4" />
              </button>
              <button
                onClick={() => handleToolbar('youtube')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="YouTube"
              >
                <Youtube class="w-4 h-4" />
              </button>
              <button
                onClick={() => handleToolbar('embed')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="Embed"
              >
                <Box class="w-4 h-4" />
              </button>

              <div class="w-px h-6 bg-black mx-2 self-center"></div>

              <button
                onClick={() => handleToolbar('code')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="Code"
              >
                <Code class="w-4 h-4" />
              </button>
              <button
                onClick={() => handleToolbar('list')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="List"
              >
                <List class="w-4 h-4" />
              </button>
              <button
                onClick={() => handleToolbar('table')}
                class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                title="Table"
              >
                <TableIcon class="w-4 h-4" />
              </button>

              <div class="w-px h-6 bg-black mx-2 self-center"></div>

              <DatePicker
                class="w-auto self-center"
                mode="range"
                value={toolbarDateRange()}
                trigger={
                  <button
                    class="p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-neutral-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transition-all text-black dark:text-white"
                    title="Insert Date Range"
                  >
                    <Calendar class="w-4 h-4" />
                  </button>
                }
                onChange={(val) => {
                  const range = val as { start: Date | null; end: Date | null };
                  setToolbarDateRange(range);
                  if (range.start && range.end) {
                    const formatDate = (d: Date) =>
                      d.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      });
                    insertText(
                      `${formatDate(range.start)} - ${formatDate(range.end)}`
                    );
                    setTimeout(
                      () => setToolbarDateRange({ start: null, end: null }),
                      200
                    );
                  }
                }}
              />

              <button
                onClick={() => setIsShortcutsModalOpen(true)}
                class="p-2 border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ml-auto"
                title="Shortcuts"
              >
                <Info class="w-4 h-4" />
              </button>

              <Show when={isUploading()}>
                <span class="text-xs font-mono font-bold text-primary animate-pulse mr-4 self-center uppercase">
                  Uploading...
                </span>
              </Show>

              <button
                onClick={handlePreview}
                class="px-4 py-1 border-2 border-black bg-primary text-black text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
              class="flex-1 w-full bg-white dark:bg-neutral-900 p-6 font-mono text-sm leading-relaxed resize-none outline-none text-black dark:text-white placeholder-neutral-400"
              placeholder="Start writing your masterpiece... (Paste images supported)"
            ></textarea>

            <div class="border-t-4 border-black p-2 px-6 flex justify-between items-center bg-neutral-100">
              <span class="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                Markdown Supported
              </span>
              <span class="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                {content().length} Chars
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div class="lg:col-span-4 flex flex-col gap-6">
          {/* Publish Meta */}
          <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 class="font-oswald text-xl font-bold uppercase border-b-4 border-black pb-2 mb-6 flex items-center gap-2">
              <span class="w-3 h-3 bg-primary border-2 border-black"></span>
              Publishing
            </h3>

            <div class="space-y-4">
              <div class="flex flex-col gap-2 group">
                <span class="font-mono text-xs font-bold uppercase text-neutral-500">
                  Status
                </span>
                <SearchableSelect
                  options={[
                    { label: 'DRAFT', value: 'draft' },
                    { label: 'PUBLISHED', value: 'published' },
                    { label: 'ARCHIVED', value: 'archived' }
                  ]}
                  value={status()}
                  onChange={setStatus}
                  placeholder="SELECT STATUS"
                />
              </div>
              <div class="flex flex-col gap-2 group">
                <span class="font-mono text-xs font-bold uppercase text-neutral-500">
                  Visibility
                </span>
                <SearchableSelect
                  options={[
                    { label: 'PUBLIC', value: 'public' },
                    { label: 'PRIVATE', value: 'private' },
                    { label: 'MEMBERS ONLY', value: 'members' }
                  ]}
                  value={visibility()}
                  onChange={setVisibility}
                  placeholder="SELECT VISIBILITY"
                />
              </div>
              <div class="flex flex-col gap-2 group">
                <span class="font-mono text-xs font-bold uppercase text-neutral-500">
                  Schedule
                </span>
                <DatePicker
                  value={scheduledDate()}
                  onChange={setScheduledDate}
                  position="center"
                  placeholder="PICK A DATE"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 class="font-oswald text-xl font-bold uppercase border-b-4 border-black pb-2 mb-6">
              Tags
            </h3>
            <div class="flex flex-wrap gap-2 mb-4">
              <For each={selectedTags()}>
                {(tagId) => (
                  <span class="px-2 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase flex items-center gap-1 border-2 border-black">
                    {getTagName(tagId)}
                    <button
                      onClick={() => removeTag(tagId)}
                      class="hover:text-primary transition-colors"
                    >
                      <X class="w-3 h-3" />
                    </button>
                  </span>
                )}
              </For>
            </div>
            <div class="relative">
              <SearchableSelect
                options={availableTags().filter(
                  (t) => !selectedTags().includes(t.value)
                )}
                onChange={addTag}
                placeholder="ADD TAG..."
              />
            </div>
          </div>

          {/* Featured Image */}
          <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 class="font-oswald text-xl font-bold uppercase border-b-4 border-black pb-2 mb-6">
              Featured Image
            </h3>
            <div
              onClick={() => openMediaModal('featured')}
              class="border-4 border-dashed border-neutral-300 bg-neutral-50 aspect-video flex flex-col items-center justify-center hover:border-black hover:bg-primary/20 transition-all cursor-pointer group relative overflow-hidden"
            >
              <Show
                when={featuredImage()}
                fallback={
                  <>
                    <Upload class="w-8 h-8 text-neutral-400 group-hover:text-black mb-2 transition-colors" />
                    <span class="font-mono text-[10px] font-bold uppercase text-neutral-400 group-hover:text-black transition-colors">
                      Select Image
                    </span>
                  </>
                }
              >
                <img
                  src={featuredImage()!}
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                />
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold uppercase text-xs">
                  Change
                </div>
              </Show>
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      <Show when={isPreviewOpen()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm p-4 w-full h-full">
          <div class="w-full max-w-7xl h-full flex flex-col relative bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            {/* Modal Header */}
            <div class="h-16 border-b-4 border-black flex items-center justify-between px-8 bg-neutral-100 shrink-0">
              <h2 class="font-oswald font-bold uppercase text-2xl text-black">
                Preview Mode
              </h2>
              <button
                onClick={() => setIsPreviewOpen(false)}
                class="bg-black text-white hover:bg-primary hover:text-black p-2 border-2 border-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <X class="w-6 h-6" />
              </button>
            </div>
            {/* Content */}
            <div class="flex-1 overflow-y-auto w-full p-8 md:p-12">
              <div class="max-w-5xl mx-auto grid grid-cols-12 gap-12">
                <div class="col-span-12 lg:col-span-9 prose prose-lg max-w-none">
                  <h1 class="font-oswald text-6xl font-black uppercase leading-none mb-8 pb-4 border-b-8 border-black">
                    {title() || 'Untitled'}
                  </h1>
                  {featuredImage() && (
                    <img
                      src={featuredImage()!}
                      class="w-full max-h-[500px] object-cover mb-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    />
                  )}
                  <div class="font-mono" innerHTML={htmlContent()} />
                </div>
                <div class="hidden lg:block col-span-3">
                  <div class="sticky top-8 border-l-4 border-black pl-6">
                    <TableOfContents headings={tocHeadings()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>

      {/* Media Modal */}
      <Show when={isMediaModalOpen()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
          <div class="bg-white border-4 border-black w-full max-w-6xl h-[90vh] flex flex-col shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative">
            <div class="h-16 border-b-4 border-black flex items-center justify-between px-6 bg-neutral-100 shrink-0">
              <div class="flex items-center gap-4">
                <h2 class="font-oswald font-bold uppercase text-2xl text-black">
                  Media Library
                </h2>
                <div class="relative hidden md:block">
                  <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
                  <input
                    type="text"
                    placeholder="SEARCH..."
                    value={mediaSearch()}
                    onInput={(e) => setMediaSearch(e.currentTarget.value)}
                    class="bg-white border-2 border-black pl-10 pr-4 py-1 text-xs font-bold uppercase focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none w-64 transition-all"
                  />
                </div>
              </div>
              <button
                onClick={() => setIsMediaModalOpen(false)}
                class="text-black hover:text-red-600 transition-colors"
              >
                <X class="w-8 h-8" />
              </button>
            </div>

            <div class="flex flex-1 overflow-hidden">
              <div class="flex-1 overflow-y-auto p-6 border-r-4 border-black bg-neutral-50">
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div
                    onClick={() => fileInputRef?.click()}
                    class="aspect-square bg-white border-4 border-dashed border-black flex flex-col items-center justify-center cursor-pointer hover:bg-primary/20 transition-all"
                  >
                    <Upload class="w-8 h-8 text-black mb-2" />
                    <span class="text-[10px] font-bold uppercase text-black">
                      Upload New
                    </span>
                  </div>
                  <For each={getFilteredMedia()}>
                    {(item) => (
                      <div
                        onClick={() => selectMediaItem(item.url, item.name)}
                        class="aspect-square border-4 border-black cursor-pointer relative group overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <img
                          src={item.url}
                          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                        <div class="absolute bottom-0 left-0 right-0 bg-black text-white text-[10px] font-mono p-1 truncate">
                          {item.name}
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
              {/* Sidebar Options */}
              <Show when={mediaModalTarget() === 'editor'}>
                <div class="w-72 bg-white p-6 overflow-y-auto shrink-0 border-l-4 border-black">
                  <h3 class="font-oswald font-bold uppercase mb-6 text-lg border-b-4 border-black pb-2">
                    Image Options
                  </h3>
                  <div class="mb-6">
                    <label class="block text-xs font-mono font-bold uppercase text-neutral-500 mb-2">
                      Width
                    </label>
                    <div class="flex gap-2">
                      <button
                        onClick={() => setImgWidth('100%')}
                        class={`flex-1 py-1 text-xs border-2 border-black font-bold uppercase ${
                          imgWidth() === '100%'
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-neutral-200'
                        }`}
                      >
                        Full
                      </button>
                      <button
                        onClick={() => setImgWidth('50%')}
                        class={`flex-1 py-1 text-xs border-2 border-black font-bold uppercase ${
                          imgWidth() === '50%'
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-neutral-200'
                        }`}
                      >
                        50%
                      </button>
                      <button
                        onClick={() => setImgWidth('25%')}
                        class={`flex-1 py-1 text-xs border-2 border-black font-bold uppercase ${
                          imgWidth() === '25%'
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-neutral-200'
                        }`}
                      >
                        25%
                      </button>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="block text-xs font-mono font-bold uppercase text-neutral-500 mb-2">
                      Alignment
                    </label>
                    <div class="flex gap-2">
                      <button
                        onClick={() => setImgAlign('left')}
                        class={`p-2 border-2 border-black ${
                          imgAlign() === 'left'
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-neutral-200'
                        }`}
                      >
                        <AlignLeft class="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setImgAlign('center')}
                        class={`p-2 border-2 border-black ${
                          imgAlign() === 'center'
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-neutral-200'
                        }`}
                      >
                        <AlignCenter class="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setImgAlign('right')}
                        class={`p-2 border-2 border-black ${
                          imgAlign() === 'right'
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-neutral-200'
                        }`}
                      >
                        <AlignRight class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="block text-xs font-mono font-bold uppercase text-neutral-500 mb-2">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      placeholder="Description..."
                      value={imgAlt()}
                      onInput={(e) => setImgAlt(e.currentTarget.value)}
                      class="w-full bg-white border-2 border-black p-2 text-xs font-mono outline-none focus:bg-neutral-100"
                    />
                  </div>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Show>

      {/* Shortcuts Modal */}
      <Show when={isShortcutsModalOpen()}>
        <div class="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div class="bg-white border-4 border-black w-full max-w-2xl shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] relative flex flex-col max-h-[85vh]">
            <div class="h-14 border-b-4 border-black flex items-center justify-between px-6 bg-primary shrink-0">
              <h2 class="font-oswald font-bold uppercase text-xl text-black">
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setIsShortcutsModalOpen(false)}
                class="text-black hover:text-white transition-colors"
              >
                <X class="w-6 h-6" />
              </button>
            </div>
            <div class="p-6 overflow-y-auto bg-white">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="font-mono text-xs font-bold uppercase text-black mb-4 border-b-2 border-black pb-2">
                    Formatting
                  </h3>
                  <ul class="space-y-2 text-xs font-bold font-mono text-neutral-600">
                    <li class="flex justify-between items-center">
                      <span>Bold</span>{' '}
                      <div>
                        <Kbd>Ctrl</Kbd> + <Kbd>B</Kbd>
                      </div>
                    </li>
                    <li class="flex justify-between items-center">
                      <span>Italic</span>{' '}
                      <div>
                        <Kbd>Ctrl</Kbd> + <Kbd>I</Kbd>
                      </div>
                    </li>
                    <li class="flex justify-between items-center">
                      <span>Strikethrough</span>{' '}
                      <div>
                        <Kbd>Alt</Kbd> + <Kbd>S</Kbd>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 class="font-mono text-xs font-bold uppercase text-black mb-4 border-b-2 border-black pb-2">
                    Headers
                  </h3>
                  <ul class="space-y-2 text-xs font-bold font-mono text-neutral-600">
                    <li class="flex justify-between items-center">
                      <span>H1 - H6</span>{' '}
                      <div>
                        <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>Number</Kbd>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
