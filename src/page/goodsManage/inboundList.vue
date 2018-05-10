<template>
<div class="inboundList">

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
        <el-col :span="7">
          <my-date></my-date>
        </el-col>
        <el-col :span="4">
          <my-input keyName="keywords"></my-input>
        </el-col>
        <el-col :span="2" :offset="7">
          <el-button
          type="text"
          @click="addInbound"
          icon="el-icon-plus">
            添加入库单
          </el-button>
        </el-col>
      </my-group>
      <el-table
        :data="inbound_list_data"
        border
        style="width:100%">
        <el-table-column
          type="index"
          label="#">
        </el-table-column>
        <el-table-column
          prop="status_name"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="warehouse.name_cn"
          label="仓库">
        </el-table-column>
        <el-table-column
          prop="batch_type.name"
          label="入库单分类">
        </el-table-column>
        <el-table-column
          prop="batch_code"
          label="入库单编号">
        </el-table-column>
        <el-table-column
          prop="confirmation_number"
          label="确认单编号">
        </el-table-column>
        <el-table-column label="预/已入库数量">
          <template slot-scope="scope">
            {{scope.row.need_num}}/{{scope.row.num}}
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updated_at"
          label="最后修改时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
              @click="viewDetails(scope.row)"
              :loading="$store.state.config.button_loading">
              查看详情
            </el-button>
            <el-button
              size="mini"
              @click="inboundDelete(scope.row.id)"
              v-if="scope.row.status === 1"
              type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <button-pagination :pageParams="params"></button-pagination>
    </wms-tags>

    <!-- 入库单详情弹框 -->
    <DetailDialog
      :visible.sync="inboundDialogVisible"
      :id="id">
    </DetailDialog>

</div>
</template>

<script>
import buttonPagination from '@/components/pagination_and_buttons';
import getListData from '@/mixin/list';
import $http from '@/api';
import WmsTags from '@/components/wms_tags';
import MyInput from '@/components/my_input';
import MySelect from '@/components/my_select';
import MyGroup from '@/components/my_group';
import MyDate from '@/components/my_date';
import DetailDialog from './components/inbound_detail';

export default {
  data() {
    return {
      inbound_list_data: [], // 入库单列表
      inboundDialogVisible: false, // 入库单详情弹框
      inbound_info: {},
      id: 0,
      boundList: [],
    };
  },
  components: {
    DetailDialog,
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
    // 添加入库单
    addInbound() {
      this.$router.push({
        name: 'addInbound',
      });
    },
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
    // 获取入库单列表
    getList() {
      this.params.status = 1;
      $http.inboundList(this.params).then((res) => {
        this.inbound_list_data = res.data.data;
        this.params.data_count = res.data.total;
      });
    },
    // 入库单详情弹框
    viewDetails(row) {
      this.inboundDialogVisible = true;
      this.id = row.id;
    },
    // 删除入库单
    inboundDelete(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        $http.inboundDel({
          batch_id: id,
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.getList();
        });
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
