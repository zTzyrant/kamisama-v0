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
