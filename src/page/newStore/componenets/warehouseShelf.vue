<template>
  <el-table
    :data="shelf_list_data"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="#">
    </el-table-column>
    <el-table-column
      prop="code"
      label="编号">
    </el-table-column>
    <el-table-column
      label="所属货区">
      <template slot-scope="scope">
        {{scope.row.warehouse_area && scope.row.warehouse_area.name_cn}}
      </template>
    </el-table-column>
    <el-table-column
      prop="capacity"
      label="容积（立方米）">
    </el-table-column>
    <el-table-column
      prop="passage"
      label="通道">
    </el-table-column>
    <el-table-column
      prop="col"
      label="排">
    </el-table-column>
    <el-table-column
      prop="row"
      label="列">
    </el-table-column>
    <el-table-column
      prop="floor"
      label="层">
    </el-table-column>
    <el-table-column
      label="启用状态">
      <template slot-scope="scope">
        {{scope.row.is_used | switchTypeCn}}
      </template>
    </el-table-column>
    <el-table-column
      width="260"
      label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
        <el-button  type="danger" @click="del(scope.row.id)" size="mini">删除</el-button>
      </template>
    </el-table-column>
    <pagination-and-buttons :pageParams="params">
    </pagination-and-buttons>
  </el-table>
</template>

<script>
import mixin from '@/mixin/list';
import $http from '@/api';
import PaginationAndButtons from '@/components/pagination_and_buttons';

export default {
  mixins: [mixin],
  data() {
    return {
      shelf_list_data: [],
      params: {
        warehouse_id: this.$route.query.id,
      },
    };
  },
  components: {
    PaginationAndButtons,
  },
  props: ['id'],
  methods: {
    getList() {
      this.params.warehouse_area_id = this.id;
      $http.Warehouseshelf(this.params).then((res) => {
        this.shelf_list_data = res.data.data;
        this.params.data_count = res.data.total;
      });
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log($http);
        $http.delShelf({
          shelf_id: id,
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.getList();
        });
      });
    },
    edit(id) {
      this.$router.push({
        name: 'addCargoShelf',
        query: {
          shelfId: id,
          id: this.$route.query.id,
        },
      });
    },
  },
};
</script>

<style>

</style>
