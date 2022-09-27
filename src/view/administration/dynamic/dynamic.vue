<template>
  <div class="hesrder">
     <div class="top">
        <el-input v-model="opoion.selection"
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
        <el-table-column prop="title" label="标题" width="550" align='center'/>
        <el-table-column prop="author" label="作者" width="186" align='center'/>
        <el-table-column prop="keywords" label="关键字" width="550" align='center'/>
        <el-table-column prop="name" label="操作"  align='center'>
          <template #default="scope">
            <el-button type="success"
                      size="small"
                      @click="modify(scope.row)"
                      >修改</el-button>
            <el-button type="danger"
                      size="small"
                      @click="del(scope.row.news_id)"
                      >删除</el-button>
                      <el-button type="info"
                      @click="details"
                      size="small"
                      >详情</el-button>
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
        :total="total.to"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {newsList , newsDel} from '../../../api/dynamic'
import {useRouter} from 'vue-router'
import { reactive,ref,onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const multipleSelection = ref()
const handleSelectionChange = (val:any) => {
  multipleSelection.value = val.map((item:any) =>item.news_id)
  console.log(multipleSelection.value);
  
}
const opoion = reactive({
  selection: "",
  // sfkld
});
// 定义列表数据
const tableData = reactive({
  arr:[]
})
const total =reactive({
  to:0,
  page:1,
  pageSize:10
})
// 校园动态列表
const getList =async () =>{
  let data ={
    page:total.page,
    pageSize:total.pageSize
  }
  let res:any =await newsList(data)
  console.log(res);
  tableData.arr = res.data.list
  total.to = res.data.total
}
// 查询
const query = async() =>{
  let data ={
    idortitle:opoion.selection,
    page:total.page,
    pageSize:total.pageSize
  }
  let res:any = await newsList(data)
  console.log(res);
  tableData.arr = res.data.list
  total.to = res.data.total
}
// 单删
const del = async(val:any) =>{
  console.log(val);
  let data ={
    news_id: val
  }
  let res = await newsDel(data)
  console.log(res);
  getList()
}
// 批删
const batchDel = () =>{
  let data ={
    news_id:multipleSelection.value
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
      let res =await newsDel(data)
      console.log(res);
      getList()
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
// 添加
const addTo = () =>{
  router.push('dynamicAdd')
}
// 修改
const modify = (data:any) =>{
  console.log(data);
  router.push('/dynamicModify?data='+JSON.stringify(data))
}
// 详情
const details = () =>{
  router.push('/dynamicDetails')
}
// 当页码变化时触发的函数
const handleSizeChange = (val: number) => {
  total.pageSize = val
  getList()
  console.log(`显示${val} 页`)
}
// 当每页显示多少条变化时候触发
const handleCurrentChange = (val: number) => {
  total.page = val
  getList()
  console.log(`当前第: ${val}页`)
}
onMounted(() =>{
  getList()
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