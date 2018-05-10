<template>
  <mdoel-form>
    <el-form slot="left" label-width="120px">
      <label :class="$style.label"> 基本信息 </label>
      <el-form-item label="中文名称">
        <el-input v-model="form.name_cn" size="small"></el-input>
      </el-form-item>
      <el-form-item label="英文名称">
        <el-input v-model="form.name_en" size="small"></el-input>
      </el-form-item>
      <el-form-item label="仓库编号">
        <el-input v-model="form.code" size="small"></el-input>
      </el-form-item>
      <el-form-item label="仓库类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="2">
            自用仓库
          </el-radio>
          <el-radio :label="1">
            公共仓库
          </el-radio>
        </el-radio-group>
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
      <el-form-item label="仓库面积">
        <el-input v-model="form.area" size="small">
          <span slot="suffix">平方米</span>
        </el-input>
      </el-form-item>
      <label :class="$style.label"> 联系信息 </label>
      <el-form-item label="所属国家">
        <el-select v-model="form.country" size="small">
          <el-option label="NL" value="NL"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="form.city" size="small"></el-input>
      </el-form-item>
      <el-form-item label="邮编">
        <el-input v-model="form.postcode" size="small"></el-input>
      </el-form-item>
      <el-form-item label="街道">
        <el-input v-model="form.street" size="small"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.contact_user" size="small"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.contact_number" size="small"></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱">
        <el-input v-model="form.contact_email" size="small"></el-input>
      </el-form-item>
      <el-form-item label="是否开通">
        <el-switch
        v-model="status"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
        :loading="$store.state.config.button_loading"
        @click="onSubmit">
        立即创建
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <div slot="right">
      <label :class="$style.label"> 仓库LOGO(选填) </label>
      <!-- <el-upload
        :class="$style.avatar_uploader"
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
    </div>
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
  data() {
    return {
      form: {
        name_cn: '', // 仓库中文
        name_en: '', // 仓库英文
        // owner_id: '', // 创建者用户ID
        type: 1, // 仓库类型
        code: '', // 仓库代码
        country: '', // 国家
        city: '', // 城市
        street: '', // 街道
        postcode: '', // 邮政编码
        status: false, // 状态
        temperature: 4, // 储存温度
        area: '', // 仓库面积
        contact_user: '', // 联系人
        contact_number: '', // 联系电话
        contact_email: '', // 联系邮箱
        logo_photo: '', // logo图片
      },
      status: false,
    };
  },
  computed: {
    // form() {
    //   return {},
    // },
  },
  mixins: [mixin],
  created() {
    if (!this.$route.query.id) return;
    this.getInfo();
  },
  name: 'addStoreManage',
  methods: {
    // 提交创建信息
    onSubmit() {
      this.form.status = +this.status;
      $http.warehousePut(this.form, this.$route.query.id).then((res) => {
        if (res.status === 0) {
          this.successTips(this.$route.query.id);
        }
      });
    },
    // 获取仓库单条信息
    getInfo() {
      $http.WarehouseInfo(this.$route.query.id).then((res) => {
        res.data.status = !!res.data.status;
        res.data.warehouse_id = res.data.id;
        this.form = res.data;
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
