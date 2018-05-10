<template>
  <page-model title="注册">
    <el-form :rules="registerRules" ref="refelogin" :model="form" :class="$style.input_item">
      <el-form-item  class="login_model_form" prop="email">
        <el-input placeholder="请输入邮箱" v-model="form.email" size="small">
        </el-input>
      </el-form-item>
      <el-form-item :class="$style.item_password" class="login_model_form" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password" size="small">
        </el-input>
      </el-form-item>
      <el-form-item :class="$style.item_password" class="login_model_form" prop="password">
        <el-input
        type="password"
        placeholder="请再次输入密码"
        v-model="form.password_confirmation"
        size="small">
        </el-input>
      </el-form-item>
      <el-form-item class="user_login_button">
        <el-button type="primary" @click="goRegister">完成注册</el-button>
      </el-form-item>
    </el-form>
    <span slot="bottom_text" @click="$router.go(-1)">返回登录</span>
  </page-model>
</template>
<script>
import $http from '@/api';
import PageModel from './components/page_model';

export default {
  components: {
    PageModel,
  },
  data() {
    return {
      form: {
        email: '', // 用户邮箱
        password: '', // 密码
        password_confirmation: '', // 重复密码
      },
      registerRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
        ],
        password: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    goRegister() {
      $http.register(this.form).then(() => {
        this.$notify({
          title: '注册成功',
          message: '请在邮件中激活此账号',
          type: 'success',
        });
        this.$router.push({
          name: 'login',
        });
      });
    },
  },
};
</script>
<style module lang="less">
@import './less/login_style.less';
</style>
