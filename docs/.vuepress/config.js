module.exports = {
  base: '/vuejs-handson/',
  title: 'JSL Vuejs Hands-on',
  description: 'JSLで開催されたVuejsのハンズオン資料ページです',
  repo: 'sin-tanaka/vuejs-handson',
  docsRepo: 'sin-tanaka/vuejs-handson',
  docsDir: 'docs',
  docsBranch: 'master',
  editLinks: true,
  locales: {
    '/': {
      lang: 'ja'
    }
  },
  themeConfig: {
    sidebar: [
      '/',
      ['/setup/', 'セットアップ'],
      ['/hands-on/', 'ハンズオン']
    ],
    displayAllHeaders: true
  }
}
