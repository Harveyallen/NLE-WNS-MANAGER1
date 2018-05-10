<template>
  <div :class="$style.side_nav">
    <side-nav :nav="nav"></side-nav>
    <div :class="$style.title">
      {{$t(key)}}
    </div>
    <router-view :key="key" :class="$style.content"></router-view>
    <div :class="$style.footer">
      Copyright © 2018 EU Techne B.V.（2.5.0）技术支持<i class="iconfont">&#xe604;</i>
    </div>
  </div>
</template>
<script>
import sideNav from './sideNav';

export default {
  components: {
    sideNav,
  },
  computed: {
    nav() {
      return this.$store.state.routerData.routerMap[0].children.filter(
        item => item.name === this.$route.matched[1].name,
      )[0];
    },
    key() {
      return this.$route.name;
    },
  },
  name: 'side',
};
</script>
<style lang="less" module>
@import '../../less/public_variable.less';
.side_nav {
  padding-left: 231px;
  .content {
    min-height: 74.2vh;
    padding-top: 165px;
    width: 100%;
    background: url('../../assets/img/img.png') no-repeat right bottom;
  }
  .title {
    height: 60px;
    width: 100%;
    top: 102px;
    position: fixed;
    border: 1px solid @separateLine;
    background: @white;
    color: @textColor;
    font-size: 18px;
    text-indent: 45px;
    z-index: 999;
    line-height: 60px;
  }
  .footer {
    height: 80px;
    border: 1px solid @separateLine;
    background: @white;
    color: @textColor;
    text-align: center;
    line-height: 80px;
    i {
      font-size: 40px;
      position: relative;
      top: 20px;
      left: 5px;
      color: @separateLine;
    }
  }
}
</style>
