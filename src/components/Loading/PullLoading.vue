<template>
  <div class="pull-loading-container">
    <div class="layout-flex layout-flex-center layout-align-center loading-container">
      <div class="load-icon" v-show="loadState === 1">
        <svg viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      </div>
      <div class="load-text">{{ loadText[loadState] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'PullLoading' })
export default class PullLoading extends Vue {
  // 图标大小
  @Prop({ default: '12px', type: String }) readonly iconSize: string | undefined;

  // 图标颜色
  @Prop({ default: '#fc2f70', type: String }) readonly iconColor: string | undefined;

  // 加载状态 0 准备加载 1 加载中 2 加载完成
  @Prop({ default: 0, type: Number }) readonly loadState!: number;

  // 加载提示
  private loadText: string[] = [
    '松开即可刷新...',
    '正在刷新数据...',
    '刷新数据完成',
  ];
}
</script>

<style scoped lang="less">
  .pull-loading-container {
    position: relative;
    height: auto;
    width: 100%;
  }
  .loading-container {
    position: absolute;
    width: 100%;
    height: auto;
    left: 0;
    padding: 10px;
  }
  .load-icon {
    svg {
      width: 20px;
      transform-origin: center;
      animation: rotate 2s linear infinite;
    }

    circle {
      fill: none;
      stroke: #fc2f70;
      stroke-width: 2;
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dashoffset: -125px;
      }
    }
  }
  .load-text {
    font-size: 12px;
    color: #999;
  }
</style>
