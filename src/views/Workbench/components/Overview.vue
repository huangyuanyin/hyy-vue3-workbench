<template>
  <div class="Overview-wrap">
    <div class="wrap-left">
      <el-card style="min-height: 35vh">
        <div class="overview-title">
          <span class="title">我的导航</span>
        </div>
        <span class="subtitle">最近访问</span>
        <div class="my-navigation-favoriteList">
          <div class="noData" v-if="visitedList.length === 0">暂无最近访问</div>
          <div style="display: flex; justify-content: flex-start; flex-wrap: wrap; width: 100%">
            <el-button class="button-items" v-for="(item, index) in visitedList" :key="'visitedList' + index" plain style="padding: 10px" @click="toLink(item)">
              {{ item.name }}
            </el-button>
          </div>
        </div>
        <div class="recentVisit-line"></div>
        <div class="c_top">
          <span class="subtitle" style="display: inline-block">自定义快捷入口</span>
          <div class="add">
            <el-icon><CirclePlusFilled /></el-icon>添加
          </div>
        </div>
        <div class="my-navigation-favoriteList">
          <el-button
            class="button-items"
            v-for="(item, index) in favoriteList"
            :key="'favoriteList' + index"
            plain
            @click="toLink(item.provider && item.provider !== null ? item.provider : item)"
          >
            {{ item.provider && item.provider !== null ? item.provider.name : item.name }}
            <el-icon @click.stop="removeFavorite(item)"><Close /></el-icon>
          </el-button>
          <el-button class="addButton" style="background-color: #fff" @click="openPopver" v-if="favoriteList.length < 12">+ 添加快捷入口</el-button>
        </div>
      </el-card>
      <div class="OperationandMaintenanceManagement">
        <el-card style="max-height: 40vh; width: 49%; margin-top: 15px">
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
        <el-card style="height: 35vh; width: 49%; margin-top: 15px">
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
    </div>
    <div class="wrap-right">
      <el-card style="height: 35vh">
        <div class="_ov-user">
          <div class="_ov-user-info">
            <img :src="user" alt="" />
            <div class="_ov-user-info__body">
              <div class="_ov-user-info__name">白T</div>
              <div class="app-overview-form">
                <div class="app-overview-form__item">
                  <span class="app-overview-form__label">账号ID</span>
                  <span class="app-overview-form__controls">100029096063</span>
                </div>
                <div class="app-overview-form__item">
                  <span class="app-overview-form__label">身份</span>
                  <el-tag>管理员</el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="_ov-user-account">
          <div class="top">
            <h4>访问管理</h4>
            <div class="account-button">
              <el-button type="primary" link>新增用户</el-button>
              <el-button type="primary" link>添加权限</el-button>
            </div>
          </div>
          <div class="app-overview-row">
            <div class="row-item">
              <span class="item-label">用户数</span>
              <span class="item-value">1</span>
            </div>
            <div class="row-item">
              <span class="item-label">用户组</span>
              <span class="item-value">0</span>
            </div>
            <div class="row-item">
              <span class="item-label">角色</span>
              <span class="item-value">3</span>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="next-card" style="height: 15vh; margin-top: 15px">
        <div class="next-content">
          <h3>待办事项</h3>
          <div class="home-backlog">
            <div class="home-backlog-item">
              <span class="item-title">待办工单</span>
              <span class="item-value">0</span>
            </div>
            <div class="home-backlog-item">
              <span class="item-title">待办工单</span>
              <span class="item-value">0</span>
            </div>
            <div class="home-backlog-item">
              <span class="item-title">待办工单</span>
              <span class="item-value">0</span>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="next-card" style="height: 23vh; margin-top: 15px">
        <div class="next-content">
          <h3>帮助文档</h3>
          <div class="help-docs">
            <el-tabs v-model="docsActiveName" class="demo-tabs" @tab-click="changeDocs">
              <el-tab-pane label="新手帮助文档" name="first">
                <div class="dosc-content">
                  <div class="help-docs-item">信安云测控制台介绍</div>
                  <div class="help-docs-item">信安云测控制台介绍</div>
                  <div class="help-docs-item">信安云测控制台介绍</div>
                  <div class="help-docs-item">信安云测控制台介绍</div>
                  <div class="help-docs-item">信安云测控制台介绍</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="最佳实践" name="second">最佳实践</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="showAddDialog" title="添加" width="30%" custom-class="showAddDialog" :before-close="onCancel">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="添加云服务" name="first"></el-tab-pane>
      <el-tab-pane label="自定义添加" name="second"></el-tab-pane>
    </el-tabs>
    <el-input v-if="activeName === 'first'" v-model="inputSearch" class="w-50 m-2" placeholder="请输入关键词搜索服务" :suffix-icon="Search" />
    <div v-if="activeName === 'first'" class="service-wrap">
      <div class="service-item-wrap" v-for="(item, index) in serviceList" :key="'serviceList' + index" @click="changeFavorite(item)">
        <img v-if="item.isShow" src="https://res.hc-cdn.com/ibiza-home-obsflow/23.2.0.20230228112535/hws/solid-star.9df8f5a727ab994d.svg" alt="" />
        <img v-else src="https://res.hc-cdn.com/ibiza-home-obsflow/23.2.0.20230228112535/hws/hollow-star.5b7e2e069a591697.svg" alt="" />
        <div>{{ item.name }}</div>
      </div>
    </div>
    <el-form v-if="activeName === 'second'" :model="formInline" ref="formInlineRef" :rules="formInlineRules" class="demo-form-inline">
      <el-form-item label="入口名称" prop="name" label-width="80px">
        <el-input v-model="formInline.name" placeholder="请输入入口名称" />
      </el-form-item>
      <el-form-item label="入口链接" prop="links" label-width="80px">
        <el-input v-model="formInline.links" placeholder="请输入入口链接" />
      </el-form-item>
      <el-form-item label="" prop="" label-width="80px" v-if="isTag">
        <el-icon color="#50dA4B" style="margin-right: 5px"><CircleCheckFilled /></el-icon>
        <span>自定义链接添加成功，您可继续添加</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">关闭</el-button>
        <el-button v-if="activeName === 'second'" type="primary" @click="onSubmit(formInlineRef)"> 添加到快捷入口 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import user from '@/assets/user.png'
