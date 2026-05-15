import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  {
    title: "Information We Collect",
    body:
      "We collect account details you provide (such as name, email, and profile settings), content you publish (including articles, PDFs, comments, and media), and technical usage data (device details, referral source, page interactions, and error logs).",
  },
  {
    title: "How We Use Information",
    body:
      "We use information to operate and improve the platform, personalize discovery and recommendations, secure accounts, detect abuse, process support requests, and communicate service updates and product notices.",
  },
  {
    title: "Legal Bases for Processing",
    body:
      "Depending on your location, we process data based on one or more legal bases: contract performance (to provide your account), legitimate interests (security and platform quality), consent (optional communications), and legal obligations.",
  },
  {
    title: "How We Share Information",
    body:
      "We may share data with infrastructure and analytics providers, customer support tooling, and legal authorities when required. We do not sell personal information. Public content you publish is visible to other users and search engines based on your visibility settings.",
  },
  {
    title: "Cookies and Similar Technologies",
    body:
      "We use cookies and local storage for session management, preferences, authentication, and analytics. You can manage cookie preferences in your browser and clear local storage at any time, though some features may stop working correctly.",
  },
  {
    title: "Data Retention",
    body:
      "We keep account and content data while your account is active and for a reasonable period afterward to satisfy security, audit, tax, legal, and backup obligations. We delete or anonymize data when retention is no longer necessary.",
  },
  {
    title: "Security",
    body:
      "We use administrative, technical, and organizational safeguards designed to protect personal information. No system is perfectly secure, but we continually monitor risk, apply access controls, and review safeguards as the platform evolves.",
  },
  {
    title: "Your Rights and Choices",
    body:
      "You can access, update, or delete account details through your settings, opt out of non-essential emails, and request data export where available. You may also request deletion of your account and associated personal data, subject to legal retention requirements.",
  },
  {
    title: "Children's Privacy",
    body:
      "The service is not intended for children under the age required by applicable law in your region. If we learn that personal information was submitted in violation of this policy, we will take steps to remove it.",
  },
  {
    title: "Policy Updates",
    body:
      "We may update this Privacy Policy to reflect product, legal, or operational changes. When changes are material, we will revise the date below and provide additional notice when required.",
  },
  {
    title: "Contact",
    body: `Questions or privacy requests can be sent through our contact channels at ${SITE_CONFIG.domain}.`,
  },
];

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy Policy" description="How we collect, use, and protect your information.">
      <Card className="border-border bg-card">
        <CardContent className="space-y-4 p-6">
          <p className="text-sm text-muted-foreground">
            This policy explains how {SITE_CONFIG.name} handles personal information when you browse, publish, and interact with content on the platform.
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
