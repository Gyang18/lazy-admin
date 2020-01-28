import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class LayoutMixins extends Vue {
  // 需要缓存的页面
   private cacheViews: string[] = [];

   // 页面key
   private get pathKey(): string {
     return this.$route.path;
   }

   // 获取需要缓存的页面
   private getCacheRoute() {
     const { meta } = this.$route;
     if (meta.isCache && this.$route.name) {
       this.cacheViews = [this.$route.name];
     }
   }

   // 监听路由变化
   @Watch('$route')
   private routeChange(route: any): void {
     this.getCacheRoute();
   }
}
