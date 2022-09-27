<template>
    <div class="box">
      <h3>修改</h3>
      <div class="herder">
        <!-- <div class="let">
          类型：
         
        </div> -->
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
          >
           <el-form-item label="类型" prop="username">
              <el-radio-group v-model="ruleForm.radio">
                <el-radio :label="1">外来人员</el-radio>
                <el-radio :label="2">老师</el-radio>
                <el-radio :label="3">学生</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="访客名称" prop="username">
              <el-input v-model="ruleForm.username" placeholder='请输入访客名称'/>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="ruleForm.mobile" maxlength="11" placeholder='请输入手机号'/>
            </el-form-item>
            <el-form-item label="openid" prop="openid">
              <el-input v-model="ruleForm.openid" placeholder='请输入openid'/>
            </el-form-item>
            <el-form-item label="身份证号" prop="card">
              <el-input v-model="ruleForm.card" placeholder='请输入身份证号'/>
            </el-form-item>
            <el-form-item label="车牌号" prop="carnumber">
              <el-input v-model="ruleForm.carnumber" placeholder='请输入车牌号'/>
            </el-form-item>
            <el-form-item label="理由" prop="reason">
              <el-input v-model="ruleForm.reason" placeholder='请输入理由'/>
            </el-form-item>
            <el-form-item label="部门" prop="options">
              <doem></doem>
            </el-form-item>
            <!-- 进校时间 -->
              <el-form-item label="进校时间" prop="value1">
                <div class="demo-datetime-picker">
                  <div class="block">
                    <el-date-picker
                      v-model="ruleForm.value1"
                      type="datetime"
                      placeholder="进校时间"
                      @change="format"
                    />
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="离校时间" prop="value2">
                <div class="demo-datetime-picker">
                  <div class="block">
                    <el-date-picker
                      v-model="ruleForm.value2"
                      type="datetime"
                      placeholder="离校时间"
                    />
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="地区" prop="options">
                <elui-china-area-dht @change="onChange"></elui-china-area-dht>
              </el-form-item>
        </el-form>
        
         <div class="lewt">
          是否去过
          <br>
         <el-radio-group v-model="radio1">
            <el-radio :label="1">否</el-radio>
            <el-radio :label="2">是</el-radio>
          </el-radio-group>
          <br>
          高风险区
        </div>
        <div class="lewt">
          是否接触
          <br>
         <el-radio-group v-model="radio2">
            <el-radio :label="1">否</el-radio>
            <el-radio :label="2">是</el-radio>
          </el-radio-group>
          <br>
          过高风险区
        </div>
        <div class="leewt">
          是否离京
         <el-radio-group v-model="radio3">
            <el-radio :label="1">否</el-radio>
            <el-radio :label="2">是</el-radio>
          </el-radio-group>
        </div>
        <div class="leewt">
          健康状态
         <el-radio-group v-model="radio4">
            <el-radio :label="1">良好</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">差</el-radio>
          </el-radio-group>
        </div>
        <div class="ring">
          <p>上传图片</p>
           <el-upload
            class="upload-demo"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或 <em>点击上传</em>
            </div>
          </el-upload>
        </div>
       <el-button type="primary" :plain="true" @click="add">确定</el-button>
      </div>
    </div>
</template>

<script lang="ts" setup>
import {visituseredit} from '../../api/login'
import moment from 'moment'
import {useRouter,useRoute} from 'vue-router'
import { EluiChinaAreaDht } from 'elui-china-area-dht'//省市区
import doem from '../../components/doem.vue'
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat//省市区
import { ref ,reactive,onMounted} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import user from '../../../../../project/Uin-app/community/store/user'

onMounted(()=>{
}) 

const route =useRoute()
const router =useRouter()
const radio = ref(1)
const radio1 = ref(1)
const radio2 = ref(1)
const radio3 = ref(1)
const radio4 = ref(1)
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const datas:any = JSON.parse(route.query.datar)
console.log(datas);
// 定义数据
const ruleForm = reactive({
  username: datas.username,
  mobile: datas.mobile,
  openid: datas.openid,
  card: datas.card,
  carnumber:datas.carnumber,
  reason: datas.reason,
  value1:datas.starttime,
  value2: datas.endtime,
  radio:datas.type,
  id:datas.v_id
})
const format =(value1:any) =>{
  console.log(moment(value1).format('YYYY-MM-DD hh:mm'));
  
}
// 修该接口
const add = async() =>{
  let data ={
    "id":ruleForm.id ,
    "formdata":{
        "type":ruleForm.radio,
        "username": ruleForm.username, 
        "mobile": ruleForm.mobile, 
        "card": ruleForm.card, 
        "carnumber": ruleForm.carnumber, 
        "starttime": moment(ruleForm.value1).format('YYYY-MM-DD hh:mm'),  
        "endtime": moment(ruleForm.value2).format('YYYY-MM-DD hh:mm'),
        "reason":ruleForm.reason,
        "department":"5",
        "travelcode":"1",
        "healthcode":"1",
        "nucleicacid":"1" 
    }
  }
  console.log(data);
  // return
  let res =await visituseredit(data)
  console.log(res);
  ElMessage({
    message: '修改成功.',
    type: 'success',
  })
  router.push('/administration')
}
components: {//省市区
    EluiChinaAreaDht
    doem
}
const onChange =(e:any) =>{//省市区
  const one = chinaData[e[0]]
  const two = chinaData[e[1]]
  console.log(one, two)
}
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入访客名称', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, message: '请输入正确手机号', trigger: 'blur' },
  ],
  card: [
    { required: true, message: '请输入身份证', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  reason: [
    { required: true, message: '请输入访客理由', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ]
})
</script>

<style lang="less" scoped>
  .box{
    width: 98%;
    margin-left: 1%;
  }
  h3{
    font-size: 20px;
    margin-top: 17px;
  }
  .herder{
    width: 366px;
    margin-top: 17px;
    .let{
      margin-top: 20px;
      margin-left: 70px;
      font-size: 12px;
    }
    .el-form-item{
      margin-top: 30px;
    }
  }
  .lewt{
    margin-left: 46px;
    font-size: 12px;
    margin-top: 20px;
    .el-radio-group{
      margin-left: 66px;
    }
  }
  .leewt{
     margin-left: 46px;
    font-size: 12px;
    margin-top: 20px;
    .el-radio-group{
      margin-left: 10px;
    }
  }
  .ring{
    position: absolute;
    right: 500px;
    top: 137px;
    p{
      font-size: 12px;
      margin-right: 10px;
    }
    display: flex;
    .upload-demo{
      width: 360px;
      height: 180px;
    }
  }
</style>