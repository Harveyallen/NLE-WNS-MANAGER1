<template>
  <mdoel-form>
    <el-form slot="left" label-width="120px">
      <label :class="$style.label"> 基本信息 </label>
      <el-form-item label="中文名称">
        {{form.name_cn}}
      </el-form-item>
      <el-form-item label="英文名称">
        {{form.name_en}}
      </el-form-item>
      <el-form-item label="仓库编号">
        {{form.code}}
      </el-form-item>
      <el-form-item label="仓库类型">
        <el-radio-group :value="form.type">
          <el-radio :label="1">
            自用仓库
          </el-radio>
          <el-radio :label="2">
            公共仓库
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="储存温度">
          <el-radio-group :value="form.temperature">
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
        {{form.area}}
      </el-form-item>
      <label :class="$style.label"> 联系信息 </label>
      <el-form-item label="所属国家">
        {{form.country}}
      </el-form-item>
      <el-form-item label="城市">
        {{form.city}}
      </el-form-item>
      <el-form-item label="邮编">
        {{form.postcode}}
      </el-form-item>
      <el-form-item label="街道">
        {{form.street}}
      </el-form-item>
      <el-form-item label="联系人">
        {{form.contact_user}}
      </el-form-item>
      <el-form-item label="联系电话">
        {{form.contact_number}}
      </el-form-item>
      <el-form-item label="联系邮箱">
        {{form.contact_email}}
      </el-form-item>
      <el-form-item v-if="this.$route.query.type" label="审核状态">
        {{ form.lease_status | statusType}}
      </el-form-item>
      <el-form-item label="是否开通">
        <el-switch
        :value="form.status"
        :active-value="1"
        :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item v-if="!$route.query.type">
        <el-button type="primary"
        :loading="$store.state.config.button_loading"
        @click="goLeaseAudit">
        租赁
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
    goLeaseAudit() {
      this.$router.push({
        name: 'LeaseAudit',
        query: {
          name: this.form.name_en,
          id: this.form.id,
        },
      });
    },
    // 获取仓库单条信息
    getInfo() {
      if (this.$route.query.type) {
        $http.rentersShow(this.$route.query.id).then((res) => {
          this.form = res.data && res.data;
        });
        return;
      }
      $http.WarehouseInfo(this.$route.query.id).then((res) => {
        res.data_id = res.data.id;
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
