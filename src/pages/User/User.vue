<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="page-container">
      <scroll-wrapper ref="scrollWrapper">
        <div class="user-scroll-wrapper">
          <div class="layout-flex layout-flex-between layout-align-center user-top">
            <div class="top-l">
              <van-image
                  width="36"
                  height="36"
                  round
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="top-c">
              <span>我的</span>
            </div>
            <div class="top-r">
            <span class="icon-item">
           <van-icon name="chat-o" color="#fff" size="24" dot/>
         </span>
              <span class="icon-item">
             <van-icon name="setting-o" size="24" color="#fff"/>
         </span>
            </div>
          </div>
          <!--  用户头部信息内容    -->
          <div class="user-heed">
            <div class="user-bg"></div>
            <div class="layout-flex layout-align-center user-content">
              <div class="layout-flex layout-align-center layout-flex-center user-cover">
                <van-image
                    width="72"
                    height="72"
                    error-icon=""
                    round
                    :src="require('@/assets/icon/missing-face.png')"
                >
                </van-image>
              </div>
              <div class="user-info">
                <h6 class="layout-text-ellipsis-1 title">yang</h6>
                <p class="desc">懒懒的一只程序员</p>
              </div>
            </div>
            <div class="user-arc">
              <img class="arc" src="@/assets/icon/arc.png" alt="arc">
            </div>
          </div>
          <!-- 用户相关服务及订单 -->
          <div class="cover-container">
            <div class="cover-wrapper total-wrapper total-info-wrapper">
              <div class="layout-flex cover-wrapper-content">
                <div class="total-item">
                  <p class="num">0.00</p>
                  <p class="desc">余额</p>
                </div>
                <div class="total-item">
                  <p class="num">0</p>
                  <p class="desc">优惠券</p>
                </div>
                <div class="total-item">
                  <p class="num">0</p>
                  <p class="desc">积分</p>
                </div>
              </div>
            </div>
            <div class="cover-wrapper total-wrapper total-order-wrapper">
              <div class="layout-flex cover-wrapper-content">
                <div class="total-item" v-for="(item, index) in orderStatus" :key="index">
              <span class="icon">
                <van-icon :name="item.icon" size="26" color="#fa436a"/>
              </span>
                  <span class="desc">{{ item.name }}</span>
                </div>
              </div>
            </div>
            <div class="cover-wrapper total-wrapper user-server">
              <div class="layout-flex layout-flex-between cover-wrapper-header">
                <div class="layout-flex header-l">
               <span class="icon">
                 <van-icon name="apps-o" size="16" color="#fa436a"/>
               </span>
                  <span class="name">我的服务</span>
                </div>
                <div class="header-r"></div>
              </div>
              <div class="cover-wrapper-content">
                <!--              <div class="total-item">-->
                <!--                <span class="iconfont yangshinshopshouhuodizhi icon"></span>-->
                <!--                <span class="title">收货地址</span>-->
                <!--              </div>-->
                <!--              <div class="total-item">-->
                <!--                <span class="iconfont yangshinshopxihuan icon"></span>-->
                <!--                <span class="title">我的收藏</span>-->
                <!--              </div>-->
                <van-grid :border="false">
                  <van-grid-item text="浏览记录">
                    <template slot="icon">
                      <van-icon name="browsing-history-o" size="28" color="#5eba8f"/>
                    </template>
                  </van-grid-item>
                  <van-grid-item text="我的收藏">
                    <template slot="icon">
                      <van-icon name="like-o" size="28" color="#fa436a"/>
                    </template>
                  </van-grid-item>
                  <van-grid-item text="收货地址">
                    <template slot="icon">
                      <van-icon name="location-o" size="28" color="#5eba8f"/>
                    </template>
                  </van-grid-item>
                  <van-grid-item text="我的卡券">
                    <template slot="icon">
                      <van-icon name="coupon-o" size="28" color="#fa436a"/>
                    </template>
                  </van-grid-item>
                  <van-grid-item text="领券中心">
                    <template slot="icon">
                      <van-icon name="point-gift-o" size="28" color="#FA4DBE"/>
                    </template>
                  </van-grid-item>
                  <van-grid-item text="账户流水">
                    <template slot="icon">
                      <van-icon name="gold-coin-o" size="28" color="#fa436a"/>
                    </template>
                  </van-grid-item>
                  <van-grid-item text="积分流水">
                    <template slot="icon">
                      <van-icon name="points" size="28" color="#FBAA58"/>
                    </template>
                  </van-grid-item>
                  <van-grid-item text="我的客服">
                    <template slot="icon">
                      <van-icon name="service" size="28" color="#54b4ef"/>
                    </template>
                  </van-grid-item>
                </van-grid>
              </div>
            </div>
          </div>
        </div>
      </scroll-wrapper>
    </div>
  </van-pull-refresh>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Grid, GridItem } from 'vant';
