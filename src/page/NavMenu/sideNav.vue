<template>
  <div :class="$style.side_nav" class="side_nav">
    <div :class="$style.side_nav_title">
      <i class="iconfont" v-html="sideNavTitle.icon"></i> <span>{{$t(sideNavTitle.name)}}</span>
    </div>
    <div :class="$style.nav" v-for="item in sideNavData" :key="item.name">
      <ul :class="$style.side_nav_ul">
        <li :class="$style.side_nav_li">
          <router-link :to="{name: item.name}">{{$t(item.name)}}</router-link>
        </li>
      </ul>
    </div>
    <!-- <el-menu
    background-color="#444154"
    :default-active="$route.name"
    class="el-menu-vertical-demo"
    text-color="#fff"
    :collapse="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont" v-html="sideNavTitle.icon"></i>
        </template>
        <el-menu-item-group>
          <span slot="title">{{$t(sideNavTitle.name)}}</span>
          <el-menu-item
          :index="item.name"
          v-for="item in sideNavData"
          :key="item.name"
          @click="$router.push({
            name: item.name,
          })">
            {{$t(item.name)}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu> -->
  </div>
</template>
<script>
export default {
  name: 'sideNav',
  props: ['nav'],
  methods: {
  },
  computed: {
    sideNavData() {
      return this.nav.children.filter(item => item.nav === 2);
    },
    sideNavTitle() {
      return this.nav;
    },
  },
};
</script>
<style lang="less" module>
@import '../../less/public_variable.less';
.side_nav {
  height: 100%;
  position: fixed;
  left: 0;
  top: 102px;
  background: #444154;
  .side_nav_title {
    margin-top: 45px;
    background:rgba(185,173,255,.2);
    font-size:16px;
    color: @white;
    display: flex;
    flex-flow: row wrap;
    padding-left: 50px;
    line-height: 34px;
    i {
      font-size: 17px;
    }
    span {
      display: block;
      margin-top: 1px;
      font-weight: 600;
      margin-left: 11px;
    }
  }
  .side_nav_ul {
    min-width: 231px;
    width: 12%;
    margin: 0;
    padding: 0;
    .side_nav_li {
      list-style: none;
      width: 110px;
      cursor: pointer;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      color: @white;
      margin: 10px auto;
      a {
        display: block;
        color: @white;
        text-decoration: none;
        &:hover {
          background: @NavActive;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
<style lang="less">
@import '../../less/public_variable.less';
.side_nav {
  .router-link-active {
    background: @NavActive;
    border-radius: 5px;
  }
  .el-menu-vertical-demo {
    margin-top: 70px;
  }
  .el-menu {
    border: none;
  }
}
</style>
