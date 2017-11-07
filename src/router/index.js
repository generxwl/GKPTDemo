import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'//登录页面
import Index from '@/views/Index'//首页
import Monitor from '@/views/IndexMonitoring'//首页监测点
import SensorNetwork from '@/views/SensorNetwork'//传感网
import DustOnline from '@/views/DustOnline'//在线扬尘清单
import Dynamicwindfield from '@/views/Dynamic-wind-field'//动态风场
import SuperStation from '@/views/Super-station'//超级站
import WeatherStation from '@/views/weather-station'//气象站
import Weather from '@/views/Weather'//天气预报
import Videos from '@/views/Videos'//企业工地视频监测
import ScatteredDirtVideos from '@/views/ScatteredDirtVideos'//散乱污视频监测
import EnterpriseEonitoring from '@/views/Enterprise-monitoring'//企业监测
import StaticOriginalList from '@/views/StaticOriginalList'//静态原清单
import Emergencylist from '@/views/Emergencylist'//应急清单
import GridPrediction from '@/views/GridPrediction'//网格预报
import DustEmissionStatistics from '@/views/DataAnalysis/DustEmissionStatistics'//扬尘源统计
import DistrictsCounties from '@/views/DataAnalysis/DistrictsCounties'//区县打分
import LikeWinter from '@/views/DataAnalysis/LikeWinter'//冬防战报
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/Monitor',
            name: 'Monitor',
            component: Monitor
        },
        {
            path: '/Emergencylist',
            name: 'Emergencylist',
            component: Emergencylist
        },
        {
            path: '/ScatteredDirtVideos',
            name: 'ScatteredDirtVideos',
            component: ScatteredDirtVideos
        },
        {
            path: '/StaticOriginalList',
            name: 'StaticOriginalList',
            component: StaticOriginalList
        },
        {
            path: '/Videos',
            name: 'Videos',
            component: Videos
        },
        {
            path: '/EnterpriseEonitoring',
            name: 'EnterpriseEonitoring',
            component: EnterpriseEonitoring
        },
        {
            path: '/SensorNetwork',
            name: 'SensorNetwork',
            component: SensorNetwork
        },
        {
            path: '/DustOnline',
            name: 'DustOnline',
            component: DustOnline
        },
        {
            path: '/DTweather',
            name: 'DTweather',
            component: Dynamicwindfield
        },
        {
            path: '/weatherstation',
            name: 'weatherstation',
            component: WeatherStation
        },
        {
            path: '/superstation',
            name: 'superstation',
            component: SuperStation
        },
        {
            path: '/Weather',
            name: 'Weather',
            component: Weather
        },
        {
            path: '/DistrictsCounties',
            name: 'DistrictsCounties',
            component: DistrictsCounties
        },
        {
            path: '/LikeWinter',
            name: 'likewinter',
            component: LikeWinter
        },
        {
            path: '/GridPrediction',
            name: 'GridPrediction',
            component: GridPrediction
        },
        {
            path: '/DustEmissionStatistics',
            name: 'DustEmissionStatistics',
            component: DustEmissionStatistics
        }
    ]
})
