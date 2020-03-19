<template>
  <div class="scroll-wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch, Emit,
} from 'vue-property-decorator';
import BScroll from 'better-scroll';
import { ScrollPosition } from './type';

@Component({ name: 'ScrollWrapper' })
export default class ScrollWrapper extends Vue {
  /**
   * probeType
   * 1 滚动的时候会派发scroll事件，会截流。
   * 2 滚动的时候实时派发scroll事件，不会截流。
   * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
   */

  // props
  @Prop({ default: 1, type: Number }) readonly probeType: number | undefined;

  // 点击列表是否派发click事件
  @Prop({ default: true, type: Boolean }) readonly click: boolean | undefined;

  // 是否开启横向滚动
  @Prop({ default: false, type: Boolean }) readonly scrollX: boolean | undefined;

  // 是否派发滚动事件
  @Prop({ default: false, type: Boolean }) readonly listenScroll: boolean | undefined;

  // 列表的数据
  @Prop({ default: null, type: Array }) readonly data!: [] | null;

  // 是否派发滚动到底部的事件，用于上拉加载
  @Prop({ default: false, type: Boolean }) readonly pullup: boolean | undefined;

  // 是否派发顶部下拉的事件，用于下拉刷新
  @Prop({ default: false, type: Boolean }) readonly pulldown: boolean | undefined;

  // 是否派发列表滚动开始的事件
  @Prop({ default: false, type: Boolean }) readonly beforeScroll: boolean | undefined;

  // 是否派发列表滚动结束的事件
  @Prop({ default: false, type: Boolean }) readonly endScroll: boolean | undefined;

  // 当数据更新后，刷新scroll的延时
  @Prop({ default: 20, type: Number }) readonly refreshDelay: number | undefined;

  private scroll: any = null;

  private refs: any = this.$refs;

  // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
  @Watch('data')
  private onChangeData() {
    setTimeout(() => {
      this.refresh();
    }, this.refreshDelay);
  }

  private mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this.initScroll();
    }, 20);
  }

// 派发滚动实时监听事件
@Emit()
  private scrollChange<P>(pos: P):P {
    return pos;
  }

  // 派发滚动结束事件
  @Emit()
private scrollEnd<P>(pos: P):P {
  return pos;
}

  private initScroll() {
    if (!this.$refs.wrapper) {
      return;
    }
    // better-scroll的初始化
    this.scroll = new BScroll(this.refs.wrapper, {
      probeType: this.probeType,
      click: this.click,
      scrollX: this.scrollX,
    });
    // console.log(this.scroll);
    // 是否派发滚动监听事件
    if (this.listenScroll) {
      this.scroll.on('scroll', (pos:ScrollPosition) => {
        this.scrollChange<ScrollPosition>(pos);
      });
    }

    // 是否派发滚动到底部事件，用于上拉加载
    if (this.pullup) {
      this.scroll.on('scrollEnd', () => {
      // 滚动到底部
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          this.$emit('scrollToEnd');
        }
      });
    }
    // 是否派发顶部下拉事件，用于下拉刷新
    if (this.pulldown) {
      this.scroll.on('touchend', (pos:any) => {
      // 下拉动作
        if (pos.y > 50) {
          this.$emit('pulldown');
        }
      });
    }

    // 是否派发列表滚动开始的事件
    if (this.beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        this.$emit('beforeScroll');
      });
    }
    // 是否派发列表滚动结束的事件
    if (this.endScroll) {
      this.scroll.on('scrollEnd', (pos: ScrollPosition) => {
        this.scrollEnd<ScrollPosition>(pos);
      });
    }
  }

  private disable() {
  // 代理better-scroll的disable方法
    this.scroll && this.scroll.disable();
  }

  private enable() {
  // 代理better-scroll的enable方法
    this.scroll && this.scroll.enable();
  }

  private refresh() {
  // 代理better-scroll的refresh方法
    this.scroll && this.scroll.refresh();
  }

  private scrollTo() {
  // 代理better-scroll的scrollTo方法
  // eslint-disable-next-line prefer-rest-params,prefer-spread
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }

  private scrollToElement() {
  // 代理better-scroll的scrollToElement方法
  // eslint-disable-next-line prefer-spread,prefer-rest-params
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }
}
</script>

<style scoped lang="less">
 .scroll-wrapper {
   width: 100%;
   height: 100%;
   position: relative;
 }
</style>
