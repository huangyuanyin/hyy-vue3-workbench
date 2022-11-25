<template>
  <div class="workbench-wrap">
    <el-container>
      <el-header>
        <WorkbenchTopMenu />
      </el-header>
      <el-container>
        <div class="body-wrap">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="概览" name="first">
              <el-card style="height:80vh">
                概览
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="资源管理" name="second" class="resource-wrap">
              <el-card style="height:80vh">
                <div class="my-resource-title">
                  <span class="title">我的资源</span>
                  <span class="cloud-regionName">【全局】</span>
                </div>
                <div class="my-resources-view-resources-tip">部分资源可能会由于未接入服务，而无法在此模块中展示。</div>
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="IP地址" width="180" />
                  <el-table-column prop="name" label="设备信息" width="180" />
                  <el-table-column prop="address" label="容器资源" />
                  <el-table-column prop="address" label="设备资源状态" />
                  <el-table-column prop="address" label="状态" />
                  <el-table-column fixed="right" label="操作" align="center">
                    <template #default="item">
                      <el-button link type="primary" size="small">
                        编辑
                      </el-button>
                      <el-button link type="danger" size="small">
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="运维管理" name="third">
              <div class="cloud-alarm">
                <el-card style="height:35vh;width: 100%;margin-bottom: 20px;">
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
                <el-card style="height:35vh;width: 49%;">
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
                <el-card style="height:35vh;width: 49%;">
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
                        <el-progress :text-inside="false" :show-text="false" type="line" :stroke-width="20"
                          status="exception" style="width: 100%;height:10px;" />
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
            <el-tab-pane label="安全中心" name="fourth">
              <el-card style="height:80vh">
                安全中心
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import WorkbenchTopMenu from './components/WorkbenchTopMenu.vue'

const activeName = ref('first')
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

onMounted(() => {

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
    --el-header-height: 50px;
  }

  .el-container {
    height: 100vh;
  }

  .body-wrap {
    width: 90vw;
    margin: 0 auto;
    margin-top: 52px;
  }
}


.body-wrap::before {
  content: "";
  transition: opacity .4s ease-out;
  display: block;
  opacity: 1;
  width: 100%;
  height: 187px;
  background-image: url("https://cloudcache.tencentcs.com/qcloud/tea/app/overview.b7e9453acd02d3b41e82dcd390be777c.png");
  background-size: auto 100%;
  background-repeat: repeat;
  background-position: top;
  background-color: #f3f4f7;
  position: absolute;
  top: 50px;
  left: 0;
}

.resource-wrap {
  .my-resource-title {
    .title {
      font-size: 18px;
      color: #252B3A;
      font-weight: 800;
      margin-right: 5px;
    }

    .cloud-regionName {
      font-size: 14px;
      line-height: 20px;
      color: #8A8E99;
    }
  }

  .my-resources-view-resources-tip {
    line-height: 30px;
    font-size: 14px;
    color: #8A8E99;
    margin-bottom: 30px;
  }
}

.cloud-alarm {
  .cloud-alarm-title {
    font-size: 18px;
    color: #252B3A;
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
        color: #67C23A;
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
    color: #252B3A;
    font-weight: 800;
    margin-right: 5px;
    margin-bottom: 30px;

    .operationan-regionName {
      font-size: 14px;
      line-height: 20px;
      color: #8A8E99;
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
      border-bottom: 1px dashed #DFE1E6;
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
        border-bottom: 1px dashed #DFE1E6;
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

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border-color: #409eff;
}

.demo-tabs {

  .el-tabs__item:hover {
    color: #409eff;
    border-color: #409eff;
    border-bottom-color: #409eff;
  }

  .el-tabs__item.is-active {
    color: #409eff;
    border-color: #409eff;
    border-bottom-color: #409eff;
  }

  .el-tabs__item {
    font-size: 14px;
    color: #fff
  }

}
</style>