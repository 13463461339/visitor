<template>
  <div class="hesrder">
     <div class="top">
        <el-input v-model="opoion.selection"
                  placeholder="请输入访客名称" />
        <el-button type="primary"  
                   @click="auditlog"    
                  size="small">查询</el-button>
                  <!-- @click="query" -->
    </div>
    <!-- 列表展示 -->
      <el-table :data="tableData.arr" border  style="width: 100%">
        <el-table-column prop="username" label="审核人" width="220" align='center'/>
        <el-table-column prop="visitor" label="来访人" width="220" align='center'/>
        <el-table-column prop="mobile" label="来访人电话" width="220" align='center'/>
        <el-table-column prop="carnumber" label="来访人车牌号" width="186" align='center'/>
        <el-table-column prop="addtime" label="审核时间" width="220" align='center'/> 
        <el-table-column  label="审核状态" width="220" align='center'>
          <template #default="scope">
            <div v-if="scope.row.status == 3">一审</div>
            <div v-if="scope.row.status == 2">待二审</div>
            <div v-if="scope.row.status == 1">终审</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作"  align='center'>
          <template #default="scope">
            <el-button type="danger"
                size="small"
                @click="del(scope.row.logid)"
                >删除</el-button>
            <el-button type="info"
                size="small"
                >详情</el-button>          
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      :v-model:currentPage="currentPage4"
      :v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total.to"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang='ts' setup>
import {auditlogList,auditlogDel} from '../../../api/examine'
import {reactive,ref,onMounted} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const currentPage4 = ref(1)
const pageSize4 = ref(10)
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
// 列表和查询
const auditlog =async () =>{
  let data ={
    page: total.page,
    pageSize:total.pageSize,
    username :opoion.selection
  }
  let res:any =await auditlogList(data)
  console.log(res);
  tableData.arr = res.data.list
  total.to = res.data.total
}
// 删除
const del = (val:any) =>{
  console.log(val);
  let data ={
    logid:val
  }
   ElMessageBox.confirm(
    '请问确定要删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      let res =await auditlogDel(data)
      console.log(res);
      auditlog()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
// 当页码变化时触发的函数
const handleSizeChange = (val: number) => {
  total.pageSize = val
  auditlog()
  console.log(`${val} items per page`)
}
// 当每页显示多少条变化时候触发
const handleCurrentChange = (val: number) => {
  total.page = val
  auditlog()
  console.log(`current page: ${val}`)
}
onMounted(() =>{
  auditlog()
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