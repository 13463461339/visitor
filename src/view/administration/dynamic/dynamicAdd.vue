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
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="ruleForm.keywords" />
        </el-form-item>
        <el-form-item label="作者" prop="author" >
          <el-input v-model="ruleForm.author" maxlength="11"/>
        </el-form-item>
        <el-form-item label="介绍" prop="content">
          <el-input v-model="ruleForm.content" type="textarea"/>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-upload
            class="avatar-uploader"
            action="http://visit.lening365.com/visit/api/upload"
            :headers="hesrder"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :multiple="true"
            :limit="3"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <!-- <richText></richText> -->
        <el-button type="primary"  @click="determine">确定</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {newsAdd} from '../.././../api/dynamic'
import {useRouter} from 'vue-router'
import {reactive,ref} from 'vue'
import { ElMessage } from 'element-plus'
// import richText from '../../../components/richText.vue'
import { Plus } from '@element-plus/icons-vue' 
import type { UploadProps } from 'element-plus'

components:{
  // richText
}
const router = useRouter()
// 取token
const hesrder = reactive({
  Authorization:sessionStorage.getItem('token')
})
const formSize = ref('default')
const ruleForm = reactive({
  title: '',
  keywords:'',
  author:'',
  content:'',
  thumb:''
})
// 加正则
const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  keywords: [
    { required: true, message: '请输入关键字', trigger: 'blur' },
  ],
  author: [
    { required: true, message: '请输入作者', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请填写介绍', trigger: 'blur' },
  ],
})
// 图片上传
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  ruleForm.thumb = response.data.src
  ElMessage.success('上传成功')
  console.log(response);
  return true
}
// 确定按钮
const determine = async() =>{
  let res =await newsAdd(ruleForm)
  console.log(res);
  router.push('/dynamic')
}
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
  .avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/deep/ .el-upload{
  border: 1px dashed #000000 !important;
  border-radius: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>