<template>
 <div class="page-container">
   <div class="cart-wrapper">
    <ScrollWrapper>
      <ul class="cart-list">
        <li class="layout-flex" v-for="(item, index) in cartList" :key="item.id">
          <div class="cart-item-left">
            <div class="checkbox-btn" :class="{ 'checked' : item.checked }" @click="choiceGoods(index)">
              <i class="iconfont">&#xe619;</i>
            </div>
            <div class="cover">
              <van-image
                  width="115px"
                  height="115px"
                  :src="item.image"
              />
            </div>
          </div>
          <div class="layout-flex cart-item-content">
            <div class="context">
              <h6 class="layout-text-ellipsis-1">{{ item.title }}</h6>
              <p class="layout-text-ellipsis-1 attr">{{ item.attrVal }}</p>
              <p class="money">¥ {{ item.price }}</p>
            </div>
            <div class="steps">
              <van-stepper input-width="48px" button-size="35px"
                :default-value="item.num" v-model="item.num"
                :max="item.stock" integer @change="goodsNumChange" />
            </div>
          </div>
          <div class="cart-item-right">
           <span class="delete-btn" @click="deleteGoodsItem(index)">
             <van-icon size="18px" name="cross" />
           </span>
          </div>
        </li>
      </ul>
    </ScrollWrapper>
   </div>
   <div class="layout-flex layout-flex-between layout-align-center cart-total" v-show="checkedNum > 0">
     <div class="checked-all">
       <van-checkbox v-model="checkedAll" @click="ChoiceAllGoods">全选</van-checkbox>
     </div>
     <div class="price">
       <p>¥ {{ totalPrice }}</p>
       <p class="desc">已优惠0元</p>
     </div>
     <div class="cart-money-total">
       <van-button type="primary" class="page-primary-button">结算( {{ checkedNum }} )</van-button>
     </div>
   </div>
 </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Checkbox, Stepper } from 'vant';
import { GoodsCartItem } from '@/api/types';
import { getGoodsCartResult } from '@/api/goods';
import ScrollWrapper from '@/components/ScrollWarpper';

@Component({
  name: 'Cart',
  components: {
    ScrollWrapper,
    'van-checkbox': Checkbox,
    'van-stepper': Stepper,
  },
})
export default class Cart extends Vue {
  private cartList: GoodsCartItem[] = [];

  private checkedAll: boolean = false;

  private checkedNum:number = 0;

  private totalPrice: number | string = 0;

  // 全选所有商品
  private ChoiceAllGoods(): void {
    this.checkedAll = !this.checkedAll;
    this.toggleGoodsAll(this.checkedAll);
  }

  // 反选商品
  private toggleGoodsAll(checked: boolean) {
    const list = this.cartList;
    this.cartList = list.map(item => {
      const temp = { ...item };
      temp.checked = checked;
      return temp;
    });
    this.getSelectedGoods();
  }

  // 选择单个商品
  private choiceGoods(index: number): void {
    const current = this.cartList[index];
    current.checked = Boolean(!current.checked);
    this.$set(this.cartList, index, current);
    this.getSelectedGoods();
  }

  // 删除单个商品
  private deleteGoodsItem(index: number): void {
    this.cartList.splice(index, 1);
    this.getSelectedGoods();
  }

  // 商品数量变化监听
  private goodsNumChange() {
    this.getSelectedGoods();
  }

  // 找出选中的商品
  private getSelectedGoods():void {
    const goods = this.cartList.filter(item => item.checked);
    this.checkedNum = goods.length;
    this.checkedAll = (this.checkedNum === this.cartList.length);
    this.calcGoodsPrice(goods);
  }
  // 计算商品价格

  private calcGoodsPrice(goods: GoodsCartItem[]):void {
    let price = 0;
    goods.forEach(item => {
      price += (item.num * Number(item.price));
    });
    this.totalPrice = price.toFixed(2);
  }

  // 获取购物车数据
  private async getGoodsCart() {
    const res = await getGoodsCartResult();
    if (res.success) {
      this.cartList = res.data;
    }
  }

  private created() {
    this.getGoodsCart();
  }
}
</script>

<style scoped lang="less">
  .page-container {
    height: calc(100vh - 96px);
    overflow: hidden;
    padding-bottom: 50px;
    background: #fff;
  }
 .cart-wrapper {
   width: 100%;
   height: 100%;
   position: relative;
 }
  .cart-list {
    li {
      position: relative;
      padding: 15px 20px;
      flex-wrap: nowrap;
    }
    .cart-item-left {
      width: 115px;
      height: 115px;
      position: relative;
      .van-image {
        border-radius: 4px;
      }
      .checkbox-btn {
        position: absolute;
        left: -8px;
        top: -8px;
        z-index: 8;
        font-size: 22px;
        line-height: 1;
        padding: 2px;
        color: #C0C4CC;
        background: #fff;
        border-radius: 50px;
        &.checked {
          color:#FA4DBE;
        }
      }
    }
    .cart-item-content {
      padding-left: 15px;
       flex: 1;
      h6 {
        font-size: 15px;
        color: #303133;
        height: 20px;
        line-height: 1.2;
      }
      .attr {
        font-size: 14px;
        color: #909399;
        height: 25px;
        line-height: 25px;
      }
      .money {
        font-size: 15px;
        color: #303133;
        line-height: 1.4;
      }
    }
    .cart-item-right {
      .delete-btn {
        padding: 2px 5px;
        height: 25px;
        color: #909399;
        display: block;
      }
    }
  }
  .cart-total {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background: rgba(255,255,255, 0.95);
    padding: 10px 20px;
    .price {
      flex: 1;
      padding:0 10px;
      text-align: right;
      font-size: 16px;
      color: #303133;
      line-height: 1.2;
      .desc {
        font-size: 12px;
        color: #909399;
      }
    }
    .cart-money-total {
      .van-button {
        border: 0;
        width: 110px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
      }
    }
  }
</style>
