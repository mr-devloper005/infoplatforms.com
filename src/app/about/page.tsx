import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Editorial focus", value: "Articles first" },
  { label: "Document lane", value: "PDF library" },
  { label: "Discovery", value: "Unified search" },
];

const values = [
  {
    title: "Evidence next to narrative",
    description:
      "When a story needs a methodology PDF, a data appendix, or a print-ready brief, Info Platforms keeps the file beside the article instead of hiding it in another product.",
  },
  {
    title: "Built for operators and readers",
    description:
      "Teams get consistent publishing workflows; readers get calm typography, clear hierarchy, and fast loads on mobile and desktop.",
  },
  {
    title: "Open by URL",
    description:
      "Every content type the platform supports remains reachable by its routes—so bookmarks, integrations, and internal links keep working even when the homepage highlights articles and PDFs.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} publishes editorial articles and a structured PDF library for teams that need both narrative and downloadable evidence.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/articles">Read articles</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">What we do</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A publication desk for analysis—and a file room for everything that should travel as a PDF.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} is designed around two surfaces that often move together: long-form writing for context, and document-grade files for stakeholders who need something they can forward, print, or archive.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-lg font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Editorial &amp; operations</p>
        <p className="mt-2">
          We do not list individual staff names on this marketing site. For contributor guidelines, syndication, or document submissions, use{" "}
          <Link href="/contact" className="font-medium text-primary underline underline-offset-4">
            Contact
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
