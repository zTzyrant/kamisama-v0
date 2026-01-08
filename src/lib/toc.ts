export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and dashes)
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single
    .trim();
};

export const extractHeadings = (markdown: string): TocItem[] => {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);

    if (level <= 3) {
      // Only H1-H3
      headings.push({ id, text, level });
    }
  }

  return headings;
};
