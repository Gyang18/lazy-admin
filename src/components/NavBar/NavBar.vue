<template>
 <div class="layout-header">
     <template v-if="routeMeta.isShowHeader === undefined ? true : routeMeta.isShowHeader">
         <nav-bar
         :title="routeMeta.title || 'yang shop'"
         :left-text="routeMeta.navLeftText || ''"
         :left-arrow="routeMeta.isBackShow === undefined ? true : routeMeta.isBackShow"
         @click-left="onClickLeft"
         />
     </template>
 </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { NavBar } from 'vant';
import NavBarMixin from './mixin';

@Component({
  name: 'LayoutNavBar',
  components: { NavBar },
})
export default class LayoutNavBar extends Mixins(NavBarMixin) {
}
</script>

<style scoped>

</style>
