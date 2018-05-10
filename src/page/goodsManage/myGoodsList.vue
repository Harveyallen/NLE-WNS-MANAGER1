<template>
<div class="storeManage">
  <wms-tags>
    <my-group
    v-model="params"
    @submit="getList">
      <el-col :span="4">
        <my-select keyName="params.category_id">
          <el-option
            v-for="item in typeList"
            :label="item.name_cn"
            :value="item.id" :key="item.id">
          </el-option>
        </my-select>
      </el-col>
      <el-col :span="8">
        <my-date :begin.sync="params.created_at_b"
          :end.sync="params.created_at_e"></my-date>
      </el-col>
      <el-col :span="4">
        <my-input keyName="keywords"></my-input>
      </el-col>
      <el-col :span="2" :offset="6">
        <el-button
        type="text"
        @click="$router.push({name: 'goodsAddEdit'})"
        icon="el-icon-plus">
          添加商品
        </el-button>
      </el-col>
    </my-group>
    <el-table
      :data="goods_list_data"
      border
      style="margin:0 auto;">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.specs" border style="width:80%;">
            <el-table-column
              prop="relevance_code"
              label="外部编码">
            </el-table-column>
            <el-table-column
              prop="name_cn"
              label="规格中文名">
            </el-table-column>
            <el-table-column
              prop="name_en"
              label="规格英文名">
            </el-table-column>
            <el-table-column
              prop="net_weight"
              label="净重(g)">
            </el-table-column>
            <el-table-column
              prop="gross_weight"
              label="毛重(g)">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="name"
        label="外部编码">
      </el-table-column> -->
      <el-table-column
        prop="name_cn"
        label="中文名称">
      </el-table-column>
      <el-table-column
        prop="name_en"
        label="英文名称">
      </el-table-column>
      <el-table-column
        prop="category.name_cn"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="updated_at"
        label="最后修改时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editCommodity(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

  <button-pagination :pageParams="params" :lists="btn_list"></button-pagination>

  </wms-tags>
</div>
</template>

<script>
import getListData from '@/mixin/list';
import WmsTags from '@/components/wms_tags';
import MyInput from '@/components/my_input';
import MySelect from '@/components/my_select';
import MyGroup from '@/components/my_group';
import MyDate from '@/components/my_date';
import $http from '@/api';
import buttonPagination from '@/components/pagination_and_buttons';

export default {
  data() {
    return {
      goods_list_data: [], // 商品库列表
      typeList: [], // 分类列表
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
  computed: {
    btn_list() {
      return [
        { name: '反选', method: this.antiSelection },
        { name: '测试', method: this.ceshi },
      ];
    },
  },
  created() {
    this.getTypeList();
  },
  methods: {
    antiSelection() {},
    ceshi() {},
    // 商品分类列表
    getTypeList() {
      $http.categoryList().then((res) => {
        this.typeList = res.data.data;
      });
    },
    // 添加商品
    addCommodity() {
      this.$router.push({
        name: 'goodsAddEdit',
      });
    },
    // 编辑商品
    editCommodity(idVal) {
      this.$router.push({
        name: 'goodsAddEdit',
        query: {
          id: idVal,
        },
      });
    },
    // 获取商品列表
    getList() {
      // this.params.owner_id = this.ownerId;
      $http.goodsList(this.params).then((res) => {
        this.goods_list_data = res.data.data;
        this.params.data_count = res.data.total;
      });
    },
  },
};
</script>
