<template>
<div class="storeManage">
  <mdoel-form :colValue="20">
    <el-form slot="left" label-width="120px">
      <label :class="$style.label"> 基本信息 </label>
      <el-form-item label="入库仓库">
        <el-select v-model="form.warehouse_id">
          <el-option
            v-for="item in boundList"
            :label="item.name_cn"
            :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入库单分类">
        <el-select v-model="form.type_id">
          <el-option
            v-for="item in batchTypeList"
            :label="item.name"
            :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入库单编号">
        <el-input v-model="form.batch_code" size="small"></el-input>
       </el-form-item>
      <el-form-item label="确认单编号">
        <el-input v-model="form.confirmation_number" size="small"></el-input>
      </el-form-item>
      <el-form-item label="供应商">
        <el-select v-model="form.distributor_id">
          <el-option
            v-for="item in distributorList"
            :label="item.name_cn"
            :value="item.id" :key="item.id">
          </el-option>
        </el-select>
        <el-button @click="onDistributor">供应商管理</el-button>
      </el-form-item>

      <label :class="$style.label"> 待入库商品清单 </label>
        <el-button @click="showDialog">选择商品</el-button>
      <el-table
        :data="goodsList"
        border style="width: 100%;margin: 20px 0 20px 100px;">
        <el-table-column
          type="index"
          label="#">
        </el-table-column>
        <el-table-column label="中文名称" prop="name_cn">
        </el-table-column>
        <el-table-column label="入库数量*(个)" width="150px;">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.need_num"
              :min="1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="每箱件数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.pieces_num"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="供应商货号*">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.distributor_code"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="removeGoods(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <label :class="$style.label"> 选填信息 </label>
      <el-form-item label="运输方式">
        <el-select v-model="form.transportation_type">
          <el-option
            v-for="item in expressList"
            :label="item.name"
            :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运单号">
        <el-input v-model="form.waybill_number" size="small"></el-input>
      </el-form-item>
      <el-form-item label="预计入库时间">
        <div class="start-time">
          <el-col :span="10"
          style="padding:0;">
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              size="small">
            </el-date-picker>
          </el-col>
          <!-- <el-col class="line" :span="2">-</el-col> -->
          <el-col :span="6" style="padding:0;">
            <el-time-select
              v-model="startTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:30'
              }"
              placeholder="开始时间"
              size="small">
            </el-time-select>
            </el-col>
          </div>
          <div class="start-time">
          <el-col :span="10"
          style="padding:0;">
            <el-date-picker
              v-model="endDate"
              type="date"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              size="small">
            </el-date-picker>
          </el-col>
          <!-- <el-col class="line" :span="2">-</el-col> -->
          <el-col :span="6" style="padding:0;">
            <el-time-select
              v-model="endTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:30'
              }"
              placeholder="结束时间"
              size="small">
            </el-time-select>
            </el-col>
          </div>
      </el-form-item>
      <el-form-item label="商品备注">
        <el-input
          v-model="form.remark"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSave"
          :loading="$store.state.config.button_loading">提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </mdoel-form>

  <!-- 待入库商品清单弹框 -->
    <el-dialog
      title="选择商品"
      width="80%"
      :visible.sync="goodsDialog"
      :show-close="false"
      :before-close="handleClose">

      <el-table
        ref="table"
        border
        :data="goods"
        style="width: 100%"
        :row-style="{cursor: 'pointer'}">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.specs"
              border
              @row-click="rowClickGoods">
              <el-table-column
                width="55">
                <template slot-scope="scope">
                  <label class="el-checkbox">
                    <span
                      class="el-checkbox__input"
                      :class="scope.row.checked && 'is-checked'">
                      <span class="el-checkbox__inner"></span>
                    </span>
                  </label>
                </template>
              </el-table-column>
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
            </el-table>
          </template>
        </el-table-column>

        <el-table-column
          label="商品中文名称"
          prop="name_cn">
        </el-table-column>
        <el-table-column
          label="商品英文名称"
          prop="name_en">
        </el-table-column>
      </el-table>

      <button-pagination :pageParams="params"></button-pagination>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="confirmSelected"
          :loading="$store.state.btn_loading"
          :disabled="!goodsSelected.length">
          提交
        </el-button>
        <el-button @click="handleClose()">取消</el-button>
      </span>

    </el-dialog>

    <!-- 供应商管理弹窗 -->
    <el-dialog
      title="供应商管理"
      :visible.sync="distributorListShow"
      width="50%">
      <div class="utils" :class="$style.distributorUtil">
        <el-button type="primary" @click="addDistributor" size="mini">添加</el-button>
      </div>

      <el-table :data="distributorList" border style="width: 100%">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="name_cn" label="供应商名称">
        </el-table-column>
        <el-table-column prop="name_en" label="供应商英文名称">
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="distributorEdit(scope.row)"
              type="primary"
              size="mini"
              plain>
              修改
            </el-button>
            <el-button
              @click="distributorDelete(scope.row.id)"
              type="danger"
              size="mini"
              plain>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 新增供应商弹窗 -->
    <el-dialog
      :visible.sync="distributorEditShow"
      @close="cancelDistributor"
      width="40%">
      <el-row :gutter="20" :class="$style.distributorEdit">
        <el-col :span="5">供应商名称</el-col>
        <el-col :span="10">
          <el-input v-model="distributorInfo.name_cn"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">英文名称</el-col>
        <el-col :span="10">
          <el-input v-model="distributorInfo.name_en"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDistributor">取消</el-button>
        <el-button
          type="primary"
          @click="onDistributorSave">提交</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import MdoelForm from '@/components/form';
