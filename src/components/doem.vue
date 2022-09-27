<template>
 <div>
  <el-cascader popper-class="theder" :props="props.prop" :options="opeions" size="small" v-model="department" placeholder="请选择部门" clearable ref="depiyRefs"
   @change="searchdep" />
 </div>
</template>
<script lang='ts' setup>
import { ref, reactive, toRefs } from 'vue'
import { departmentlist } from '../api/login'
const opeions = ref([])
const depiyRefs:any = ref('')
const department = ref('')
const props:any = reactive({
 prop: {
  value: "id",
  label: "name",
  children:"son",
  expandTrigger: "hover",
  checkStrictly: true,
 },
}); 
const getData = async() => {
 const res:any = await departmentlist({})
 console.log(res);
 if(res.code=='10000'){
  opeions.value = res.data
 }
}
 
getData()
const searchdep = (val: any) => {
 console.log(depiyRefs.value);
}
</script>
<style lang="less">
/deep/ .el-input{
  height: 50px !important;
}
.theder {
 .el-cascader-panel {
  .el-cascader-menu {
   .el-radio {
    height: 100%;
    width: 150px;
    opacity: 0;
    position: absolute;

    // z-index: 10;
    .el-radio__input {
     .el-radio__inner {
      border: 0px;
     }
    }

    .el-radio__input.is-checked {
     .el-radio__inner {
      background: none;
     }
    }
   }
  }
 }
}
</style>