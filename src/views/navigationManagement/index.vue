<template>
  <div class="navigationManagement-wrap">
    <el-card class="navigation-card">
      <ul class="at-nav">
        <li
          class="at-nav-item"
          @click="changeNavigationType(item.value)"
          v-for="(item, index) in navigationTypes"
          :key="'navigationTypes' + index"
          :class="isCategory === index ? 'at-nav-item-actived' : ''"
        >
          <div class="at-nav-item-main">{{ item.label }}</div>
        </li>
      </ul>
    </el-card>
    <el-card class="form-card">
      <header>{{ isCategory === 0 ? '服务分组' : '产品服务' }}</header>
      <div class="form-wrap" style="height: calc(78vh - 70px)">
        <el-form v-if="isCategory === 0" :model="serverForm" ref="serverRuleFormRef" :rules="serverRules" label-width="120px" label-position="top">
          <el-form-item label="分组名" prop="name">
            <el-input v-model="serverForm.name" placeholder="请输入分组名" maxlength="30" show-word-limit />
          </el-form-item>
          <el-form-item label="创建人" prop="username">
            <el-input v-model="serverForm.username" :disabled="true" />
          </el-form-item>
          <el-form-item>
            <div class="button-wrap">
              <el-button @click="resertForm(serverRuleFormRef)">重置</el-button>
              <el-button type="primary" @click="submitForm(serverRuleFormRef, 'server')">添加</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-form v-if="isCategory === 1" :model="productForm" ref="productRuleFormRef" :rules="productRules" label-width="120px" label-position="top">
          <el-form-item label="服务名" prop="name">
            <el-input v-model="productForm.name" placeholder="请输入服务名" maxlength="30" show-word-limit />
          </el-form-item>
          <el-form-item label="标识" prop="tag">
            <el-input v-model="productForm.tag" placeholder="请输入标识" />
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="productForm.icon" placeholder="请输入图标" />
          </el-form-item>
          <el-form-item label="跳转地址" prop="links">
            <el-input v-model="productForm.links" placeholder="例如：http://www.baidu.com" />
          </el-form-item>
          <el-form-item label="是否生效" prop="enabled">
            <el-select v-model="productForm.enabled" :disabled="true">
              <el-option label="是" value="True" />
              <el-option label="否" value="False" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否侧边显示" prop="is_domain">
            <el-select v-model="productForm.is_domain">
              <el-option label="是" value="True" />
              <el-option label="否" value="False" />
            </el-select>
          </el-form-item>
          <el-form-item label="分组" prop="category">
            <el-select v-model="productForm.category" placeholder="请选择分组" @visible-change="toGetCategoryList">
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in categoryList" :key="'categoryList' + index" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建人" prop="creator">
            <el-input v-model="productForm.creator" :disabled="true" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="productForm.description" placeholder="请输入描述" />
          </el-form-item>
          <el-form-item>
            <div class="button-wrap">
              <el-button @click="resertForm(productRuleFormRef)">重置</el-button>
              <el-button type="primary" @click="submitForm(productRuleFormRef, 'product')">添加</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { getAddCategoryApi, getAddProductApi, getCategoryApi, getProductApi } from '@/api/navigationManageAPI'
import { ElMessage } from 'element-plus'
import { emitter } from '@/utils/mitt'

const isCategory = ref(0)
const navigationTypes = ref([
  { label: '服务分组', value: 0 },
  { label: '产品服务', value: 1 }
])
const productForm = reactive({
  name: '',
  tag: '',
  icon: '',
  links: '',
  enabled: 'True',
  is_domain: 'False',
  is_customize: 'False',
  category: '',
  creator: JSON.parse(localStorage.getItem('userInfo') || '{}').username,
  description: ''
})
const productRuleFormRef = ref<FormInstance>()
const productRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入服务名', trigger: 'blur' }],
  tag: [{ required: true, message: '请输入标识', trigger: 'blur' }],
  icon: [{ required: true, message: '请输入图标', trigger: 'blur' }],
  links: [{ required: true, message: '请输入跳转地址', trigger: 'blur' }],
  enabled: [{ required: true, message: '请选择是否生效', trigger: 'change' }],
  is_domain: [{ required: true, message: '请选择是否侧边显示', trigger: 'change' }],
  category: [{ required: true, message: '请选择分组', trigger: 'change' }],
  creator: [{ required: true, message: '请输入创建人', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
})
const serverForm = reactive({
  name: '',
  username: JSON.parse(localStorage.getItem('userInfo') || '{}').username
})
const serverRuleFormRef = ref<FormInstance>()
const serverRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入分组名', trigger: 'blur' }],
  username: [{ required: true, message: '请输入创建人', trigger: 'change' }]
})
const categoryList = ref([])

const changeNavigationType = (val) => {
  isCategory.value = val
}

const submitForm = async (formEl: FormInstance | undefined, type) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      type === 'server' ? addCategory(serverForm) : addProduct(productForm)
    } else {
      ElMessage.error('请检查输入项！')
    }
  })
}

const addCategory = async (params) => {
  const res = await getAddCategoryApi(params)
  if (res.code === 1000) {
    ElMessage.success('添加成功！')
    emitter.emit('toRefresh', { isRefresh: 'true' })
    serverRuleFormRef.value?.resetFields()
  }
}

const addProduct = async (params) => {
  const res = await getAddProductApi(params)
  if (res.code === 1000) {
    ElMessage.success('添加成功！')
    emitter.emit('toRefresh', { isRefresh: 'true' })
    productRuleFormRef.value?.resetFields()
  }
}

const toGetCategoryList = (val) => {
  if (val) getCategory()
}

const getCategory = async () => {
  const res = await getCategoryApi()
  if (res.code === 1000) {
    categoryList.value = res.data || []
  }
}

const resertForm = (formEl: FormInstance | undefined) => {
  formEl.resetFields()
}

onMounted(() => {})
</script>

<style lang="scss" scoped>
.navigationManagement-wrap {
  display: flex;
  width: 100%;
  .navigation-card {
    height: 78vh;
    :deep(.el-card__body) {
      padding: 0px;
    }
    border: none;
    width: 280px;
    margin-right: 30px;
    .at-nav {
      margin-top: 8px;
      width: 100%;
      padding-left: 0px;
      .at-nav-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 8px 0;
        height: 32px;
        line-height: 32px;
        list-style: none;
        &:hover {
          background: #f5f7fa;
          .at-nav-item-main {
            color: #1b9aee;
          }
        }
        .at-nav-item-main {
          font-size: 14px;
          padding: 6px 20px;
          font-weight: 500;
          color: #8c8c8c;
        }
      }
      .at-nav-item-actived {
        .at-nav-item-main {
          color: #262626 !important;
        }
        &::before {
          width: 3px;
          height: 32px;
          line-height: 32px;
          -webkit-transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          content: ' ';
          position: absolute;
          z-index: 2;
          background: #1b9aee;
        }
      }
    }
    .navigationType {
      span {
        display: inline-block;
        text-align: right;
        margin-bottom: 20px;
      }
    }
  }
  .form-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    :deep(.el-card__body) {
      padding: 0px;
    }
    flex: 1;
    header {
      font-size: 16px;
      color: #292929;
      font-weight: 600;
      margin-bottom: 10px;
      padding: 17px 0 17px 17px;
      border-bottom: 1px solid #e9edf0;
    }
    .form-wrap {
      overflow: auto;
      .el-form {
        width: 40%;
        padding: 17px 0 17px 17px;
      }
      &::-webkit-scrollbar {
        width: 0 !important;
      }
    }

    .button-wrap {
      display: flex;
    }
  }
}
</style>
