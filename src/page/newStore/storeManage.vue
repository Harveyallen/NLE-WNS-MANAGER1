<template>
<div class="storeManage">
  <wms-tags
    :tagList="tag_data"
    addText="addStoreManage"
    @change="storeType"
    v-model="params.type">
    <el-table
      :data="store_list_data"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="name_cn"
        label="仓库名称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="仓库编号">
      </el-table-column>
      <el-table-column
        prop="country"
        label="国家">
      </el-table-column>
      <el-table-column
        prop="contact_user"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="contact_number"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="area"
        label="仓库面积(平方米)">
      </el-table-column>
      <el-table-column
        label="仓库类型">
        <template slot-scope="scope">
          {{scope.row.type | storeType}}
        </template>
      </el-table-column>
      <el-table-column
        label="开通状态">
        <template slot-scope="scope">
          {{scope.row.status | switchTypeCn}}
        </template>
      </el-table-column>
      <el-table-column
        prop="apply_num"
        label="申请数量">
      </el-table-column>
      <el-table-column
        label="使用状态">
        <template slot-scope="scope">
          {{scope.row.is_used | switchTypeCn}}
        </template>
      </el-table-column>
      <el-table-column
        width="240px"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row.id)">查看编辑</el-button>
          <el-button size="mini" @click="config(scope.row.id)">基础配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination-and-buttons :pageParams="params">
    </pagination-and-buttons>
  </wms-tags>
</div>
</template>

<script>
import WmsTags from '@/components/wms_tags';
import getListData from '@/mixin/list';
import PaginationAndButtons from '@/components/pagination_and_buttons';
import $http from '@/api';

export default {
  data() {
    return {
      store_list_data: [], // 仓库列表状态
      tag_data: [
        { name: '1', label: '公共仓库' },
        { name: '2', label: '自用仓库' },
      ],
    };
  },
  mixins: [getListData],
  components: {
    WmsTags,
    PaginationAndButtons,
  },
  name: 'storeManage',
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
    // 获取仓库列表
    getList() {
      // this.params.owner_id = this.ownerId;
      $http.warehouse(this.params).then((res) => {
        this.store_list_data = res.data.data;
        this.params.data_count = res.data.total;
      });
    },
    // 编辑仓库
    edit(idVal) {
      this.$router.push({
        name: 'addStoreManage',
        query: {
          id: idVal,
        },
      });
    },
    // 基础配置
    config(idVal) {
      this.$router.push({
        name: 'BasicsConfig',
        query: {
          id: idVal,
        },
      });
    },
  },
};
</script>

<style lang="less" module>
</style>
<style lang="less">
</style>
