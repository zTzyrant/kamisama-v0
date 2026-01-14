import { marked } from 'marked';
import hljs from 'highlight.js';
import { slugify } from './toc';

export const configureMarkdown = () => {
  const renderer = new marked.Renderer();

  // Custom Code Block Renderer
  renderer.code = ({ text, lang }) => {
    const language = lang || 'plaintext';
    let highlighted = text;

    if (lang && hljs.getLanguage(language)) {
      try {
        highlighted = hljs.highlight(text, { language }).value;
      } catch (e) {
        console.error('Highlighting failed:', e);
      }
    }

    // Discord-like Code Block Structure
    // - Dark background
    // - Rounded corners
    // - Language label (optional, omitting for clean Discord look which mostly just shows code)
    // - Copy button (visible on hover)
    return `
      <div class="relative group my-4 rounded-md overflow-hidden bg-[#2b2d31] border border-[#1e1f22]">
        <div class="flex items-center justify-between px-4 py-2 bg-[#202225] text-xs text-gray-400 select-none">
          <span class="font-mono lowercase">${language}</span>
          <button 
            class="copy-code-btn opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase hover:brightness-110"
            data-code="${encodeURIComponent(text)}"
          >
            Copy
          </button>
        </div>
        <div class="p-4 overflow-x-auto">
          <pre><code class="font-mono text-sm text-[#dbdee1] hljs language-${language}">${highlighted}</code></pre>
        </div>
      </div>
    `;
  };

  // Custom Heading Renderer (Preserving existing logic)
  renderer.heading = ({ text, depth }) => {
    const id = slugify(text);
    return `<h${depth} id="${id}" class="scroll-mt-24 group relative">
      ${text}
      <a href="#${id}" class="opacity-0 group-hover:opacity-100 absolute -left-6 top-0 text-primary transition-opacity">#</a>
    </h${depth}>`;
  };

  marked.setOptions({
    gfm: true,
    breaks: true,
    renderer
  });

  return marked;
};
