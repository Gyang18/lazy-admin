<template>
 <div class="page-container">
<!-- 头部筛选排序 -->
   <div class="goods-filter-header">
     <van-tabs v-model="active">
       <van-tab title="默认排序">内容 1</van-tab>
       <van-tab title="销量优先">内容 2</van-tab>
       <van-tab title="价格排序">内容 3</van-tab>
       <van-tab title="更多">内容 4</van-tab>
     </van-tabs>
   </div>
 </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Tab, Tabs } from 'vant';

@Component({
  name: 'GoodsList',
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
  },
})
export default class GoodsList extends Vue {
  private active: number = 0;
}
</script>

<style scoped>

</style>
