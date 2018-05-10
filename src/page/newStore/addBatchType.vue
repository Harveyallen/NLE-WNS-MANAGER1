<template>
  <mdoel-form>
    <el-form slot="left" label-width="120px">
      <label :class="$style.label"> 基本信息 </label>
      <el-form-item label="入库单分类名称" :class="$style.avatar_uploader">
        <el-input v-model="form.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="is_enabled"></el-switch>
      </el-form-item>
      <label :class="$style.label"> 位置信息（选填） </label>
      <el-form-item label="指定收货区" :class="$style.avatar_uploader">
        <el-select v-model="form.area_id" size="small">
          <el-option
          v-for="item in area_list_data"
          :key="item.id" :value="item.id"
          :label="item.name_cn">
          </el-option>
        </el-select>
      </el-form-item><el-form-item>
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
        name: '', // 名称
        warehouse_id: this.$route.query.id, // 仓库 ID
        area_id: '', // 货区 ID
        is_enabled: '', // 容积
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
    batchTypeId() {
      return this.$route.query.batchTypeId;
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
      $http.shelfInfo(this.$route.query.id).then((res) => {
        this.is_enabled = !!res.data.is_enabled;
        this.form = res.data;
      });
    },
    onSubmit() {
      this.form.is_enabled = +this.is_enabled;
      if (this.batchTypeId) this.form.batch_type_id = this.batchTypeId;
      $http.addBatchType(this.form, this.batchTypeId).then(() => {
        this.successTips(this.batchTypeId);
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
