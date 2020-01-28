const path = require('path');

module.exports = {
  lintOnSave: true,
  // 代理配置
  devServer: {
    // 错误提示
    overlay: {
      warnings: true,
      errors: true,
    },
    host: '',
    port: 8000,
    proxy: {
      // 开发接口代理
      '/dev': {
        target: 'https://result.eolinker.com/G6Vp1bS7f5a9c23b26b7fd29c177572be8cef29caaa6500?uri=',
        ws: true,
        changeOrigin: true,
        // 用/api代替target里面的请求
        pathRewrite: {
          '^/dev': '',
        },
      },
      // 测试接口地址
      '/test': {
        target: 'http://192.168.0.151:80/pc',
        ws: true,
        changeOrigin: true,
        // 用/api代替target里面的请求
        pathRewrite: {
          '^/test': '',
        },
      },
      // 正式接口代理地址
      '/api': {
        target: 'http://192.168.0.151:80/pc',
        ws: true,
        changeOrigin: true,
        // 用/api代替target里面的请求
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 16, // 换算的基数
            selectorBlackList: ['van'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ],
      },
      less: {
        modifyVars: {
          // 'font-size-sm': '14px',
          // 'font-size-md': '16px',
          // 'font-size-lg': '18px',
          // 'goods-action-button-danger-color': '#7232dd',
          // 'goods-action-button-warning-color': '#3eaf7c',
          'hack': `true; @import "${path.join(
              __dirname,'/src/theme/var.less'
          )}";`
        },
      },
    },
  },
  // webpack配置
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.json', '.vue'],
      alias: {
        // 重新设置 alias,扩展项目路径别名
      },
    },
  },
  chainWebpack: config => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch').delete('preload');
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true);
  },
};
