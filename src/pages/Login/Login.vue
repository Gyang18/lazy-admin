<template>
 <div class="login">
  <div class="container">
   <div class="logo">
    <h1>logo</h1>
   </div>
   <div class="login-form">
    <cell-group>
     <field
         v-model="loginData.username"
         label="用户名"
         placeholder="请输入用户名"
     />
     <field
         v-model="loginData.password"
         label="密码"
         placeholder="请输入密码"
         type="password"
     />
    </cell-group>
    <div class="btn-group">
     <van-button class="page-primary-button"
      type="primary" size-="mini" block @click="submitLoginForm">登陆</van-button>
    </div>
   </div>
  </div>
 </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  Field, CellGroup, Cell, Button,
} from 'vant';

@Component({
  name: 'Login',
  components: {
    Field,
    CellGroup,
    Cell,
    'van-button': Button,
  },
})
export default class Login extends Vue {
 private loginData: any = {
   username: '',
   password: '',
 };

 // 提交数据
 private submitLoginForm():void {
   if (!this.loginData.username) {
     this.$toast.fail('请填写用户名');
     return;
   }
   if (!this.loginData.password) {
     this.$toast.fail('请填写密码');
     return;
   }
   this.$router.push('/base/home');
 }
}
</script>

<style scoped lang="less">
 .login {
  justify-content: center;
  display: flex;
  .container {
   width: 480px;
   margin-top: 50px;
   padding: 0 20px;
  }
 }
 .btn-group {
  margin-top: 30px;
 }
 .logo {
  text-align: center;
  font-size: 32px;
  color: #FA4DBE;
  padding: 30px;
 }
</style>
