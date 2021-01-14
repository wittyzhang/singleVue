<!--
 * @Author: your name
 * @Date: 2020-10-29 10:54:16
 * @LastEditTime: 2021-01-14 11:55:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /haowulianmeng/src/pages/index/index.vue
-->
<template>
  <div id="index">
    <NavMenu :activeIndex="activeIndex" v-if="!$route.meta.hideheadder" :hideLeftMenu='$route.meta.hideMenu'>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件， -->
          </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </NavMenu>
    <router-view v-else></router-view>

  </div>
</template>
<script>
import NavMenu from '@/components/nav_menu.vue';
import { setCookie, getcookie } from '@/utils/tool.js';
import request from '@/utils/https';
// import { fomatFloat, getcookie} from '@/utils/tool';

export default {
  data(){
    return {
      isLogin: '', 
      url:'', // 当前URL
      activeIndex: '',
    }
  },
  components:{
    NavMenu,
  },
  mounted(){
    this.isLogin = this.$store.state.token;
    this.activeIndex = this.$route.meta.activeIndex;
    this.url = window.location.pathname + window.location.search;

    // console.log(this.$store.state.token)
    if (this.$store.state.token) {
      console.log('登录了')
      this.$router.push({path:this.url})
    } else {
      console.log('未登录');
      this.$router.push({path:'/login'})
    }
  },
  methods: {

  }
  
};
</script>
<style lang="scss" scoped>
#index{
  height: 100%;
}
$color-291: #1890ff;
$color-fff: #ffffff;
.pan {
  background-color: #001529;
  margin-bottom: 16px;
  color: #333333;
  font-size: 14px;
  font-weight: 400;
  h3 {
    margin-left: 20px;
    padding: 20px 0 15px;
    color: #000000;
    font-size: 20px;
    font-weight: 500;
  }
}
.pan_top {
  border-bottom: 1px #F1F1F1 solid;
}
.pan_content {
  padding: 10px 0 30px;
}
</style>
