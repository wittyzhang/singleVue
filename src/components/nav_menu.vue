<template>
  <div id="nav_menu">
    <div class="nav">
      <div class="navbox">
        <div class="option">
          <div class="logo">
            <h2 style="color:#1890ff">项目名称</h2>
          </div>
          <div class="user_center">
            <el-dropdown size="small" @command="userCommand">
              <span class="name">
                <i class="fa fa-user-circle"></i>
                {{supplierName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <!-- <span style="padding: 0 20px;color:#1890ff" @click="signOut">退出</span> -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="signOut"><span style="padding: 0 20px;color:#1890ff">退出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="con_wrapper ant-layout">
      <div class="con_silder" v-if="!hideLeftMenu">
        <div class="menu_item" v-for="(item, idx) in menusList" :key="idx" :class="{ active: item.isActive }" @click="downOrUp(item)">
          <a :href="item.url || 'javascript:;'">
            <p>
              <!-- <img :src="item.icon">{{item.menuName}} -->
              {{item.menuName}}
              <i class="fa fa-chevron-down" v-if="item.id != 1"></i>
            </p>
          </a>
          <ul v-if="item.childMenu" :class="{ toDown: item.isDown, toUp: !item.isDown }">
            <a v-for="(child, chIdx) in item.childMenu" :key="chIdx" :href="child.url">
              <li :class="{ current: child.isCurrActive }">{{child.menuName}}</li>
            </a>
          </ul>
        </div>
      </div>
      <div class="ant-layout">
        <div class="cont_main"><slot></slot></div>
       
      </div>
    </div>
  </div>
</template>
<script>
import { removeCookie } from '@/utils/tool';
import store from '../store';

import request from '@/utils/https';

const menuItems = [
		{
			"id": "1",
			"menuName": "1级菜单",
			"url": "",
			"isDown": false,
			"childMenu": [
				{
					"id": 3,
					"menuName": "子菜单",
					"url": "/selectTree",
					"childMenu": []
				}
			]
		},
	]
export default {
  data() {
    return {
      supplierName: '',
      activeMenuId: 0,
      activeChildMenuId: 0,
      menusList: menuItems,
      hiderUsCenter: true,
    };
  },
  props: {
    activeIndex: String, // 当前选中菜单
    hideLeftMenu: Boolean, // 是否显示左侧菜单
  },
  created() {
    // 右上角用户名
    this.supplierName = this.$store.getters.getUserInfo.username;
    console.log(this.$store.getters.getUserInfo)
    this.setActiveMenu();
    
  },
  mounted() {
    
  },
  methods: {
    setActiveMenu() {
       // 根据页面pathname选中当前菜单，去掉pathname后可能存在的斜线
      let pathname = window.location.pathname.replace(/\/*$/, '');
      let regxPath = new RegExp(`^${pathname}/*$`);
      this.menusList.forEach(item => {
        let activeChild;
        if (item.childMenu) {
          activeChild = item.childMenu.find(child => regxPath.test(child.url));
        }
        if (activeChild) {
          this.activeMenuId = item.id;
          this.activeChildMenuId = activeChild.id;
          item.isActive = true;
          activeChild.isCurrActive = true;
          item.isDown = true;
        } else if (regxPath.test(item.url)) {
          this.activeMenuId = item.id;
          item.isActive = true;
          item.isDown = true;
        } else {
          item.isActive = false;
          item.isDown = false;
        }
      }); 
      // 根据 props 的 activeIndex 选中菜单
      let activeIdx = this.activeIndex;
      if(!activeIdx) return false;
      this.menusList.forEach(item => {
        let activeChild;
        if (item.childMenu) {
          activeChild = item.childMenu.find(child => +child.id === +activeIdx);
        }
        if (activeChild) {
          this.activeMenuId = item.id;
          this.activeChildMenuId = activeChild.id;
          item.isActive = true;
          activeChild.isCurrActive = true;
          item.isDown = true;
        } else if (+item.id === +activeIdx) {
          this.activeMenuId = item.id;
          item.isActive = true;
          item.isDown = true;
        } else {
          item.isActive = false;
          item.isDown = false;
        }
      });
    },
    downOrUp(curMenu) {
      if (curMenu.isActive && curMenu.isDown) {
        return;
      }
      curMenu.isDown = !curMenu.isDown;
      this.menusList.forEach(item => {
        if (item.id !== curMenu.id) {
          item.isDown = false;
        }
      });
    },
    userCommand(command) {
      this[command]();
    },
    async signOut() {
      const data = await request.delete(`/login`);
      if (data.code == 200){
        this.$store.commit('del_token');
        this.$router.replace('/login');
      }else{
        this.$message.error(data.msg)
      }
      
    },

  },
  computed: {

  },
};
</script>
<style lang="scss" scoped>
#nav_menu{
  height:100%;
}
.ant-layout {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 0;
    background: #f0f2f5;
}
.nav {
  width: 100%;
  height: 64px;
  background: #001529;
  box-shadow: 0 1px 5x rgba(0,0,0,.3);
  font-size: 14px;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  .navbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 30px 0 20px;
    box-sizing: border-box;
    height: 64px;
    color: rgba(0,0,0,.65);
    line-height: 64px;
    background: #001529;
    .option {
          display: flex;
    justify-content: space-between;
    align-items: center;
      width: 100%;
      padding: 0 50px;
      max-width: 1920px;
      margin: 0 auto;
    }
  }
  .logo{
    
    display: inherit;
  }
  .user_center {
    position: relative;
    cursor: pointer;
    .user_list {
      position: absolute;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: stretch;
      border: 1px solid rgba(0,0,0,.15);
      border-radius: 3px;
      top: 22px;
      left: -10px;
      min-width: 120px;
      background: #fff;
      &.hide {
        display: none;
        cursor: pointer;
      }
      a {
        font-size: 14px;
        padding: 3px 0 3px 15px;
        cursor: pointer;
      }
    }
    .name {
      margin: 0 2px;
      color: #ffffff;
    }
  }
}
.con_wrapper {
  max-width: 1920px;
  margin: 0 auto;
  width:100%;
  min-height:100%;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 64px;
  .con_silder {
    flex: 0 0 200px;
    max-width: 200px;
    min-width: 200px;
    width: 200px;
    position: sticky;
    top: 0px;
    background:#001529;
    .menu_item {
      p {
        height: 40px;
        line-height: 40px;
        padding-left: 35px;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        position: relative;
        font-size: 14px;
        // box-shadow: inset 0 -1px 1px 0 #7d7d7d;
        // background-color: #6d6d6d;
        &:hover {
         
          color: #ffffff;
          // background-color: #5d5d5d;
          // color: #1890ff;
        }
        img {
          position: absolute;
          top: 15px;
          left: 13px;
          width: 16px;
          height: 17px;
        }
        i {
          transform: scale(.6);
          float: right;
          height: 50px;
          line-height: 50px;
          margin-right: 10px;
        }
      }
      &.active {
        p {
          // background-color: #1890ff;
          color: #ffffff;
          &:hover {
            color: #ffffff;
          }
        }
      }
      ul {
        display: none;
        background-color: #000c17;
        li {
          font-size: 14px;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          padding-left: 50px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &:hover{
            color: #ffffff;
          } 
          &.current {
            color: #ffffff;
            background-color: #1890ff;
          }
        }
        &.toDown {
          display: block;
        }
        &.toUp {
          display: none;
        }
      }
      a {
        color: rgba(255,255,255,.65);
        
      }
    }
  }
  .cont_main {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 0;
    background: #ffffff;
    padding: 20px;
    
  }
}

</style>
