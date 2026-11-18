const configuredUrl = new URL(process.env.SITE_URL || 'https://chienyinwu.com')
if (process.env.BASE_PATH && configuredUrl.pathname === '/') {
  configuredUrl.pathname = process.env.BASE_PATH
}
const siteUrl = configuredUrl.toString().replace(/\/$/, '')
const umamiWebsiteId = process.env.NEXT_UMAMI_ID

const siteMetadata = {
  title: 'Chien-Yin Wu · 巫芊瑩',
  author: 'Chien-Yin Wu',
  nativeName: '巫芊瑩',
  headerTitle: 'Chien-Yin Wu',
  description:
    'Chien-Yin Wu (巫芊瑩), an NTU Information Management graduate, studies human–computer interaction, human-centered AI, and cross-cultural communication.',
  language: 'en',
  theme: 'system',
  siteUrl,
  siteRepo: 'https://github.com/yin1218/yin1218.github.io',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: '/static/images/social-card.png',
  email: 'wcy881218@gmail.com',
  github: 'https://github.com/yin1218',
  linkedin: 'https://www.linkedin.com/in/wpbag/',
  orcid: 'https://orcid.org/0009-0000-6313-6085',
  cvPath: '/static/files/chien-yin-wu-cv.pdf',
  locale: 'en_US',
  stickyNav: false,
  analytics: {
    // The Website ID is public. Tracking stays off until an ID is configured.
    umamiAnalytics: umamiWebsiteId
      ? {
          umamiWebsiteId,
          src: process.env.UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js',
          umamiDomains: process.env.UMAMI_DOMAINS || configuredUrl.hostname,
          umamiAutoTrack: true,
          dataExcludeHash: true,
          dataPerformance: true,
        }
      : undefined,
  },
}

module.exports = siteMetadata
