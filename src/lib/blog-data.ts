export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    initials: string;
  };
  comments_count: number;
  read_time: string;
  number: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'markdown-features-showcase',
    number: '00',
    title: 'Markdown Features Showcase',
    excerpt: 'A comprehensive guide and test suite for all supported Markdown formatting, embeds, and media features in our new editor.',
    date: 'JAN 07, 2026',
    category: 'SYSTEM',
    tags: ['MARKDOWN', 'TESTING', 'SYSTEM'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop',
    read_time: '15 min',
    comments_count: 0,
    author: {
      name: 'SYSTEM ADMIN',
      avatar: 'https://i.pravatar.cc/150?u=system',
      role: 'Administrator',
      initials: 'SA'
    },
    content: `
# Ultimate Markdown Rendering Test

This post serves as a comprehensive test suite to verify that your Markdown renderer (likely \`marked.js\` or similar) handles all standard syntax, HTML embedding, and complex structures correctly.

---

## 1. Typography & Headings
Testing the hierarchy of headings (H1 through H6).

# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4
##### Heading Level 5
###### Heading Level 6

## Text Formatting
Testing standard text styles including **Bold**, *Italic*, and ***Bold Italic***.

You can also use ~~Strikethrough~~ text to indicate removed information.

We can also use \`inline code\` within a sentence.

## Horizontal Rule
***

## 2. Blockquotes
> "This is a standard blockquote. It is useful for highlighting text."
>
> — *Anonymous Source*

### Nested Blockquotes
> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

## 3. Lists
### Unordered List
- Item One
- Item Two
  - Nested Item A
  - Nested Item B
- Item Three with **Bold** text

### Ordered List
1. First Step
2. Second Step
3. Third Step
    1. Sub-step 3.1
    2. Sub-step 3.2

### Task List
- [x] Finish writing the Markdown test
- [ ] Test YouTube Embeds
- [x] Test CodePen Integration
- [ ] Deploy to production

## 4. Links & Images
### Standard Link
Visit [OpenAI](https://openai.com) for more AI tools.

### Standard Image
![Abstract Architecture](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800)

### Image with HTML Alignment
Since standard Markdown doesn't support alignment, we inject HTML.

<div style="background: #f4f4f4; padding: 10px; border-radius: 8px; overflow: hidden;">
  <h4>Float Left Image</h4>
  <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300" alt="Neon Signs" style="width: 150px; float: left; margin-right: 15px; margin-bottom: 5px; border-radius: 4px;" />
  <p>This text flows around the image which is floated to the left. The image is fixed width. This layout technique is common in editorial designs to break up large blocks of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <div style="clear: both;"></div>
</div>

## 5. Code Blocks
### JavaScript (Syntax Highlighting Test)
\`\`\`javascript
// This is a code block
function greet(name) {
<br>

<div style="background: #f4f4f4; padding: 10px; border-radius: 8px; text-align: center;">
  <h4>Centered Image</h4>
  <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=300" alt="Grid" style="width: 200px; display: block; margin: 0 auto; border-radius: 4px;" />
  <p style="font-size: 0.9em; color: #666;">Above is a centered image with a caption.</p>
</div>

## 5. Code Blocks
### JavaScript (Syntax Highlighting Test)
\`\`\`javascript
// This is a code block
function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

greet("World");
\`\`\`

### CSS
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  color: #ffffff;
}
\`\`\`

### JSON
\`\`\`json
{
  "name": "Testing Tool",
  "version": "1.0.0",
  "features": [
    "Markdown",
    "HTML",
    "Embeds"
  ]
}
\`\`\`

## 6. Tables
| Feature | Status | Notes |
| :--- | :---: | ---: |
| Markdown | Supported | Full GFM Support |
| Images | Advanced | Alignment & Size via HTML |
| Embeds | Active | YouTube, CodePen, JSFiddle |
| Math | Pending | LaTeX support needed |

## 7. External Embeds (Iframes)

### YouTube Embed
<iframe width="100%" height="450" src="https://www.youtube.com/embed/tgbNymZ7vqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### CodePen Embed
<iframe height="300" style="width: 100%;" scrolling="no" title="Code Pen Test" src="https://codepen.io/Kaguio/embed/OxdeOE?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true"></iframe>

### JSFiddle Embed
<iframe style="width: 100%; height: 300px; border: 1px solid #ddd;" src="https://jsfiddle.net/westonruter/6mSuK/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 8. HTML Advanced Elements
### Collapsible Details
<details>
  <summary><strong>Click to expand Spoiler</strong></summary>
  <p>This is hidden content that is revealed when the user clicks the summary tag. Great for FAQs or spoilers.</p>
</details>

### Highlighting
This is a normal paragraph. <mark>This text is highlighted using the HTML mark tag.</mark> This text is normal again.
    `
  },
  {
    slug: 'the-future-of-web-simplicity',
    number: '01',
    title: 'The Future of Web Simplicity',
    excerpt:
      'Why maximalism is dying and how raw, unpolished aesthetics are reshaping the digital landscape in 2026.',
    date: 'FEB 24, 2026',
    category: 'FEATURED',
    tags: [
      '#WEBDEVELOPMENT',
      '#UIUXDESIGN',
      '#BRUTALISM',
      '#CSSART',
      '#JAVASCRIPT',
      '#TYPOGRAPHY',
      '#ACCESSIBILITY'
    ],
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    read_time: '8 min',
    comments_count: 234,
    author: {
      name: 'ALEX CHEN',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      role: 'Sr. Designer',
      initials: 'AC'
    },
    content: `
# WHAT IS BRUTALIST DESIGN?

Brutalist web design draws inspiration from the brutalist architecture movement of the 1950s-1970s. It's characterized by **bold typography**, high-contrast colors, thick borders, and a rejection of subtle, polished aesthetics.

## THE PHILOSOPHY

> "BRUTALISM ISN'T JUST A TREND—IT'S A REBELLION AGAINST HOMOGENEOUS DESIGN"

It prioritizes **function over form**. If it loads fast, it's readable, and it works, then the design is successful.

## KEY DESIGN ELEMENTS

1.  **TYPOGRAPHY:** Big, bold, uppercase fonts. Hierarchy is key here. We often use system fonts like Courier New or Arial to keep it raw.
2.  **COLOR PALETTE:** Limited but vibrant colors. Lime green, deep blacks, and crisp whites.

### Visual Example
<div style="border: 5px solid black; padding: 20px; background: yellow; color: black; font-weight: bold; font-family: monospace;">
RAW HTML STYLING INSIDE MARKDOWN<br>
NO TAILWIND NEEDED
</div>

## CODE EXAMPLE

\`\`\`css
.brutalist-box {
  border: 4px solid #000;
  box-shadow: 10px 10px 0px #000;
  background-color: #fff;
  color: #000;
}
\`\`\`
    `
  },
  {
    slug: 'mastering-brutalist-web-design',
    number: '02',
    title: 'MASTERING BRUTALIST WEB DESIGN IN 2026',
    excerpt:
      "Brutalism in web design is more than just an aesthetic choice—it's a philosophy that embraces raw, unpolished beauty and challenges conventional design norms. Learn the key principles.",
    date: 'JAN 06, 2026',
    category: 'DESIGN',
    tags: ['CSS', 'DESIGN'],
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
    read_time: '8 min',
    comments_count: 234,
    author: {
      name: 'ALEX CHEN',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      role: 'Sr. Designer',
      initials: 'AC'
    },
    content: `
## Table of Contents
- [Introduction](#introduction)
- [Raw CSS](#raw-css)
- [Media Queries](#media-queries)

### Introduction
Design is not just what it looks like and feels like. Design is how it works.

### Raw CSS
Sometimes you just need to write raw CSS without a framework.

\`\`\`css
body {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
}
\`\`\`

### Media Queries
Ensuring that even brutalist sites are responsive.

\`\`\`css
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
}
\`\`\`
    `
  },
  {
    slug: 'react-19-new-features',
    number: '03',
    title: 'REACT 19: NEW FEATURES YOU NEED TO KNOW',
    excerpt:
      'The latest update brings concurrent rendering improvements and automatic batching. Here is a deep dive into how it changes your workflow.',
    date: 'JAN 04, 2026',
    category: 'PERFORMANCE',
    tags: ['REACT', 'PERFORMANCE'],
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop',
    read_time: '12 min',
    comments_count: 112,
    author: {
      name: 'SARAH JOHNSON',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      role: 'Frontend Dev',
      initials: 'SJ'
    },
    content: `
## Key Changes in React 19

React 19 introduces several new features designed to improve performance and developer experience.

### 1. The \`use\` API
The new \`use\` API allows you to read resources (like Promises or Context) in render.

\`\`\`jsx
import { use } from 'react';

function Message({ messagePromise }) {
  const message = use(messagePromise);
  // ...
}
\`\`\`

### 2. Actions
Simplifying form handling.

\`\`\`jsx
function UpdateName({}) {
  async function updateName(formData) {
    const name = formData.get("name");
    // ...
  }

  return (
    <form action={updateName}>
      <input name="name" />
      <button type="submit">Update</button>
    </form>
  );
}
\`\`\`

> Note: These features are designed to make async operations in React much more intuitive.
    `
  },
  {
    slug: 'neon-grid-system-case-study',
    number: '04',
    title: 'NEON GRID SYSTEM: A CASE STUDY',
    excerpt:
      'How we built a responsive, neon-infused grid system using only CSS Grid and variables. No JS required.',
    date: 'DEC 28, 2025',
    category: 'SHOWCASE',
    tags: ['GRID', 'CSS'],
    image:
      'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2680&auto=format&fit=crop',
    read_time: '5 min',
    comments_count: 45,
    author: {
      name: 'M. RODRIGUEZ',
      avatar: 'https://i.pravatar.cc/150?u=marcus',
      role: 'Accessibility Lead',
      initials: 'MR'
    },
    content: `
## The Grid Concept

We wanted a grid that felt like a *cyberpunk cityscape*. High contrast lines, glowing intersections.

### The CSS Implementation

\`\`\`css
:root {
  --neon-color: #0ff;
  --bg-color: #111;
}

body {
  background-color: var(--bg-color);
  background-image: 
    linear-gradient(var(--neon-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--neon-color) 1px, transparent 1px);
  background-size: 50px 50px;
}
\`\`\`

### Demo Output
<div style="height: 200px; background: #111; border: 2px solid #0ff; color: #0ff; display: flex; align-items: center; justify-content: center; font-family: monospace;">
  // VISUALIZING GRID SYSTEM //
</div>

### Why Accessibility Matters
Even in a "neon" design, we must ensure contrast ratios are met.
    `
  }
];