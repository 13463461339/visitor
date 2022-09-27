import {get,post} from '../utils/request'

const reviewerList =(params:any) =>{
  return get('api/reviewer/list',params)//核检人列表
}

const reviewerDel =(params:any) =>{
  return get('api/reviewer/del',params)//删除核检人
}

const reviewerAdd =(params:any) =>{
  return post('api/reviewer/add',params)//添加核检人
}

const reviewerEdit =(params:any) =>{
  return post('api/reviewer/edit',params)//修改核检人
}


export{
  reviewerList,
  reviewerDel,
  reviewerAdd,
  reviewerEdit
}