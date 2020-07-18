<template>
  <div class="layout">
    <layout-nav-bar />
    <keep-alive :include="cacheViews">
      <router-view :key="pathKey"/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import LayoutMixins from './mixin';
import LayoutNavBar from '@/components/NavBar';

@Component({
  name: 'BlankLayout',
  components: {
    LayoutNavBar,
  },
})
export default class PageLayout extends Mixins(LayoutMixins) {
}
</script>

<style scoped>

</style>
