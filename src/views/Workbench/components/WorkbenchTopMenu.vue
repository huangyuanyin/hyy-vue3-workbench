<template>
  <div class="Header-wrapper">
    <div class="logo">
      <!-- <el-button v-if="!drawer" :icon="Operation" class="open" @click="openDrawer('open')" />
      <el-button v-else :icon="CloseBold" class="open" @click="openDrawer('close')" />
      <Drawer :drawer="drawer" @changeDrawer="changeDrawer" /> -->
      <img :src="logo" />
      <span>信安云测平台</span>
    </div>
    <!-- <span class="line"> | </span> -->
    <div class="work">
      <!-- <el-button text :icon="HomeFilled" size="small" @click="toWork">工作台</el-button> -->
    </div>
    <div class="right-menu">
      <div class="search">
        <el-input v-model="input" placeholder="请输入要搜索的内容" :prefix-icon="Search" size="small" />
      </div>
      <div class="support">
        <el-button text bg size="small">支持</el-button>
      </div>
      <div class="help">
        <el-tooltip class="box-item" effect="dark" content="有两条未读消息" placement="bottom">
          <el-icon>
            <BellFilled />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="tip">
        <el-tooltip class="box-item" effect="dark" content="帮助文档" placement="bottom">
          <el-icon>
            <QuestionFilled />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="userInfo">
        <img :src="user" />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ data.username }}
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in data.button" :key="'button' + index" @click="toLink(index)">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import logo from '@/assets/logo.png'
import user from '@/assets/user.png'
import { useUserStore } from '@/store/modules/user'
import { HomeFilled, ArrowDown, QuestionFilled, BellFilled, Search, Operation, CloseBold } from '@element-plus/icons-vue'
import Drawer from '@/components/Drawer.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useUserStore()
const input = ref('')
const drawer = ref(false)
const data = reactive({
  username: JSON.parse(localStorage.getItem('userInfo'))?.nickname,
  button: [{ name: '个人中心' }, { name: '退出登录' }]
})

const openDrawer = (val) => {
  val === 'open' ? (drawer.value = true) : (drawer.value = false)
}

const toLink = (index) => {
  switch (index) {
    case 0:
      ElMessage.warning('暂不支持')
      break
    case 1:
      store.LoginOut()
      router.push('/login')
      break
  }
}

const toWork = () => {
  router.push('/workbench')
}

const changeDrawer = (drawer) => {
  openDrawer(drawer)
}

onMounted(() => {})
</script>

<style lang="scss" scoped>
.Header-wrapper {
  display: flex;
  align-items: center;
  box-shadow: -1px 2px 14px 0px rgba(0, 0, 0, 0.16);
  background-color: #242f42;
  z-index: 999;

  .logo {
    display: flex;
    align-items: center;
    height: 100%;

    .open {
      height: 40px;
      width: 40px;
      border: none;
      border-radius: 0px;
      background-color: #242f42;
      color: #fff;
    }

    img {
      margin: 0 5px 0 10px;
      width: 50px;
    }

    span {
      line-height: 50px;
      color: #fff;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      vertical-align: middle;
    }
  }

  .line {
    color: rgb(221, 221, 221);
    margin: 0 10px 0 10px;
  }

  .work {
    flex: 1;
    height: 100%;
    line-height: 50px;

    .el-button {
      background-color: #f4f6f7;
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    padding-right: 20px;

    .support {
      margin: 0 12px;
    }

    .help {
      .el-icon svg {
        color: #666;
      }

      .el-icon svg:hover {
        color: #409eff;
        cursor: pointer;
      }
    }

    .tip {
      margin: 0 20px;

      .el-icon svg {
        color: #666;
      }

      .el-icon svg:hover {
        color: #409eff;
        cursor: pointer;
      }
    }

    .userInfo {
      display: flex;
      align-items: center;

      img {
        margin: 0 5px 0 0px;
        display: block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }

      .el-dropdown-link:hover {
        cursor: pointer;
      }

      .el-dropdown {
        color: #c1c6c8;
      }
    }
  }
}
</style>
