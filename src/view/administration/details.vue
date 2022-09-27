<template>
  <div class="top">
    <div class="left">
      <p>访客名：{{datas.arr.username}}</p>
      <p>部门：{{datas.arr.departmentname}}</p>
      <p>手机号：{{datas.arr.mobile}}</p>
      <p>身份证号：{{datas.arr.card}}</p>
      <p>车牌号：{{datas.arr.carnumber}}</p>
      <p>进校时间：{{datas.arr.starttime}}</p>
      <p>离校时间：{{datas.arr.endtime}}</p>
      <p style="display:flex ;">状态：
      <div v-if="datas.arr.status==1">待初审</div>
      <div v-if="datas.arr.status==2">二审</div>
      <div v-if="datas.arr.status==3">终审</div>
      </p>
      <p style="display:flex ;">类型：
      <div v-if="datas.arr.type==1">外来人员</div>
      <div v-if="datas.arr.type==2">老师</div>
      <div v-if="datas.arr.type==3">学生</div>
      </p>
      <p style="display:flex ;">是否去过高风险区：
      <div v-if="datas.arr.is_go_danger==0">否</div>
      <div v-if="datas.arr.is_go_danger==1">是</div>
      </p>
      <p style="display:flex ;">是否接触过高风险区：
      <div v-if="datas.arr.is_contact_danger==0">否</div>
      <div v-if="datas.arr.is_contact_danger==1">是</div>
      </p>
      <p style="display:flex ;">是否离京：
      <div v-if="datas.arr.is_leave==0">否</div>
      <div v-if="datas.arr.is_leave==1">是</div>
      </p>
      <p>地址：{{datas.arr.address}}</p>
    </div>
    <div></div>
  </div>
</template>

<script setup lang='ts'>
import { visitusershow } from "../../api/login";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const data:any = JSON.parse(route.query.data)
const datas = reactive({
  arr: data,
});
console.log(datas.arr);

</script>

<style scoped>
p {
  margin-top: 30px;
  margin-left: 130px;
}
</style>