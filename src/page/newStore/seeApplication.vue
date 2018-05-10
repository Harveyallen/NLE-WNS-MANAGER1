<template>
<div>
  <wms-tags
    :tagList="tag_data"
    @change="storeType"
    v-model="params.status">
    <el-table
      :data="config_list_data"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="name_cn"
        label="申请仓库">
        <template slot-scope="scope">
          {{scope.row.warehouse_name}}
        </template>
      </el-table-column>
      <el-table-column
        prop="application_name"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="weekly_shipments"
        label="预计每周发货量(单)">
      </el-table-column>
      <el-table-column
        prop="weekly_weight"
        label="预计每周发货重量（kg）">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="仓储物品">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="申请时间">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          {{scope.row.status | statusType}}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="info(scope.row.id)" size="mini">申请详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination-and-buttons :pageParams="params">
    </pagination-and-buttons>
  </wms-tags>
  <el-dialog
    title="申请详情"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose">
    <el-dialog
      width="50%"
      :visible.sync="innerVisible"
      :before-close="() => false"
      append-to-body>
      <h3>
        确认拒绝{{form.application_email}}用户对于NLE总仓的租赁申请？
      </h3>
      <el-input
        type="textarea"
        :rows="6"
        placeholder="请输入备注(可选填)"
        v-model="remark">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel()">取消</el-button>
        <el-button type="primary" @click="examineAndVerify(3)">确定</el-button>
      </span>
    </el-dialog>
    <div class="applica_form">
      <label :class="$style.label"> 仓储申请 </label>
      <el-form style="margin-left: 100px;" slot="left" label-position="left" label-width="180px">
        <el-form-item label="申请用户账号">
          {{form.application_email}}
        </el-form-item>
        <el-form-item label="需要开通仓库">
          {{form.application_name}}
        </el-form-item>
        <el-form-item label="申请日期">
          {{form.created_at}}
        </el-form-item>
        <el-form-item label="申请人名称">
          {{form.application_email}}
        </el-form-item>
        <el-form-item label="申请人电话">
          {{form.application_phone}}
        </el-form-item>
        <el-form-item label="预计每周发货量（单）">
          {{form.weekly_shipments}}
        </el-form-item>
        <el-form-item label="预计每周发货重量（kg）">
          {{form.weekly_weight}}
        </el-form-item>
        <el-form-item label="仓储物品">
          {{form.goods_name}}
        </el-form-item>
        <el-form-item label="销售目的国">
          {{form.sell_country}}
        </el-form-item>
        <el-form-item label="销售方式">
          {{form.sales_mode}}
        </el-form-item>
      </el-form>
      <label :class="$style.label"> 商品信息 </label>
      <el-form slot="left" style="margin-left: 100px;" label-position="left" label-width="180px">
        <el-form-item label="仓储物品">
          {{form.goods_name}}
        </el-form-item>
        <el-form-item label="销售目的国">
          {{form.sell_country}}
        </el-form-item>
        <el-form-item label="销售方式">
          {{form.sales_mode}}
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" v-if="form.status === 1" class="dialog-footer">
      <el-button type="danger" @click="examineAndVerify(0)">审核拒绝</el-button>
      <el-button type="primary" @click="examineAndVerify(2)">审核通过</el-button>
    </span>
  </el-dialog>
</div>

</template>

<script>
import WmsTags from '@/components/wms_tags';
import MdoelForm from '@/components/form';
import mixin from '@/mixin/list';
import $http from '@/api';
import PaginationAndButtons from '@/components/pagination_and_buttons';

export default {
  data() {
    return {
      config_list_data: [], // 仓库列表状态
      tag_data: [
        { name: '0', label: '全部' },
        { name: '1', label: '待审核' },
        { name: '2', label: '已通过' },
        { name: '3', label: '未通过' },
      ],
      params: {
        warehouse_id: '',
      },
      dialogVisible: false,
      innerVisible: false,
      form: {},
      remark: '',
    };
  },
  mixins: [mixin],
  components: {
    WmsTags,
    MdoelForm,
    PaginationAndButtons,
  },
  created() {
    this.getList();
  },
  computed: {
    ownerId() {
      return this.$store.state.token.id;
    },
  },
  methods: {
    // 获取到选中仓库类型
    storeType() {
      this.getList();
    },
    // 详情
    info(id) {
      $http.ownerInfo(id).then((res) => {
        this.dialogVisible = true;
        this.form = res.data;
      });
    },
    // 审核请求
    examineAndVerify(id) {
      if (!id) {
        this.innerVisible = true;
        return;
      }
      $http.check({
        status: id,
        lease_id: this.form.id,
        remark: this.remark,
      }).then(() => {
        this.getList();
        this.innerVisible = false;
        this.dialogVisible = false;
      });
    },
    // 审核拒绝关闭
    cancel() {
      this.innerVisible = false;
      this.remark = '';
    },
    // 关闭审核
    handleClose() {
      this.form = {};
      this.dialogVisible = false;
    },
    // 获取仓库列表
    getList() {
      $http.ownerList(this.params).then((res) => {
        this.config_list_data = res.data.data;
        this.params.data_count = res.data.total;
      });
    },
  },
};
</script>

<style lang="less" module>
  @import '../../less/public_variable.less';
  .label {
    font-size: 16px;
  }
</style>
<style lang="less">
  @import '../../less/public_variable.less';
.applica_form {
  padding: 0 20px 0 20px;
  .el-form-item {
    margin: 0;
  }
}
</style>
