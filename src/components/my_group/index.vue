<template>
  <div :class="$style.my_group">
    <el-row style="margin: 0" :gutter="20">
      <slot></slot>
    </el-row>
  </div>
</template>

<script>

export default {
  created() {
    this.$on('change', this.onChangeValue);
    this.$on('pre-submit', this.onSubmit);
  },
  props: {
    value: [Object],
  },
  provide() {
    return {
      params: this.value,
    };
  },
  methods: {
    onChangeValue(key, val) {
      const newValue = { ...this.value, [key]: val };
      this.$emit('input', newValue);
    },
    onSubmit() {
      this.$emit('submit', this.value);
    },
  },
};
</script>

<style lang="less" module>
  @import '../../less/public_variable.less';
  .my_group {
    width: 100%;
    margin-bottom: 10px;
  }
</style>
