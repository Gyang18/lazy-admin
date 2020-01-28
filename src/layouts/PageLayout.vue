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

@Component({ name: 'PageLayout' })
export default class PageLayout extends Mixins(LayoutMixins) {
}
</script>

<style scoped>

</style>
