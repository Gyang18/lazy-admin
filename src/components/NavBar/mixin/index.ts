import { Vue, Component, Prop } from 'vue-property-decorator';
import { Meta } from '@/types/router';

@Component
export default class NavBarMixin extends Vue {
  @Prop(Function) public readonly clickLeft: any;

  private get routeMeta(): Meta {
    return this.$route.meta;
  }

  // 左侧点击事件
  private onClickLeft():void {
    const { backUrl, zIndex = -1 } = this.routeMeta;
    if (this.clickLeft && typeof this.clickLeft === 'function') {
      this.clickLeft();
    } else if (backUrl) {
      this.$router.push(backUrl);
    } else {
      this.$router.go(zIndex);
    }
  }
}
