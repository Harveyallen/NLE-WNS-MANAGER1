<template>
<div class="storeManage">

    <div class="utils" :class="$style.util">
      <el-button @click="addCommodity" type="primary">添加员工</el-button>
    </div>

    <el-table
      :data="staff_data"
      border
      style="width: 98%;margin:0 auto;">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名（NLE账户邮箱）">
      </el-table-column>
      <el-table-column
        prop="name_cn"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="name_en"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="address"
        label="最后登陆时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template>
          <el-button size="mini">编辑资料</el-button>
        </template>
      </el-table-column>
    </el-table>

</div>
</template>

<script>
// import getListData from '@/mixin';
// import WmsTags from '@/components/wms_tags';
// import MySelect from '@/components/my_select';
// import MyGroup from '@/components/my_group';
// import $http from '@/api';

export default {
  data() {
    return {
      staff_data: [], // 员工列表
    };
  },
  // components: {
  //   WmsTags,
  //   MyGroup,
  //   MySelect,
  // },
  created() {
  },
  computed: {
  },
  methods: {
    addCommodity() {
      this.$router.push({
        name: 'staffAdd',
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
