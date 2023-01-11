<template>
  <el-menu default-active="" class="elMenu-wrap" :collapse="isCollapse && !isShowCard" @select="handleSelect" @mouseenter="handleOpen" @mouseleave="handleClose">
    <el-menu-item index="prodandserver" class="mainMenu" @mouseenter.native="openMenu">
      <el-icon><Grid /></el-icon>
      <template #title>
        <span>产品与服务</span>
        <el-icon class="arrowRight"><ArrowRight /></el-icon>
      </template>
    </el-menu-item>
    <el-menu-item index="netpts">
      <el-icon><Monitor /></el-icon>
      <template #title>性能压测</template>
    </el-menu-item>
    <el-menu-item index="apitest">
      <el-icon><Suitcase /></el-icon>
      <template #title>接口测试</template>
    </el-menu-item>
    <el-menu-item index="Agile">
      <el-icon><Position /></el-icon>
      <template #title>敏捷测试</template>
    </el-menu-item>
    <el-menu-item index="netforum">
      <el-icon><Notebook /></el-icon>
      <template #title>信安知识库</template>
    </el-menu-item>
    <el-menu-item index="netcmt">
      <el-icon><Platform /></el-icon>
      <template #title>信安云网管</template>
    </el-menu-item>
    <el-menu-item index="netapv">
      <el-icon><TrendCharts /></el-icon>
      <template #title>APV自动化</template>
    </el-menu-item>
  </el-menu>
  <el-card v-show="isShowCard" body-style="{ padding: '60px' }" :style="{ height: height }" class="right-menu">
    <template #header>
      <el-input v-model="filter" style="width: 80%" placeholder="请输入服务名称"></el-input>
      <el-icon class="closeButton" @click="handleCloseCard"><Close /></el-icon>
    </template>
    <el-row class="row">
      <el-col :span="8">
        <span class="span-title">测试开发服务</span>
        <div class="button" v-for="(item, index) in testData" :key="index">
          <el-button style="margin-top: 5px" text @click="goTo(item.value)">{{ item.label }}</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <span class="span-title">监控与运维</span>
        <div class="button" v-for="(item, index) in monitorData" :key="index">
          <el-button style="margin-top: 5px" text @click="goTo(item.value)">{{ item.label }}</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <span class="span-title">数据服务</span>
        <div class="button" v-for="(item, index) in dataServices" :key="index">
          <el-button style="margin-top: 5px" text @click="goTo(item.value)">{{ item.label }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="8">
        <span class="span-title">安全服务</span>
        <div class="button" v-for="(item, index) in securityData" :key="index">
          <el-button style="margin-top: 5px" text @click="goTo(item.value)">{{ item.label }}</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <span class="span-title">测试工具</span>
        <div class="button" v-for="(item, index) in toolData" :key="index">
          <el-button style="margin-top: 5px" text @click="goTo(item.value)">{{ item.label }}</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <span class="span-title">容器与虚拟机服务</span>
        <div class="button" v-for="(item, index) in containerData" :key="index">
          <el-button style="margin-top: 5px" text @click="goTo(item.value)">{{ item.label }}</el-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Grid, Monitor, ArrowRight, Close, Suitcase, Platform, Notebook, Position, TrendCharts } from '@element-plus/icons-vue'

const isCollapse = ref(true)
const isShowCard = ref(false)
const filter = ref('') // 搜索
const height = window.innerHeight - 52 + 'px' // 高度

// 测试模块
const testData = ref([
  {
    value: 'netpts',
    label: '性能测试'
  },
  {
    value: 'apitest',
    label: '接口测试'
  },
  {
    value: 'Agile',
    label: '敏捷测试'
  },
  {
    value: 'netapv',
    label: 'APV自动化'
  },
  {
    value: 'netpoc',
    label: 'POC自动化'
  }
])
// 监控与运维服务
const monitorData = ref([
  {
    value: 'netcmt',
    label: '信安云网管'
  },
  {
    value: 'netmonitor',
    label: '监控服务'
  },
  {
    value: 'netcfg',
    label: '混沌演练平台'
  }
])
const dataServices = ref([
  {
    value: 'netforum',
    label: '信安知识库'
  },
  {
    value: 'netevaluate',
    label: '度量分析'
  }
])
// 容器与虚拟机服务
const containerData = ref([
  {
    value: 'container',
    label: '容器镜像服务'
  },
  {
    value: 'container',
    label: '容器服务'
  },
  {
    value: 'vm',
    label: '虚拟机服务'
  }
])
// 安全服务
const securityData = ref([
  {
    value: 'netpt',
    label: '渗透测试服务'
  },
  {
    value: 'netvs',
    label: '漏洞扫描'
  },
  {
    value: 'netdos',
    label: 'DDos高防'
  }
])
// 测试工具
const toolData = ref([
  {
    value: 'cert',
    label: '证书服务'
  }
])

const handleOpen = (key: string, keyPath: string[]) => {
  isCollapse.value = false
}

const handleClose = (key: string, keyPath: string[]) => {
  isCollapse.value = true
}

const openMenu = () => {
  if (isCollapse) {
    setTimeout(() => {
      isShowCard.value = true
    }, 500)
  }
}

const handleCloseCard = () => {
  isShowCard.value = false
}

// 侧边栏响应
const handleSelect = (value: any) => {
  let url = ''
  let console_url = import.meta.env.VITE_BASE_URL
  localStorage.setItem('jwtToken', sessionStorage.getItem('token'))
  url = console_url + '/' + value
  window.location.href = url
}

// 跳转
const goTo = (value: any) => {
  ElMessage({
    type: 'warning',
    message: '暂不支持！！！'
  })
}
</script>

<style lang="scss" scoped>
.elMenu-wrap {
  position: absolute;
  top: 50px;
  left: 0px;
  height: calc(100vh - 50px);
  z-index: 110;
  min-width: 47px;
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -o-transition: width 0.25s;
  --el-menu-base-level-padding: 10px;
  .mainMenu {
    position: relative;
    padding-right: 0px;
    .arrowRight {
      margin-left: 10px;
      font-size: 14px;
    }
    &:after {
      content: ' ';
      width: 82%;
      height: 1px;
      background: #dfe1e6;
      position: absolute;
      bottom: -0.1px;
      left: 50%;
      transform: translateX(-50%); //居中处理
    }
  }
}
.right-menu {
  position: absolute;
  left: 148px;
  top: 50px;
  z-index: 100;
  min-width: 1000px;
  :deep(.el-card__header) {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .row {
    margin-top: 15px;
  }
  .span-title {
    font-weight: 800;
    font-family: '宋体';
  }
  .button {
    margin-top: 5px;
  }
  .closeButton:hover {
    cursor: pointer;
  }
}
</style>
