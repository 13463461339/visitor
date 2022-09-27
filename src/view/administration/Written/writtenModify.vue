<template>
  <div class="box">
    <h3>修改</h3>
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
          <el-input v-model="ruleForm.job" />
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
import {reviewerEdit} from '../../../api/written'
import {useRouter} from 'vue-router'
import { reactive, ref } from 'vue'
import doem from '../../../components/doem.vue'
import { ElMessage } from 'element-plus'
import {useRoute} from 'vue-router'



comments:{
  doem
}
const route =useRoute()
const receive:any = JSON.parse(route.query.val)
console.log(receive);
const router = useRouter()
const formSize = ref('default')
const ruleForm = reactive({
  name: receive.reviewer_name,
  openid:receive.openid,
  mobile:receive.mobile,
  job:receive.job,
  value2:true,
  id:receive.id

})
const determine =async () =>{
  let data ={
    id:ruleForm.id,
      reviewer_name: ruleForm.name, 
      openid: ruleForm.openid, 
      mobile: ruleForm.mobile, 
      department: "保卫处", 
      job: ruleForm.job,
      is_use:"1"
    
  }
  let res =await reviewerEdit(data)
  console.log(res);
  ElMessage({
    message: '修改成功.',
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