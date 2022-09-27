<template>
  <div class="herder">
    <!-- 头部 -->
    <div class="top">
      <el-input v-model="option.username"
                placeholder="请输入访客名称" />
      <el-input v-model="option.mobile"
                placeholder="请输入手机号" />
      <!-- 请选择人员类型 -->
      <el-select v-model="option.type"
                 class="m-2"
                 placeholder="请选择人员类型">
        <el-option value='1'
                   label="外来人员"></el-option>
        <el-option value='2'
                   label="老师"></el-option>
        <el-option value='3'
                   label="学生"></el-option>
      </el-select>
      <!-- 是否离校 -->
      <el-select v-model="option.is_leave"
                 class="m-2"
                 placeholder="是否离校">
        <el-option value='0'
                   label="否"></el-option>
        <el-option value='1'
                   label="是"></el-option>
      </el-select>
      <!-- 请选择审核状态 -->
      <el-select v-model="option.status"
                 class="m-2"
                 placeholder="请选择审核状态">
        <el-option value='1'
                   label="待初审"></el-option>
        <el-option value='2'
                   label="二审"></el-option>
        <el-option value='3'
                   label="终审"></el-option>
      </el-select>
      <!-- 请选择部门 -->
      <!-- <el-cascader :options="options" clearable placeholder="请选择部门" /> -->
      <doem v-model="option.department"></doem>
      <!-- 进校时间 -->
      <div class="demo-datetime-picker">
        <div class="block">
          <el-date-picker v-model="option.time"
                          type="datetime"
                          placeholder="进校时间" />
        </div>
      </div>
      <div class="demo-datetime-picker">
        <div class="block">
          <el-date-picker v-model="option.time1"
                          type="datetime"
                          placeholder="离校时间" />
        </div>
      </div>
    </div>
    <!-- 按钮添加 -->
    <div class="cen">
      <el-button type="primary"
                 size="small"
                 @click="arquery">查询</el-button>
      <el-button @click="openAdd"
                 type="success"
                 size="small">添加</el-button>
      <el-button type="warning"
                 size="small">批量审核</el-button>
      <el-button type="info"
                 size="small">批量导出</el-button>
      <el-button type="warning"
                 size="small">批量导入</el-button>
      <el-button @click="batchdel"
                 type="danger"
                 size="small">批量删除</el-button>
    </div>
    <!-- 表单 -->
    <el-table :data="tableData.tableArr"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55" />
      <el-table-column prop="username"
                       label="用户名"
                       width="140"
                       align="center" />
      <el-table-column prop="mobile"
                       label="手机号"
                       width="150"
                       align="center" />
      <el-table-column prop="department"
                       label="部门"
                       width="140"
                       align="center" />
      <el-table-column prop="starttime"
                       label="进校时间"
                       width="154"
                       align="center" />
      <el-table-column prop="endtime"
                       label="离校时间"
                       width="154"
                       align="center" />
      <el-table-column prop="typename"
                       label="人员类型"
                       width="140"
                       align="center" >
          <template #default="scope">
          <div class="eee"
               v-if="scope.row.type==1">外来人员</div>
          <div class="eee"
               v-if="scope.row.type==2">老师</div>
          <div class="eee"
               v-if="scope.row.type==3">学生</div>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       width="140"
                       align="center">
        <template #default="scope">
          <div class="eee"
               v-if="scope.row.status==0">待初审</div>
          <div class="eee"
               v-if="scope.row.status==1">一审</div>
          <div class="eee"
               v-if="scope.row.status==2">二审</div>
          <div class="eee"
               v-if="scope.row.status==3">终审</div>
        </template>
      </el-table-column>
      <el-table-column label="是否离校"
                       width="140"
                       align="center">
        否
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template #default="scope">
          <el-button type="primary"
                     size="small">审核</el-button>
          <el-button type="success"
                     size="small"
                     @click="modify(scope.row)">修改</el-button>
          <el-button type="danger"
                     size="small"
                     @click="del(scope.row)">删除</el-button>
          <el-button type="info"
                     size="small"
                     @click="details(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination :v-model:currentPage="currentPage4"
                     :v-model:page-size="pageSize4"
                     :page-sizes="[10, 20, 30, 40]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total.to"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import doem from "../../components/doem.vue";
