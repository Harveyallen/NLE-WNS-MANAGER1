<template>
<div class="inventoryManage">

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
      <el-col :span="6" :class="$style.mycheck">
        <el-checkbox v-model="checked">低于库存报警</el-checkbox>
        <el-checkbox v-model="checked">低于保质期</el-checkbox>
      </el-col>
      <el-col :span="4">
        <my-input keyName="type"></my-input>
      </el-col>
      <el-col :span="2" :offset="8">
        <el-button
        type="text"
        @click="importExcel"
        icon="el-icon-plus">
          导出EXCEL
        </el-button>
      </el-col>
    </my-group>
    <el-table
      :data="inventory_data"
      border>
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="name_cn"
        label="中文名称">
      </el-table-column>
      <el-table-column
        prop="name_en"
        label="外部编码">
      </el-table-column>
      <el-table-column
        prop="address"
        label="所在仓库">
      </el-table-column>
      <el-table-column
        prop="address"
        label="入库商品数量">
      </el-table-column>
      <el-table-column
        prop="name_en"
        label="上家商品数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="出库商品数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="当前库存数">
      </el-table-column>
      <el-table-column
        prop="name_en"
        label="入库次数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="上架次数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="出库次数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template>
          <el-button size="mini">出入库记录</el-button>
        </template>
      </el-table-column>
    </el-table>
  </wms-tags>

</div>
</template>

<script>
import getListData from '@/mixin/list';
import WmsTags from '@/components/wms_tags';
import MyInput from '@/components/my_input';
import MySelect from '@/components/my_select';
import MyGroup from '@/components/my_group';
import $http from '@/api';

export default {
  data() {
    return {
      inventory_data: [], // 库存列表
      checked: false,
      boundList: [], // 入库仓库列表
    };
  },
  components: {
    WmsTags,
    MyGroup,
    MySelect,
    MyInput,
  },
  mixins: [getListData],
  created() {
    this.getBoundList();
  },
  computed: {
    ownerId() {
      return this.$store.state.token.id;
    },
  },
  methods: {
    importExcel() {},
    // 获取仓库列表
    getBoundList() {
      const warehouseParams = {
        page: 1,
        page_size: 100,
        owner_id: this.ownerId,
      };
      $http.warehouse(warehouseParams).then((res) => {
        this.boundList = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" module>
@import '../../less/public_variable.less';

.mycheck {
  height: 32px;
  line-height: 32px;
}
</style>
