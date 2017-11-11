/**
 * Created by 96400 on 2017/7/24.
 */
import {API_ROOT} from './config.js'
const apiconfig = {
  devt1:'http://devgkptplat.zhiscity.com',//正式环境
  devc1:'http://devgkptfc.zhiscity.com',
  devt:'http://gkpt.zq12369.com:8016',//开发环境
  devc:'http://gkpt.zq12369.com:8015'
}
const apilangfangTDK= {
  GetLfAir:apiconfig.devt+'/api/lfair/GetLfAir ',//首页面板天气模块数据
  GetLfAirPollution:apiconfig.devt+'/api/LfAir/GetLfAirPollutionItemAccu',//首页面板累计值
  GetMonitoringPointAccu:apiconfig.devt+'/api/Monitoring/GetMonitoringPointAccu?pointLevel=',//国控点，这是累计接口
  GetMonitoringPointHour:apiconfig.devt+'/api/Monitoring/GetMonitoringPointHour?time=',//这是小时查询部分，默认pointlevel不传，返回所有国控点和省控点
  GetMonitoringPointReal:apiconfig.devt+'/api/Monitoring/GetMonitoringPointReal?pointLevel=',//实时监测点信息
  GetDustStatistics:apiconfig.devt+'/api/Dust/GetDustStatistics',//在线扬尘统计
  GetycXhHbPointsRaise:apiconfig.devt+'/api/XhHb/GetXhHbPointsRaise',//在线扬尘先河统计
  GetFcStationList:apiconfig.devc+'/api/FcStation/GetFcStationList',//传感网数据实时
  GetAnalysisData:apiconfig.devc+'/api/FcStation/GetAnalysisData',//传感网数据累计
  GetXhHbPointsMicroAccu:apiconfig.devt+'/api/XhHb/GetXhHbPointsMicroAccu',//传感网数据累计先河
  GetXhHbPointsRaise:apiconfig.devt+'/api/IndexStatistics/GetIndexStatistics',//首页接入数据统计
  GetAirPie:apiconfig.devt+'/api/IndexStatistics/GetAirPie',//空气传感器占比统计
  GetVideoPie:apiconfig.devt+'/api/IndexStatistics/GetVideoPie',//视频占比统计
  GetGridPie:apiconfig.devt+'/api/IndexStatistics/GetGridPie',//网格类型占比统计
  GetGridMemberPie:apiconfig.devt+'/api/IndexStatistics/GetGridMemberPie',//网格员占比统计
  GetCompanyPointList:apiconfig.devt+'/api/Company/GetCompanyPointList',//企业在线右侧
  GetOfficeProgess:apiconfig.devt+'/api/IndexStatistics/GetOfficeProgess',//企业在线右侧二
  GetDustHourRanking:apiconfig.devt+'/api/Dust/GetDustHourRanking?',//在线源清单查询
  GetLfAirAlert:apiconfig.devt+'/api/LfAir/GetLfAirAlert',//冬防战报模块一02轮播预警
  GetLfAirWinterPre:apiconfig.devt+'/api/LfAir/GetLfAirWinterPre',//冬防战报模块一01空气预报
  GetWinterPreCompanyControl:apiconfig.devt1+'/api/WinterPre/GetWinterPreCompanyControl',//冬防战报列表1
  GetWinterPreAirControl:apiconfig.devt1+'/api/WinterPre/GetWinterPreAirControl',//冬防战报列表2
  GetWinterPreDustControl:apiconfig.devt1+'/api/WinterPre/GetWinterPreDustControl',//冬防战报列表3
  GetWeatherWinterPre:apiconfig.devt+'/api/Weather/GetWeatherWinterPre',//冬防战报模块六天气排名
  GetsourcetypeAllInfo:'http://117.119.97.150:8061/servicePlatform/enterprise/allInfo?',//静态原清单1
  GetallInfoBySourceType:'http://117.119.97.150:8061/servicePlatform/enterprise/allInfoBySourceType?',//静态原清单2
  GetEnterpriseData:'http://10.6.80.93:8080/servicePlatform/enterprise/sourceOutCount?',//静态原清单3
  GetCompanyStatistics:apiconfig.devt+'/api/Company/GetCompanyStatistics',//企业污染统计
  GetEmergencyList:apiconfig.devc1+'/api/EmergencyPlan/GetEmergencyList',//应急清单....
}

export const GetLfAirResource = API_ROOT.concat(apilangfangTDK.GetLfAir);
export const GetLfAirPollutionResource = API_ROOT.concat(apilangfangTDK.GetLfAirPollution);
export const GetMonitoringPointAccuResource = API_ROOT.concat(apilangfangTDK.GetMonitoringPointAccu);
export const GetMonitoringPointHourResource = API_ROOT.concat(apilangfangTDK.GetMonitoringPointHour);
export const GetMonitoringPointRealResource = API_ROOT.concat(apilangfangTDK.GetMonitoringPointReal);
export const GetDustStatisticsResource = API_ROOT.concat(apilangfangTDK.GetDustStatistics);
export const GetFcStationListResource = API_ROOT.concat(apilangfangTDK.GetFcStationList);
export const GetAnalysisDataResource = API_ROOT.concat(apilangfangTDK.GetAnalysisData);
export const GetXhHbPointsMicroAccuResource = API_ROOT.concat(apilangfangTDK.GetXhHbPointsMicroAccu);
export const GetXhHbPointsRaiseResource = API_ROOT.concat(apilangfangTDK.GetXhHbPointsRaise);
export const GetAirPieResource = API_ROOT.concat(apilangfangTDK.GetAirPie);
export const GetVideoPieResource = API_ROOT.concat(apilangfangTDK.GetVideoPie);
export const GetGridPieResource = API_ROOT.concat(apilangfangTDK.GetGridPie);
export const GetGridMemberPieResource = API_ROOT.concat(apilangfangTDK.GetGridMemberPie);
export const GetCompanyPointListResource = API_ROOT.concat(apilangfangTDK.GetCompanyPointList);
export const GetOfficeProgessResource = API_ROOT.concat(apilangfangTDK.GetOfficeProgess);
export const GetycXhHbPointsRaiseResource = API_ROOT.concat(apilangfangTDK.GetycXhHbPointsRaise);
export const GetDustHourRankingResource = API_ROOT.concat(apilangfangTDK.GetDustHourRanking);
export const GetLfAirAlertResource = API_ROOT.concat(apilangfangTDK.GetLfAirAlert);
export const GetLfAirWinterPreResource = API_ROOT.concat(apilangfangTDK.GetLfAirWinterPre);
export const GetWinterPreCompanyControlResource = API_ROOT.concat(apilangfangTDK.GetWinterPreCompanyControl);
export const GetWinterPreAirControlResource = API_ROOT.concat(apilangfangTDK.GetWinterPreAirControl);
export const GetWinterPreDustControlResource = API_ROOT.concat(apilangfangTDK.GetWinterPreDustControl);
export const GetWeatherWinterPreResource = API_ROOT.concat(apilangfangTDK.GetWeatherWinterPre);
export const GetsourcetypeAllInfoResource = API_ROOT.concat(apilangfangTDK.GetsourcetypeAllInfo);
export const GetallInfoBySourceTypeResource = API_ROOT.concat(apilangfangTDK.GetallInfoBySourceType)
export const GetEnterpriseDataResource = API_ROOT.concat(apilangfangTDK.GetEnterpriseData);
export const GetCompanyStatisticsResource = API_ROOT.concat(apilangfangTDK.GetCompanyStatistics);
export const GetEmergencyListResource = API_ROOT.concat(apilangfangTDK.GetEmergencyList);