"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { loadFromStorage, saveToStorage, storageKeys } from "@/lib/local-storage";
import type { User } from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_MASTER_PANEL_URL ||
  process.env.NEXT_PUBLIC_MASTER_API_URL;
const SITE_CODE = process.env.NEXT_PUBLIC_SITE_CODE;
const LOCAL_COMMENT_VERSION = "v2";
const DAILY_COMMENT_LIMIT = 10;

type LocalComment = {
  id: string;
  slug: string;
  articleSlug: string;
  authorName: string;
  body: string;
  createdAt: string;
  source: "local";
};

type DisplayComment = {
  id: string;
  slug: string;
  authorName: string;
  body: string;
  createdAt: string;
  source: "local" | "remote";
};

const buildPublicUrl = (path: string) => {
  if (!API_BASE || !SITE_CODE) return null;
  return `${API_BASE.replace(/\/$/, "")}/api/v1/public/${SITE_CODE}${path}`;
};

const getContent = (post: SitePost) =>
  post.content && typeof post.content === "object" ? (post.content as Record<string, any>) : {};

const commentStorageKey = (slug: string) => `nexus-article-comments:${LOCAL_COMMENT_VERSION}:${slug}`;

const startOfToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

const nextResetTime = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getLocalAuthorName = () => {
  const savedUser = loadFromStorage<User | null>(storageKeys.user, null);
  return savedUser?.name?.trim() || "User";
};

const toDisplayComment = (comment: SitePost): DisplayComment => {
  const content = getContent(comment);
  return {
    id: comment.id,
    slug: comment.slug,
    authorName: comment.authorName || "Anonymous",
    body:
      (typeof content.description === "string" && content.description) ||
      comment.summary ||
      "Comment added.",
    createdAt: comment.publishedAt || comment.createdAt || new Date().toISOString(),
    source: "remote",
  };
};

