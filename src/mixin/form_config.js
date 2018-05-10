export default {
  methods: {
    successTips(is) {
      this.$message({
        message: !is ? '添加成功' : '修改成功',
        type: 'success',
      });
      this.$router.go(-1);
    },
    errorTips(is) {
      this.$message({
        message: !is ? '添加失败' : '修改失败',
        type: 'error',
      });
    },
  },
};
