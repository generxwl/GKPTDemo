/**
 * Created by 96400 on 2017/7/12.
 */
import axios from 'axios';
//上线正式
import {
    GetLfAirResource,//首页面板天气模块数据
} from './resource'
export default {
  //首页天气面板数据
  GetLfAirData() {
    return axios.get(GetLfAirResource,{

      }
    )
  },

}
