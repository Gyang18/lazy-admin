// 全局mixins
import { Mixins, Vue } from 'vue-property-decorator';
import router from '@/router';

export class globalMixins extends Vue {
  private goPrevPage(n: number = -1): void {
    router.go(n);
  }
}

Vue.mixin(globalMixins);
