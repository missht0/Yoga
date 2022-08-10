import { defineConfig } from 'umi';

export default defineConfig({
  metas: [
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
    },
  ],
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/page/index' },
    { path: '/information', component: '@/page/information/index' },
    { path: '/login', component: '@/page/login/index' },
  ],
  fastRefresh: {},
});
