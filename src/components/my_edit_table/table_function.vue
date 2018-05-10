<template>
  <el-table-column
  :width="width"
  :label="label">
    <template slot-scope="scope">
      <template v-if="scope.row.$_edit">
        <el-button type="text" @click="saveEdit(scope.row)">保存</el-button>
        <el-button type="text" @click="cancelHandle(scope.row, scope.$index)">取消</el-button>
      </template>
      <template v-else-if="!scope.row.$_edit">
        <el-button type="text" @click="edit(scope.row, scope.$index)">编辑</el-button>
        <slot></slot>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import cope from '@/lib/copy';

export default {
  props: {
    label: [String],
    saveHandle: {
      type: Function,
      default: () => false,
    },
    saveEdit: {
      type: Function,
      default: () => 0,
    },
    width: [String],
  },
  data() {
    return {
      rowCopyData: [],
    };
  },
  methods: {
    edit(row, index) {
      this.$emit('editChange', row);
      this.$set(row, '$_edit', true);
      this.rowCopyData[index] = cope.object(row);
    },
    cancelHandle(row, index) {
      for (const key in this.rowCopyData[index]) {
        // 恢复数据
        if (Object.prototype.hasOwnProperty.call(this.rowCopyData[index], key)) {
          row[key] = this.rowCopyData[index][key];
        }
      }
      this.$set(row, '$_edit', false);
      this.rowCopyData.splice(index, 1);
    },
  },
};
</script>
