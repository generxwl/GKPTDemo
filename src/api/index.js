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
    GetAnalysisDataResource,//传感网累计
    GetXhHbPointsMicroAccuResource,//先河传感网累计
    GetFcStationListResource,//传感网接口全部数据，暂无累计
    GetDustHourRankingResource,//在线源清单查询
    GetAirPieResource,//空气传感器占比统计
    GetVideoPieResource,//视频占比统计
    GetGridPieResource,//网格类型占比统计
    GetGridMemberPieResource,//网格员占比统计
    GetCompanyPointListResource,//企业在线右侧
    GetOfficeProgessResource,//企业在线右侧二
    GetycXhHbPointsRaiseResource,//扬尘在线先河
    GetXhHbPointsRaiseResource,//首页接入数据统计
} from './resource'
export default {
  //首页天气面板数据
  GetLfAirData() {
    return axios.get(GetLfAirResource,{

      }
    )
  },
    //在线扬尘先河
    GetycXhHbPointsRaise() {
        return axios.get(GetycXhHbPointsRaiseResource,{

            }
        )
    },
    //企业在线右侧
    GetCompanyPointList() {
        return axios.get(GetCompanyPointListResource,{

            }
        )
    },
    //企业在线右侧二
    GetOfficeProgess() {
        return axios.get(GetOfficeProgessResource,{

            }
        )
    },
    //首页接入数据统计
    GetXhHbPoints() {
        return axios.get(GetXhHbPointsRaiseResource,{

            }
        )
    },
    //首页传感器统计
    GetAirPie() {
        return axios.get(GetAirPieResource,{

            }
        )
    },
    //首页视频统计
    GetVideoPie() {
        return axios.get(GetVideoPieResource,{

            }
        )
    },
    //首页网格类型占比统计
    GetGridPie() {
        return axios.get(GetGridPieResource,{

            }
        )
    },
    //首页网格员占比统计
    GetGridMemberPie() {
        return axios.get(GetGridMemberPieResource,{

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
    //传感网累计
    GetAnalysisData(){
        return axios.get(GetAnalysisDataResource,{

            }
        )
    },//
    //传感网累计先河
    GetXhHbPointsMicroAccu(){
        return axios.get(GetXhHbPointsMicroAccuResource,{

            }
        )
    },//GetXhHbPointsMicroAccuResource
    //传感网数据查询
    ChaxunGetFcStationList(time){
        return axios.get(GetFcStationListResource+'?recordtime='+time,{

    }
    )
    },
    //传感网数据查询
    GetDustHourRanking(time){
        return axios.get(GetDustHourRankingResource+'?requestTime='+time,{

            }
        )
    },
}
