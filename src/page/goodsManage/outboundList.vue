<template>
<div class="storeManage">

  <wms-tags>
    <my-group
      v-model="params"
      @submit="onSubmit">
      <el-col :span="4">
        <my-select keyName="params.warehouse_id">
          <el-option
            v-for="item in boundList"
            :label="item.name_cn"
            :value="item.id" :key="item.id">
          </el-option>
        </my-select>
      </el-col>
      <el-col :span="6">
        <my-date></my-date>
      </el-col>
      <el-col :span="4" :offset="10">
        <my-input keyName="keywords"></my-input>
      </el-col>
    </my-group>
    <el-table
      :data="outbound_list_data"
      border
      style="width:100%;">
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="name_cn"
        label="出库单号">
      </el-table-column>
      <el-table-column
        prop="name_en"
        label="出库单类型">
      </el-table-column>
      <el-table-column
        prop="address"
        label="所属仓库">
      </el-table-column>
      <el-table-column
        prop="address"
        label="出库数量">
      </el-table-column>
      <el-table-column
        prop="name_en"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template>
          <el-button size="mini">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <button-pagination :pageParams="params"></button-pagination>
  </wms-tags>

</div>
</template>

<script>
import buttonPagination from '@/components/pagination_and_buttons';
import getListData from '@/mixin/list';
import WmsTags from '@/components/wms_tags';
import MyInput from '@/components/my_input';
import MySelect from '@/components/my_select';
import MyGroup from '@/components/my_group';
import MyDate from '@/components/my_date';
import $http from '@/api';

export default {
  data() {
    return {
      outbound_list_data: [], // 出库单列表
      boundList: [],
    };
  },
  components: {
    WmsTags,
    MyInput,
    MyGroup,
    MyDate,
    MySelect,
    buttonPagination,
  },
  mixins: [getListData],
  created() {
    this.getBoundList();
  },
  computed: {
  },
  methods: {
    addCommodity() {},
    // 获取仓库列表
    getBoundList() {
      const warehouseParams = {
        page: 1,
        page_size: 100,
      };
      $http.warehouse(warehouseParams).then((res) => {
        this.boundList = res.data.data;
      });
    },
    // 获取出库单列表
    getList() {
      this.params.status = 1;
      if (this.params.warehouse_id) {
        this.params.warehouse_id = 1;
      }
      $http.outboundList(this.params).then((res) => {
        this.outbound_list_data = res.data.data;
        this.params.data_count = res.data.total;
      });
    },
  },
};
</script>

<style lang="less" module>
@import '../../less/public_variable.less';

.util {
  text-align: right;
  margin: 20px;
}
</style>
