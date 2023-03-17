<template>
  <div class="productList-wrap">
    <el-row style="width: 100vw">
      <el-col :span="4">
        <el-menu class="elMenu-wrap" default-active="" :collapse="isCollapse && !isShowCard" @mouseover="handleOpen" @mouseenter="handleOpen">
          <el-menu-item class="mainMenu" index="prodandserver" @mouseenter="openMenu" :disabled="true">
            <el-icon :size="22"><Grid /></el-icon>
            <template #title>
              <div class="mainMenu-item">
                <span>产品与服务</span>
                <el-icon class="arrowRight"><CaretRight /></el-icon>
              </div>
            </template>
          </el-menu-item>
          <div style="height: calc(100vh - 160px)" @mouseleave="handleClose">
            <template v-for="(item, index) in productList" :key="'productList' + index">
              <el-menu-item :index="item.name" v-if="item.is_domain" @click="handleSelect(item)">
                <svg-icon :iconName="item.icon" className="icon" style="min-width: 20px"></svg-icon>
                <template #title>
                  <span class="title-name" style="margin-right: 5px">{{ item.name }}</span>
                  <span class="title-name">{{ item.tag }}</span>
                </template>
              </el-menu-item>
            </template>
          </div>
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
          <div class="server-container" v-for="(item, index) in serverList" :key="'serverList' + index" style="margin-bottom: 30px">
            <span class="span-title">{{ item.name }}</span>
            <div class="button" v-for="(it, index) in item.children" :key="'item.children' + index">
              <el-button text @click="goTo(it)">{{ it.name }}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Grid, CaretRight, Close } from '@element-plus/icons-vue'
import { getCategoryApi, getProductApi } from '@/api/navigationManageAPI'
import { emitter } from '@/utils/mitt'

const isCollapse = ref(true)
const isShowCard = ref(false)
const filter = ref('') // 搜索
const serverList = ref([]) // 服务列表
const productList = ref([]) // 产品列表

const handleOpen = () => {
  isCollapse.value = false
}

const handleClose = () => {
  isCollapse.value = true
}

const openMenu = () => {
  if (!isCollapse.value) {
    setTimeout(() => {
      isShowCard.value = true
    }, 300)
  }
}

const handleCloseCard = () => {
  isCollapse.value = true
  isShowCard.value = false
}

// 侧边栏响应
const handleSelect = (value: any) => {
  window.location.href = value.links
}

// 产品服务链接跳转
const goTo = (value: any) => {
  if (!value.enabled) return ElMessage.warning('该服务暂未开放')
  window.open(value.links, '_blank')
  localStorage.getItem('linkList') ? '' : localStorage.setItem('linkList', JSON.stringify({ link: JSON.stringify(value.links) }))
}

// 获取服务分组列表
const getCategory = async () => {
  const res = await getCategoryApi()
  if (res.code === 1000) {
    serverList.value = res.data || []
  }
}

// 获取产品服务列表
const getProduct = async () => {
  const res = await getProductApi()
  if (res.code === 1000) {
    productList.value = res.data || []
    handleServerList()
  }
}

// 数据处理
const handleServerList = () => {
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
}

onMounted(async () => {
  await getCategory()
  await getProduct()
  emitter.on('toRefresh', async (param) => {
    if (param.isRefresh === 'true') {
      await getCategory()
      await getProduct()
    }
  })
})
</script>

<style lang="scss" scoped>
.productList-wrap {
  height: calc(100% - 50px);
  :deep(.el-menu--collapse) {
    z-index: 3 !important;
    width: 55px;
  }
  .elMenu-wrap {
    position: absolute;
    top: 50px;
    left: 0px;
    height: calc(100vh - 50px);
    z-index: 999999;
    --el-menu-base-level-padding: 13px !important;
    &:not(.el-menu--collapse) {
      width: 13%;
    }
    :deep(.is-disabled) {
      height: 70px;
    }
    .title-name {
      margin-left: 10px;
      font-size: 12px;
      margin-right: 20px;
      color: #666;
    }
    .el-menu-item {
      font-size: 14px !important;
      color: #666;
      font-family: '微软雅黑';
    }
    .el-menu-item.is-disabled {
      cursor: pointer;
      opacity: 1;
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
      .mainMenu-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .el-icon {
        margin-right: 20px;
      }
      .arrowRight {
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
        transform: translateX(-50%);
      }
    }
  }
  .right-menu {
    box-sizing: border-box;
    height: calc(100vh - 50px);
    position: absolute;
    top: 50px;
    z-index: 20;
    left: 13%;
    min-width: 40%;
    font-size: 16px !important;
    font-family: '微软雅黑';
    border-radius: 0;
    :deep(.el-card__header) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    :deep(.el-card__body) {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 20px 35px;
    }
    :deep(.el-card__header) {
      height: 70px;
    }
    .header-warp {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .closeButton {
        cursor: pointer;
        margin-left: 20px;
        width: 40px;
      }
    }
    .server-container {
      width: 33%;
      .span-title {
        font-weight: 700;
        font-family: '微软雅黑';
      }
      .button {
        margin-top: 10px;
        margin-left: 10px;
        .el-button {
          font-size: 14px;
          font-family: '微软雅黑';
        }
      }
    }
  }
}
</style>
