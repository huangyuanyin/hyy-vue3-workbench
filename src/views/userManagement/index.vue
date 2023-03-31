<template>
  <div class="userManagement-wrap">
    <el-card class="userManagement-card">
      <div style="padding: 20px 30px 0 30px">
        <div class="search-wrap" style="margin-bottom: 20px">
          <el-button type="primary" size="large" @click="editUser('add')">新增用户</el-button>
          <el-input v-model="inputSearch" size="large" class="w-50 m-2" placeholder="请输入用户名或名称..." :suffix-icon="Search" @change="search" />
        </div>
        <div class="form-wrap" style="height: calc(78vh - 70px)">
          <el-table :data="userTableData" stripe width="100%">
            <el-table-column prop="name" label="用户名" align="center" />
            <el-table-column prop="nickname" label="昵称" align="center" />
            <el-table-column prop="role" label="角色" align="center" />
            <el-table-column prop="gender" label="性别" align="center" />
            <el-table-column prop="email" label="邮箱" width="300" align="center" />
            <el-table-column label="时间" align="center">
              <template #default="scope">
                <span>{{ utc2beijing(scope.row.ctime) }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="editUser('edit', scope.row.name)">编辑</el-button>
                <el-button link type="primary" size="small" @click="roleUser(scope.row.name)">角色</el-button>
                <el-button link type="danger" size="small" @click="handleDelete(scope.row.name)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="display: flex; justify-content: flex-end; margin-top: 20px"
            v-model:current-page="userCurrentPage"
            :page-size="10"
            background
            layout="total, prev, pager, next"
            :total="userTableDataTotal"
            @size-change="handleUserSizeChange"
            @current-change="handleUserCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>

  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%" :before-close="handleClose">
    <el-form :model="userForm" ref="userRuleFormRef" :rules="userRules" label-width="120px" class="userForm-wrap">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userForm.name" placeholder="请输入用户名" maxlength="30" show-word-limit :disabled="dialogTitle === '编辑用户'" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userForm.nickname" placeholder="请输入昵称" maxlength="30" show-word-limit />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" placeholder="请输入邮箱" show-word-limit />
      </el-form-item>
      <el-form-item label="密码" prop="pwd" v-if="dialogTitle === '新增用户'">
        <el-input v-model="userForm.pwd" placeholder="请输入密码" maxlength="30" show-word-limit />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="userForm.gender" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="button-wrap">
          <el-button @click="resertForm(userRuleFormRef)">取消</el-button>
          <el-button type="primary" @click="submitForm(userRuleFormRef)">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog v-model="roleDialogVisible" title="绑定角色" width="40%" :before-close="handleClose">
    <el-form :model="roleForm" ref="roleRuleFormRef" :rules="roleRules" label-width="120px" class="roleForm-wrap">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="roleForm.name" show-word-limit disabled />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="roleForm.role" placeholder="请选择角色">
          <el-option label="测试工程师" value="QA" />
          <el-option label="技术支持工程师" value="SE" />
          <el-option label="开发工程师" value="RD" />
          <el-option label="管理员" value="admin" />
          <el-option label="销售人员" value="AE" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="button-wrap">
          <el-button @click="resertForm(roleRuleFormRef)">取消</el-button>
          <el-button type="primary" @click="changeRoleForm(roleRuleFormRef)">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, FormInstance, FormRules, ElMessageBox } from 'element-plus'
import { utc2beijing } from '@/utils/util'
import { userListApi, addUserApi, getUserApi, updateUserApi, bindRoleApi, deleteUserApi } from '@/api/user'

const inputSearch = ref('')
const userCurrentPage = ref(1)
const userTableDataTotal = ref(0)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const userTableData = ref([])
const roleDialogVisible = ref(false)
let userForm = reactive({
  name: '',
  nickname: '',
  email: '',
  gender: '',
  pwd: ''
})
const userRuleFormRef = ref<FormInstance>()
const userRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
})
const roleForm = reactive({
  name: '',
  role: ''
})
const roleRuleFormRef = ref<FormInstance>()
const roleRules = reactive<FormRules>({
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
})

const editUser = (...val) => {
  console.log(`output->val`, val)
  if (val[0] === 'add') {
    dialogVisible.value = true
    dialogTitle.value = '新增用户'
  } else {
    dialogVisible.value = true
    dialogTitle.value = '编辑用户'
    getUser(val[1])
  }
}

const roleUser = (val) => {
  roleForm.name = val
  roleDialogVisible.value = true
}

const handleDelete = (val) => {
  ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      let res = await deleteUserApi({ name: val })
      if (res.code === 1000) {
        ElMessage({
          type: 'success',
          message: '用户删除成功'
        })
        userCurrentPage.value = 1
        getUserList({ page: 1 })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作'
      })
    })
}

const handleClose = (done: () => void) => {
  dialogVisible.value = false
  // 重置表单
  resertForm(userRuleFormRef.value)
}

const resertForm = (formEl: FormInstance | undefined) => {
  dialogVisible.value = false
  roleDialogVisible.value = false
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (dialogTitle.value === '新增用户') {
        addUser(userForm)
      } else {
        updateUser(userForm)
      }
    }
  })
}

const changeRoleForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let res = await bindRoleApi(roleForm)
      if (res.code === 1000) {
        ElMessage.success('角色绑定成功！！！')
        roleDialogVisible.value = false
        resertForm(roleRuleFormRef.value)
        userCurrentPage.value = 1
        getUserList({ page: 1 })
      }
    }
  })
}

const handleUserSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleUserCurrentChange = (val: number) => {
  userCurrentPage.value = val
  getUserList({ page: userCurrentPage.value })
}

const addUser = async (data) => {
  let res = await addUserApi(data)
  if (res.code === 1000) {
    dialogVisible.value = false
    resertForm(userRuleFormRef.value)
    userCurrentPage.value = 1
    getUserList({ page: 1 })
    ElMessage.success('新增用户成功！')
  } else {
    console.log(`output->11`, 11)
    ElMessage.error(res.msg)
  }
}

const updateUser = async (data) => {
  delete userForm.pwd
  let res = await updateUserApi(data)
  if (res.code === 1000) {
    dialogVisible.value = false
    resertForm(userRuleFormRef.value)
    userCurrentPage.value = 1
    getUserList({ page: 1 })
    ElMessage.success('编辑用户成功！')
  }
}

const getUser = async (val) => {
  let res = await getUserApi({ name: val })
  if (res.code === 1000) {
    userForm.name = res.data[0].name
    userForm.nickname = res.data[0].nickname
    userForm.email = res.data[0].email
    userForm.gender = res.data[0].gender
  }
}

const getUserList = async (data) => {
  let res = await userListApi(data)
  if (res.code === 1000) {
    userTableData.value = res.data
    userTableDataTotal.value = res.total
  }
}

const search = async () => {
  if (inputSearch.value === '') {
    getUserList({ page: 1 })
  } else {
    let res = await getUserApi({ name: inputSearch.value })
    if (res.code === 1000) {
      userTableData.value = res.data
      userTableDataTotal.value = res.total
    }
  }
}

onMounted(() => {
  getUserList({ page: 1 })
})
</script>

<style lang="scss" scoped>
.userManagement-wrap {
  .userManagement-card {
    height: 78vh;
    .search-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      :deep(.el-input) {
        width: 300px;
      }
    }
  }
}
.button-wrap {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.roleForm-wrap,
.userForm-wrap {
  margin-right: 40px;
}
</style>
