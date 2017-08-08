import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index-kuang'
import Dynamicwindfield from '@/views/Dynamic-wind-field'
import SuperStation from '@/views/Super-station'
import Pollutionmap from '@/views/Pollution-map'
import WeatherStation from '@/views/weather-station'
import NationwidePH from '@/views/Nationwide-PH'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/weather',
            name: 'weather',
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
            path: '/nationwidePH',
            name: 'nationwidePH',
            component: NationwidePH
        }
    ]
})
