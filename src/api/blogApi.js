import { apiGet } from "./apiClient";

// Blog (Journal) endpoints.
//   list:    /public/blog/list
//   content: /public/blog/content/{slug}   (related posts come back as relativesBlogs)
//
// Slugs can contain spaces, so they are URL-encoded when requesting content.

function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Maps an API blog onto the card shape the Journal/Article pages use:
// { slug, title, description, image, date, category }
function mapBlog(item) {
  return {
    slug: item.slug,
    title: item.title ?? "",
    description: item.description ?? "",
    image: item.cover_image ?? item.banner_image ?? null,
    date: formatDate(item.created_at),
    category: item.type ?? null
  };
}

export async function getBlogList() {
  const response = await apiGet("/public/blog/list", { page: 1, limit: 50 });
  // The list is nested: { data: { data: [ ... ] } }
  const rows = response?.data?.data ?? response?.data ?? [];
  if (!Array.isArray(rows)) return [];

  return rows.filter((blog) => blog.is_publish !== false).map(mapBlog);
}

export async function getBlogContent(slug) {
  const response = await apiGet(`/public/blog/content/${encodeURIComponent(slug)}`);
  const data = response?.data ?? response;

  return {
    slug: data.slug,
    title: data.title ?? "",
    date: formatDate(data.created_at),
    image: data.cover_image ?? data.banner_image ?? null,
    contentHtml: data.content ?? "",
    related: Array.isArray(data.relativesBlogs) ? data.relativesBlogs.map(mapBlog) : []
  };
}
