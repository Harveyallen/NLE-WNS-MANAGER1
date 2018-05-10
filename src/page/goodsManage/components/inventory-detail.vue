<template>
  <el-dialog
    title="NLE总仓"
    width="80%"
    @close="close"
    @update:visible="$emit('update:visible', $event)"
    :visible="visible">
    <h1>康师傅红烧牛肉(袋）出入库记录</h1>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type_id === 1">入库</span>
          <span v-if="scope.row.type_id === 2">出库</span>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="入库数量">
      </el-table-column>
      <el-table-column prop="balance_num" label="上架数量">
      </el-table-column>
      <el-table-column prop="created_at" label="出库数量">
      </el-table-column>
      <el-table-column prop="order_sn" label="库存数量">
      </el-table-column>
      <el-table-column prop="order_sn" label="操作时间">
      </el-table-column>
      <el-table-column prop="order_sn" label="相关单号">
      </el-table-column>
      <el-table-column prop="operator" label="操作人">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>

export default {
  props: {
    visible: Boolean,
    id: String,
    name: String,
  },
  data() {
    return {
      page_params: {
        status_id: '',
      },
      tableData: [],
      tableLoading: false,
      order_status_list: [],
    };
  },
  methods: {
    close() {
      this.page_params.page = 1;
    },
    // 拉取单个商品出入库记录
    getList() {
      if (this.id === '') return;
    },
  },
  watch: {
    // 如果ID发生变化则重新拉取记录
    id() {
      this.getList();
    },
  },
};
</script>
