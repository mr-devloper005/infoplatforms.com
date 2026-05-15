import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  {
    title: "Eligibility and Account Responsibilities",
    body:
      "You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account. You must provide accurate information and keep your account details up to date.",
  },
  {
    title: "Acceptable Use",
    body:
      "You agree not to post unlawful, infringing, deceptive, or harmful content; attempt unauthorized access; distribute malware; interfere with platform operations; or use automation in ways that abuse the service.",
  },
  {
    title: "Content Ownership and License",
    body:
      "You retain ownership of the content you submit. By posting, you grant us a non-exclusive, worldwide, royalty-free license to host, store, reproduce, adapt for technical delivery, publish, and display that content to operate and improve the service.",
  },
  {
    title: "Moderation and Enforcement",
    body:
      "We may review, remove, restrict, or label content that violates these terms, community standards, or legal requirements. We may suspend or terminate accounts involved in repeated or severe violations.",
  },
  {
    title: "Third-Party Links and Services",
    body:
      "The platform may reference external links, embedded media, or third-party tools. We are not responsible for third-party content, availability, security practices, or terms.",
  },
  {
    title: "Intellectual Property",
    body:
      "All platform software, branding, interface design, and non-user materials are protected by applicable intellectual property laws. You may not copy, reverse engineer, or commercially exploit platform assets except as permitted by law or written approval.",
  },
  {
    title: "Disclaimers",
    body:
      "The service is provided on an 'as is' and 'as available' basis. We do not guarantee uninterrupted availability, error-free operation, or the accuracy or completeness of user-generated or third-party content.",
  },
  {
    title: "Limitation of Liability",
    body:
      "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, revenue, or goodwill arising from your use of the service.",
  },
  {
    title: "Indemnification",
    body:
      "You agree to indemnify and hold harmless the platform and its operators from claims, liabilities, and expenses arising from your content, misuse of the service, or violation of these terms.",
  },
  {
    title: "Termination",
    body:
      "You may stop using the service at any time. We may suspend or terminate access when necessary for security, legal compliance, or terms enforcement. Certain provisions (such as IP, disclaimers, and liability limitations) survive termination.",
  },
  {
    title: "Changes to These Terms",
    body:
      "We may update these terms to reflect legal, technical, or operational changes. Continued use of the service after updates become effective constitutes acceptance of the revised terms.",
  },
  {
    title: "Contact",
    body: `For questions about these Terms, contact the ${SITE_CONFIG.name} team via ${SITE_CONFIG.domain}.`,
  },
];

export default function TermsPage() {
  return (
    <PageShell title="Terms of Service" description={`The rules and guidelines for using ${SITE_CONFIG.name}.`}>
      <Card className="border-border bg-card">
        <CardContent className="space-y-4 p-6">
          <p className="text-sm text-muted-foreground">
            These Terms govern your access to and use of {SITE_CONFIG.name}. By using the platform, you agree to comply with these conditions.
          </p>
          <p className="text-xs text-muted-foreground">Last updated: May 15, 2026</p>
          {sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-border bg-secondary/40 p-4">
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