const sortComments = (comments: DisplayComment[]) =>
  [...comments].sort((a, b) => {
    if (a.source !== b.source) {
      return a.source === "local" ? -1 : 1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

export function ArticleComments({ slug }: { slug: string }) {
  const [remoteComments, setRemoteComments] = useState<DisplayComment[]>([]);
  const [localComments, setLocalComments] = useState<LocalComment[]>([]);
  const [page, setPage] = useState(1);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [commentBody, setCommentBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const pageSize = 10;

  useEffect(() => {
    const saved = loadFromStorage<LocalComment[]>(commentStorageKey(slug), []);
    setLocalComments(Array.isArray(saved) ? saved : []);
  }, [slug]);

  useEffect(() => {
    const load = async () => {
      const target = buildPublicUrl("/feed?limit=200");
      if (!target) {
        setRemoteComments([]);
        return;
      }

      try {
        const response = await fetch(target, { cache: "no-store" });
        if (!response.ok) {
          setRemoteComments([]);
          return;
        }
        const json = (await response.json()) as { data?: { posts?: SitePost[] } };
        const posts = json.data?.posts || [];
        const filtered = posts.filter((post) => {
          const content = getContent(post);
          return (
            content.type === "comment" &&
            (content.articleSlug === slug ||
              (typeof content.parentUrl === "string" && content.parentUrl.includes(`/${slug}`)))
          );
        });

        setRemoteComments(filtered.map(toDisplayComment));
      } catch {
        setRemoteComments([]);
      }
    };

    load();
  }, [slug]);

  const mergedComments = useMemo(
    () =>
      sortComments([
        ...localComments.map((comment) => ({
          id: comment.id,
          slug: comment.slug,
          authorName: comment.authorName,
          body: comment.body,
          createdAt: comment.createdAt,
          source: "local" as const,
        })),
        ...remoteComments,
      ]),
    [localComments, remoteComments]
  );

  const commentsToday = useMemo(() => {
    const todayStart = startOfToday();
    return localComments.filter((comment) => new Date(comment.createdAt).getTime() >= todayStart).length;
  }, [localComments]);

  const remainingToday = Math.max(DAILY_COMMENT_LIMIT - commentsToday, 0);
  const limitReached = remainingToday <= 0;
  const resetLabel = nextResetTime().toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#comment-")) {
      const targetKey = hash.replace("#comment-", "");
      const match = mergedComments.find(
        (item) => item.id === targetKey || item.slug === targetKey
      );
      setHighlightId(match?.id || null);
      return;
    }

    if (hash === "#comment" && mergedComments.length) {
      setHighlightId(mergedComments[0].id);
      return;
    }

    setHighlightId(null);
  }, [mergedComments]);

  useEffect(() => {
    if (!highlightId) return;
    const target = document.getElementById(`comment-${highlightId}`);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [highlightId]);

  const totalPages = Math.max(Math.ceil(mergedComments.length / pageSize), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const visibleComments = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return mergedComments.slice(start, start + pageSize);
  }, [mergedComments, safePage]);

  const persistLocalComments = (nextComments: LocalComment[]) => {
    setLocalComments(nextComments);
    saveToStorage(commentStorageKey(slug), nextComments);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanBody = commentBody.trim();

    if (!cleanBody) {
      setFormError("Please write a comment before publishing.");
      return;
    }

    if (limitReached) {
      setFormError("You have reached the 10 comments per day limit on this device.");
      return;
    }

    const nextComment: LocalComment = {
      id: `local-${slug}-${Date.now()}`,
      slug: `local-comment-${Date.now()}`,
      articleSlug: slug,
      authorName: getLocalAuthorName(),
      body: cleanBody,
      createdAt: new Date().toISOString(),
      source: "local",
    };

    persistLocalComments([nextComment, ...localComments]);
    setCommentBody("");
    setFormError(null);
    setHighlightId(nextComment.id);
    setPage(1);
  };

  const handleDeleteLocalComment = (commentId: string) => {
    const nextComments = localComments.filter((comment) => comment.id !== commentId);
    persistLocalComments(nextComments);
    if (highlightId === commentId) {
      setHighlightId(null);
    }
    setFormError(null);
  };

  return (
    <section className="mt-12" id="comments">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase text-[var(--ip-ink)]">
        <MessageSquare className="h-4 w-4 text-[var(--ip-rust)]" />
        Comments
      </div>

      <form onSubmit={handleSubmit} className="paper-panel mt-6 rounded-[1.6rem] p-5">
        <div className="space-y-2">
          <label htmlFor="comment-body" className="text-sm font-semibold text-[var(--ip-ink)]">
            Add a comment
          </label>
          <Textarea
            id="comment-body"
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
            placeholder="Write your comment here"
            className="min-h-28 rounded-xl border-[rgba(199,93,44,0.18)] bg-white/80 text-[var(--ip-ink)] focus-visible:ring-[var(--ip-orange)]"
            maxLength={2000}
            disabled={limitReached}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                limitReached
                  ? "bg-[rgba(217,111,50,0.12)] text-[var(--ip-rust)]"
                  : remainingToday <= 3
                    ? "bg-[rgba(248,178,89,0.2)] text-[var(--ip-rust)]"
                    : "bg-[rgba(217,111,50,0.1)] text-[var(--ip-rust)]"
              }`}
            >
              {limitReached
                ? `Daily limit reached: ${DAILY_COMMENT_LIMIT}/${DAILY_COMMENT_LIMIT}`
                : `${remainingToday} of ${DAILY_COMMENT_LIMIT} comments left today`}
            </div>
            <p className="text-xs text-[color:oklch(0.52_0.04_42)]">
              {limitReached
                ? `You can publish again after ${resetLabel}.`
                : `Limit resets after ${resetLabel}.`}
            </p>
          </div>
          <Button
            type="submit"
            disabled={limitReached}
            className="rounded-xl bg-[var(--ip-orange)] text-white shadow-[0_6px_20px_rgba(217,111,50,0.3)] hover:bg-[#c75d2c]"
          >
            Publish Comment
          </Button>
        </div>
        {formError ? <p className="mt-3 text-sm text-[var(--ip-rust)]">{formError}</p> : null}
      </form>

      {mergedComments.length ? (
        <div className="mt-6 space-y-4">
          {visibleComments.map((comment) => {
            const isHighlighted = highlightId === comment.id;
            return (
              <div
                key={comment.id}
                id={`comment-${comment.id}`}
                className={`rounded-[1.4rem] border p-4 ${
                  isHighlighted
                    ? "border-[rgba(199,93,44,0.3)] bg-[rgba(248,178,89,0.1)]"
                    : "border-[rgba(199,93,44,0.12)] bg-white/85"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--ip-ink)]">{comment.authorName}</p>
                  {comment.source === "local" ? (
                    <button
                      type="button"
                      onClick={() => handleDeleteLocalComment(comment.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(199,93,44,0.14)] text-[color:oklch(0.52_0.04_42)] transition hover:border-[rgba(199,93,44,0.3)] hover:bg-[rgba(217,111,50,0.08)] hover:text-[var(--ip-rust)]"
                      aria-label="Delete local comment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
                <RichContent
                  html={formatRichHtml(comment.body, "Comment added.")}
                  className="mt-2 text-sm leading-7 text-[color:oklch(0.42_0.04_42)] prose-sm prose-h2:text-xl prose-h3:text-lg"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="paper-panel mt-6 rounded-[1.6rem] border-dashed p-6 text-center text-sm text-[color:oklch(0.52_0.04_42)]">
          No comments yet.
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[color:oklch(0.52_0.04_42)]">
          <span>
            Page {safePage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={safePage === 1}
              className="rounded-full border border-[rgba(199,93,44,0.16)] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[var(--ip-ink)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={safePage === totalPages}
              className="rounded-full border border-[rgba(199,93,44,0.16)] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[var(--ip-ink)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
