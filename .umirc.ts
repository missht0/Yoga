import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/page/index' },
    { path: '/information', component: '@/page/information/index' },
  ],
  fastRefresh: {},
});
