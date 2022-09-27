import {get,post} from '../utils/request'
const newsList =(params:any) =>{
  return get('visit/news/list',params)//校园动态列表
}



export{
  newsList,
 
}