import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag, BookOpen } from "lucide-react";

import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { ContentImage } from "@/components/shared/content-image";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { ArticleComments } from "@/components/tasks/article-comments";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("article", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("article", resolvedParams.slug);
  return post ? await buildPostMetadata("article", post) : await buildTaskMetadata("article");
}

const isValidImageUrl = (value?: string | null) =>
  typeof value === "string" && (value.startsWith("/") || /^https?:\/\//i.test(value));

const getContent = (post: SitePost) =>
  post.content && typeof post.content === "object" ? (post.content as Record<string, unknown>) : {};

const getImageUrls = (post: SitePost, content: Record<string, unknown>) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaImages = media
    .map((item) => (item as { url?: string }).url)
    .filter((url): url is string => isValidImageUrl(url));
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : [];
  const merged = [...mediaImages, ...contentImages];
  if (merged.length) return merged;
  if (isValidImageUrl(content.logo as string | null)) return [content.logo as string];
  return ["/placeholder.svg?height=900&width=1400"];
};

const formatArticleHtml = (content: Record<string, unknown>, post: SitePost) => {
  const raw =
    (typeof content.body === "string" && content.body.trim()) ||
    (typeof content.description === "string" && content.description.trim()) ||
    (typeof post.summary === "string" && post.summary.trim()) ||
    "";
  return formatRichHtml(raw, "Details coming soon.");
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post: SitePost | null = null;
  try {
    post = await fetchTaskPostBySlug("article", resolvedParams.slug);
  } catch (error) {
    console.warn("Article detail lookup failed", error);
  }
  if (!post) {
    notFound();
  }

  const content = getContent(post);
  const category = (typeof content.category === "string" && content.category) || (Array.isArray(post.tags) ? post.tags[0] : "") || "Article";
  const articleHtml = formatArticleHtml(content, post);
  const postTags = Array.isArray(post.tags) ? post.tags.filter((tag): tag is string => typeof tag === "string") : [];
  const images = getImageUrls(post, content);
  const featuredImage = images[0];
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const taskConfig = getTaskConfig("article");
  const articleUrl = `${baseUrl}${taskConfig?.route || "/articles"}/${post.slug}`;
  const absoluteImage = featuredImage.startsWith("/")
    ? `${baseUrl}${featuredImage}`
    : featuredImage;

  const related = (await fetchTaskPosts("article", 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!category) return true;
      const itemContent = getContent(item);
      const itemCategory = typeof itemContent.category === "string" ? itemContent.category : "";
      return itemCategory === category;
    })
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary || post.title,
    image: absoluteImage ? [absoluteImage] : [],
    articleSection: category,
    keywords: postTags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: taskConfig?.label || "Articles", item: `${baseUrl}${taskConfig?.route || "/articles"}` },
      { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
    ],
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.07), transparent 32%), linear-gradient(180deg, #fffbf5 0%, #fffdf9 55%, #ffffff 100%)",
      }}
    >
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SchemaJsonLd data={[articleSchema, breadcrumbSchema]} />

        {/* Breadcrumb */}
        <nav className="mb-10">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(199,93,44,0.16)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--ip-ink)] backdrop-blur-sm transition hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {taskConfig?.label || "Articles"}
          </Link>
        </nav>

        {/* Article header */}
        <div className="mx-auto max-w-3xl">
          {category && (
            <span className="editorial-label">
              <BookOpen className="h-3.5 w-3.5" />
              {category}
            </span>
          )}
          <h1
            className="mt-6 text-[2.6rem] font-semibold leading-[1.1] tracking-[-0.04em] text-[var(--ip-ink)] sm:text-5xl lg:text-[3.4rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>

        </div>

        {/* Featured image */}
        {featuredImage && (
          <div className="mx-auto mt-10 max-w-5xl">
            <div className="paper-panel overflow-hidden rounded-[1.6rem]">
              <div className="relative aspect-[16/9] w-full">
                <ContentImage
                  src={featuredImage}
                  alt={`${post.title} featured image`}
                  fill
                  className="object-cover"
                  intrinsicWidth={1600}
                  intrinsicHeight={900}
                  sizes="(max-width: 1024px) 92vw, 1024px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Article body */}
        <div className="mx-auto mt-12 max-w-3xl">
          <RichContent
            html={articleHtml}
            className="leading-8 prose-p:my-6 prose-h2:my-8 prose-h2:text-[1.6rem] prose-h2:font-semibold prose-h2:tracking-[-0.02em] prose-h2:text-[var(--ip-ink)] prose-h3:my-6 prose-h3:text-[1.3rem] prose-h3:font-semibold prose-h3:tracking-[-0.02em] prose-h3:text-[var(--ip-ink)] prose-ul:my-6 prose-a:text-[var(--ip-orange)] prose-a:underline-offset-4"
          />

          {/* Tags */}
          {postTags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {postTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-[rgba(199,93,44,0.16)] bg-white/80 px-3 py-1.5 text-xs font-medium text-[var(--ip-ink)]"
                >
                  <Tag className="h-3 w-3 text-[var(--ip-rust)]" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Comments */}
          <ArticleComments slug={post.slug} />
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mx-auto mt-16 max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ip-ink)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  More to read
                </h2>
                <p className="mt-1 text-sm text-[color:oklch(0.42_0.04_42)]">
                  Related stories in {category}
                </p>
              </div>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(199,93,44,0.16)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--ip-ink)] transition hover:bg-white"
              >
                View all
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={buildPostUrl("article", item.slug)}
                  taskKey="article"
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

