<template>
  <div class="layout-container">
    <!--  头部导航 -->
    <div class="layout-fixed layout-flex layout-flex-between layout-align-center goods-navbar" :style="{
        backgroundColor: showHeadBg ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
    }">
      <div class="navbar-left">
        <span class="layout-flex layout-flex-center layout-align-center navbar-back"
        @click="goPrevPage( -1 )">
          <van-icon name="arrow-left"/>
        </span>
      </div>
      <div class="navbar-center" :style="{ opacity: showHeadBg ? 1 : 0}">详情展示</div>
      <div class="navbar-right"></div>
    </div>
    <!-- 内容区域  -->
    <div class="goods-container-wrapper">
      <scroll-wrapper listenScroll :probeType="3" @scroll-change="scrollChange" >
        <div class="wrapper-container">
          <!-- 商品轮播图 -->
          <div class="goods-swiper">
            <van-swipe :autoplay="3000" style="height: 398px">
              <van-swipe-item v-for="(image, index) in goodsBanner" :key="index">
                <van-image :src="image" height="398px" width="100%"/>
              </van-swipe-item>
            </van-swipe>
          </div>
          <!-- 商品信息 -->
          <div class="goods-wrapper goods-info">
            <h4 class="layout-text-ellipsis-2s title">恒源祥2019春季长袖白色t恤 新款春装</h4>
            <div class="price-info">
              <span class="price-tip">￥</span>
              <span class="price">341.6</span>
              <span class="y-price">¥488</span>
            </div>
            <div class="layout-flex layout-align-center sales-info">
              <span class="value">销量：108</span>
              <span class="value">库存：4690</span>
              <span class="value">浏览量：768</span>
            </div>
          </div>
          <!--  评论区域 -->
          <div class="goods-wrapper evaluation-wrapper">
            <div class="layout-flex layout-flex-between evaluation-head">
              <div class="head-left">评价(86)</div>
              <div class="layout-flex layout-align-center head-right">
                <span class="text">查看更多</span>
                <van-icon name="arrow"/>
              </div>
            </div>
            <div class="page-evaluation-list">
              <div class="layout-flex layout-flex-left layout-align-start evaluation-item">
                <div class="item-left">
                  <van-image width="44" height="44" :round="true" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                </div>
                <div class="layout-flex layout-flex-sub item-right">
                  <h6 class="layout-text-ellipsis-1 name">only·yang</h6>
                  <div class="layout-text-ellipsis-2 context">
                    商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢
                  </div>
                  <div class="layout-flex layout-flex-between layout-align-center item-goods-info">
                    <span class="attr">购买类型：XL 红色</span>
                    <span class="time">2019-04-01 19:21</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 商品详情介绍  -->
          <div class="goods-details-info">
            <div class="layout-flex layout-align-center layout-flex-center title">
              <div class="text">
                <span>图文详情</span>
              </div>
            </div>
            <div class="context" v-html="goodsDetailHtml"></div>
          </div>
        </div>
      </scroll-wrapper>
    </div>
    <!--  商品导航栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车"/>
      <van-goods-action-button type="warning" text="加入购物车"/>
      <van-goods-action-button type="danger" text="立即购买"/>
    </van-goods-action>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import {
  Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton,
  Icon, Image,
} from 'vant';
import ScrollWrapper from '@/components/ScrollWarpper/ScrollWrapper.vue';
import commonMixins from '@/mixins/common';
import { ScrollPosition } from '@/components/ScrollWarpper/type';

@Component({
  name: 'GoodsDetails',
  components: {
    ScrollWrapper,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-goods-action': GoodsAction,
    'van-goods-action-icon': GoodsActionIcon,
    'van-goods-action-button': GoodsActionButton,
    'van-icon': Icon,
    'van-image': Image,
    'scroll-wrapper': ScrollWrapper,
  },
})
export default class GoodsDetails extends commonMixins {
    // 商品轮播
    private goodsBanner: string[] = [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
    ];

    // 图文详情
    private goodsDetailHtml: string = `
					<div style="width:100%">
						<img style="width:100%;display:block;"
						src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;"
						src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;"
						src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;"
						src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;"
						src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />
					</div>
				`;

    // 导航条背景色控制
   private showHeadBg: boolean = false;

   // 滚动监听事件
   private scrollChange(pos: ScrollPosition): void {
     if (pos.y < -50) {
       this.showHeadBg = true;
     } else {
       this.showHeadBg = false;
     }
   }
}
</script>

<style scoped lang="less">
  .goods-navbar {
    height: 54px;
    padding: 10px;
    width: 100%;
    z-index: 99;
    transition: all .5s;

    .navbar-back {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.07);

      .van-icon {
        font-size: 26px;
        color: #333;
        font-weight: 400;
      }
    }

    .navbar-center {
      font-size: 16px;
      font-weight: 700;
      opacity: 0;
      padding: 0 20px;
      transition: all .5s;
    }
  }

  .goods-swiper {
    width: 100%;
    height: 398px;
    position: relative;
  }

  .goods-wrapper {
    padding: 10px 16px;
    position: relative;
    background: #fff;
    margin-bottom: 10px;
  }

  .goods-info {
    .title {
      font-size: 16px;
      color: #303133;
      height: 28px;
      line-height: 28px;
    }
  }

  .price-info {
    padding: 5px 0;
    font-size: 14px;
    color: #fa436a;
    line-height: 1.6;

    .y-price {
      color: #909399;
      padding-left: 4px;
      text-decoration: line-through;
      font-size: 12px;
    }
  }

  .sales-info {
    color: #909399;
    line-height: 1.6;
    font-size: 12px;

    .value {
      flex: 1;
      text-align: left;

    }
  }

  .evaluation-wrapper {
    .evaluation-head {
      padding: 10px 0;
      font-size: 14px;
      color: #333;
    }
  }

  .goods-details-info {
    background: #fff;

    .title {
      text-align: center;
      height: 44px;
      position: relative;

      .text {
        position: relative;
        display: inline-block;
        padding: 0 10px;
        background: #fff;
        z-index: 2;
      }

      &:after {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 165px;
        height: 1px;
        content: '';
        background: #ccc;
        z-index: 1;
      }
    }
  }

  .goods-container-wrapper {
    height: calc(100vh - 54px);
    overflow: hidden;
  }
</style>
