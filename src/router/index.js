import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/IndexMonitoring'
import SensorNetwork from '@/views/SensorNetwork'
import Dynamicwindfield from '@/views/Dynamic-wind-field'
import SuperStation from '@/views/Super-station'
import Pollutionmap from '@/views/Pollution-map'
import WeatherStation from '@/views/weather-station'
import Weather from '@/views/Weather'
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
            path: '/SensorNetwork',
            name: 'SensorNetwork',
            component: SensorNetwork
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
        }
    ]
})
