<template>
  <div :class="$style.page_model">
    <div :class="$style.model">
      <div :class="$style.model_left">
        <div :class="$style.left_text">
          <p>欢迎使用</p>
          <p>NLE商家仓库管理系统</p>
        </div>
      </div>
      <div :class="$style.model_right">
        <div :class="$style.right_title">
          {{title}}
        </div>
        <div :class="$style.form">
          <label v-if="lableIshow" :class="$style.form_label">
            EMAIL
          </label>
          <slot></slot>
          <p :class="$style.register_text"><slot name="bottom_text"></slot></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '登录',
    },
    lableIshow: {
      type: Boolean,
      default: false,
    },
  },
  name: 'login',
};
</script>
<style lang="less" module>
  @import '../../../less/public_variable.less';
  .page_model {
    background: @loginColor;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    .model {
      width: 824px;
      height: 406px;
      display: flex;
      flex-flow: row wrap;
      position: absolute;
      top: 50%;
      background: @white;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      .model_left {
        width: 50%;
        height: 406px;
        overflow: hidden;
        background-image: url('../../../assets/img/bg.png');
        position: relative;
        .left_text {
          position: absolute;
          top: 40%;
          left: 30px;
          color: @white;
          transform: translateY(-40%);
          p:nth-child(1) {
            font-size: 24px;
            font-weight: 100;
            margin: 0;
          }
          p:nth-child(2) {
            margin: 0;
            font-size: 36px;
          }
        }
      }
      .model_right {
        position: relative;
        width: 50%;
        height: 406px;
        .right_title {
          text-indent: 26px;
          line-height: 24px;
          border-left: 8px solid @ThemeColor;
          margin-top: 15px;
          font-size: 18px;
        }
        .form {
          padding: 25px;
          margin-top: 55px;
          .form_label {
            color: @ThemeColor;
            font-size: 10px;
          }
          i {
            cursor: pointer;
          }
        }
      }
      .register_text {
        color: @ThemeColor;
        font-size: 18px;
        height: 20px;
        text-align: center;
        cursor: pointer;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>
<style lang="less">
@import '../../../less/public_variable.less';
.login_model_form {
  .el-input__inner {
    border-radius: 0;
    border-color:  @white @white #dcdfe6 @white;
    padding: 0 5px;
  }
}
.user_login_button {
  margin-top: -5px;
  .el-button {
    width: 100%;
    font-size: 18px;
  }
}
</style>
