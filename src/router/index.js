import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'//登录页面
import Index from '@/views/Index'//首页
import Indexjcd from '@/views/IndexMonitoring'//首页监测点
import SensorNetwork from '@/views/SensorNetwork'//传感网
import DustOnline from '@/views/DustOnline'//在线扬尘清单
import Dynamicwindfield from '@/views/Dynamic-wind-field'//动态风场
import SuperStation from '@/views/Super-station'//超级站
import Pollutionmap from '@/views/Pollution-map'//污染地图
import WeatherStation from '@/views/weather-station'//气象站
import Weather from '@/views/Weather'//天气预报
import GridPrediction from '@/views/GridPrediction'//网格预报
import DustEmissionStatistics from '@/views/DataAnalysis/DustEmissionStatistics'//扬尘源统计
import DistrictsCounties from '@/views/DataAnalysis/DistrictsCounties'//区县打分
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
            path: '/indexjcd',
            name: 'indexjcd',
            component: Indexjcd
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
            path: '/pollutionmap',
            name: 'pollutionmap',
            component: Pollutionmap
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