import type { TabsPaneContext } from 'element-plus'
import { Search, Close, CircleCheckFilled, CirclePlusFilled } from '@element-plus/icons-vue'
import { getProductApi, getFavoriteApi, getAddProductApi, addFavoriteApi, removeFavoriteApi, getProductCustomizeApi, getRemoveProductApi } from '@/api/navigationManageAPI'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const activeName = ref('first')
const docsActiveName = ref('first')
const inputSearch = ref('')
const showAddDialog = ref(false)
const isTag = ref(false)
const formInline = reactive({
  name: '',
  links: '',
  is_customize: 'True',
  creator: JSON.parse(localStorage.getItem('userInfo') || '{}').username,
  category: ''
})
const formInlineRef = ref<FormInstance>()
const formInlineRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入入口名称', trigger: 'blur' }],
  links: [{ required: true, message: '请输入入口链接', trigger: 'blur' }]
})
const serviceList = ref([]) // 云服务全部列表
const favoriteList = ref([]) // 收藏入口列表
const productEntranceList = ref([]) // 云服务入口列表
const customizeEntranceList = ref([]) // 自定义入口列表
const visitedList = ref(localStorage.getItem('recentLinks') ? JSON.parse(localStorage.getItem('recentLinks')) : [])

const handleClick = (tab: TabsPaneContext, event: Event) => {}

const changeDocs = (tab: TabsPaneContext, event: Event) => {}

const openPopver = () => {
  showAddDialog.value = true
  activeName.value = 'first'
  let arr = []
  favoriteList.value.forEach((item) => {
    if (item.provider) {
      arr.push(item)
    }
  })
  // favoriteList 和 serviceList 对比，如果有相同的，就把isShow设置为true
  arr.forEach((item) => {
    serviceList.value.forEach((item2) => {
      if (item.provider.name === item2.name) {
        item2.isShow = true
      }
    })
  })
  console.log('console.log(serviceList.value)', favoriteList.value, arr, serviceList.value)
}

const onCancel = (done: () => void) => {
  showAddDialog.value = false
  isTag.value = false
}

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (favoriteList.value.length >= 12) return ElMessage.warning('最多添加12个快捷入口')
      addProduct(formInline)
    }
  })
}

const addProduct = async (params) => {
  const res = await getAddProductApi(params)
  if (res.code === 1000) {
    ElMessage.success('添加成功！')
    isTag.value = true
    formInlineRef.value?.resetFields()
    sumList()
  }
}

const getProduct = async () => {
  const res = await getProductApi()
  if (res.code === 1000) {
    serviceList.value = res.data.filter((item) => item.is_customize !== true) || []
    // 遍历serviceList 和 favoriteList 对比，如果有相同的，就把isShow设置为true
    serviceList.value.forEach((item) => {
      favoriteList.value.forEach((item2) => {
        if (item.name === item2.name) {
          item.isShow = true
        } else {
          item.isShow = false
        }
      })
    })
  }
}

