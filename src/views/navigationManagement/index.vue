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
          <div class="at-nav-item-main" style="font-size: 14px; font-weight: 600">{{ item.label }}</div>
        </li>
      </ul>
    </el-card>
    <el-card class="form-card">
      <header>{{ isCategory === 0 ? '服务分组' : '产品服务' }}</header>
      <div style="padding: 20px 30px 0 30px">
        <div class="search-wrap" style="margin-bottom: 20px">
          <el-button type="primary" @click="addNavigation">添加</el-button>
          <el-select v-if="isCategory === 1" v-model="inputSearch" class="m-2" placeholder="按服务分组名称搜索..." clearable @change="searchProduct">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in categoryList" :key="'categoryList' + index" />
          </el-select>
        </div>
        <div class="form-wrap" style="height: calc(78vh - 70px)">
          <el-table v-if="isCategory === 0" :data="serverTableData" stripe width="100%">
            <el-table-column prop="name" label="分组名" align="center" />
            <el-table-column label="创建时间" align="center">
              <template #default="scope">
                <span>{{ utc2beijing(scope.row.created_time) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="user" label="创建人" align="center">
              <template #default="scope">
                <span>{{ creator }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120" align="center">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="editNavigation('server', scope.row.id)">编辑</el-button>
                <el-popconfirm title="确定要删除此产品服务?" @confirm="handleDelete('server', scope.row)">
                  <template #reference>
                    <el-button link type="danger" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="display: flex; justify-content: flex-end; margin-top: 20px"
            v-if="isCategory === 0"
            v-model:current-page="serverCurrentPage"
            :page-size="10"
            background
            layout="total, prev, pager, next"
            :total="serverTableDataTotal"
            @size-change="handleServerSizeChange"
            @current-change="handleServerCurrentChange"
          />

          <el-table v-if="isCategory === 1" :data="productTableData" stripe width="100%" max-height="52vh">
            <el-table-column prop="name" label="服务名" align="center" />
            <el-table-column prop="tag" label="标识" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.tag === ''" type="info">暂无标识</el-tag>
                <span v-else>{{ scope.row.tag }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="enabled" label="是否生效" align="center">
              <template #default="scope">
                <span v-if="scope.row.enabled">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column prop="is_domain" label="是否侧边显示" align="center">
              <template #default="scope">
                <span v-if="scope.row.is_domain">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column prop="category" label="分组" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.category === null" type="info">暂无分组</el-tag>
                <span v-else>{{ scope.row.category }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.description === ''" type="info">暂无描述</el-tag>
                <span v-else>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template #default="scope">
                <span>{{ utc2beijing(scope.row.created_time) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="creator" label="创建人" align="center" />
            <el-table-column fixed="right" label="操作" width="120" align="center">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="editNavigation('product', scope.row.id)">编辑</el-button>
                <el-popconfirm title="确定要删除此产品服务?" @confirm="handleDelete('product', scope.row)">
                  <template #reference>
                    <el-button link type="danger" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="display: flex; justify-content: flex-end; margin-top: 20px"
            v-if="isCategory === 1"
            v-model:current-page="productCurrentPage"
            :page-size="10"
            background
            layout="total, prev, pager, next"
            :total="productTableDataTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%" :before-close="handleClose">
    <el-form v-if="isCategory === 0" :model="serverForm" ref="serverRuleFormRef" :rules="serverRules" label-width="120px">
      <el-form-item label="分组名" prop="name">
        <el-input v-model="serverForm.name" placeholder="请输入分组名" maxlength="30" show-word-limit />
      </el-form-item>
      <!-- <el-form-item label="创建人" prop="username">
        <el-input v-model="serverForm.username" :disabled="true" />
      </el-form-item> -->
      <el-form-item>
        <div class="button-wrap">
          <el-button @click="resertForm(serverRuleFormRef)">取消</el-button>
          <el-button type="primary" @click="submitForm(serverRuleFormRef, 'server')">确定</el-button>
        </div>
      </el-form-item>
    </el-form>

    <el-form v-if="isCategory === 1" :model="productForm" ref="productRuleFormRef" :rules="productRules" label-width="120px" label-position="top">
      <el-row>
        <el-col :span="10">
          <el-form-item label="分组" prop="category">
            <el-select v-model="productForm.category" placeholder="请选择分组" @visible-change="toGetCategoryList">
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in categoryList" :key="'categoryList' + index" />
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-popover placement="bottom" :width="400" trigger="click" v-model:visible="iconPopver">
              <template #reference>
                <el-select
                  v-model="productForm.icon"
                  placeholder="请选择图标"
                  @blur="iconPopver = false"
                  @focus="iconPopver = true"
                  reserve-keyword
                  remote
                  remote-show-suffix
                ></el-select>
              </template>
              <div class="iconList">
                <svg-icon
                  v-for="item in iconList"
                  :class="[productForm.icon === item ? 'iconbackground' : '']"
                  :key="item"
                  :iconName="item"
                  className="icon"
                  style="width: 50px; height: 30px"
                  @click="productForm.icon = item"
                ></svg-icon>
              </div>
            </el-popover>
          </el-form-item>
          <el-form-item label="服务名" prop="name">
            <el-input v-model="productForm.name" placeholder="请输入服务名" maxlength="30" show-word-limit />
          </el-form-item>
          <el-form-item label="标识" prop="tag">
            <el-input v-model="productForm.tag" placeholder="请输入标识" />
          </el-form-item>
          <!-- <el-form-item label="创建人" prop="creator">
            <el-input v-model="productForm.creator" :disabled="true" />
          </el-form-item> -->
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="10">
          <el-form-item label="是否生效" prop="enabled">
            <el-select v-model="productForm.enabled">
              <el-option label="是" value="是" />
              <el-option label="否" value="否" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否侧边显示" prop="is_domain">
            <el-select v-model="productForm.is_domain">
              <el-option label="是" value="是" />
              <el-option label="否" value="否" />
            </el-select>
          </el-form-item>
          <el-form-item label="跳转地址" prop="links"> <el-input v-model="productForm.links" placeholder="例如：http://www.baidu.com" /></el-form-item>
          <el-form-item label="描述">
            <el-input v-model="productForm.description" placeholder="请输入描述" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="justify-content: center; display: flex">
        <el-form-item class="button-wrap" style="justify-content: center">
          <div class="button-wrap">
            <el-button @click="resertForm(productRuleFormRef)">取消</el-button>
            <el-button type="primary" @click="submitForm(productRuleFormRef, 'product')">确定</el-button>
          </div>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import {
  getAddCategoryApi,
  getAddProductApi,
  getCategoryApi,
  getProductApi,
  getRemoveProductApi,
  getProductIdApi,
  getEditProductApi,
  getCategoryIdApi,
  getEditCategoryApi,
  getDeleteCategoryApi,
  getProductCustomizeApi
} from '@/api/navigationManageAPI'
import { ElMessage } from 'element-plus'
import { emitter } from '@/utils/mitt'
import { utc2beijing } from '@/utils/util'
import { Edit, Search } from '@element-plus/icons-vue'
import { iconList } from '@/data/index.js'

const iconPopver = ref(false)
const inputSearch = ref('')
const isCategory = ref(0)
const dialogVisible = ref(false)
const creator = ref(JSON.parse(localStorage.getItem('userInfo') || '{}').username)
const serverTableData = ref([] as any[])
const productTableData = ref([] as any[])
const productCurrentPage = ref(1)
const productTableDataTotal = ref(0)
const serverCurrentPage = ref(1)
const serverTableDataTotal = ref(0)
const dialogTitle = ref('')
const navigationTypes = ref([
  { label: '服务分组', value: 0 },
  { label: '产品服务', value: 1 }
])
let productForm = reactive({
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

const addNavigation = () => {
  dialogTitle.value = '添加'
  dialogVisible.value = true
}

const searchProduct = async (val) => {
  productCurrentPage.value = 1
  const params = {
    category: val,
    is_customize: 'False',
    creator: JSON.parse(localStorage.getItem('userInfo') || '{}').username
  }
  const res = await getProductCustomizeApi(params)
  if (res.code === 1000) {
    nextTick(() => {
      productTableData.value = res.data.slice((productCurrentPage.value - 1) * 10, productCurrentPage.value * 10) || []
      productTableDataTotal.value = res.data.length
      // 遍历获取serverTableData.value和categoryList.value，如果有相同的，就把categoryList.value的id赋值给serverTableData.value的category
      productTableData.value.forEach((item) => {
        categoryList.value.forEach((item2) => {
          if (item2.id === item.category) {
            item.category = item2.name
          }
        })
      })
    })
  }
}

const editId = ref('')

const editNavigation = async (type, id) => {
  editId.value = id
  type === 'product' ? getProductId(id) : getCategoryId(id)
}

// 服务分组 id获取
const getCategoryId = async (id) => {
  const res = await getCategoryIdApi(id)
  if (res.code === 1000) {
    serverForm.name = res.data.name
    dialogVisible.value = true
    dialogTitle.value = '编辑'
  }
}

// 产品服务 id获取
const getProductId = async (id) => {
  const res = await getProductIdApi(id)
  if (res.code === 1000) {
    productForm.name = res.data.name
    productForm.tag = res.data.tag
    productForm.icon = res.data.icon
    productForm.links = res.data.links
    productForm.enabled = res.data.enabled ? '是' : '否'
    productForm.is_domain = res.data.is_domain ? '是' : '否'
    productForm.is_customize = res.data.is_customize
    productForm.category = res.data.category
    productForm.description = res.data.description
    dialogVisible.value = true
    dialogTitle.value = '编辑'
  }
}

const handleClose = (done: () => void) => {
  dialogVisible.value = false
  // 重置表单
  isCategory.value === 0 ? resertForm(serverRuleFormRef.value) : resertForm(productRuleFormRef.value)
}

const submitForm = async (formEl: FormInstance | undefined, type) => {
  productForm.is_domain = productForm.is_domain === '是' ? 'True' : 'False'
  productForm.enabled = productForm.enabled === '是' ? 'True' : 'False'
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (dialogTitle.value === '编辑') {
        type === 'server' ? editCategory(serverForm) : editProduct(productForm)
      } else {
        type === 'server' ? addCategory(serverForm) : addProduct(productForm)
      }
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
    getCategory()
    serverRuleFormRef.value?.resetFields()
    dialogVisible.value = false
  }
}

const addProduct = async (params) => {
  const res = await getAddProductApi(params)
  if (res.code === 1000) {
    ElMessage.success('添加成功！')
    productCurrentPage.value = 1
    getProduct()
    emitter.emit('toRefresh', { isRefresh: 'true' })
    productRuleFormRef.value?.resetFields()
    dialogVisible.value = false
  }
}

// 服务分组 编辑
const editCategory = async (params) => {
  const res = await getEditCategoryApi(editId.value, params)
  if (res.code === 1000) {
    ElMessage.success('编辑成功！')
    emitter.emit('toRefresh', { isRefresh: 'true' })
    getCategory()
    serverRuleFormRef.value?.resetFields()
    emitter.emit('toRefresh', { isRefresh: 'true' })
    dialogVisible.value = false
  }
}

// 产品服务 编辑
const editProduct = async (params) => {
  const res = await getEditProductApi(editId.value, params)
  if (res.code === 1000) {
    ElMessage.success('编辑成功！')
    productCurrentPage.value = 1
    getProduct()
    emitter.emit('toRefresh', { isRefresh: 'true' })
    productRuleFormRef.value?.resetFields()
    dialogVisible.value = false
  }
}

const toGetCategoryList = (val) => {}

const getCategory = async (...args) => {
  const res = await getCategoryApi()
  if (res.code === 1000) {
    categoryList.value = res.data || []
    serverTableData.value = res.data.slice((serverCurrentPage.value - 1) * 10, serverCurrentPage.value * 10) || []
    serverTableDataTotal.value = res.data.length
  }
}

// 获取产品
const getProduct = async () => {
  const params = {
    is_customize: 'False',
    creator: JSON.parse(localStorage.getItem('userInfo') || '{}').username
  }
  const res = await getProductCustomizeApi(params)
  if (res.code === 1000) {
    productTableData.value = res.data.slice((productCurrentPage.value - 1) * 10, productCurrentPage.value * 10) || []
    productTableDataTotal.value = res.data.length
    // 遍历获取serverTableData.value和categoryList.value，如果有相同的，就把categoryList.value的id赋值给serverTableData.value的category
    productTableData.value.forEach((item) => {
      categoryList.value.forEach((item2) => {
        if (item2.id === item.category.id) {
          item.category = item2.name
        }
      })
    })
  }
}

// 服务分组 - 移除
const getRemoveCategory = async (id) => {
  const res = await getDeleteCategoryApi(id)
  if (res.code === 1000) {
    ElMessage.success('移除成功！')
    getCategory()
  }
}

// 产品服务 - 移除
const getRemoveProduct = async (id) => {
  const res = await getRemoveProductApi(id)
  if (res.code === 1000) {
    ElMessage.success('移除成功！')
    getProduct()
  }
}

const handleDelete = (type, val) => {
  type === 'product' ? getRemoveProduct(val.id) : getRemoveCategory(val.id)
}

const resertForm = (formEl: FormInstance | undefined) => {
  dialogVisible.value = false
  formEl.resetFields()
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  productCurrentPage.value = val
  getProduct()
}

const handleServerSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}

const handleServerCurrentChange = (val: number) => {
  serverCurrentPage.value = val
  getCategory()
}

onMounted(async () => {
  await getCategory()
  await getProduct()
})
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
        font-weight: 800;
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
    height: 78vh;
    :deep(.el-card__body) {
      padding: 0px;
    }
    flex: 1;
    .search-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
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
      justify-content: center;
      width: 100%;
    }
  }
}
.iconList {
  .svg-icon {
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
      // 浅蓝色
      background-color: #f0f8ff;
    }
  }
  .iconbackground {
    background-color: #e0ffff;
  }
}
</style>
