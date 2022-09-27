<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="box">
          <img class="img" src="https://s1.ax1x.com/2022/09/15/vxdUP0.jpg" alt="">
          <h1 class="brv">北京科技经营管理学院</h1>
        </div>
        <el-menu default-active="/index" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" 
          text-color="#fff" @open="handleOpen" router @close="handleClose">
          <el-menu-item index="/info">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="">
            <template #title>
              <el-icon> 
              <document />
            </el-icon>
             
              <span>访客管理</span> 
            </template>
            <el-menu-item index="/administration">访客管理</el-menu-item>
            <el-menu-item index="/written">核销人管理</el-menu-item>
            <el-menu-item index="/dynamic">校园动态管理</el-menu-item>
            <el-menu-item index="/examine">审核日志</el-menu-item>
            <el-menu-item index="/journal">核销日志</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/trajectory">
            <template #title>
              <el-icon> 
              <document />
            </el-icon>
              <span>行程管理</span> 
            </template>
            <el-menu-item index="/trajectory">轨迹管理</el-menu-item>
            <el-menu-item index="/position">点位管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/role">
            <template #title>
             <el-icon>
                <location /> 
             </el-icon>
              <span>权限管理</span> 
            </template>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/administrators">管理员管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/system">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>设置</span> 
            </template>
            <el-menu-item index="/system">系统设置</el-menu-item>
            <el-menu-item index="/department">部门管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 右侧头部 -->
        <el-header>
          <div class="top">
           <div class="bot">
              <div class="top_lef">
              <img src="https://i.postimg.cc/yYkYHMd5/iconfont-icon-shousu.png" alt="">
            </div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/info' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/administration' }">访客管理</el-breadcrumb-item>
              <!-- <el-breadcrumb-item
                ><a href="/Written">promotion management</a></el-breadcrumb-item
              > -->
            </el-breadcrumb>
           </div>
           <div class="right">
             <!-- 全屏显示 -->
            <div 
              v-if="isSupport"
              class="full-screen icon-shadow"
              :title="isFullscreen ? '退出全屏' : '进入全屏'"
              @click="toggle"
            >
              <img src="https://i.postimg.cc/htNkHGZy/image.png" alt="">
              <i :class="isFullscreen ? 'exit-screen' : 'full-screen'"></i>
            </div>
            <!-- 退出登录 -->
            <div>
              <el-dropdown>
                <span class="el-dropdown-link">
                  admin
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>修改个人信息</el-dropdown-item>
                    <hr>
                    <el-dropdown-item  @click="open">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
           </div>
          </div>
          <div class="btn"></div>
        </el-header>
         <el-main>
            <router-view></router-view>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, toRefs ,onBeforeUnmount } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ArrowDown
} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  router.push(key)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const open = () => {
   // 清空token
      window.sessionStorage.clear()
      // 跳转到登录页
      router.push('/login')
}
// 全屏显示开始
const isSupport = document.fullscreenEnabled;
const isFullscreen = ref(false);
const handleFullscreenchange = () => {
	if (isSupport) {
		document.fullscreenElement ? isFullscreen.value = true : isFullscreen.value = false
	}
};
document.addEventListener("fullscreenchange", handleFullscreenchange, true);
// 监听点击事件 进入、退出全屏
const toggle = () => {
	if (isSupport) {
		if (document.fullscreenElement) {
			document.exitFullscreen();
			isFullscreen.value = false;
		} else {
			// 这里选择将html元素全屏展示，也可以选择其它元素
			document.documentElement.requestFullscreen();
			isFullscreen.value = true;
		}
	}
}
const handleF11 = (e: KeyboardEvent) => {
	if (e.key === "F11") {
		// 禁止浏览器默认行为，比如进入全屏退出全屏
		e.preventDefault();
		toggle();
	}
}
document.addEventListener("keydown", handleF11, true);
// 全屏显示结束
</script>
<style lang='less' scoped>
*{
  margin: 0;
  padding: 0;
}
// 右侧头部
.el-header{
  height: 84px;
  .top{
    height: 50px; 
    display: flex;
    justify-content: space-between;
    .bot{
        display: flex;
        .top_lef{
          img{
            width: 22px;
            height: 20px;
            margin-top: 18px;
            margin-left: 17px;
          }
      }
      .el-breadcrumb{
        margin-top: 20px;
        margin-left: 25px;
      }
    }
    .right{
      display: flex;
      .full-screen{
       width: 28px;
        margin-right: 24px;
        margin-top: 10px;
        img{
           width: 26px;
          height: 26px;
        }
      }
      div{
        width: 102px;
        margin-top: 7px;
      }
    }
  }
  .btn{
    height: 34px;
    background-color: aqua;
  }
}
.common-layout {
  height: 100vh;

  .el-aside {
    height: 100vh;
    background-color: #545c64;
    position: fixed;
    top: 0;
    left: 0;
  }
  .is-vertical{
    margin-left: 200px;
  }
}
.box{
  display: flex;
  .img{
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
  .brv{
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    margin-left: 10px;
  }
}
</style>