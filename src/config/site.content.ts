import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Articles & PDF intelligence',
    /** Shown prominently in the main nav; other enabled tasks remain in “More”. */
    emphasizedTaskKeys: ['article', 'pdf'] as const satisfies readonly TaskKey[],
  },
  footer: {
    tagline: 'Editorial briefings and document-grade resources',
  },
  hero: {
    badge: 'Info Platforms desk',
    title: ['Clarity for readers.', 'Structure for stakeholders.'],
    description:
      'Info Platforms pairs long-form articles with a dedicated PDF library so research, reporting, and downloadable references stay in one trusted place.',
    primaryCta: {
      label: 'Read articles',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Open PDF library',
      href: '/pdf',
    },
    searchPlaceholder: 'Search articles, PDF titles, topics, and authors',
    focusLabel: 'Focus',
    featureCardBadge: 'Latest from the desk',
    featureCardTitle: 'Fresh articles and documents anchor the homepage.',
    featureCardDescription:
      'The feed reflects live content from your connectors without changing publishing logic underneath.',
  },
  home: {
    metadata: {
      title: 'Info Platforms — articles & PDF resources',
      description:
        'Editorial briefings, analysis, and downloadable PDF documents from Info Platforms.',
      openGraphTitle: 'Info Platforms — articles & PDF resources',
      openGraphDescription:
        'Read in-depth articles and browse document-grade PDFs in one publication system.',
      keywords: [
        'Info Platforms',
        'business articles',
        'PDF reports',
        'white papers',
        'editorial',
        'document library',
      ],
    },
    introBadge: 'Why Info Platforms',
    introTitle: 'Built for teams that publish ideas and ship documents in the same motion.',
    introParagraphs: [
      'Readers get magazine-style articles with comfortable typography and clear hierarchy. Operators get a parallel PDF lane for specs, reports, and slide-ready exports.',
      'Search and navigation stay fast because the experience is optimized for scanning headlines, summaries, and file metadata—not endless generic feeds.',
      'Additional content types remain available across the platform for administrators and direct links, while the public surface keeps attention on reading and files.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Editorial homepage with a strong lead story and supporting picks.',
      'PDF strip for briefings, research packs, and stakeholder documents.',
      'Shared search across articles and downloadable files.',
      'Light motion and CSS-first polish for quick loads on mobile.',
    ],
    primaryLink: {
      label: 'Browse articles',
      href: '/articles',
    },
    secondaryLink: {
      label: 'PDF library',
      href: '/pdf',
    },
  },
  cta: {
    badge: 'Work with the desk',
    title: 'Need a briefing, a contributed article, or a document package?',
    description:
      'Reach the Info Platforms team for editorial inquiries, PDF submissions, and partnership questions.',
    primaryCta: {
      label: 'Create an account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'New and recently updated posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles & analysis',
    description: 'Long-form reporting, explainers, and editorial notes from Info Platforms.',
  },
  listing: {
    title: 'Listings',
    description: 'Discoverable business and service pages when published to this site.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Short-form notices and offers published through the classifieds task.',
  },
  image: {
    title: 'Images',
    description: 'Visual stories and media-first posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'Public profiles for people, teams, and brands.',
  },
  sbm: {
    title: 'Saved links',
    description: 'Curated bookmarks and reference lists.',
  },
  pdf: {
    title: 'PDF library',
    description: 'Downloadable PDFs, reports, and document resources.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Business listings',
    paragraphs: [
      'Listings present structured pages for services, venues, and brands when your workspace publishes them.',
      'Use listings alongside articles and PDFs so operational detail can sit next to narrative and file-based resources.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
      { label: 'Search', href: '/search' },
    ],
  },
  article: {
    title: 'Articles & editorial desk',
    paragraphs: [
      'This section carries Info Platforms reporting: explainers, briefings, and perspective pieces meant to be read carefully.',
      'Every article is designed to pair with the PDF library when you need the underlying document or data cut.',
    ],
    links: [
      { label: 'PDF library', href: '/pdf' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  classified: {
    title: 'Classifieds',
    paragraphs: [
      'Classified posts surface timely offers, roles, and notices in a faster-scanning format.',
      'They complement longer articles and static PDFs when you need a short update window.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
      { label: 'Search', href: '/search' },
    ],
  },
  image: {
    title: 'Images & visual posts',
    paragraphs: [
      'Image-led posts highlight photography, diagrams, and visual stories that do not fit a traditional article layout.',
      'Use this lane when the asset is the message—still connected to articles and PDFs through search and profiles.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
      { label: 'Search', href: '/search' },
    ],
  },
  profile: {
    title: 'Profiles',
    paragraphs: [
      'Profiles anchor identity: who publishes, who sponsors research, and which teams stand behind the work.',
      'They link outward to articles, PDFs, and other tasks without duplicating the core reading experience.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
      { label: 'Search', href: '/search' },
    ],
  },
  sbm: {
    title: 'Bookmarks & reference shelves',
    paragraphs: [
      'Social bookmarks collect external references, tools, and reading lists in a lightweight, text-forward view.',
      'They support article research and PDF programs by keeping citations discoverable.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
      { label: 'Search', href: '/search' },
    ],
  },
  pdf: {
    title: 'PDF library & downloads',
    paragraphs: [
      'The PDF library stores stakeholder-ready documents: research packs, methodology notes, one-pagers, and formal reports.',
      'Files stay tied to the same discovery system as articles, so audiences can move from narrative to evidence quickly.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Search', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  social: {
    title: 'Short updates',
    paragraphs: [
      'Short updates add quick signals alongside longer articles and static PDFs.',
      'They are optional lanes for lightweight announcements without replacing the desk’s core reading surfaces.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
      { label: 'Search', href: '/search' },
    ],
  },
  comment: {
    title: 'Comments',
    paragraphs: [
      'Comments sit beneath blog-style posts to keep discussion close to the source material.',
      'They are moderated through the same account and publishing tools as the rest of the platform.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Blog', href: '/blog' },
      { label: 'Search', href: '/search' },
    ],
  },
  org: {
    title: 'Organizations',
    paragraphs: [
      'Organization pages describe teams, agencies, and partners that publish on Info Platforms.',
      'They connect to articles, PDFs, and listings when those relationships matter for readers.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
      { label: 'Search', href: '/search' },
    ],
  },
}
