<template>
  <div class="quan">
    <div class="whole quan">
      <div class="top">
          <div class="box">
            <p>
              <span>今日访客</span>
              <b>{{visitlist.currentday.total}}</b>
            </p>
            <div class="odd">
              <h6>待审核：{{visitlist.currentday.wait}} 人</h6>
              <h5>未通过：{{visitlist.currentday.pass}} 人<span>已取消：{{visitlist.currentday.cancel}} 人</span></h5>
            </div>
          </div>
           <div class="box">
            <p class="p2">
              <span>昨日访客</span>
              <b>{{visitlist.yesterday.total}}</b>
            </p>
             <div class="odd">
              <h6>待审核：{{visitlist.yesterday.wait}} 人</h6>
              <h5>未通过：{{visitlist.yesterday.pass}} 人<span>已取消：{{visitlist.yesterday.cancel}} 人</span></h5>
            </div>
          </div>
           <div class="box">
            <p class="p3">
               <span>最近七天</span>
              <b>{{visitlist.week.total}}</b>
            </p>
             <div class="odd">
              <h6>待审核：{{visitlist.week.wait}} 人</h6>
              <h5>未通过：{{visitlist.week.pass}} 人<span>已取消：{{visitlist.week.cancel}} 人</span></h5>
            </div>
          </div>
           <div class="box">
            <p class="p4">
               <span>近三十天</span>
              <b>{{visitlist.month.total}}</b>
            </p>
             <div class="odd">
              <h6>待审核：{{visitlist.month.wait}} 人</h6>
              <h5>未通过：{{visitlist.month.pass}} 人<span>已取消：{{visitlist.month.cancel}} 人</span></h5>
            </div>
          </div>
          <div class="box">
            <p class="p5">
               <span>最近一年</span>
              <b>{{visitlist.year.total}}</b>
            </p>
             <div class="odd">
              <h6>待审核：{{visitlist.year.wait}} 人</h6>
              <h5>未通过：{{visitlist.year.pass}} 人<span>已取消：{{visitlist.year.cancel}} 人</span></h5>
            </div>
          </div>
      </div>
      <!-- 图表 -->
      <div class="cen" id="mian" ></div>
      <!-- 本周详情 -->
      <div class="butto">
        <div class="header">本周详情</div>
        <div>
          <div class="el-card__body">
            <p>本周人员统计表：</p>
            <table class="obj" border="1px solid #e7ecf0" cellpadding=0 cellspacing=0>
              <tr>
                <td>日期</td>
                <td>人数</td>
                </tr>
                <tr v-for="item in visitlist.weekday" :key="item.id">
                <td>{{item.time}}</td>
                <td>{{item.num}}</td>
                </tr>
            </table>
          </div>
          <div class="el-card__body">
            <p>本周人员申请类型表：</p>
            <table border="1px solid #e7ecf0" cellpadding=0 cellspacing=0>
              <tr>
                <td>日期</td>
                <td>类型</td>
                <td>人数</td>
                </tr>
                <tr v-for="item in visitlist.weektype" :key="item.id">
                <td>{{item.time}}</td>
                <td>
                  <div v-if="item.type==1">外来</div>
                  <div v-if="item.type==2">老师</div>
                  <div v-if="item.type==3">学生</div>
                </td>
                <td>{{item.num}}</td>
                </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang='ts' setup>
import {visituser,admin} from '../api/login'
// import { ref, reactive, toRefs } from 'vue'
import * as echarts from 'echarts';
import { reactive ,onMounted} from 'vue'
const visitlist = reactive({
  currentday:{},
  yesterday:{},
  week:{},
  month:{},
  year:{},
  weekday:{},
  weektype:{}

})
// 请求访客记录
const  getvisituser =async () => { 
  const res = await visituser({})
  console.log(res,'访客统计');
  visitlist.currentday = res.data.currentday
  visitlist.yesterday = res.data.yesterday
  visitlist.week = res.data.week
  visitlist.month = res.data.mouth
  visitlist.year = res.data.year
  visitlist.weekday = res.data.weekday
  visitlist.weektype = res.data.weektype
}
const getadmin =async () => {
  let data ={
    token:sessionStorage.getItem('token')
  }
  let res =await admin(data)
  console.log(res);
  window.sessionStorage.setItem('admin',JSON.stringify(res.data.admin1))
  
}
getvisituser()
// 图表
onMounted(() => {
  
  getadmin()
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('mian')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;
  option = {
  title: {
    text: '访客记录变化图'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['近七天总数', '近七天外来人员', '近七天来访老师', '近七天来访学生']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2022-9-15', '2022-9-16']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '近七天总数',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '近七天外来人员',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 200, 130, 210]
    },
    {
      name: '近七天来访老师',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 30, 110]
    },
    {
      name: '近七天来访学生',
      type: 'line',
      stack: 'Total',
      data: [120, 232, 221, 134, 30, 190, 220]
    }
  ]
};

option && myChart.setOption(option);

})

</script>

<style lang="less" scoped>
.quan{
  min-height: calc(100vh - 114px);
}
  .whole{
    width: 99%;
    height: 100%;
    margin-top: 30px;
    background: #f0f2f5;
    padding-left: 1%;
    .top{
      width: 100%;
      height: 250px;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      // background: red;
      .box{
        width: 440px;
        height: 95px;
        margin-top: 30px;
        margin-right: 56px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        p{
          width: 176px;
          height: 100%;
          background-color: #54adeb;
          border-radius: 10px;
        }
        .p2{
          background-color: #fa5822;
        }
        .p3{
          background-color: #009789;
        }
        .p4{
          background-color: #f7b824;
        }
        .p5{
          background-color: #304156;
        }
      }
    }
  }
  .box{
    p{
      width: 176px;
      span{
        display: block;
        color: #fff;
        font-size: 14px;
        padding-top: 3px;
        margin-left: 3px;
      }
      b{
        display: block;
        width: 100%;
        font-size: 38px;
        color: #fff;
        margin-top: 10px;
        text-align: center;
      }
    }
  }
  .odd{
    margin-left: 16px;
    h6{
      font-size: 16px;
      font-weight: normal;
      margin-top: 40px;
    }
    h5{
      font-size: 14px;
      font-weight: normal;
      margin-top: 4px;
      span{
        margin-left: 10px;
      }
    }
  }
  .cen{
    width: 1500px;
    height: 400px;
    background-color: #fff;
    margin-top: 35px;
  }
  .butto{
    width: 1500px;
    // height: 288px;
    margin-top: 35px;
    background-color: #fff;
    .header{
      width: 100%;
      height: 55px;
      border-bottom: 2px solid #f0f3f9;
      line-height: 55px;
      font-size: 16px;
      color: #2e2f31;
    }
    div{
      display: flex;
      justify-content: space-evenly;
      margin-top: 16px;
    }
  }
  .obj{
    height: 36px;
  }
  .el-card__body{
        display: flex;
        p{
          font-size: 16px;
          color: #2f3031;
          font-weight: 550;
        }
        tr{
          
          height: 36px;
          td{
            width: 136px;
            // height: 36px;
            text-align: center;
            font-size: 14px;
            color: #919499;
          }
        }
      }
</style>