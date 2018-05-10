<template>
  <mdoel-form>
    <el-form slot="left" label-width="120px">
      <label :class="$style.label"> 基本信息 </label>
      <el-form-item label="货区编号" :class="$style.avatar_uploader">
        <el-input v-model="form.code" size="small"></el-input>
      </el-form-item>
      <el-form-item label="货区中文名称">
        <el-input v-model="form.name_cn" size="small"></el-input>
      </el-form-item>
      <el-form-item label="货区英文名称">
        <el-input v-model="form.name_en" size="small"></el-input>
      </el-form-item>
      <el-form-item label="储存温度">
        <el-radio-group v-model="form.temperature">
            <el-radio :label="1">
              常温
            </el-radio>
            <el-radio :label="2">
              冷藏
            </el-radio>
            <el-radio :label="3">
              冷冻
            </el-radio>
            <el-radio :label="4">
              不限
            </el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-tooltip :content="isOpenText" placement="top">
          <el-switch
          v-model="is_enabled"
          active-color="#13ce66"
          inactive-color="#ff4949"
          ></el-switch>
        </el-tooltip>
      </el-form-item>
      <label :class="$style.label"> 位置信息</label>
      <el-form-item label="功能分类" :class="$style.avatar_uploader">
        <el-select
          v-model="form.functions"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签">
          <el-option
            v-for="item in functions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
import $http from '@/api';
import mixin from '@/mixin/form_config';

export default {
  components: {
    MdoelForm,
  },
  mixins: [mixin],
  data() {
    return {
      form: {
        code: '', // 货区编号
        name_cn: '', // 货区名称
        temperature: 4, // 储存温度
        is_enabled: 0, // 启用状态
        functions: [], // 功能分类
        remark: '', // 备注
        name_en: '', // 英文名称
        warehouse_id: this.$route.query.id, // 所属仓库id
      },
      is_enabled: true,
      functions: [
        { label: '收货', value: '1' },
        { label: '拣货', value: '2' },
        { label: '备货', value: '3' },
        { label: '集货', value: '4' },
      ],
    };
  },
  computed: {
    isOpenText() {
      let name = '开启';
      if (!this.is_open) {
        name = '关闭';
      }
      return name;
    },
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      console.log(this.$route.query.areaId, 1);
      if (!this.$route.query.areaId) return;
      console.log(this.$route.query.areaId);
      $http.getInfoWarehouseArea(this.$route.query.areaId).then((res) => {
        this.form = res.data;
      });
    },
    onSubmit() {
      this.form.is_enabled = +this.is_enabled;
      $http.addWarehouseArea(this.form).then(() => {
        this.successTips(this.$route.query.areaId);
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
