<template>
  <div class="page-container">
    <!-- 首页导航（自定义）-->
    <div class="layout-header">
      <div class="layout-fixed layout-header-grade layout-flex header-search">
        <div class="layout-flex header-l">
          <div class="logo">
            <h1>shop</h1>
          </div>
        </div>
        <div class="header-c">
          <search v-model="searchValue" background="transparent"
                  shape="round" placeholder="请输入搜索关键词"/>
        </div>
        <div class="layout-flex header-r">
          <van-icon name="chat-o" dot size="20" color="#fff"></van-icon>
        </div>
      </div>
    </div>
    <div class="home-wrapper-container">
      <scroll-wrapper ref="scrollWrapper" listen-scroll :probe-type="1" :bounce-config="bounceConfig">
        <van-pull-refresh v-model="isPullLoading" @refresh="onRefresh" :disabled="false">
<!--          <div class="home-container">-->
<!--          </div>-->
          <!--banner区域-->
          <div class="banner">
            <swipe>
              <swipe-item v-for="item in bannerList" :key="item.id">
                <van-image :src="item.url"
                           width="100%" height="176" fit="cover">
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20"/>
                  </template>
                  <template v-slot:error>加载失败</template>
                </van-image>
              </swipe-item>
            </swipe>
          </div>
          <!-- 分类导航 -->
          <div class="category-nav">
            <ul class="layout-flex layout-flex-left">
              <li v-for="item in categoryNavList" :key="item.id">
                <van-image
                    round
                    width="48px"
                    height="48px"
                    :src="item.cover"
                />
                <p class="layout-text-ellipsis-1 title">{{ item.title }}</p>
              </li>
            </ul>
          </div>
          <!-- 分类精选  -->
          <div class="home-list-wrapper category-handpick">
            <div class="layout-flex wrap-header">
       <span class="header-icon">
         <i class="iconfont">&#xe600;</i>
       </span>
              <div class="header-tit">
                <h6 class="layout-text-ellipsis-1">分类推荐</h6>
                <p class="layout-text-ellipsis-1">Competitive Products For You</p>
              </div>
              <span class="header-arrow">
         <van-icon name="arrow" size="16"/>
       </span>
            </div>
            <div class="wrap-content">
              <div class="wrap-goods-list">
                <scroll-wrapper :data="categoryGoods" scroll-x>
                  <ul ref="goodsList" :style="{ width: goodsListWidth }">
                    <li v-for="item in categoryGoods" :key="item.id">
                      <router-link class="content" tag="div" :to="`/goods/goods-detail?id=${item.id}`">
                        <van-image
                            width="100px"
                            height="100px"
                            :src="item.cover"
                        />
                        <h6 class="layout-text-ellipsis-1">{{ item.title }}</h6>
                        <p class="layout-text-ellipsis-1 price">￥{{item.price}}</p>
                      </router-link>
                    </li>
                  </ul>
                </scroll-wrapper>
              </div>
            </div>
          </div>
          <!-- 广告区域 -->
          <div class="home-a">
            <van-image src="http://img.gyang.live/shop/exercise1.jpg"
                       width="100%" height="80" fit="fill">
              <template v-slot:loading>
                <van-loading type="spinner" size="20"/>
              </template>
              <template v-slot:error>加载失败</template>
            </van-image>
          </div>
          <!-- 推荐商品 -->
          <div class="home-list-wrapper recommend-wrapper">
            <div class="layout-flex wrap-header">
             <span class="header-icon">
               <i class="iconfont">&#xe600;</i>
             </span>
              <div class="header-tit">
                <h6 class="layout-text-ellipsis-1">推荐商品</h6>
                <p class="layout-text-ellipsis-1">Rerecommended products</p>
              </div>
              <span class="header-arrow">
         <van-icon name="arrow" size="16"/>
       </span>
            </div>
            <div class="wrap-content">
              <div class="wrap-goods-list">
                <ul>
                  <template v-for="item in recommendGoods">
                    <li :key="item.id">
                      <router-link class="content" tag="div" to="/goods/goods-list">
                        <van-image
                            width="100%"
                            height="auto"
                            :src="item.cover"
                        />
                        <h6 class="layout-text-ellipsis-1">{{ item.title }}</h6>
                        <p class="layout-text-ellipsis-1 price">￥{{ item.price }}</p>
                      </router-link>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </scroll-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Search, Swipe, SwipeItem } from 'vant';
