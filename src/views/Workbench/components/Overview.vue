<template>
  <div class="Overview-wrap">
    <el-card style="height: 30vh">
      <div class="overview-title">
        <span class="title">我的导航</span>
        <el-tooltip class="box-item" effect="dark" content="您可以通过设置左侧服务列表导航改变我的导航的内容和顺序" placement="right-start">
          <el-button type="primary" text>+添加快捷入口</el-button>
        </el-tooltip>
      </div>
      <div class="my-navigation-buttonList">
        <el-button v-for="(item, index) in buttonList" :key="'buttonList' + index" plain>{{ item.name }}</el-button>
      </div>
      <div class="recentVisit-line"></div>
      <div class="recentVisit">
        <span>最近访问：</span>
        <el-button v-for="(item, index) in visitedList" :key="'visitedList' + index" plain>{{ item.name }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const buttonList = [
  { name: "性能压测", id: "1" },
  { name: "接口测试", id: "1" },
  { name: "敏捷测试", id: "1" },
  { name: "信安知识库", id: "1" },
  { name: "信安云王管", id: "1" },
  { name: "APV自动化", id: "1" },
  { name: "POC测试", id: "1" },
  { name: "待添加1", id: "1" },
  { name: "待添加2", id: "1" },
];

const visitedList = [
  { name: "性能压测", id: "1" },
  { name: "接口测试", id: "1" },
  { name: "敏捷测试", id: "1" },
  { name: "信安知识库", id: "1" },
  { name: "信安云王管", id: "1" },
  { name: "APV自动化", id: "1" },
  { name: "POC测试", id: "1" },
  { name: "待添加1", id: "1" },
  { name: "待添加2", id: "1" },
];
</script>

<style lang="scss" scoped>
.Overview-wrap {
  .overview-title {
    display: flex;
    align-items: center;
    .title {
      font-size: 14px;
      color: #252b3a;
      font-weight: 700;
      margin-right: 5px;
    }
  }
  .my-navigation-buttonList {
    height: calc(100% - 67px);
    min-height: 40px;
    overflow-y: auto;
    .el-button {
      color: #252b3a;
      background-color: #e9edfa;
      height: 38px;
      min-width: 160px;
      width: 18%;
      margin: 20px 20px 0 0;
      justify-content: flex-start;
    }
    .el-button:hover {
      background-color: #beccfa;
      border-color: #beccfa;
    }
  }
  .recentVisit-line {
    background-color: #fff;
    border-top: 1px dashed #dfe1e6;
    margin-top: 20px;
  }
  .recentVisit {
    min-height: 41px;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin-top: 10px;
    span {
      display: inline-block;
      font-size: 14px;
      color: #252b3a;
      font-weight: 700;
    }
    .el-button {
      color: #252b3a;
      background-color: #e9edfa;
      height: 28px;
      max-width: calc(20% - 16.1667px);
      justify-content: flex-start;
    }
    .el-button:hover {
      background-color: #beccfa;
      border-color: #beccfa;
    }
  }
}
</style>
