<template>
  <mdoel-form>
    <el-form slot="left" label-width="120px">
      <label :class="$style.label"> 基本信息 </label>
      <el-form-item label="货架编号" :class="$style.avatar_uploader">
        <el-input v-model="form.code" size="small"></el-input>
      </el-form-item>
      <el-form-item label="所属货区">
        <el-select v-model="form.warehouse_area_id" size="small">
          <el-option
          v-for="item in area_list_data"
          :key="item.id"
          :value="item.id"
          :label="item.name_cn">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="容积">
        <el-input v-model="form.capacity" size="small">
          <span slot="suffix">平方米</span>
        </el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="is_enabled"></el-switch>
      </el-form-item>
      <label :class="$style.label"> 位置信息（选填） </label>
      <el-form-item label="通道" :class="$style.avatar_uploader">
        <el-input v-model="form.passage" size="small"></el-input>
      </el-form-item>
      <el-form-item label="排">
        <el-input v-model="form.row" size="small"></el-input>
      </el-form-item>
      <el-form-item label="列">
        <el-input v-model="form.col" size="small"></el-input>
      </el-form-item>
      <el-form-item label="层">
        <el-input v-model="form.floor" size="small"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" size="small" rows="3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </mdoel-form>
</template>

<script>
import MdoelForm from '@/components/form';
import mixin from '@/mixin/form_config';
import mixins from '@/mixin/list';
import $http from '@/api';

export default {
  components: {
    MdoelForm,
  },
  mixins: [mixin, mixins],
  data() {
    return {
      form: {
        code: '', // 货架名
        warehouse_id: this.$route.query.id, // 仓库 ID
        warehouse_area_id: '', // 货区 ID
        capacity: '', // 容积
        passage: '', // 通道
        row: '', // 排
        col: '', // 列
        floor: '', // 层
        is_enabled: 0, // 是否启用
        remark: '', // 备注
      },
      is_enabled: true,
      area_list_data: [],
      params: {
        type: '',
        warehouse_id: this.$route.query.id,
      },
    };
  },
  computed: {
    shelfId() {
      return this.$route.query.shelfId;
    },
  },
  methods: {
    getList() {
      $http.warehouseArea(this.params).then((res) => {
        this.area_list_data = res.data.data;
        this.getInfo();
      });
    },
    getInfo() {
      $http.shelfInfo(this.shelfId).then((res) => {
        this.is_enabled = !!res.data.is_enabled;
        this.form = res.data;
      });
    },
    onSubmit() {
      this.form.is_enabled = +this.is_enabled;
      if (this.shelfId) this.form.shelf_id = this.shelfId;
      $http.addWarehouseshelf(this.form, this.shelfId).then(() => {
        this.successTips(this.shelfId);
      });
    },
  },
};
</script>

<style lang="less" module>
  .label {
    font-size: 18px;
  }
  .avatar_uploader {
    margin-top: 10px;
  }
</style>
