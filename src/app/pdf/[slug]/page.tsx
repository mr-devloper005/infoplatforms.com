import Link from "next/link";
import { notFound } from "next/navigation";
import { FileDown, FileText, ArrowLeft, Tag, ExternalLink, Download } from "lucide-react";

import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig } from "@/lib/site-config";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("pdf", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
    return post ? await buildPostMetadata("pdf", post) : await buildTaskMetadata("pdf");
  } catch (error) {
    console.warn("PDF metadata lookup failed", error);
    return await buildTaskMetadata("pdf");
  }
}

export default async function PdfDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post = null;
  try {
    post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
  } catch (error) {
    console.warn("PDF detail lookup failed", error);
  }
  if (!post) {
    notFound();
  }

  const content = post.content && typeof post.content === "object" ? post.content : {};
  const contentAny = content as Record<string, unknown>;
  const fileUrl =
    (typeof contentAny.fileUrl === "string" && contentAny.fileUrl) ||
    (typeof contentAny.pdfUrl === "string" && contentAny.pdfUrl) ||
    "";

  if (!fileUrl || !/^https?:\/\//i.test(fileUrl)) {
    notFound();
  }

  const viewerUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const category =
    typeof contentAny.category === "string" ? contentAny.category : "";
  const pageCount =
    typeof contentAny.pageCount === "number" ? contentAny.pageCount : null;
  const fileSize =
    typeof contentAny.fileSize === "string" ? contentAny.fileSize : null;

  await fetchTaskPosts("pdf", 1);

  const taskConfig = getTaskConfig("pdf");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: taskConfig?.label || "PDF Library",
        item: `${baseUrl}/pdf`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/pdf/${post.slug}`,
      },
    ],
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 18% 0%, rgba(248,178,89,0.14), transparent 42%), linear-gradient(180deg, #f3e9dc 0%, #fffdfb 52%, #ffffff 100%)",
      }}
    >
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/pdf"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(199,93,44,0.2)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--ip-ink)] backdrop-blur-sm transition hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {taskConfig?.label || "PDF Library"}
          </Link>
        </nav>

        {/* Title header */}
        <div className="mb-8">
          {category && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(199,93,44,0.18)] bg-[rgba(248,178,89,0.18)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ip-rust)]">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
          )}
          <h1
            className="mt-5 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-[var(--ip-ink)] sm:text-4xl lg:text-[2.6rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
        </div>

        {/* Main grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          {/* PDF viewer */}
          <div className="paper-panel overflow-hidden rounded-[1.6rem]">
            <div className="flex items-center gap-3 border-b border-[rgba(199,93,44,0.12)] bg-[rgba(248,178,89,0.08)] px-5 py-3">
              <FileText className="h-4 w-4 text-[var(--ip-rust)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ip-rust)]">
                Preview
              </span>
              <span className="ml-auto text-[11px] text-[color:oklch(0.52_0.04_42)]">
                {post.title}
              </span>
            </div>
            <iframe
              src={viewerUrl}
              title={post.title}
              className="h-[78vh] w-full bg-white"
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Actions */}
            <div className="paper-panel rounded-[1.6rem] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ip-ink)]">
                Actions
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={fileUrl}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--ip-orange)] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(217,111,50,0.35)] transition hover:bg-[#c75d2c]"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(199,93,44,0.22)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ip-ink)] transition hover:bg-[rgba(248,178,89,0.12)]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in new tab
                </a>
              </div>
            </div>

            {/* Document info */}
            <div className="paper-panel rounded-[1.6rem] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ip-ink)]">
                Document info
              </h2>
              <dl className="mt-4 space-y-3">
                {category && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-sm text-[color:oklch(0.52_0.04_42)]">
                      <Tag className="h-3.5 w-3.5" />
                      Category
                    </dt>
                    <dd className="text-sm font-medium text-[var(--ip-ink)]">{category}</dd>
                  </div>
                )}
                {pageCount && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-sm text-[color:oklch(0.52_0.04_42)]">
                      <FileDown className="h-3.5 w-3.5" />
                      Pages
                    </dt>
                    <dd className="text-sm font-medium text-[var(--ip-ink)]">{pageCount}</dd>
                  </div>
                )}
                {fileSize && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-sm text-[color:oklch(0.52_0.04_42)]">
                      <FileText className="h-3.5 w-3.5" />
                      Size
                    </dt>
                    <dd className="text-sm font-medium text-[var(--ip-ink)]">{fileSize}</dd>
                  </div>
                )}
                {!category && !pageCount && !fileSize && (
                  <p className="text-sm text-[color:oklch(0.52_0.04_42)]">
                    No additional metadata available.
                  </p>
                )}
              </dl>
            </div>

          </aside>
        </div>

      </main>
      <Footer />
    </div>
  );
}
