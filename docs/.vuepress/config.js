module.exports = {
  base: '/vuejs-handson/',
  title: 'JSL Vuejs Hands-on',
  description: 'JSLで開催されたVuejsのハンズオン資料ページです',
  locales: {
    '/': {
      lang: 'ja'
    }
  },
  themeConfig: {
    sidebar: [
      '/',
      ['/setup/', 'セットアップ'],
      ['/hands-on/', 'ハンズオン'],
      ['/practice/', 'プラクティス']
    ],
    displayAllHeaders: true,
    repo: 'sin-tanaka/vuejs-handson',
    docsRepo: 'sin-tanaka/vuejs-handson',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'このページをGitHubで編集する',
    lastUpdated: '最終更新日',
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.ico' }]
  ],
  plugins: [
    [ 
      '@vuepress/google-analytics',
      {
	'ga': 'UA-52059413-3'
      }
    ]  
  ]
};
