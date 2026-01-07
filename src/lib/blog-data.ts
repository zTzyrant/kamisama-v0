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
    read_time: '5 min',
    comments_count: 0,
    author: {
      name: 'SYSTEM ADMIN',
      avatar: 'https://i.pravatar.cc/150?u=system',
      role: 'Administrator',
      initials: 'SA'
    },
    content: `
## Typography & Headings
Testing the hierarchy of headings.

# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4

## Text Formatting
Testing standard text styles.

This is **Bold Text**, this is *Italic Text*, and this is ***Bold Italic Text***.

Here is a [Link to Example.com](https://example.com).

> "This is a blockquote. It should stand out from the rest of the text, often used for quotes or highlighting important information."
>
> — Anonymous

## Lists
### Unordered List
- Item One
- Item Two
- Item Three with **Bold** text

### Ordered List
1. First Step
2. Second Step
3. Third Step

## Media & Images
### Standard Image
![Abstract](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600)

### Aligned Images (HTML embedded in Markdown)
These use the editor's advanced options (which generate HTML).

<div class="clearfix">
<img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400" alt="Neon Signs" style="width: 50%; float: left; margin-right: 1rem; margin-bottom: 0.5rem;" class="float-left mr-4 mb-2" />
<p>This text flows around the image which is floated to the left. The image is set to 50% width. Brutalism often uses stark contrasts and layout breaks.</p>
</div>
<div style="clear: both;"></div>

<img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400" alt="Grid" style="width: 50%; margin-left: auto; margin-right: auto; display: block;" class="mx-auto block" />
<p style="text-align: center;">Above is a centered image (50% width).</p>

## Tables
| Feature | Status | Notes |
| :--- | :--- | :--- |
| Markdown | Supported | Full GFM Support |
| Images | Advanced | Alignment & Size |
| Embeds | Active | YouTube, CodePen, etc. |

## Code Blocks
\`\`\`javascript
// This is a code block
function greet(name) {
  console.log("Hello, " + name);
}

greet("World");
\`\`\`

## Embeds
### YouTube
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
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
      <h2>WHAT IS BRUTALIST DESIGN?</h2>
      <p>Brutalist web design draws inspiration from the brutalist architecture movement of the 1950s-1970s. It's characterized by bold typography, high-contrast colors, thick borders, and a rejection of subtle, polished aesthetics.</p>
      <blockquote>"BRUTALISM ISN'T JUST A TREND—IT'S A REBELLION AGAINST HOMOGENEOUS DESIGN"</blockquote>
      <h2>KEY DESIGN ELEMENTS</h2>
      <p>1. TYPOGRAPHY: Big, bold, uppercase fonts. Hierarchy is key here.</p>
      <p>2. COLOR PALETTE: Limited but vibrant colors. Lime green, deep blacks, and crisp whites.</p>
    `
  },
  {
    slug: 'mastering-brutalist-web-design',
    number: '01',
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
    content: ''
  },
  {
    slug: 'react-19-new-features',
    number: '02',
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
    content: ''
  },
  {
    slug: 'neon-grid-system-case-study',
    number: '03',
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
    content: ''
  }
];
