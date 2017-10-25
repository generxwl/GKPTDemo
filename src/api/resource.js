/**
 * Created by 96400 on 2017/7/24.
 */
import {API_ROOT} from './config.js'
const apiconfig = {
  devt:'http://devgkptplat.zhiscity.com',//正式环境
  devc:'http://devgkptfc.zhiscity.com',
  formalt:'http://lftdkplat.zhiscity.com',//开发环境
  formalc:'http://lftdkfc.zhiscity.com'
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