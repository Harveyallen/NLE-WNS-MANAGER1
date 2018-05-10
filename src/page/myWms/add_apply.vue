<template>
  <div :class="$style.authentication_form">
    <mdoel-form>
      <el-form slot="left" label-width="120px">
        <label :class="$style.label"> 基本信息 </label>
        <el-form-item label="公司中文名称">
          <el-input v-model="form.company_name_cn" size="small"></el-input>
        </el-form-item>
        <el-form-item label="公司英文名称">
          <el-input v-model="form.company_name_en" size="small"></el-input>
        </el-form-item>
        <el-form-item label="KVK商会注册码">
          <el-input v-model="form.kvk_code" size="small"></el-input>
        </el-form-item>
        <el-form-item label="VAT号码">
          <el-input v-model="form.vat_code" size="small"></el-input>
        </el-form-item>
        <el-form-item label="电话时区">
          <el-select v-model="form.phone_codes" size="small">
            <el-option value="NL" label="0081"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.phone" size="small"></el-input>
        </el-form-item>
        <label :class="$style.label"> 地址信息 </label>
        <el-form-item label="国家">
          <el-select v-model="form.country" size="small">
            <el-option value="NL" label="nl"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="form.postcode" size="small"></el-input>
        </el-form-item>
        <el-form-item label="门牌号">
          <el-input v-model="form.door_no" size="small"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="form.city" size="small"></el-input>
        </el-form-item>
        <el-form-item label="街道">
          <el-input v-model="form.street" size="small"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="save" type="primary">创建仓库</el-button>
        </el-form-item>
      </el-form>
    </mdoel-form>

    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      :before-close="() => false"
      width="40%"
      top="24vh">
      <h1>认证请求发送成功！</h1>
      <p :class="$style.dialog_text">
        您的<span :class="$style.red_text">创建仓库</span>认证请求已发送成功！
        我们的工作人员会尽快审核您的认证请求。您可以在
        审核结果出来我们会马上<span :class="$style.green_text">发送邮件到您的登陆邮箱</span>。您也可以登
        陆系统在我的认证中随时查看审核动态。
      </p>
      <div :class="$style.success">
        <el-button type="success" @click="$router.push({
          name: 'home',
        })">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $http from '@/api';
import MdoelForm from '@/components/form';

export default {
  data() {
    return {
      form: {
        company_name_cn: '', // 公司名称
        company_name_en: '', // KVK商会注册码
        kvk_code: '', // VAT号码
        vat_code: '', // 电话时区
        phone: '', // 电话号码
        country: '', // 国家
        postcode: '', // 邮政编码
        door_no: '', // 门牌号
        city: '', // 城市
        street: '', // 街道
      },
      dialogVisible: false,
    };
  },
  components: {
    MdoelForm,
  },
  methods: {
    save() {
      $http.rentersApply(this.form).then(() => {
        this.dialogVisible = true;
      });
    },
  },
};
</script>

<style lang="less" module>
  @import '../../less/public_variable.less';
  .authentication_form {
    h1 {
      text-align: center;
    }
    .label {
      font-size: 18px;
    }
    .avatar_uploader {
      margin-top: 10px;
    }
    .dialog_text {
      width: 70%;
      margin: 0 auto;
      text-indent: 20px;
      border: 1px solid @textColor;
      padding: 20px;
      margin-top: 20px;
      .red_text {
        color: @red;
      }
      .green_text {
        color: #67c23a;
      }
    }
    .success {
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
