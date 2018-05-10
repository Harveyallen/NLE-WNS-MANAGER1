<template>
  <el-dialog
  title="查看出库单"
  width="70%"
  @close="close"
  @update:visible="$emit('update:visible', $event)"
  :visible="visible">
  <el-row :gutter="10">
    <el-col :span="6" :offset="9">
      <h2>({{inboundInfo.warehouse.name_cn}})出库单</h2>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3">出库单分类</el-col>
    <el-col :span="10">{{outboundInfo.out_sn}}</el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3">出库单编号</el-col>
    <el-col :span="10">{{statusMap[outboundInfo.status]}}</el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3">物流单号</el-col>
    <el-col :span="10">{{outboundInfo.remark}}</el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="3">出库状态</el-col>
    <el-col :span="10">{{outboundInfo.out_sn}}</el-col>
  </el-row>
  <h3>商品列表</h3>
    <el-table :data="tableData.data" border style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name_cn" label="中文名称">
      </el-table-column>
      <el-table-column prop="goods_info.relevance_code" label="外部编码">
      </el-table-column>
      <el-table-column prop="amount" label="出库数量">
      </el-table-column>
      <el-table-column prop="amount" label="每箱件数">
      </el-table-column>
      <el-table-column prop="goods_info.expiration_date" :label="$t('expiration')">
      </el-table-column>
      <el-table-column prop="goods_info.batch_code" :label="$t('batchNumber')">
      </el-table-column>
    </el-table>
    
    <el-row>
      <el-col :span="6" :offset="18">
        <el-row>
          <el-col :span="8">出库总数:</el-col>
          <el-col :span="14">{{tableData.totalNum}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">核验人</el-col>
          <el-col :span="14">{{outboundInfo.source}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">出库时间:</el-col>
          <el-col :span="14">{{outboundInfo.output_time}}</el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>

export default {
  name: 'outbound-order-detail',
  props: {
    visible: Boolean,
    outboundInfo: Object,
    id: Number,
  },
  data() {
    return {
      page_params: {
        keyword: '',
      },
      tableData: {
        totalNum: '', // 出库总数量
        data: [], // 列表数据
      },
      tableLoading: false,
      order_status_list: [],
    };
  },
  watch: {
    outboundInfo: {
      // eslint-disable-next-line
      handler(value) {
        this.getList();
      },
      deep: true,
    },
  },
  methods: {
    close() {
      // this.page_params.page = 1;
    },
    getList() {
      if (!this.outboundInfo.id) return;
    },
  },
};
</script>