import getListData from '@/mixin/list';
import mixin from '@/mixin/form_config';
import $http from '@/api';
import buttonPagination from '@/components/pagination_and_buttons';

export default {
  components: {
    MdoelForm,
    buttonPagination,
  },
  mixins: [getListData, mixin],
  data() {
    return {
      form: {
        warehouse_id: '',
        type_id: '',
        batch_code: '',
        confirmation_number: '',
        distributor_id: '',
        remarks: '',
        transportation_type: '',
        waybill_number: '',
      },
      startDate: '',
      startTime: '',
      endTime: '',
      endDate: '',
      expressList: [
        { name: '海运', id: 1 },
        { name: '空运', id: 2 },
        { name: '快递', id: 3 },
        { name: '自行送货', id: 4 },
      ],
      batchTypeList: [], // 入库单分类
      boundList: [], // 入库仓库
      goodsList: [], // 选中商品列表
      goods: [], // 弹出框商品列表
      goodsSelected: [], // 弹出框选中商品
      goodsDialog: false, // 待入库商品弹出框
      distributorList: [], // 供应商列表
      distributorListShow: false, // 供应商列表对话框
      distributorEditShow: false, // 供应商编辑对话框
      isDistributorEdit: false, // 供应商编辑还是新增
      distributorInfo: {},
      distributorParams: {},
    };
  },
  created() {
    this.getBatchTypeList();
    this.getBoundList();
    this.getDistributorList();
  },
  computed: {
    ownerId() {
      return this.$store.state.token.id;
    },
  },
  methods: {
    nothing() {},
    // 拉取入库分类列表
    getBatchTypeList() {
      const typeParams = {
        page: 1,
        page_size: 100,
      };
      $http.batchType(typeParams).then((res) => {
        this.batchTypeList = res.data.data;
      });
    },
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
    // 待入库商品弹出框
    showDialog() {
      this.goodsDialog = true;
      this.params.page = 1;
      this.params.keyword = '';
      this.getList();
    },
    // 拉取待入库商品列表
    getList() {
      // this.params = {
      //   page: 1,
      //   page_size: 10,
      //   status: 0,
      // };
      this.goods = [];
      $http.goodsList(this.params).then((res) => {
        this.arr = this.goodsSelected.length ? this.goodsSelected : [...this.goodsList];
        this.goodsSelected = this.arr;
        this.goods = res.data.data;
        this.params.data_count = res.data.total;
        for (const row of this.goodsSelected) {
          this.goods.forEach((data) => {
            if (Number(row.product_id) === Number(data.id)) {
              data.specs.forEach((subdata) => {
                if (Number(row.id) === Number(subdata.id)) {
                  subdata.checked = true;
                }
              });
            }
          });
        }
      });
    },
    // 商品列表行点击
    rowClickGoods(row) {
      this.$set(row, 'checked', !row.checked);
      if (row.checked) {
        // eslint-disable-next-line
        this.goodsSelected.some(item => item.id === row.id) || this.goodsSelected.push(row);
        return;
      }
      this.goodsSelected = this.goodsSelected.filter(item => +item.id !== +row.id);
    },
    // 选择商品弹框确认
    confirmSelected() {
      this.goodsList = [...this.goodsSelected];
      this.handleClose();
    },
    // 选择商品弹框关闭
    handleClose() {
      this.goodsSelected = [];
      // this.page_params.keyword = '';
      this.goodsDialog = false;
    },
    // 删除已选择商品
    removeGoods(index) {
      this.goodsList.splice(index, 1);
    },
    // 入库单提交
    onSave() {
      this.items = [];
      // eslint-disable-next-line
      for (const item of this.goodsList) {
        this.items.push({
          id: item.product_id,
          spec_id: item.id,
          relevance_code: item.relevance_code,
          need_num: item.need_num,
          pieces_num: item.pieces_num || '',
          distributor_code: item.distributor_code,
          remark: item.remark || '',
        });
      }
      console.log(this.items);
      // this.form.distributor_id = 1;
      this.form.product_stock = this.items;
      if (this.startDate && this.startTime && this.endDate && this.endTime) {
        this.form.plan_time = `${this.startDate} ${this.startTime}:00`;
        this.form.over_time = `${this.endDate} ${this.endTime}:00`;
      }
      $http.inboundAdd(this.form).then(() => {
        this.successTips();
      });
    },
    // 供应商管理弹出框
    onDistributor() {
      this.distributorListShow = true;
      this.getDistributorList();
    },
    // 供应商列表
    getDistributorList() {
      $http.distributorList().then((res) => {
        this.distributorList = res.data.data;
      });
    },
    // 删除供应商
    distributorDelete(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        $http.distributorDel({
          distributor_id: id,
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.getDistributorList();
        });
      });
    },
    // 保存供应商
    onDistributorSave() {
      this.distributorParams = {
        name_cn: this.distributorInfo.name_cn,
        name_en: this.distributorInfo.name_en,
      };
      if (this.isDistributorEdit) this.distributorParams.distributor_id = this.distributorInfo.id;
      $http.distributorAdd(this.distributorParams, this.isDistributorEdit).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        });
        this.getDistributorList();
        this.distributorEditShow = false;
      });
    },
    // 新增供应商弹出框
    addDistributor() {
      this.distributorEditShow = true;
      this.isDistributorEdit = false;
    },
    // 编辑供应商弹出框
    distributorEdit(row) {
      this.distributorEditShow = true;
      this.isDistributorEdit = true;
      this.distributorInfo = Object.assign({}, row);
    },
    // 取消新增供应商
    cancelDistributor() {
      this.distributorEditShow = false;
      this.distributorInfo.name_en = '';
      this.distributorInfo.name_cn = '';
    },
  },
};
</script>

<style lang="less" module>
@import '../../less/public_variable.less';
.label {
  font-size: 18px;
}
.distributorUtil {
  text-align: right;
  margin-bottom: 20px;
}
.distributorEdit {
  margin-bottom: 20px;
}
</style>
