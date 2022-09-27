import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect : '/Login'
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../view/Login.vue'),
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../view/index.vue'),
    children: [
      {
        path: '/info',
        component: () => import('../view/info.vue')
      },
      {
        path: '/administration',
        component: () => import('../view/administration/administration.vue')
      },
      {
        path: '/written',
        component: () => import('../view/administration/Written/written.vue')
      },
      {
        path: '/dynamic',
        component: () => import('../view/administration/dynamic/dynamic.vue')
      },
      {
        path: '/examine',
        component: () => import('../view/administration/examine/examine.vue')
      },
      {
        path: '/journal',
        component: () => import('../view/administration/journal/journal.vue')
      },
      {
        path: '/add',
        component: () => import('../view/administration/add.vue')
      },
      {
        path: '/details',
        component: () => import('../view/administration/details.vue')
      },
      {
        path: '/trajectory',
        component: () => import('../view/trip/trajectory.vue')
      },
      {
        path: '/position',
        component: () => import('../view/trip/position.vue')
      },
      {
        path: '/role',
        component: () => import('../view/jurisdiction/role.vue')
      },
      {
        path: '/administrators',
        component: () => import('../view/jurisdiction/administrators.vue')
      },
      {
        path: '/system',
        component: () => import('../view/setup/system.vue')
      }
      ,
      {
        path: '/department',
        component: () => import('../view/setup/department.vue')
      },
      {
        path: '/modify',
        component: () => import('../view/administration/modify.vue')
      },
      {
        path: '/wittenAdd',
        component: () => import('../view/administration/Written/wittenAdd.vue')
      },
      {
        path: '/writtenModify',
        component: () => import('../view/administration/Written/writtenModify.vue')
      },
      {
        path: '/dynamicAdd',
        component: () => import('../view/administration/dynamic/dynamicAdd.vue')
      },
      {
        path: '/dynamicModify',
        component: () => import('../view/administration/dynamic/dynamicModify.vue')
      },
      {
        path: '/dynamicDetails',
        component: () => import('../view/administration/dynamic/dynamicDetails.vue')
      }
      
    ]
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})
// router.beforeEach((to,from,next)=>{
//   const token:string|null = localStorage.getItem('token')
//   if(!token && to.path !== '/login'){
//     next('/login')
//   }else{
//     next()
//   }
// })


export default router