// 获取自定义入口
const getProductCustomize = async () => {
  const params = {
    is_customize: 'True',
    creator: JSON.parse(localStorage.getItem('userInfo') || '{}').username
  }
  const res = await getProductCustomizeApi(params)
  if (res.code === 1000) {
    customizeEntranceList.value = res.data || []
  }
}

const getFavorite = async () => {
  productEntranceList.value = []
  const res = await getFavoriteApi({ user: JSON.parse(localStorage.getItem('userInfo') || '{}').username })
  if (res.code === 1000) {
    res.data.map((item) => {
      item.provider === null ? '' : productEntranceList.value.push(item)
    }) || []
  }
}

// 移除入口
const removeFavorite = async (val) => {
  val.is_customize === true ? getRemoveProduct(val.id) : getRemoveFavorite(val.id)
}

// 产品服务 - 移除
const getRemoveProduct = async (id) => {
  const res = await getRemoveProductApi(id)
  if (res.code === 1000) {
    ElMessage.success('移除成功！')
    sumList()
  }
}

// 自定义入口 - 删除
const getRemoveFavorite = async (id) => {
  const res = await removeFavoriteApi(id)
  if (res.code === 1000) {
    ElMessage.success('移除成功！')
    sumList()
  }
}

// 添加云服务
const addService = async (val) => {
  const params = {
    user: JSON.parse(localStorage.getItem('userInfo') || '{}').username,
    provider: val.id
  }
  const res = await addFavoriteApi(params)
  if (res.code === 1000) {
    ElMessage.success('添加成功！')
    serviceList.value.forEach((item) => {
      if (item.name === val.name) {
        item.isShow = !item.isShow
      }
    })
    sumList()
  }
}

const sumList = async () => {
  await getProductCustomize()
  await getFavorite()
  favoriteList.value = [].concat(customizeEntranceList.value, productEntranceList.value)
}

// 跳转链接
const toLink = (val) => {
  visitedList.value.unshift({ name: val.name, links: val.links })
  visitedList.value = visitedList.value
    .reduce((cur, next) => {
      const index = cur.findIndex((item) => item.name === next.name)
      if (index === -1) {
        cur.push(next)
      }
      return cur
    }, [])
    .slice(0, 12)
  localStorage.setItem('recentLinks', JSON.stringify(visitedList.value))
  window.location.href = val.links
}

// 点击添加或删除云服务，并切换显示隐藏
const changeFavorite = async (val) => {
  if (favoriteList.value.length >= 12) return ElMessage.warning('最多添加12个快捷入口')
  val.isShow === true ? '' : addService(val)
}

onMounted(async () => {
  await sumList()
  await getProduct()
})
</script>

