import Vue from 'vue'
import Router from 'vue-router'
//大页面模块
import Weather from '@/views/weather'
import SuperStation from '@/views/Super-station'
import Pollutionmap from '@/views/Pollution-map'
import WeatherStation from '@/views/weather-station'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'weather',
            component: Weather
        },
        {
            path: '/weather',
            name: 'weather',
            component: Weather
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
        }
    ]
})
