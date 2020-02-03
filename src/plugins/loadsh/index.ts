import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as _ from 'lodash';
import { LoadshInterface } from './interface';

Vue.prototype.$loadsh = _;
declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
  interface Vue {
    $loadsh: LoadshInterface;
  }
}