import { visituserList, visituserDel } from "../../api/login"; //请求的接口
import { useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus"; //弹出框删除时使用
import { ElTable } from "element-plus";

const router = useRouter();
const multipleSelection = ref([]);
const currentPage4 = ref(1); //第几页
const pageSize4 = ref(10); //每页显示多少条
// const value = ref('')
// const value1 = ref('')//选择时间
// 定义列表数据
const tableData = reactive({
  tableArr: [],
  page: 1,
  pageSize: 10,
});
const total = reactive({
  to: 0,
});
// 请求访客管理列表接口
const getvisituserList = async () => {
  let params = {
    page: tableData.page,
    pageSize: tableData.pageSize,
  };
  const res: any = await visituserList(params);
  console.log(res, "访客管理列表");
  tableData.tableArr = res.data.findvisiuser.list;
  total.to = res.data.findvisiuser.total;
};
// 单删
const del = (val: any) => {
  console.log(val);
  let data = {
    v_id: val.v_id,
  };
  ElMessageBox.confirm("此操作将永久删除数据，是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await visituserDel(data);
      console.log(res);
      getvisituserList();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
onMounted(() => {
  getvisituserList();
});

// 选择部门
const options = [
  {
    value: "1",
    label: "经管本部",
    children: [
      {
        value: "1",
        label: "招生办",
      },
      {
        value: "2",
        label: "学生办",
      },
      {
        value: "3",
        label: "总务处",
      },
    ],
  },
  {
    value: "2",
    label: "合作但我",
    children: [
      {
        value: "1",
        label: "乐柠教育",
      },
      {
        value: "2",
        label: "学生办",
      },
      {
        value: "3",
        label: "总务处",
      },
    ],
  },
];
// 获取复选框按钮ID
const handleSelectionChange = (val: any) => {
  // multipleSelection.value = val
  multipleSelection.value = val.map((item: any) => item.v_id);
  // console.log(val);
  console.log(multipleSelection.value);
};
// 批量删除
const batchdel = () => {
  ElMessageBox.confirm("此操作将永久删除数据，是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let idList = {
        v_id: multipleSelection.value,
      };
      const res = await visituserDel(idList);
      console.log(res);
      getvisituserList();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
// 当页码变化时触发的函数
const handleSizeChange = (val: number) => {
  tableData.pageSize = val;
  getvisituserList();
  console.log(`显示${val} 页`);
};
// 当每页显示多少条变化时候触发
const handleCurrentChange = (val: number) => {
  tableData.page = val;
  getvisituserList();
  console.log(`当前第: ${tableData.page}页`);
};
// 添加
const openAdd = () => {
  router.push("/add");
};
// 详情
const details = (data: any) => {
  router.push("/details?data=" + JSON.stringify(data));
};
// 修改
const modify = (datar: any) => {
  router.push("/modify?datar=" + JSON.stringify(datar));
  // console.log(id);
};
// 查询定义数据
const option = reactive({
  username: "",
  mobile: "",
  type: "",
  is_leave: "",
  status: "",
  department: "",
  time: "",
  time1: "",
});
// 查询
const arquery = async () => {
  let datar = {
    idorname: option.username,
    mobile: option.mobile,
    starttime: option.time,
    endtime: option.time1,
    department: option.department,
    status: option.status, //预约级别 0 初始状态 1 一审  2 二审 3 终审
    is_leave:option.is_leave,
    type: option.type,
  };
  let res = await visituserList(datar);
  console.log(res);
  // tableData.tableArr = res.data;
  // total.to = res.total
  tableData.tableArr = res.data.findvisiuser.list;
  total.to = res.data.findvisiuser.total;
};
</script>

<style lang="less" scoped>
.herder {
  width: 98%;
  padding-left: 1%;
}
.top {
  display: flex;
  margin-top: 24px;
  overflow: hidden;
}
.el-input {
  width: 170px !important;
  margin-right: 6px;
}
.el-select {
  width: 170px !important;
  margin-right: 6px;
}
/deep/ .el-cascader {
  width: 160px !important;
  margin-right: 6px;
}
/deep/ .dialog {
  width: 110px !important;
  margin-right: 6px;
}
.cen {
  height: 54px;
  margin-top: 30px;
}
/deep/ .el-table__row {
  height: 50px;
  font-size: 12px;
}
.eee {
  width: 58px;
  height: 28px;
  background-color: #e8f4ff;
  border-color: #d1e9ff;
  color: #1890ff;
  margin-left: 30px;
}
</style>