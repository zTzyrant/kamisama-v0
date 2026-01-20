
export async function GET() {
    const hostname = 'https://kamisama-v0.my.id';

    const modules = import.meta.glob('./**/*.{tsx,jsx}');

    const staticRoutes = Object.keys(modules)
        .filter((path) => {
            return (
                !path.includes('[') &&
                !path.includes('(') &&
                !path.endsWith('sitemap.xml.ts') &&
                !path.includes('404')
            );
        })
        .map((path) => {
            return path
                .replace('./', '/')
                .replace(/\.(tsx|jsx)$/, '')
                .replace(/\/index$/, '')
                .replace(/\/$/, '');
        });

    const finalStaticRoutes = staticRoutes.length > 0 ? staticRoutes : [''];

    let posts: any[] = [];
    try {
        posts = [];
    } catch (e) {
        console.error("Gagal fetch blog posts untuk sitemap");
    }

    // 3. GENERATE XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...new Set(finalStaticRoutes)].map((route) => `
  <url>
    <loc>${hostname}${route || '/'}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>`).join('')}
  ${posts.map((post: any) => `
  <url>
    <loc>${hostname}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600'
        },
    });
}