// 全局mixins
import { Vue, Component } from 'vue-property-decorator';
import router from '@/router';

@Component
export default class GlobalMixins extends Vue {
  private goPrevPage(n?: number | string): void {
    if (typeof n === 'number') {
      router.go(n);
    } else if (typeof n === 'string') {
      router.push(n);
    }
  }
}
