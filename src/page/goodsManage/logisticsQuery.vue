<template>
  <div class="logistics-box">

    <div class="main-content-box main-box">
      <div class="search">
          <el-input v-model="express_num" :class="$style.queryinput"></el-input>
          <el-button
            :disabled="!express_num"
            type="primary"
            @click="getTrack(express_num)">查询</el-button>
          <p :class="$style.example">示例:&nbsp;&nbsp;EUON329T844</p>
      </div>
      <div class="steps">
        <div style="height: 300px;">
          <el-steps
            direction="vertical"
            :active="1"
            :align-center="true"
            style="margin: 50px 0 0 100px;">
            <!-- <el-step
              v-for="item in listdata"
              :title="item.time"
              :description="item.context"
              :key="item.id">
            </el-step> -->
            <el-step title="2017.07.09 09:55  星期天" description="已签收"></el-step>
            <el-step title="2017.07.08 09:55  星期六" description="到达锦和园啦"></el-step>
            <el-step title="2017.07.07 09:55  星期五" description="离开麓谷企业广场啦"></el-step>
            <el-step title="2017.07.06 09:55  星期四" description="发货啦"></el-step>
          </el-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      express_num: '',
      listdata: [],
    };
  },
  created() {
  },
  methods: {
    getTrack() {
    },
  },
};
</script>

<style module>
.queryinput {
  max-width: 350px;
  margin: 40px 0 0px 20px;
}
.example {
  margin: 10px 20px;
}
</style>
