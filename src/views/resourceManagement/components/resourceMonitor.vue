<template>
  <div class="resourceMonitor-wrap">
    <el-button type="primary" :icon="CirclePlus" style="margin-bottom: 20px" @click="addPhysicalMachine"> 添加物理机 </el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="物理机名称" width="180" />
      <el-table-column prop="date" label="物理机IP" width="180" />
      <el-table-column prop="address" label="容器资源" />
      <el-table-column prop="address" label="设备资源状态" />
      <el-table-column prop="address" label="状态" />
      <el-table-column fixed="right" label="操作" align="center">
        <template #default="item">
          <el-button link type="primary" size="small"> 编辑 </el-button>
          <el-button link type="danger" size="small"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="添加物理机">
      <el-form :model="form">
        <el-form-item label="物理机名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="物理机ip" :label-width="formLabelWidth">
          <el-input v-model="form.ip" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择物理机状态">
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
import { ref, reactive } from "vue";
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
    name: "物理机1",
    date: "2016-05-03",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "物理机2",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "物理机3",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "物理机4",
    address: "No. 189, Grove St, Los Angeles",
  },
]);

const addPhysicalMachine = () => {
  dialogFormVisible.value = true;
};
</script>

<style lang="scss" scoped>
.resourceMonitor-wrap {
  margin: 15px 0 0 20px;
  .el-select {
    width: 400px;
  }
  .el-input {
    width: 400px;
  }
}
</style>
