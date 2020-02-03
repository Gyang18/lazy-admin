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
                 shape="round" placeholder="请输入搜索关键词" />
       </div>
       <div class="layout-flex header-r">
         <van-icon name="chat-o" dot size="20" color="#fff"></van-icon>
       </div>
     </div>
   </div>
   <!--banner区域-->
   <div class="banner">
      <swipe>
        <swipe-item v-for="item in bannerList" :key="item.id">
          <van-image :src="item.url"
           width="100%" height="176" fit="cover">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            <template v-slot:error>加载失败</template>
          </van-image>
        </swipe-item>
      </swipe>
   </div>
  <!-- 分类导航 -->
   <div class="category-nav">
     <ul class="layout-flex layout-flex-left">
       <li v-for="item in categoryList" :key="item.id">
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
         <van-icon name="arrow" size="16" />
       </span>
     </div>
     <div class="wrap-content">
       <div class="wrap-goods-list">
         <scroll-wrapper :data="categoryList" scroll-x>
           <ul ref="goodsList" :style="{ width: goodsListWidth }">
             <li>
               <router-link class="content" tag="div" to="/">
                 <van-image
                     width="100px"
                     height="100px"
                     src="http://img.gyang.live//shop/goods3.jpg"
                 />
                 <h6 class="layout-text-ellipsis-1">古黛妃 短袖t恤女夏装2019新款韩版宽松</h6>
                 <p class="layout-text-ellipsis-1 price">￥422</p>
               </router-link>
             </li>
             <li>
               <router-link class="content" tag="div" to="/">
                 <van-image
                     width="100px"
                     height="100px"
                     src="http://img.gyang.live//shop/goods3.jpg"
                 />
                 <h6 class="layout-text-ellipsis-1">古黛妃 短袖t恤女夏装2019新款韩版宽松</h6>
                 <p class="layout-text-ellipsis-1 price">￥422</p>
               </router-link>
             </li>
             <li>
               <router-link class="content" tag="div" to="/">
                 <van-image
                     width="100px"
                     height="100px"
                     src="http://img.gyang.live//shop/goods3.jpg"
                 />
                 <h6 class="layout-text-ellipsis-1">古黛妃 短袖t恤女夏装2019新款韩版宽松</h6>
                 <p class="layout-text-ellipsis-1 price">￥422</p>
               </router-link>
             </li>
             <li>
               <router-link class="content" tag="div" to="/">
                 <van-image
                     width="100px"
                     height="100px"
                     src="http://img.gyang.live//shop/goods3.jpg"
                 />
                 <h6 class="layout-text-ellipsis-1">古黛妃 短袖t恤女夏装2019新款韩版宽松</h6>
                 <p class="layout-text-ellipsis-1 price">￥422</p>
               </router-link>
             </li>
             <li>
               <router-link class="content" tag="div" to="/">
                 <van-image
                     width="100px"
                     height="100px"
                     src="http://img.gyang.live//shop/goods3.jpg"
                 />
                 <h6 class="layout-text-ellipsis-1">古黛妃 短袖t恤女夏装2019新款韩版宽松</h6>
                 <p class="layout-text-ellipsis-1 price">￥422</p>
               </router-link>
             </li>
             <li>
               <router-link class="content" tag="div" to="/">
                 <van-image
                     width="100px"
                     height="100px"
                     src="http://img.gyang.live//shop/goods3.jpg"
                 />
                 <h6 class="layout-text-ellipsis-1">古黛妃 短袖t恤女夏装2019新款韩版宽松</h6>
                 <p class="layout-text-ellipsis-1 price">￥422</p>
               </router-link>
             </li>
             <li>
               <router-link class="content" tag="div" to="/">
                 <van-image
                     width="100px"
                     height="100px"
                     src="http://img.gyang.live//shop/goods3.jpg"
                 />
                 <h6 class="layout-text-ellipsis-1">古黛妃 短袖t恤女夏装2019新款韩版宽松</h6>
                 <p class="layout-text-ellipsis-1 price">￥422</p>
               </router-link>
             </li>
           </ul>
         </scroll-wrapper>
       </div>
     </div>
   </div>
<!-- 广告区域 -->
 <div class="home-a">
   <van-image src="http://img.gyang.live/shop/ad2.jpg"
     width="100%" height="80" fit="cover">
     <template v-slot:loading>
       <van-loading type="spinner" size="20" />
     </template>
     <template v-slot:error>加载失败</template>
   </van-image>
 </div>
 </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Search, Swipe, SwipeItem } from 'vant';
import { getBanner, getHomeCategory } from '@/api/home';
// eslint-disable-next-line no-unused-vars
import { BannerData, CategoryData } from '@/api/types';
import ScrollWrapper from '@/components/ScrollWarpper';

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
  private searchValue:string = '';

  private goodsListWidth: string = '100%';

  private bannerList: BannerData[] = [];

  private categoryList: CategoryData[] = [];

  private async getHomeData() {
    const res = await getBanner();
    const resCategory = await getHomeCategory();
    if (res.code === 200) {
      this.bannerList = res.data;
    }
    if (resCategory.code === 200) {
      this.categoryList = resCategory.data;
    }
    this.setGoodsWidth();
  }

  private setGoodsWidth(): void {
    this.$nextTick(() => {
      const lis = this.$refs.goodsList.children;
      if (!lis.length) {
        return;
      }
      const len = lis.length;
      const liw = lis[0].offsetWidth + 12;
      this.goodsListWidth = `${liw * len}px`;
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
    .wrap-goods-list {
      width: 100%;
      ul {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 600px;
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
  }
  .home-a {
    height: 80px;
    margin-top: 8px;
  }
</style>
