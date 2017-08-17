/**
 * Created by 96400 on 2017/7/12.
 */
import axios from 'axios';
//上线正式
import {
    GetLfAirResource,//首页面板天气模块数据
    GetLfAirPollutionResource,//首页面部累计数值
    GetMonitoringPointAccuResource, //国控点，这是累计接口
    GetMonitoringPointHourResource, //这是小时查询部分
    GetMonitoringPointRealResource,//国控点，这是实时监测点信息
    GetDustStatisticsResource,//扬尘统计
    GetFcStationListResource,//传感网接口全部数据，暂无累计
} from './resource'
export default {
  //首页天气面板数据
  GetLfAirData() {
    return axios.get(GetLfAirResource,{

      }
    )
  },
  //首页面部累计数值
    GetLfAirPollution(){
        return axios.get(GetLfAirPollutionResource,{

            }
        )
    },
    //国控点，这是累计接口默认不传pointlevel参数，返回国控点和省控点全部数据
    GetMonitoringPointAccu(){
        return axios.get(GetMonitoringPointAccuResource,{

            }
        )
    },
    //这是小时查询部分，默认pointlevel不传，返回所有国控点和省控点
    GetMonitoringPointHour(time){
        return axios.get(GetMonitoringPointHourResource+time+"&pointLevel=",{

            }
        )
    },
    //国控点，这是实时监测点信息，默认pointlevel不传，返回所有监测点
    GetMonitoringPointReal(){
        return axios.get(GetMonitoringPointRealResource,{

            }
        )
    },
    //扬尘统计
    GetDustStatistics(){
        return axios.get(GetDustStatisticsResource,{

            }
        )
    },
    //传感网数据
    GetFcStationList(){
        return axios.get(GetFcStationListResource,{

            }
        )
    },
    //传感网数据查询
    ChaxunGetFcStationList(time){
        return axios.get(GetFcStationListResource+'?recordtime='+time,{

    }
    )
    },
}
