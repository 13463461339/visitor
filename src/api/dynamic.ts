import {get,post} from '../utils/request'
const newsList =(params:any) =>{
  return get('api/news/list',params)//校园动态列表
}

const newsDel =(params:any) =>{
  return get('api/news/del',params)//删除校园动态
}

const newsAdd =(params:any) =>{
  return post('api/news/add',params)//添加校园动态
}

const newsEdit =(params:any) =>{
  return post('api/news/edit',params)//修改校园动态
}

const adminList =(params:any) =>{
  return get('api/admin/list',params)//管理员列表
}

export{
  newsList,
  newsDel,
  newsAdd,
  newsEdit,
  adminList
}