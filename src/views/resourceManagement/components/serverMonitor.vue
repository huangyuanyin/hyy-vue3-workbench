<template>
  <div class="serverMonitor-wrap">
    <el-button type="primary" :icon="CirclePlus" style="margin-bottom: 20px" @click="addHost"> 添加主机 </el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="主机名称" width="180" />
      <el-table-column prop="ip" label="主机IP" width="180" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template #default="item">
          <el-button link type="primary" size="small"> 编辑 </el-button>
          <el-button link type="primary" size="small"> 关闭 </el-button>
          <el-button link type="danger" size="small"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="添加主机">
      <el-form :model="form">
        <el-form-item label="主机名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主机ip" :label-width="formLabelWidth">
          <el-input v-model="form.ip" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择主机状态">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { CirclePlus } from "@element-plus/icons-vue";

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const form = reactive({
  name: "",
  ip: "",
  region: "",
});

const tableData = ref([
  {
    name: "主机1",
    ip: "10.4.150.55",
    status: "运行中",
  },
  {
    ip: "10.4.150.55",
    name: "主机2",
    status: "运行中",
  },
  {
    ip: "10.4.150.55",
    name: "主机3",
    status: "运行中",
  },
  {
    ip: "10.4.150.55",
    name: "主机4",
    status: "运行中",
  },
]);
const addHost = () => {
  dialogFormVisible.value = true;
};
</script>

<style lang="scss" scoped>
.serverMonitor-wrap {
  margin: 15px 0 0 20px;
}
</style>
