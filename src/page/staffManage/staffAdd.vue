<template>
<div class="goods_edit">
  <mdoel-form>
      <el-form slot="left" label-width="120px">
        <label :class="$style.label"> 基本信息 </label>
        <el-form-item label="NLE邮箱账户">
          NLE总库
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name_cn" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.name_en" size="small"></el-input>
        </el-form-item>
        <el-form-item label="禁止登录">
          <el-radio v-model="form.isLogin" label="1">是</el-radio>
          <el-radio v-model="form.isLogin" label="2">否</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="$store.state.config.button_loading">提交</el-button>
          <el-button>取消</el-button>
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
        isLogin: false,
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
