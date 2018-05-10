<template>
  <mdoel-form>
    <el-form slot="left" label-width="120px">
      <el-form-item label="原密码">
        <el-input v-model="form.password_old" type="password" size="small"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.password" type="password" size="small"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码">
        <el-input v-model="form.password_confirmation" type="password" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
        :loading="$store.state.config.button_loading"
        @click="onSubmit">
        立即更改
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </mdoel-form>
</template>

<script>
import MdoelForm from '@/components/form';
import $http from '@/api';

export default {
  components: {
    MdoelForm,
  },
  data() {
    return {
      form: {
        password_old: '', // 原密码
        password: '', // 新密码
        password_confirmation: '', // 新密码
      },
    };
  },
  name: 'editPassword',
  methods: {
    onSubmit() {
      $http.changePwd(this.form).then((res) => {
        if (res.status) return;
        this.$message({
          message: '修改密码成功，请重新登录',
          type: 'success',
        });
        this.$store.commit('token/delToken');
        this.$router.push({
          name: 'login',
        });
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