<style lang="scss" scoped>
.Overview-wrap {
  display: flex;
  justify-content: space-between;
  .wrap-left {
    flex: 1;
    margin-right: 30px;
    .overview-title {
      display: flex;
      align-items: center;
      .title {
        font-family: '微软雅黑';
        color: #252b3a;
        font-size: 18px;
        font-weight: 800;
        margin-right: 5px;
        margin-bottom: 20px;
      }
      .el-button {
        font-family: '微软雅黑';
        color: #526ecc;
        padding: 13px;
      }
    }
    .my-navigation-favoriteList {
      height: calc(100% - 67px);
      min-height: 40px;
      overflow-y: auto;
      .noData {
        height: 70px;
        color: #999;
        background-color: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
      .button-items {
        font-size: 12px;
        font-family: '微软雅黑';
        color: #252b3a;
        background-color: #e9edfa;
        height: 38px;
        min-width: 130px;
        width: 15%;
        margin: 20px 20px 0 0;
        justify-content: flex-start;
        :deep(span) {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .el-icon {
          width: 2em;
          height: 2em;
        }
      }
      .button-items:hover {
        background-color: #beccfa;
        border-color: #beccfa;
      }
      .addButton {
        font-size: 12px;
        font-family: '微软雅黑';
        height: 38px;
        min-width: 160px;
        width: 15%;
        margin: 20px 20px 0 0;
        justify-content: flex-start;
      }
    }
    .recentVisit-line {
      background-color: #fff;
      border-top: 1px dashed #dfe1e6;
      margin: 20px 0;
    }
    .c_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .add {
        display: flex;
        align-items: center;
        margin-right: 25px;
        cursor: pointer;
        .el-icon {
          margin-right: 5px;
        }
      }
    }
    .subtitle {
      font-weight: 500;
      font-size: 14px;
      color: #666;
      line-height: 20px;
    }
    .recentVisit {
      min-height: 41px;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      margin-top: 10px;
      flex-wrap: nowrap;
      align-items: flex-start;
      span {
        display: inline-block;
        font-size: 14px;
        color: #252b3a;
        font-weight: 700;
        margin-bottom: 10px;
        width: 90px;
        :deep(.el-button) {
          margin-left: 0px;
        }
      }
      .button-items {
        font-size: 12px;
        font-family: '微软雅黑';
        color: #252b3a;
        background-color: #e9edfa;
        height: 28px;
        width: calc(20% - 16.1667px);
        justify-content: flex-start;
        margin-bottom: 15px;
      }
      .button-items:hover {
        background-color: #beccfa;
        border-color: #beccfa;
      }
    }
  }
  .wrap-right {
    width: 30%;
    :deep(.el-card__body) {
      padding: 40px;
    }
    ._ov-user {
      margin-bottom: 28px;
      font-size: 14px;
      ._ov-user-info {
        display: flex;
        img {
          width: 100px;
          height: 100px;
          margin-right: 24px;
          border-radius: 50%;
        }
        ._ov-user-info__body {
          ._ov-user-info__name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
          }
          .app-overview-form {
            .app-overview-form__item {
              .app-overview-form__label {
                display: inline-block;
                vertical-align: baseline;
                color: rgba(0, 0, 0, 0.4);
                padding-right: 20px;
                padding-top: 6px;
                width: 60px;
              }
              .el-tag {
                height: 20px;
                width: 54px;
                font-size: 12px;
              }
              .app-overview-form__controls {
                color: #000;
                word-wrap: break-word;
                word-break: break-word;
                padding-right: 24px;
                width: 100%;
              }
            }
          }
        }
      }
    }
    ._ov-user-account {
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .app-overview-row {
        display: flex;
        justify-content: space-between;
        .row-item {
          padding: 8px;
          width: 33%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-label {
            color: #888;
            margin-right: 4px;
            margin-bottom: 10px;
          }
          .item-value {
            font-size: 18px;
            color: #000;
          }
        }
      }
    }
    .next-card {
      padding: 16px 0 0 35px !important;
      :deep(.el-card__body) {
        padding: 0px !important;
      }
      .next-content {
        h3 {
          margin: -16px 0 0;
          height: 54px;
          font-size: 16px;
          color: #333;
          line-height: 54px;
        }
        .home-backlog {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: nowrap;
          .home-backlog-item {
            width: 33%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 10px 0;
            background: #f7f9fa;
            margin-right: 20px;
            padding: 12px;
            .item-title {
              font-size: 14px;
              color: #666;
              margin-bottom: 8px;
              line-height: 18px;
              color: #333;
            }
            .item-value {
              color: #333;
              display: block;
              line-height: 36px;
              font-size: 28px;
            }
          }
        }
        .help-docs {
          :deep(.is-active) {
            color: #409eff !important;
          }
          :deep(.el-tabs__item) {
            color: #000;
          }
          .dosc-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-flow: wrap;
            .help-docs-item {
              color: #333;
              font-size: 14px;
              width: 45%;
              display: inline-block;
              margin-bottom: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.service-wrap {
  padding: 18px 0;
  display: flex;
  flex-wrap: wrap;
  .service-item-wrap {
    width: 33%;
    display: flex;
    align-items: center;
    margin: 8px 0;
    cursor: pointer;
    img {
      margin-top: 2px;
      height: 16px;
      width: 18px;
      margin-right: 5px;
    }
  }
}
.XinAnProduct-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .XinAnProduct-content {
    width: 33%;
    display: flex;
    align-items: center;
    margin: 8px 0 40px 0;
    margin-bottom: 40px;
    cursor: pointer;
    img {
      margin-top: 2px;
      height: 82px;
      width: 82px;
      margin-right: 5px;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      margin-left: 10px;
    }
    .span {
      display: inline-block;
    }
    .title {
      margin-bottom: 15px;
      height: 22px;
      font-weight: bold;
      font-size: 14px;
      color: #333;
      line-height: 22px;
    }

    .value {
      height: 18px;
      font-size: 12px;
      line-height: 18px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-decoration: none !important;
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
.showAddDialog {
  .el-tabs__item {
    color: #000 !important;
  }
  .is-active {
    color: #409eff !important;
  }
  .el-dialog__footer {
    display: flex;
    justify-content: center;
  }
  .el-dialog__body {
    padding-bottom: 20px;
  }
  .el-dialog__footer {
    padding-top: 0px;
  }
}
</style>
