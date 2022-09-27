import {get,post} from '../utils/request'
const login = (params:any) => {
  return post('api/admin/login',params)//登录
}

const admin = (params:any) => {
  return post('api/admin/findper',params)//根据token换取用户信息
}

const visituser = (params:any) =>{
  return get('api/visituser/statistics',params)//首页访客统计
}

const visituserList = (params:any) =>{
  return get('api/visituser/list',params)//访客管理列表
}

const visituserDel = (params:any) =>{
  return get('api/visituser/del',params)//删除访客记录
}

const departmentlist = (params:any) =>{
  return get('api/department/list',params)//部门列表
}

const visituseradd = (params:any) =>{
  return post('api/visituser/add',params)//添加访客
}

const visitusershow = (params:any) =>{
  return get('api/visituser/show',params)//访客详情
}

const visituseredit = (params:any) =>{
  return post('api/visituser/edit',params)//修改访客
}




export {
  login,
  visituser,
  visituserList,
  visituserDel,
  departmentlist,
  visituseradd,
  visitusershow,
  visituseredit,
  admin
}