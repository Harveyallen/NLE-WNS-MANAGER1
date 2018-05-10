<template>
  <el-table-column
  :label="label">
    <template slot-scope="scope">
      <slot v-if="scope.row.$_edit" :row="scope.row">
        <el-input v-model="scope.row[prop]"></el-input>
      </slot>
      <slot name="props" v-else :row="scope.row">
        <span>{{ scope.row[prop] }}</span>
      </slot>
    </template>
  </el-table-column>
</template>

<script>
export default {
  props: {
    prop: [String],
    label: [String],
  },
};
</script>
