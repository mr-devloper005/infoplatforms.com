import type { SiteFactoryRecipe } from '@/design/factory/types'

export const SITE_FACTORY_RECIPE: SiteFactoryRecipe = {
  brandPack: 'editorial-luxe',
  navbar: 'editorial-bar',
  footer: 'editorial-footer',
  homeLayout: 'article-home',
  motionPack: 'editorial-soft',
  primaryTask: 'article',
  enabledTasks: ['article', 'listing', 'classified', 'image', 'profile', 'sbm'],
  taskLayouts: {
    listing: 'listing-directory',
    classified: 'classified-market',
    article: 'article-editorial',
    image: 'image-portfolio',
    profile: 'profile-business',
    sbm: 'sbm-curation',
  },
}
