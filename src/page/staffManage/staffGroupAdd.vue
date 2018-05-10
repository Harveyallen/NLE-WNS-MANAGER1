<template>
<div class="goods_edit">
  <mdoel-form>
      <el-form slot="left" label-width="120px">
        <el-form-item label="当前仓库">
          NLE总库
        </el-form-item>
        <el-form-item label="中文组名">
          <el-input v-model="form.name_cn" size="small"></el-input>
        </el-form-item>
        <el-form-item label="英文组名">
          <el-input v-model="form.name_en" size="small"></el-input>
        </el-form-item>
        <el-form-item label="商品备注">
          <el-input
            v-model="form.remark"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="$store.state.config.button_loading">提交</el-button>
        </el-form-item>
      </el-form>
    </mdoel-form>
</div>
</template>

<script>
import MdoelForm from '@/components/form';
// import $http from '@/api';

export default {
  components: {
    MdoelForm,
  },
  data() {
    return {
      form: {
        name_cn: '',
        name_en: '',
        remark: '',
      },
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="less" module>
@import '../../less/public_variable.less';
.label {
  font-size: 18px;
}
</style>