import { getHomeResult, getHomeRecommendResult } from '@/api/home';
import {
  BannerData, CategoryNavData, HomeGoodsData, RecommendGoodsItem,
} from '@/api/types/home';
import ScrollWrapper from '@/components/ScrollWarpper';
// import { ScrollPosition } from '@/components/ScrollWarpper/type';
@Component({
  name: 'Home',
  components: {
    Search,
    Swipe,
    SwipeItem,
    ScrollWrapper,
  },
})
export default class Home extends Vue {
    // $refs定义
    public $refs!: Vue['$refs'] & {
      scrollWrapper: any;
    };

    private searchValue: string = '';

    private goodsListWidth: string = '100%';

    private bannerList: BannerData[] = [];

    private categoryNavList: CategoryNavData[] = [];

    private categoryGoods: HomeGoodsData[] = [];

    private recommendGoods: RecommendGoodsItem[] = [];

    private isPullLoading: boolean = false;

    private bounceConfig: object = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    };

    private async getHomeData(callback?: () => void) {
      const res = await getHomeResult();
      const recommend = await getHomeRecommendResult();
      if (res.success) {
        this.bannerList = res.data.banner;
        this.categoryNavList = res.data.categoryNav;
        this.categoryGoods = res.data.categoryGoods;
      }
      if (recommend.success) {
        this.recommendGoods = recommend.data.list;
      }
      this.setGoodsWidth();
      callback && callback();
    }

    private setGoodsWidth(): void {
      this.$nextTick(() => {
        const goodsRefs: any = this.$refs.goodsList;
        const lis = goodsRefs.children;
        if (!lis.length) {
          return;
        }
        const len = lis.length;
        const liw = lis[0].offsetWidth + 12;
        this.goodsListWidth = `${liw * len}px`;
      });
    }

    // 页面下拉刷新
    private onRefresh() {
      this.getHomeData(() => {
        this.isPullLoading = false;
      });
    }

    private mounted() {
      this.getHomeData();
    }
}
</script>

<style scoped lang="less">
  .layout-header {
    height: 55px;
  }

  .home-wrapper-container {
    height: calc(100vh - 105px);
    overflow: hidden;
  }

  .header-search {
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: solid 1px #ddd;
    border-bottom-color: transparent;
    transform-origin: center;
    justify-content: space-between;
    padding: 0 12px;
    align-items: center;
    /*background: #fa5376;*/

    .logo {
      color: #fff;
      font-size: 20px;
    }

    .header-l {
      width: 15%;
    }

    .header-c {
      flex-basis: 75%;
    }

    .header-r {
      flex-basis: 10%;
      justify-content: center;
      align-items: center;
    }

    .van-search {
      width: 100%;
    }
  }

  .banner {
    width: 100%;
    height: 176px;
  }

  .category-nav {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 16px 12px;
    background: #fff;

    ul {
      justify-content: space-around;
      align-items: center;

      li {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
      }

      .van-image {
        margin-bottom: 7px;
        opacity: .7;
        box-shadow: 2px 2px 11px rgba(250, 67, 106, 0.3);
      }

      .van-image__error {
        font-size: 12px;
      }

      .title {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .home-list-wrapper {
    background: #fff;
    margin-top: 8px;
    padding: 0 16px;

    .wrap-header {
      align-items: center;
      height: 78px;
      padding: 4px 0;

      .header-icon {
        font-size: 44px;
        color: #FA4DBE;
        padding-right: 11px;
      }

      .header-tit {
        flex: 1;

        h6 {
          font-size: 18px;
          line-height: 1.2;
        }

        p {
          font-size: 12px;
          color: #909399;
          margin-top: 4px;
        }
      }
    }

    .wrap-content {
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }

  .home-a {
    height: 80px;
    margin-top: 8px;
  }

  .wrap-goods-list {
    width: 100%;

    ul {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 100%;
    }

    li {
      width: 100px;
      margin-right: 12px;

      .content {
        display: block;
        width: 100%;
        font-size: 14px;
        color: #303133;
        line-height: 1.8;
      }

      .price {
        color: #fa436a;
      }
    }
  }

  .recommend-wrapper {
    margin-bottom: .5rem;

    .wrap-goods-list {
      ul {
        flex-wrap: wrap;

        li {
          width: 50%;
          padding: 0 .2rem;
          margin-right: 0;
          margin-bottom: .2rem;
        }
      }
    }
  }
</style>
