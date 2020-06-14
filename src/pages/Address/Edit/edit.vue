<template>
<div class="page-container">
  <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
  />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AddressEdit as Edit } from 'vant';
import areaJson from '../area';
@Component({
  name: 'AddressEdit',
  components: {
    'van-address-edit': Edit,
  },
})
export default class AddressEdit extends Vue {
  private areaList: object = areaJson;

  private searchResult: any[] = [];

  // 保存地址
  private onSave(): void {
  }

  // 删除地址
  private onDelete() {
    console.log('delete');
  }

  // 监听数据填写
  onChangeDetail(val: string) {
    if (val) {
      this.searchResult = [
        {
          name: '黄龙万科中心',
          address: '杭州市西湖区',
        },
      ];
    } else {
      this.searchResult = [];
    }
  }
}
</script>

<style scoped>

</style>
