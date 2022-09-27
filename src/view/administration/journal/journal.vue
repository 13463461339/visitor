<template>
  <div class="hesrder">
     <div class="top">
        <el-input v-model="opoion.selection"
                  placeholder="请输入访客名称" />
        <el-button type="primary"      
                  size="small">查询</el-button>
                  <!-- @click="query" -->
    </div>
    <!-- 列表展示 -->
    <div>
      <el-table :data="tableData.arr" border  style="width: 100%">
        <el-table-column prop="title" label="访客人姓名" width="550" align='center'/>
        <el-table-column prop="author" label="核销人姓名" width="186" align='center'/>
        <el-table-column prop="keywords" label="核销时间" width="550" align='center'/> 
      </el-table>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {reactive,ref} from 'vue'

const opoion =reactive({
  selection:''
})
// 定义列表数据
const tableData = reactive({
  arr:[]
})
const total =reactive({
  to:0,
  page:1,
  pageSize:10
})
</script>

<style lang='less' scoped>
.hesrder {
  width: 97%;
  margin-left: 2%;
}

.top{
  margin-top: 15px;
  margin-bottom: 15px;
  .el-input {
  width: 170px !important;
  height: 26px !important;
  margin-right: 16px;
}
}
</style>