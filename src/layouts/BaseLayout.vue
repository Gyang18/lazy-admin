<template>
  <div class="layout">
    <layout-nav-bar />
    <div class="layout-container">
      <keep-alive :include="cacheViews">
        <router-view :key="pathKey"/>
      </keep-alive>
    </div>
    <div class="layout-footer" v-if="meta.isShowTabbar">
      <tabbar v-model="activePath" fixed>
        <tabbar-item name="home" relpace to="/base/home" icon="home-o">首页</tabbar-item>
        <tabbar-item name="category" relpace to="/base/category" icon="apps-o">分类</tabbar-item>
        <tabbar-item name="cart" relpace to="/base/cart" icon="cart-o">购物车</tabbar-item>
        <tabbar-item name="user" relpace to="/base/user" icon="user-o">我的</tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { Tabbar, TabbarItem } from 'vant';
import { Meta } from '@/types/router';
import LayoutNavBar from '@/components/NavBar';
import LayoutMixins from './mixin';

@Component({
  name: 'BaseLayout',
  components: {
    LayoutNavBar,
    Tabbar,
    TabbarItem,
  },
})
export default class BaseLayout extends Mixins(LayoutMixins) {
  private activePath: string = '';

  private get meta(): Meta {
    return this.$route.meta;
  }

  private getActivePath(): void {
    const { path } = this.$route;
    this.activePath = path.substr(path.lastIndexOf('/') + 1, path.length);
  }

  private created() {
    this.getActivePath();
  }
}
</script>

<style scoped>

</style>
