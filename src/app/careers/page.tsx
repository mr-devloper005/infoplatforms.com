import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const roles = [
  { title: "Editorial researcher", location: "Remote", type: "Contract", level: "Mid" },
  { title: "Document operations", location: "Remote", type: "Part-time", level: "Mid" },
];

const benefits = [
  "Async-first collaboration",
  "Clear writing and documentation culture",
  "Learning budget for courses and books",
  "Quarterly editorial planning sessions",
];

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`${SITE_CONFIG.name} hires selectively for editorial research, document operations, and publishing support.`}
      actions={
        <Button asChild>
          <Link href="/contact">Introduce yourself</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We keep the team small. If you care about long-form clarity and document-quality PDFs, send a note—we respond when there is a real match.
          </p>
          {roles.map((role) => (
            <Card key={role.title} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{role.level}</Badge>
                  <Badge variant="outline">{role.type}</Badge>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-foreground">{role.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{role.location}</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/contact">Discuss this role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">How we work</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {benefits.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
