<template>
  <mdoel-form>
    <el-form slot="left" label-width="120px">
      <label :class="$style.label"> 基本信息 </label>
      <el-form-item label="托盘编号" :class="$style.avatar_uploader">
        <el-input v-model="form.code" size="small"></el-input>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-switch v-model="is_enabled"></el-switch>
      </el-form-item>
      <label :class="$style.label"> 位置信息（选填） </label>
        <el-form-item label="容积" :class="$style.avatar_uploader">
        <el-input v-model="form.capacity" size="small"></el-input>
      </el-form-item>
      <el-form-item label="容器重量" :class="$style.avatar_uploader">
        <el-input v-model="form.weight" size="small"></el-input>
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
        code: '', // 托盘代码
        warehouse_id: this.$route.query.id, // 仓库 ID
        capacity: '', // 容积
        weight: '', // 容器重量
        is_enabled: '', // 是否启用
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
    trayId() {
      return this.$route.query.trayId;
    },
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (!this.trayId) return;
      $http.TrayInfo(this.$route.query.trayId).then((res) => {
        this.is_enabled = !!res.data.is_enabled;
        this.form = res.data;
      });
    },
    onSubmit() {
      this.form.is_enabled = +this.is_enabled;
      if (this.trayId) this.form.tray_id = this.trayId;
      $http.addTray(this.form, this.trayId).then(() => {
        this.successTips(this.trayId);
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
