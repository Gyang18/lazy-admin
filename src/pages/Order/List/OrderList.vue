<template>
  <div class="layout-container">
    <van-tabs v-model="active" color="#fa436a" title-active-color="#fa436a" sticky swipeable>
      <van-tab title="待付款">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="loadMore"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
      <van-tab title="待发货">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="loadMore"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
      <van-tab title="待收货">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="loadMore"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
      <van-tab title="待评价">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="loadMore"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  Tab, Tabs, List, Cell,
} from 'vant';

@Component({
  name: 'OrderList',
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-list': List,
    'van-cell': Cell,
  },
})
export default class OrderList extends Vue {
  private active:number = 0;

  private loading:boolean = false;

  private finished:boolean = false;

  private list: any[] = [];

  private loadMore():void {}

  private created():void {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
      for (let i = 0; i < 40; i += 1) {
        this.list.push(this.list.length + 1);
      }

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.list.length >= 40) {
        this.finished = true;
      }
    }, 1000);
  }
}
</script>

<style scoped></style>
