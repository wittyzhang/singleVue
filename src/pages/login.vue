<!--
 * @Author: your name
 * @Date: 2021-01-14 11:59:37
 * @LastEditTime: 2021-01-14 14:28:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Singlepage/src/pages/login.vue
-->
<template>
  <div id="login">
    <div class="content_wrap">
      <div class="top_logo">
    </div>
      <div class="login_main">
        <div class="login_box">
          <h3>登录</h3>
          <div class="user_name _bottom _relative">
            <p>账号：</p>
            <el-input v-model="mobile"  placeholder="请输入账号" ></el-input>
          </div>
          <div class="password _bottom _relative _mt60">
            <p>密码：</p>
            <el-input v-model="password" type="password"  placeholder="请输入密码"></el-input>
            <p class="error_txt" v-show="show_codeError">*{{errortxt}}</p>
          </div>
          <button class="btn_login" @click="loginSubmit" >登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from '@/utils/https';
import { setCookie } from '@/utils/tool';

export default {
  data() {
    return {
      mobile: '',
      password:'',
      gvcLock: false,
      errortxt: '',
    }
  },
  created() {

  },
  methods: {
    // 登录
    async login() {
      
      setTimeout(()=>{
        this.$store.commit('set_token', "tokenstr");
        this.$store.commit('set_userInfo', {username:'18500000000'});
        if (this.$store.state.token) {
          // 进入项目主页 selectTree
          this.$router.replace('/selectTree');
        } else {
          this.$router.replace('/login');
        }
      },1000);
        

     
    },
    loginSubmit() {
      if (this.mobile == '' || this.password == '') {
        this.errortxt = '账号或密码不能为空';
        this.gvcLock = false;
        this.show_codeError = true;
        return false;
      }
      this.errortxt = '';
      this.show_codeError = false;
      this.login();
      return undefined;
    },
  },
};

</script>
<style lang="scss" scoped>
@import '../css/login.scss';
</style>
