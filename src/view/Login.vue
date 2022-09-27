<template>
  <div class="loginPage">
    <div class="login">
      <div class="headTap">
        <div @click="loginOrRegister(0)" :class="gftcr  === 0 ? 'loginMethod' : ''">
          登录
        </div>
      </div>
      <div class="form">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="40px"
          class="demo-ruleForm">
          <el-form-item label="" prop="admin_name">
            <el-input v-model="ruleForm.admin_name" placeholder="Username"/>
          </el-form-item>
          <el-form-item label="" prop="pwd" >
            <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" :show-password="true" placeholder="Password"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)" v-if="!isLoginOrRegister">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { login } from '../api/login'
import { ref, reactive, toRefs } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router';
const ruleFormRef = ref<FormInstance>()


const router = useRouter()
const isLoginOrRegister = ref(0)

const loginOrRegister = (val:number) => {
  isLoginOrRegister.value = val
}
// 验证表单
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入正确的用户名'))
  }
  callback()
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入登录密码'))
  }
  callback()
}
const rules = reactive({
  pwd: [{ validator: validatePass, trigger: 'blur' }],
  admin_name: [{ validator: checkAge, trigger: 'blur' }],
})
// 定义数据
const ruleForm = reactive({
  admin_name: '',
  pwd: '',
})

// 登录
const loginway = async () => {
  let params = {
    'admin_name':ruleForm.admin_name,
    'pwd':ruleForm.pwd,
  }
  // 登录成功后跳转
  const res:any = await login(params)
  console.log(res);
  if(res.code=='10000'){
    sessionStorage.setItem('login',JSON.stringify(params))
    window.sessionStorage.setItem('token', res.data)
    router.push('/index')
  }
}

// 判断是登录还是注册
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if(isLoginOrRegister.value===0){
        loginway()
      }else{
        // registerway()
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>
<style lang='less' scoped>
.loginPage {
  width: 100%;
  height: 100vh;
  // background-image: url('../../public/1.jpg');
  background-image: url('https://s1.ax1x.com/2022/09/14/vvRj3j.jpg');
  background-size: cover;
  background-position: 50%;
  position: relative;

  .login {
    width: 400px;
    height: 400px;
    
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .headTap{
      height: 50px;
      display: flex;
      padding-bottom: 10px;
      box-sizing: border-box;
      font-weight: bold;
      div{
        height: 50px;
        padding-bottom: 10px;
        box-sizing: border-box;
        color: #fff;
        font-size: 30px;
      }
    }
    .form{
      width: 350px;
      margin-top: 20px;
    }
  }
}
/deep/ .el-input__wrapper{
  background-color: rgb(40, 52, 67) !important;
  
  height: 50px;
  border-radius: 10px;
  
}
/deep/ .el-input__inner{
  // width: 448px !important;
  color: #fff;
  border: 1px solid rgb(40, 52, 67) !important;
}
</style>