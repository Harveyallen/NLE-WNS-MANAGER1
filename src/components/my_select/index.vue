<template>
  <el-select
  size="small"
  :value="value"
  @change="updateValue"
  style="width: 100%">
    <slot></slot>
  </el-select>
</template>

<script>
import mixin from '../mixin';

export default {
  mixins: [mixin],
  inject: ['params'],
  methods: {
    updateValue(val) {
      console.log(this.$route);
      const { name, params, query } = this.$route;
      this.group.$emit('change', this.keyName, val);
      this.submit();
      this.value = val;
      this.$router.replace({
        name,
        params,
        query: { ...query, [this.keyName]: val },
      });
    },
  },
};
</script>

<style>

</style>
