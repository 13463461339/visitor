<template>
  <div class="hesrder">
    <div class="top">
      <el-input v-model="opoion.username"
                placeholder="请输入访客名称" />
      <el-button type="primary"
                  @click="query"
                 size="small">查询</el-button>
      <el-button type="success"
                  @click="addTo"
                 size="small">添加</el-button>
      <el-button type="danger"
                  @click="batchDel"
                 size="small">批量删除</el-button>
    </div>
    <!-- 列表展示 -->
    <div>
      <el-table :data="tableData.arr" border @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="reviewer_name" label="核销人名字" width="236" align='center'/>
        <el-table-column prop="mobile" label="手机号" width="236" align='center'/>
        <el-table-column prop="department" label="部门" width="236" align='center'/>
        <el-table-column prop="job" label="职务" width="236" align='center'/>
        <el-table-column  label="是否启用" width="236" align='center'>
          <template  #default="scope">
            <el-switch
            v-model="scope.row.is_use"
            class="ml-2"
            :inactive-value="0"
            :active-value="1"
            label="是否启用"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          >
          </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作"  align='center'>
          <template #default="scope">
            <el-button type="success"
                      size="small"
                      @click="modify(scope.row)"
                      >修改</el-button>
            <el-button type="danger"
                      size="small"
                      @click="del(scope.row.id)"
                      >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="demo-pagination-block">
      <el-pagination
        :v-model:currentPage="currentPage4"
        :v-model:page-size="pageSize4"
        :page-sizes="[ 10, 15, 20,30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals.to"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reviewerList ,reviewerDel} from '../../../api/written'
import { reactive,ref,onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router'

const router = useRouter()
const currentPage4 = ref(1)
const pageSize4 = ref(10)
// const value2 = ref(true)
const multipleSelection = ref()
const handleSelectionChange = (val:any) => {
  multipleSelection.value = val.map((item:any) =>item.id)
  console.log(multipleSelection.value);
  
}
// input
const opoion = reactive({
  username: "",
  value2: true
});
// 定义列表数据
const tableData = reactive({
  arr:[]
})
const totals =reactive({
  to:0,
  page: 1,
  pageSize:10 
})
// 列表展示
const getreviewer =async () =>{
  let data ={
    page:totals.page,
    pageSize:totals.pageSize
  }
  let res:any =await reviewerList(data)
  console.log(res);
  tableData.arr = res.data.list
  totals.to =res.data.total
}
// 当页码变化时触发的函数
const handleSizeChange = (val: number) => {
  totals.pageSize = val
  getreviewer()
  console.log(`显示${val} 页`)
}
// 当每页显示多少条变化时候触发
const handleCurrentChange = (val: number) => {
  totals.page = val
  getreviewer()
  console.log(`当前第: ${val}页`)
}
// 单删
const del = (id:any) =>{
  console.log(id);
  ElMessageBox.confirm(
    '确定要删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      let data={
        id:id
      }
      let res =await reviewerDel(data)
      console.log(res);
      getreviewer()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
  
}
// 批量删除
const batchDel = () =>{
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
      let data ={
        id:multipleSelection.value
      }
      let res =await reviewerDel(data)
      console.log(res);
      getreviewer()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
// 查询
const query =async () =>{
  let data ={
    idorname:opoion.username
  }
  let res:any =await reviewerList(data)
  console.log(res);
  tableData.arr = res.data.list
  totals.to =res.data.total
}
// 添加
const addTo = () =>{
  router.push('/wittenAdd')
}
// 修改
const modify = (val:any) =>{
  console.log(val);
  router.push('/writtenModify?val='+JSON.stringify(val))
  
}
onMounted(()=>{
  getreviewer()
})
</script>

<style lang="less" scoped>
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