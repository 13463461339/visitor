import {get,post} from '../utils/request'
const auditlogList =(params:any) =>{
  return get('api/auditlog/list',params)//审核日志列表
}

const auditlogDel =(params:any) =>{
  return get('api/auditlog/del',params)//删除审核记录
}



export{
  auditlogList,
  auditlogDel
}