<template>
  <div :class="$style.top_nav" class="top_nav">
    <div :class="$style.nav">
       <div :class="$style.top_nav_logo">
        <span>NLE WMS</span>
      </div>
      <div :class="$style.side_nav_switch">
        <i class="iconfont">&#xe613;</i>
      </div>
      <div :class="$style.lang_switch">
        <el-dropdown>
          <span class="el-dropdown-link">
            English<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">简体中文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <ul :class="$style.top_nav_ul">
        <li :class="$style.top_nav_li" v-for="item in topNavData" :key="item.name">
          <router-link :to="{name: item.name}">
            <i class="iconfont" v-html="item.icon"></i>
            {{$t(item.name)}}
          </router-link>
        </li>
      </ul>
    </div>
    <div :class="$style.user_info">
      <div :class="$style.user">
        <el-dropdown>
          <div :class="$style.img">
            管
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{email}}</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div :class="$style.mdoel" v-for="index in 3" :key="index">
          <div :class="$style.model_top" :style="{
            color: ['#ffbb17', '#57c38a', '#e7e5f9'][index-1]}">
            <i class="iconfont">&#xe653;</i>
          </div>
          <span>{{['创建', '租赁', '员工'][index-1]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $http from '@/api';

export default {
  name: 'topNav',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    logout() {
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        $http.logout().then(() => {
          this.$store.commit('token/delToken');
          this.$router.push({
            name: 'login',
          });
        });
      });
    },
    getInfo() {
      $http.account().then((res) => {
        this.email = res.data.email;
      });
    },
  },
  created() {
    this.getInfo();
  },
  computed: {
    topNavData() {
      return this.$store.state.routerData.routerMap[0].children;
    },
  },
};
</script>

<style lang="less" module>
@import '../../less/public_variable.less';
.top_nav {
  height: 102px;
  background-color: @white;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  min-width: 1280px;
  display: flex;
  border-bottom: 1px solid;
  border-color: @separateLine;
  .nav {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .switch(@width) {
    border-right: 1px solid;
    border-color: @separateLine;
    width: @width;
    text-align: center;
    line-height: 102px;
  }
  .top_nav_logo {
    width: 231px;
    height: 102px;
    background-color: @ThemeColor;
    color: @white;
    font-size: 36px;
    line-height: 102px;
    font-weight: 600;
    text-align: center;
  }
  .side_nav_switch {
    .switch(103px);
    i {
      font-size: 30px;
      color: @ThemeColor;
      cursor: pointer;
    }
  }
  .lang_switch {
    .switch(113px)
  }
  .top_nav_ul {
    padding: 0;
    margin: 35px 0 0 39px;
    display: flex;
    flex-wrap: row;
    width: 550px;
    .top_nav_li {
      list-style: none;
      text-align: center;
      margin-right: 39px;
      a {
        text-decoration: none;
        color:  @textColor;
        font-size: 14px;
        &:hover {
          color:  @ThemeColor;
        }
        i {
          display: block;
          margin-bottom: 3px;
        }
      }
    }
  }
  .user_info {
    width: 20%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    .user {
      border-left: 1px solid;
      display: flex;
      flex-flow: row wrap;
      border-right: 1px solid;
      border-color: @separateLine;
      width: 225px;
      text-align: center;
      .img {
        width: 41px;
        height: 41px;
        border-radius: 50%;
        border: 1px solid;
        cursor: pointer;
        line-height: 41px;
        color: @ThemeColor;
        margin: 28px 15px 28px 37px;
      }
    }
    .model_color(@color) {
      width: 21px;
      height: 21px;
      background: @textColor;
      color: @color;
      line-height: 21px;
      margin: 0 auto;
      border-radius: 50%;
    }
    .mdoel {
      margin-top: 35px;
      cursor: pointer;
      width: 35px;
      font-size: 10px;
      .model_top {
        .model_color(RGBA(255, 187, 23, 1));
        i {
          font-size: 12px;
        }
      }
    }
  }
  // @media screen and(max-width: 1300px) {
  //   .user_info {
  //     display: none;
  //   }
  // }
}
</style>

<style lang="less">
@import '../../less/public_variable.less';
.top_nav {
  .router-link-active {
    color:  @ThemeColor !important;
  }
}
</style>
