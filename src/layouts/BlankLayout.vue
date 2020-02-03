<template>
  <div class="layout">
    <layout-nav-bar />
    <div class="layout-container">
      <keep-alive :include="cacheViews">
        <router-view :key="pathKey"/>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import LayoutMixins from './mixin';
import LayoutNavBar from '@/components/NavBar';

@Component({
  name: 'BlankLayout.vue',
  components: {
    LayoutNavBar,
  },
})
export default class PageLayout extends Mixins(LayoutMixins) {
}
</script>

<style scoped>

</style>
