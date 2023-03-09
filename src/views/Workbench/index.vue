<template>
  <CollapseMenu />
  <div class="workbench-wrap">
    <el-container>
      <el-header>
        <WorkbenchTopMenu />
      </el-header>
      <el-container>
        <div class="body-wrap">
          <el-tabs v-model="activeName" class="elTab-wrap" type="card" @tab-click="handleClick">
            <el-tab-pane name="overview">
              <template #label>
                <span class="custom-tabs-label">
                  <el-icon><calendar /></el-icon>
                  <span>概览</span>
                </span>
              </template>
              <Overview />
            </el-tab-pane>
            <el-tab-pane name="resourceManagement">
              <template #label>
                <span class="custom-tabs-label">
                  <el-icon><TrendCharts /></el-icon>
                  <span>资源管理</span>
                </span>
              </template>
              <ResourceManagement />
            </el-tab-pane>
            <el-tab-pane name="third">
              <template #label>
                <span class="custom-tabs-label">
                  <el-icon><Ticket /></el-icon>
                  <span>运维管理</span>
                </span>
              </template>
              <div class="cloud-alarm">
                <el-card style="height: 35vh; width: 100%; margin-bottom: 20px">
                  <div class="cloud-alarm-title">
                    <span>运维安全概览</span>
                  </div>
                  <div class="cloud-alarm-body">
                    <div class="cloud-alarm-left">
                      <el-progress type="dashboard" :percentage="80" :width="150" status="success">
                        <template #default="{ percentage }">
                          <span class="percentage-value">{{ percentage }}</span>
                          <el-tag class="percentage-label" type="success" effect="plain">无风险</el-tag>
                        </template>
                      </el-progress>
                      <div class="percentage-tip">
                        <span>更新时间：</span>
                        <span>2022/11/11 16:40:59</span>
                      </div>
                    </div>
                    <div class="cloud-alarm-right">
                      <div class="cloud-alarm-top">
                        <div class="item-div">
                          <span class="number">0</span>
                          <div class="text">威胁告警</div>
                        </div>
                        <div class="item-div">
                          <span class="number">0</span>
                          <div class="text">资产漏洞</div>
                        </div>
                        <div class="item-div">
                          <span class="number">0</span>
                          <div class="text">基线风险</div>
                        </div>
                      </div>
                      <div class="suggest-label">恭喜您，您的设备当前安全状况良好。</div>
                      <div class="btn-div">
                        <el-button type="primary" plain>重新检测</el-button>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
              <div class="OperationandMaintenanceManagement">
                <el-card style="height: 35vh; width: 49%">
                  <div class="operationan-title">
                    <span>云监控</span>
                    <span class="operationan-regionName">【陶然亭】</span>
                  </div>
                  <div class="operationan-items">
                    <div class="operationan-item">
                      <span>告警中</span>
                      <span>0</span>
                    </div>
                    <div class="operationan-item">
                      <span>数据不足</span>
                      <span>0</span>
                    </div>
                    <div class="operationan-item">
                      <span>近7天告警总次数</span>
                      <span>0</span>
                    </div>
                  </div>
                </el-card>
                <el-card style="height: 35vh; width: 49%">
                  <div class="operationan-title">
                    <span>ESC资源监控</span>
                  </div>
                  <div class="esc-wrap">
                    <div class="cpu-item">
                      <div class="cpu-item-title">
                        <span>CPU使用率</span>
                        <span>0%</span>
                      </div>
                      <div>
                        <el-progress :text-inside="false" :show-text="false" type="line" :stroke-width="20" status="exception" style="width: 100%; height: 10px" />
                      </div>
                    </div>
                    <div class="ecs-target-item">
                      <span>磁盘读取率</span>
                      <div class="line"></div>
                      <span>0 KB/S</span>
                    </div>
                    <div class="ecs-target-item">
                      <span>网络流入速率</span>
                      <div class="line"></div>
                      <span>0 Kbit/S</span>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane name="fourth">
              <template #label>
                <span class="custom-tabs-label">
                  <el-icon><List /></el-icon>
                  <span>安全中心</span>
                </span>
              </template>
              <el-card style="height: 78vh"> 安全中心 </el-card>
            </el-tab-pane>
            <el-tab-pane name="navigationManage" v-if="username === 'admin'">
              <template #label>
                <span class="custom-tabs-label">
                  <el-icon><Promotion /></el-icon>
                  <span>导航管理</span>
                </span>
              </template>
              <!-- <el-card style="height: 78vh"> -->
              <NavigationManagement />
              <!-- </el-card> -->
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { Calendar, TrendCharts, Ticket, List, Promotion } from '@element-plus/icons-vue'
import WorkbenchTopMenu from './components/WorkbenchTopMenu.vue'
import ResourceManagement from '../resourceManagement/index.vue'
import Overview from './components/Overview.vue'
import CollapseMenu from '@/components/CollapseMenu.vue'
import NavigationManagement from '../navigationManagement/index.vue'