import { OrderStatusItem } from './interface';
import ScrollWrapper from '@/components/ScrollWarpper';
import { ScrollPosition } from '@/components/ScrollWarpper/type';
@Component({
  name: 'User',
  components: {
    'van-grid': Grid,
    'van-grid-item': GridItem,
    ScrollWrapper,
  },
})
export default class User extends Vue {
    // $refs定义
    public $refs!: Vue['$refs'] & {
      scrollWrapper: any;
    };

    private orderStatus: OrderStatusItem[] = [
      {
        name: '待付款',
        path: '/order/list',
        icon: 'balance-list-o',
      },
      {
        name: '待发货',
        path: '/order/list',
        icon: 'tosend',
      },
      {
        name: '待收货',
        path: '/order/list',
        icon: 'sign',
      },
      {
        name: '待评价',
        path: '/order/list',
        icon: 'records',
      },
    ];

    private isLoading: boolean = false;

    // 页面下拉刷新
    private onRefresh(): void {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
}
</script>

<style scoped lang="less">
  .page-container {
    height: calc(100vh - 50px);
    overflow: hidden;
  }

  .user-heed {
    position: relative;
    background: #f8f8f8;
    padding: 48px 16px 20px;
  }

  .user-arc, .user-bg, .user-top {
    position: absolute;
    width: 100%;
    left: 0;
  }

  .user-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    opacity: 1;
    transition: all .3s;
    height: 48px;
    padding: 8px 16px;

    .top-l {
      opacity: 0;
      transition: all .3s;
    }

    .top-c {
      font-size: 20px;
      color: #fff;
      flex: 1;
      text-align: center;
      line-height: 48px;

      span {
        transition: all .3s;
        opacity: 0;
      }
    }

    .icon-item {
      & + .icon-item {
        margin-left: 20px;
      }

      .van-icon {
        transition: all .3s;
      }
    }
  }

  .user-content {
    position: relative;
    z-index: 1;
    padding: 15px 0;
    margin-top: 20px;

    .user-cover {
      margin-right: 15px;
      background: #fff;
      padding: 2px;
      border-radius: 50%;
    }

    .user-info {
      color: #fff;

      .title {
        font-size: 20px;
      }

      .desc {
        margin-top: 5px;
      }
    }
  }

  .user-arc {
    bottom: 0;

    .arc {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .user-bg {
    top: 0;
    height: 100%;
    background: linear-gradient(to left, #FA4DBE 0, #FBAA58 100%);

  }

  .cover-container {
    padding: 0 16px;
  }

  .cover-wrapper {
    background: #fff;
    border-radius: 5px;
    position: relative;
    margin-top: 20px;

    &:first-child {
      margin-top: 0;
    }
  }

  .cover-wrapper-header {
    padding: 10px 16px;

    .header-l {
      font-size: 15px;
      padding-right: 20px;

      .name {
        padding-left: 5px;
      }
    }
  }

  .total-wrapper {
    .total-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 76px;
    }
  }

  .total-info-wrapper {
    .num {
      color: #333;
      font-size: 16px;
    }

    .desc {
      color: #666;
      font-size: 14px;
      margin-top: 5px;
    }
  }

  .total-order-wrapper {
    .desc {
      font-size: 14px;
      margin-top: 6px;
    }
  }
</style>
