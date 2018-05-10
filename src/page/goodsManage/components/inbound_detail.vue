<template>
  <el-dialog
  title="查看入库单"
  width="80%"
  @close="close"
  @update:visible="$emit('update:visible', $event)"
  :visible="visible">
  <el-row :gutter="10">
    <el-col :span="9" :offset="9">
      <h2>({{warehouse_name}})入库单</h2>
    </el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="3">入库单分类:</el-col>
    <el-col :span="10">{{category_name}}</el-col>
    <el-col :span="4" :offset="3">
      <img
        v-if="inboundInfo.batch_code_barcode"
        :src=inboundInfo.batch_code_barcode
        alt="二维码"
        :class="$style.inboundimg">
    </el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="3">入库单编号:</el-col>
    <el-col :span="10">{{inboundInfo.batch_code}}</el-col>
    <el-col :span="4" :offset="4">{{inboundInfo.batch_code}}</el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="3">确认单编号:</el-col>
    <el-col :span="10">{{inboundInfo.confirmation_number}}</el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="3">入库供应商:</el-col>
    <el-col :span="10">{{distributor_name}}</el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="3">备注:</el-col>
    <el-col :span="10">{{inboundInfo.remark}}</el-col>
  </el-row>

  <h3>商品列表</h3>

    <el-table
      :data="inboundList"
      border
      style="width: 100%"
      v-loading='tableLoading'>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="spec.name_cn" label="中文名称">
      </el-table-column>
      <el-table-column prop="relevance_code" label="外部编码">
      </el-table-column>
      <el-table-column label="预/已入库数量" width="120">
        <template slot-scope="scope">
          {{scope.row.need_num}}/{{scope.row.stockin_num}}
        </template>
      </el-table-column>
      <el-table-column prop="pieces_num" label="每箱件数">
      </el-table-column>
      <el-table-column prop="distributor_code" label="供应商货号">
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <div :class="$style.content_box">
            <el-popover
              placement="left-start"
              width="150"
              trigger="hover"
              :content=scope.row.remark>
              <span slot="reference">{{scope.row.remark}}</span>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination :page-params="page_params"></pagination> -->

    <el-row>
      <el-col :span="10" :offset="14">
        <el-row>
          <el-col :span="7">运输方式:</el-col>
          <el-col :span="17">{{inboundInfo.transportation_type}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="7">运单号:</el-col>
          <el-col :span="17">{{inboundInfo.waybill_number}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="7">预入库总数:</el-col>
          <!-- <el-col :span="17">{{tableData.total_need_num}}</el-col> -->
        </el-row>
        <el-row>
          <el-col :span="7">操作人:</el-col>
          <el-col :span="17">{{inboundInfo.operator}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="7">预期入库时间:</el-col>
          <el-col :span="17">
            {{inboundInfo.plan_time}}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{{inboundInfo.over_time}}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :class="$style.download">
      <el-col :span="10" :offset="10">
        <el-button round plain type="primary" @click="onDownload()">下载入库单</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import $http from '@/api';
export default {
  props: {
    visible: Boolean,
    // inboundInfo: Object,
    id: Number,
  },
  data() {
    return {
      page_params: {
        keyword: '',
      },
      inboundInfo: {},
      inboundList: [],
      batch_id: '',
      tableLoading: false,
      order_status_list: [],
      warehouse_name: '',
      distributor_name: '',
      category_name: '',
    };
  },
  watch: {
    id: {
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
      if (!this.id) return;
      $http.inboundDetail(this.id).then((res) => {
        this.inboundInfo = res.data;
        this.inboundList = res.data.batch_products;
        this.warehouse_name = res.data.warehouse.name_cn;
        this.distributor_name = res.data.distributor.name_cn;
        this.category_name = res.data.batch_type.name;
      });
    },
    onDownload() {
      // const w = window.open();
      // this.$http.post('business/batch/downloadBatch', {
      //   batch_id: this.batch_id,
      //   url: `${baseApi.BASE_URL}static/warehouse/index.html`,
      // }).then((res) => {
      //   if (res.ret === 1) {
      //     this.$message({
      //       message: '下载成功!',
      //       type: 'success',
      //     });
      //     w.location = res.data.file;
      //   } else if (res.ret === 0) {
      //     this.$message({
      //       message: res.msg,
      //       type: 'error',
      //     });
      //   }
      // }).catch(() => {
      // });
    },
  },
};
</script>

<style module>
.content_box{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.download {
  margin-top: 50px;
}
.inboundimg {
  width: 300px;
  height: 60px;
}
</style>