const username = JSON.parse(localStorage.getItem('userInfo')).role
const activeName = ref('overview')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

onMounted(() => {
  console.log(`output->username`, username)
})
</script>

<style lang="scss" scoped>
.workbench-wrap {
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  .el-header {
    z-index: 200;
    --el-header-padding: 0 0px;
    height: 50px;
  }
  .el-container {
    height: calc(100vh - 50px);
  }
  .body-wrap {
    width: 100vw;
    margin-top: 52px;
    background-color: #eef0f5;
    padding: 15px;
    margin-left: 47px;
  }
}
.body-wrap::before {
  content: '';
  transition: opacity 0.4s ease-out;
  display: block;
  opacity: 1;
  width: 100%;
  height: 187px;
  background-image: url('https://cloudcache.tencentcs.com/qcloud/tea/app/overview.b7e9453acd02d3b41e82dcd390be777c.png');
  background-size: auto 100%;
  background-repeat: repeat;
  background-position: top;
  background-color: #f3f4f7;
  position: absolute;
  top: 50px;
  left: 0;
}
.cloud-alarm {
  .cloud-alarm-title {
    font-size: 18px;
    color: #252b3a;
    font-weight: 800;
    margin-right: 5px;
    margin-bottom: 30px;
  }
  .cloud-alarm-body {
    display: flex;
    padding: 0 40px;
    .cloud-alarm-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 40%;
      .percentage-value {
        display: block;
        margin-top: 10px;
        font-size: 40px;
        color: #67c23a;
      }
      .percentage-label {
        margin-top: 15px;
        font-size: 14px;
      }
      .percentage-tip {
        font-size: 12px;
      }
    }
    .cloud-alarm-right {
      width: 60%;
      .cloud-alarm-top {
        display: flex;
        .item-div {
          width: 33%;
          border-left: 1px dashed #d1d6e4;
          height: 52px;
          padding: 0 10px;
          .number {
            font-size: 24px;
            color: #252b3a;
            line-height: 36px;
            border-bottom: 0.5px solid #dfe1e6;
            margin-top: -8px;
            margin-bottom: 8px;
            display: inline-table;
          }
          .text {
            font-size: 12px;
            color: #575d6c;
            line-height: 18px;
          }
        }
      }
      .suggest-label {
        font-size: 14px;
        color: #252b3a;
        margin: 25px 0;
        height: 40px;
      }
      .btn-div {
        font-size: 12px;
      }
    }
  }
}
.OperationandMaintenanceManagement {
  display: flex;
  justify-content: space-between;
  .operationan-title {
    font-size: 18px;
    color: #252b3a;
    font-weight: 800;
    margin-right: 5px;
    margin-bottom: 30px;
    .operationan-regionName {
      font-size: 14px;
      line-height: 20px;
      color: #8a8e99;
    }
  }
  .operationan-items {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 20px;
    .operationan-item {
      display: flex;
      justify-content: space-between;
      height: 40px;
      margin-top: 10px;
      box-sizing: border-box;
      line-height: 40px;
      font-size: 14px;
      border-radius: 2px;
      cursor: pointer;
      border-bottom: 1px dashed #dfe1e6;
    }
  }
  .esc-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
    padding: 0 20px;
    .cpu-item {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-bottom: 10px;
      box-sizing: border-box;
      line-height: 40px;
      font-size: 14px;
      border-radius: 2px;
      height: 40px;
    }
    .cpu-item-title {
      display: flex;
      justify-content: space-between;
      // margin-bottom: 5px;
    }
    .ecs-target-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 40px;
      // margin-top: 15px;
      font-size: 14px;
      .line {
        height: 0;
        width: 100%;
        border-bottom: 1px dashed #dfe1e6;
        flex: 1;
        margin: 0 30px;
      }
    }
  }
}
</style>

<style lang="scss">
.cpu-item {
  .el-progress-bar .el-progress-bar__outer {
    height: 10px !important;
  }
}

.workbench-wrap {
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-color: #ffffff;
  }
}
.elTab-wrap {
  .el-tabs__item:hover {
    color: #409eff;
  }

  .el-tabs__item.is-active {
    color: #409eff;
  }

  .el-tabs__item {
    font-size: 15px;
    color: #fff;
  }
  .custom-tabs-label .el-icon {
    vertical-align: middle;
  }
  .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }
}
</style>
