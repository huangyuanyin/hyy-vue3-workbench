<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-menu default-active="" class="elMenu-wrap" :collapse="isCollapse && !isShowCard" @select="handleSelect" @mouseover.prevent="handleOpen" @mouseleave.once="handleClose">
          <el-menu-item index="prodandserver" class="mainMenu" @mouseenter.native="openMenu" :disabled="true">
            <el-icon><Grid /></el-icon>
            <template #title>
              <span>产品与服务</span>
              <el-icon class="arrowRight"><CaretRight /></el-icon>
            </template>
          </el-menu-item>
          <template v-for="(item, index) in productList" :key="'productList' + index">
            <el-menu-item index="netpts" v-if="item.is_domain">
              <svg-icon iconName="icon-jiekouzhushou" className="icon" style="width: 24px"></svg-icon>
              <template #title>
                <span class="title-name" style="margin-right: 5px">{{ item.name }}</span>
                {{ item.tag }}
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="20" class="server-wrap">
        <el-card v-if="isShowCard" class="right-menu">
          <template #header>
            <div class="header-warp">
              <el-input v-model="filter" placeholder="请输入服务名称"></el-input>
              <el-icon class="closeButton" @click="handleCloseCard"><Close /></el-icon>
            </div>
          </template>
          <div class="server-container" v-for="(item, index) in serverList" :key="'serverList' + index">
            <span class="span-title">{{ item.name }}</span>
            <div class="button" v-for="(it, index) in item.children" :key="'item.children' + index">
              <el-button style="margin-top: 5px" text @click="goTo(it.links)">{{ it.name }}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Grid, Monitor, CaretRight, ArrowRight, Close, Suitcase, MapLocation, Notebook, Position, Film } from '@element-plus/icons-vue'
import { getCategoryApi, getProductApi } from '@/api/navigationManageAPI'
import { emitter } from '@/utils/mitt'

const isCollapse = ref(true)
const isShowCard = ref(false)
const filter = ref('') // 搜索
const serverList = ref([]) // 服务列表
const productList = ref([]) // 产品列表

const handleOpen = (key: string, keyPath: string[]) => {
  isCollapse.value = false
}

const handleClose = (key: string, keyPath: string[]) => {
  isCollapse.value = true
}

const openMenu = () => {
  if (!isCollapse.value) {
    setTimeout(() => {
      isShowCard.value = true
    }, 500)
  }
}

const handleCloseCard = () => {
  isCollapse.value = true
  isShowCard.value = false
}

// 侧边栏响应
const handleSelect = (value: any) => {
  if (value === 'netspace') {
    window.location.href = 'http://10.3.0.160:8090/'
    return
  }
  let url = ''
  let console_url = import.meta.env.VITE_BASE_URL
  localStorage.setItem('jwtToken', sessionStorage.getItem('token'))
  url = console_url + '/' + value
  window.location.href = url
}

// 跳转
const goTo = (value: any) => {
  window.open(value, '_blank')
  localStorage.getItem('linkList') ? '' : localStorage.setItem('linkList', JSON.stringify({ link: JSON.stringify(value) }))
}

const getCategory = async () => {
  const res = await getCategoryApi()
  if (res.code === 1000) {
    serverList.value = res.data || []
  }
}

const getProduct = async () => {
  const res = await getProductApi()
  if (res.code === 1000) {
    productList.value = res.data || []
    handleServerList()
  }
}

const handleServerList = () => {
  // 判断res中的category和serverList中的name是否有重复的，有的话就将res的数据放到serverList中的children中
  serverList.value.forEach((item: any) => {
    productList.value.forEach((item2: any) => {
      if (item.id === item2.category) {
        if (!item.children) {
          item.children = []
        }
        item.children.push(item2)
      }
    })
  })
  console.log(serverList.value)
}

onMounted(() => {
  getCategory()
  getProduct()
  emitter.on('toRefresh', (param) => {
    if (param.isRefresh === 'true') {
      getCategory()
      getProduct()
    }
  })
})
</script>

<style lang="scss" scoped>
.elMenu-wrap {
  position: absolute;
  top: 50px;
  left: 0px;
  height: calc(100vh - 50px);
  z-index: 999990;
  --el-menu-base-level-padding: 10px !important;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  .title-name {
    margin-right: 20px;
  }
  .el-menu-item {
    font-size: 12px !important;
    font-family: '微软雅黑';
  }
  .el-menu-item.is-disabled {
    opacity: 1;
  }
  .el-menu-item.is-disabled:hover {
    cursor: pointer;
  }
  li {
    display: flex;
  }
  .icon {
    width: 22px;
    height: 22px;
    margin-right: 5px;
  }
  .mainMenu {
    position: relative;
    padding-right: 0px;
    .el-icon {
      color: #606266;
    }
    .arrowRight {
      margin-left: 75px;
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
  height: calc(100vh - 52px);
  position: absolute;
  top: 50px;
  z-index: 20000;
  left: 199px;
  min-width: 30%;
  font-size: 16px !important;
  font-family: '微软雅黑';
  :deep(.el-card__header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  :deep(.el-card__body) {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  :deep(.el-card__header) {
    height: 56px;
  }
  .header-warp {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .server-container {
    margin-top: 15px;
    width: 33%;
    .span-title {
      font-weight: 800;
      font-family: '宋体';
    }
    .button {
      margin-top: 5px;
      .el-button {
        font-size: 16px;
      }
    }
  }
  .closeButton {
    cursor: pointer;
    margin-left: 20px;
    width: 40px;
  }
}
</style>
