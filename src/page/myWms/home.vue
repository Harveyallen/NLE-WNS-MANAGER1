<template>
  <no-authentication></no-authentication>
</template>
<script>
import NoAuthentication from './components/no_authentication';

export default {
  name: 'home',
  components: {
    NoAuthentication,
  },
};
</script>
<style module lang="less">
  @import '../../less/public_variable.less';
  .myWms_home {
  }
</style>
