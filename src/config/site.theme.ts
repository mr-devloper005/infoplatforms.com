import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'spotlight-split',
    eyebrow: 'Publishing & document intelligence',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'article',
    featuredTaskKeys: ['article', 'pdf'],
  },
  navigation: {
    variant: 'editorial',
  },
  footer: {
    variant: 'editorial',
  },
  cards: {
    listing: 'listing-elevated',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'studio-panel',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
