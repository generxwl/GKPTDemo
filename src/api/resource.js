/**
 * Created by 96400 on 2017/7/24.
 */
import {API_ROOT} from './config.js'
const apiconfig = {
  devt:'http://devgkptplat.zhiscity.com',//开发环境
  devc:'http://devgkptfc.zhiscity.com',
  formalt:'http://lftdkplat.zhiscity.com',//正式环境
  formalc:'http://lftdkfc.zhiscity.com'
}
const apilangfangTDK= {
  GetLfAir:apiconfig.formalt+'/api/lfair/GetLfAir ',//首页面板天气模块数据
  GetLfAirPollution:apiconfig.formalt+'/api/LfAir/GetLfAirPollutionItemAccu',//首页面板累计值
  GetMonitoringPointAccu:apiconfig.formalt+'/api/Monitoring/GetMonitoringPointAccu?pointLevel=',//国控点，这是累计接口
  GetMonitoringPointHour:apiconfig.formalt+'/api/Monitoring/GetMonitoringPointHour?time=',//这是小时查询部分，默认pointlevel不传，返回所有国控点和省控点
  GetMonitoringPointReal:apiconfig.formalt+'/api/Monitoring/GetMonitoringPointReal?pointLevel=',//实时监测点信息
  GetDustStatistics:apiconfig.formalt+'/api/Dust/GetDustStatistics',//扬尘统计
  GetFcStationList:apiconfig.formalc+'/api/FcStation/GetFcStationList',//传感网数据
  GetDustHourRanking:apiconfig.formalt+'/api/Dust/GetDustHourRanking?',//在线源清单查询
}

export const GetLfAirResource = API_ROOT.concat(apilangfangTDK.GetLfAir);
export const GetLfAirPollutionResource = API_ROOT.concat(apilangfangTDK.GetLfAirPollution);
export const GetMonitoringPointAccuResource = API_ROOT.concat(apilangfangTDK.GetMonitoringPointAccu);
export const GetMonitoringPointHourResource = API_ROOT.concat(apilangfangTDK.GetMonitoringPointHour);
export const GetMonitoringPointRealResource = API_ROOT.concat(apilangfangTDK.GetMonitoringPointReal);
export const GetDustStatisticsResource = API_ROOT.concat(apilangfangTDK.GetDustStatistics);
export const GetFcStationListResource = API_ROOT.concat(apilangfangTDK.GetFcStationList);
export const GetDustHourRankingResource = API_ROOT.concat(apilangfangTDK.GetDustHourRanking);