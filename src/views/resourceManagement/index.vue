<template>
  <el-card style="height: 80vh" class="resourceManagement-wrap">
    <div class="resource-title">
      <span class="title">我的资源</span>
      <span class="cloud-regionName">【全局】</span>
    </div>
    <div class="resources-view-resources-tip">
      部分资源可能会由于未接入服务，而无法在此模块中展示。
    </div>
    <el-tabs type="border-card" class="resourceManagement-card">
      <el-tab-pane label="资源监控">
        <ResourceMonitor />
      </el-tab-pane>
      <el-tab-pane label="服务监控">
        <ServerMonitor />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ResourceMonitor from "./components/resourceMonitor.vue";
import ServerMonitor from "./components/serverMonitor.vue";
</script>

<style lang="scss" scoped>
.resourceManagement-wrap {
  .resource-title {
    .title {
      font-size: 18px;
      color: #252b3a;
      font-weight: 800;
      margin-right: 5px;
    }

    .cloud-regionName {
      font-size: 14px;
      line-height: 20px;
      color: #8a8e99;
    }
  }
  .resources-view-resources-tip {
    line-height: 30px;
    font-size: 14px;
    color: #8a8e99;
    margin-bottom: 30px;
  }
  :deep(.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active) {
    border-bottom: none !important;
  }
  :deep(.el-tabs__item):hover {
    color: #e4e7ed;
    border-color: #e4e7ed;
  }
}
</style>

<style lang="scss"></style>
