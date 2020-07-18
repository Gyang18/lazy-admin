<template>
  <div class="page-container">
    <van-address-list
        class="adress-list"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AddressList as Address } from 'vant';
import { AddressItemInterface } from '../interface';

@Component({
  name: 'AddressList',
  components: {
    'van-address-list': Address,
  },
})
export default class AddressList extends Vue {
  // 选中的地址id
  private chosenAddressId:string | number = '';

  // 地址列表
  private list: AddressItemInterface[] = [
    {
      id: '1',
      name: '张三',
      tel: '13000000000',
      address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
      isDefault: true,
    },
    {
      id: '2',
      name: '李四',
      tel: '1310000000',
      address: '浙江省杭州市拱墅区莫干山路 50 号',
    },
  ];

  // 新增地址
  private onAdd():void {
    console.log('新增地址');
    this.$router.push('/address/edit');
  }

  private onEdit(item: AddressItemInterface, index: number): void {
    console.log('编辑地址', item.address, index);
  }
}
</script>

<style scoped lang="less">
.van-address-list {
  .van-button--danger {
    background-color: #fa5376;
  }
}
/deep/.van-address-item {
  .van-radio__icon--checked .van-icon, .van-tag--danger {
    background-color: #FA4DBE;
    border-color: #FA4DBE;
  }
}
</style>
