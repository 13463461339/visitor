<template>
  <div class="box">
    <h3>添加</h3>
    <div class="top">
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="审核人姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="openid" prop="openid">
          <el-input v-model="ruleForm.openid" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" >
          <el-input v-model="ruleForm.mobile" maxlength="11"/>
        </el-form-item>
        <el-form-item label="部门" prop="openid">
          <doem></doem>
        </el-form-item>
        <el-form-item label="职务" prop="department">
          <el-input v-model="ruleForm.department" />
        </el-form-item>
        <el-form-item label="是否启用" prop="department">
          <el-switch
            v-model="ruleForm.value2"
            class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
        </el-form-item>
        <el-button type="primary"  @click="determine">确定</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reviewerAdd} from '../../../api/written'
import {useRouter} from 'vue-router'
import { reactive, ref } from 'vue'
import doem from '../../../components/doem.vue'
import { ElMessage } from 'element-plus'

components:{
  doem
}
const router = useRouter()
const formSize = ref('default')
const ruleForm = reactive({
  name: '',
  openid:'',
  mobile:'',
  department:'',
  value2:true
})
const determine =async () =>{
  let data ={
    reviewer_name: ruleForm.name, 
    openid: ruleForm.openid, 
    mobile: ruleForm.mobile, 
    department: "保卫处", 
    job: ruleForm.department,
    is_use:"1"
  }
  let res =await reviewerAdd(data)
  console.log(res);
  ElMessage({
    message: '添加成功.',
    type: 'success',
  })
  router.push('/written')
}
const rules = reactive({
  name: [
    { required: true, message: '请输入审核姓名', trigger: 'blur' },
  ],
  openid: [
    { required: true, message: '请输入openid', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11,  message: '请输入有效的手机号', trigger: 'blur' },
  ],
  department: [
    { required: true, message: '请输入部门', trigger: 'blur' },
  ],
})
</script>

<style lang="less" scoped>
  .box{
    width: 98%;
    margin-left: 1%;
    h3{
      height: 24px;
      margin: 20px 0;
    }
    .top{
      margin-top: 50px;
      width: 500px;
    }
  }
</style>