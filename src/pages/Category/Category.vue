<template>
 <div class="page-container">
   <div class="wrapper-container">
     <div class="slider-menu">
       <left-scroll-wrapper ref="menuScroll">
         <ul>
           <template v-for="(item, index) in sliderMenu">
             <li
               :key="item.id"
               :class="{ 'active': currentIndex === index }" @click="wrapperScrollTo(index)">
               <span>{{ item.name }}</span>
             </li>
           </template>
         </ul>
       </left-scroll-wrapper>
     </div>
     <div class="category-container">
       <right-scroll-wrapper ref="ScrollContainer"
        listen-scroll
         end-scroll
         :probe-type="3"
          @scroll-change="wrapperScroll">
         <div class="category-wrapper">
          <template v-for="item in categoryList">
            <div :key="item.id" class="category-group" ref="categoryGroup">
              <div class="layout-flex layout-align-center title">
                <span>{{ item.name }}</span>
              </div>
              <ul class="layout-flex layout-align-start category-list" v-if=" item.children">
                <template v-for="child in item.children">
                  <li class="layout-flex layout-flex-center" :key="child.id">
                    <van-image
                        width="70px"
                        height="70px"
                        :src="child.cover"
                    />
                    <p class="layout-text-ellipsis-1">{{ child.name }}</p>
                  </li>
                </template>
              </ul>
            </div>
          </template>
         </div>
       </right-scroll-wrapper>
     </div>
   </div>
 </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ScrollWrapper from '@/components/ScrollWarpper';
import { ScrollPosition } from '@/components/ScrollWarpper/type';
import { getGoodsCategoryResult } from '@/api/goods';
import { GoodsCategory } from '@/api/types';

@Component({
  name: 'Category',
  components: {
    'left-scroll-wrapper': ScrollWrapper,
    'right-scroll-wrapper': ScrollWrapper,
  },
})
export default class Category extends Vue {
  // 当前索引
  private currentIndex: number = 0;

  // 当前右侧内容滚动的距离
  private scrollY: number = 0;

  // 所有分类列表头部位置
  private categoryTops: number[] = [];

  // 菜单数据
  private sliderMenu: GoodsCategory[] = [];

  // 分类列表
  private categoryList: GoodsCategory[] = [];

  // $refs定义
  private $refs!: {
    categoryGroup: any;
    menuScroll: any;
    ScrollContainer: any;
  };

  // 监听右侧内容滚动事件
  private wrapperScroll(pos: ScrollPosition): void {
    this.scrollY = Math.abs(pos.y);
    this.setCurrentIndex();
  }

  // 左侧点击
  private wrapperScrollTo(index: number): void {
    this.currentIndex = index;
    const wrapper = this.$refs.ScrollContainer.scroll;
    wrapper.scrollTo(0, -this.categoryTops[index], 300);
  }

  // 动态设置currentIndex
  private setCurrentIndex():void {
    const { scrollY, categoryTops } = this;
    this.currentIndex = categoryTops.findIndex((top, index) => scrollY >= top && scrollY < categoryTops[index + 1]);
  }

  // 获取分类列表头部的位置
  private getCategoryTops():void {
    this.$nextTick(() => {
      const wrapper: any[] = this.$refs.categoryGroup as HTMLDivElement[];
      const itemArray: number[] = [];
      let top = 0;
      wrapper.forEach((item, index) => {
        const items = item.getBoundingClientRect();
        // 将顶部导航栏的高度减去
        top = items.top - 46;
        itemArray.push(top);
      });
      this.categoryTops = itemArray;
    });
  }

  // 获取分类数据
  private async getCategoryData() {
    const res = await getGoodsCategoryResult();
    if (res.success) {
      this.categoryList = res.data;
      res.data.forEach(item => {
        const menu = { ...item };
        delete menu.children;
        if (menu.pid === 0) {
          this.sliderMenu.push(menu);
        }
      });
      this.getCategoryTops();
    }
  }

  private created(): void {
  }

  private mounted():void {
    this.getCategoryData();
  }
}
</script>

<style scoped lang="less">
  .page-container {
     height: calc( 100vh - 96px);
  }
  .wrapper-container {
    display: flex;
    justify-content: flex-start;
    flex: 1;
    height: 100%;
  }
  .slider-menu {
    width: 100px;
    height: 100%;
    overflow: hidden;
    flex-shrink: 0;
    background: #fff;
    position: relative;
    ul {
      text-align: center;
      width: 100%;
    }
    li {
      position: relative;
      color: #606266;
      line-height: 50px;
      font-size: 14px;
      transition: all .3s;
      &:after {
        position: absolute;
        z-index: 3;
        left: 0;
        right: 0;
        height: 0;
        content: '';
        transform: scaleY(0.5);
        border-bottom: 1px solid #E4E7ED;
      }
      &.active {
        color: #FA4DBE;
        background: #f8f8f8;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
          height: 18px;
          width: 4px;
          background-color: #fa436a;
          border-radius: 0 4px 4px 0;
          opacity: .8;
        }
      }
    }
  }
  .category-container {
    flex: 1;
    padding-left: 10px;
    overflow: hidden;
  }
  .category-group {
    .title {
      height: 35px;
      padding-top: 4px;
      font-size: 14px;
      color: #303133;
      padding-right: 8px;
    }
  }
  .category-list {
    background: #fff;
    padding-top: 6px;
    li {
      text-align: center;
      color: #666;
      padding-bottom: 10px;
      width: 33.3333%;
      p {
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }
</style>
