import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'editorial',
  themePack: 'magazine-contrast',
  homepageTemplate: 'article-home',
  navbarTemplate: 'editorial-bar',
  footerTemplate: 'columns-footer',
  motionPack: 'editorial-soft',
  primaryTask: 'article',
  enabledTasks: ['article', 'listing', 'classified', 'image', 'profile', 'sbm'],
  taskTemplates: {
    article: 'article-editorial',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}


