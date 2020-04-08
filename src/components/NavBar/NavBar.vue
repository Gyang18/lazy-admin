<template>
 <div class="layout-header" v-if="routeMeta.isShowHeader === undefined ? true : routeMeta.isShowHeader">
     <nav-bar
     :title="routeMeta.title || setting.title"
     :left-text="routeMeta.navLeftText || ''"
     :left-arrow="routeMeta.isBackShow === undefined ? true : routeMeta.isBackShow"
     @click-left="onClickLeft"
     />
 </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { NavBar } from 'vant';
import NavBarMixin from './mixin';
import { Setting } from '@/setting';

@Component({
  name: 'LayoutNavBar',
  components: { NavBar },
})
export default class LayoutNavBar extends Mixins(NavBarMixin) {
  private get setting(): Setting {
    return this.$store.getters.setting;
  }
}
</script>

<style scoped>

</style>
