module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'V-Calendar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Landing site for VCalendar, a calendar plugin for Vuejs.',
      },
    ],
    script: [{ src: 'https://buttons.github.io/buttons.js' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Raleway|Open+Sans:300,400',
      },
    ],
  },
  css: [
    '@/assets/styles/minireset.css',
    '@/assets/styles/vars.scss',
    '@/assets/styles/site.scss',
    'v-calendar/lib/v-calendar.min.css',
  ],
  loading: { color: '#3B8070' },
  modules: [
    // Simple usage
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-113780759-1',
      },
    ],
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false,
        },
      },
    },
  },
  plugins: [{ src: '~/plugins/v-calendar', ssr: false }],
};
