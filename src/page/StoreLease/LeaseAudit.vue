<template>
  <div class="lease-audit">
    <mdoel-form>
      <el-form slot="left" label-width="150px">
        <label :class="$style.label"> 仓储租赁 </label>
        <el-form-item label="申请用户账号">
          {{form.user_account}}
        </el-form-item>
        <el-form-item label="需要开通仓库">
          {{$route.query.name}}
        </el-form-item>
        <el-form-item label="申请人姓名">
          <el-input v-model="form.application_name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="申请人电话">
          <el-radio-group v-model="form.type">
          <el-input v-model="form.application_phone" size="small"></el-input>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="申请邮箱">
          <el-input v-model="form.application_email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="预计每周发货量(单)">
          <el-input v-model="form.weekly_shipments" size="small"></el-input>
        </el-form-item>
        <el-form-item label="预计每周发货重量(kg)">
          <el-input v-model="form.weekly_weight" size="small"></el-input>
        </el-form-item>
        <label :class="$style.label"> 商品信息 </label>
        <el-form-item label="仓储物品">
          <el-input v-model="form.goods_name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="销售目的国">
          <el-input v-model="form.sell_country" size="small"></el-input>
        </el-form-item>
        <el-form-item label="销售方式">
          <el-input v-model="form.sales_mode" size="small"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button v-if="!$route.query.type" type="primary"
          :loading="$store.state.config.button_loading"
          @click="onSubmit">
          确认租赁
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
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      :before-close="() => false"
      width="40%"
      top="24vh">
      <p :class="$style.dialog_text">租赁申请发送成功！等待仓库产权方审核。
        <br/><br/>您可以在
        <router-link :to="{ name: 'StoreLeases' }">
          仓库租赁-查看申请仓库
          </router-link>
          中关注审核动态
          <br/><br/>
          <el-button type="success" @click="$router.push({
            name: 'StoreLeases',
          })">确定</el-button>
      </p>
    </el-dialog>
  </div>
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
        user_account: '', // 仓库产权方邮箱
        warehouse_name: this.$route.query.name,
        warehouse_id: this.$route.query.id, // 仓库ID
        application_name: '', // 仓库租赁方姓名
        application_phone: '', // 仓库租赁方电话
        application_email: '', // 仓库租赁方电话
        weekly_shipments: '', // 预计每周发货量
        weekly_weight: '', // 预计每周发货重量
        sell_country: '', // 销售目的国
        sales_mode: '', // 销售方式
      },
      status: false,
      dialogVisible: true,
    };
  },
  mixins: [mixin],
  created() {
    this.getInfo();
  },
  name: 'addStoreManage',
  methods: {
    // 提交创建信息
    onSubmit() {
      $http.renters(this.form).then(() => {
        this.dialogVisible = true;
      });
    },
    // 获取仓库单条信息
    getInfo() {
      this.dialogVisible = false;
      $http.account().then((res) => {
        this.form.user_account = res.data.email;
      });
    },
  },
};
</script>

<style lang="less" module>
@import '../../less/public_variable.less';
  .label {
    font-size: 18px;
  }
  .avatar_uploader {
    margin-top: 10px;
  }
  .dialog_text {
    text-align: center;
    font-size: 20px;
    a {
      text-decoration: none;
      color: @red;
    }
  }
</style>
<style lang="less">
  .lease-audit {
    .el-dialog__header {
      display: none;
    }
  }
</style>
