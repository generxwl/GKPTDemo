export default {
  development: [{
    site: 'http://lftdkfc.zhiscity.com',
    port: '',
    path: '/api'
  }, {
    site: 'http://lftdkplat.zhiscity.com',
    port: '',
    path: '/api'
  }],
  release: [{
    site: 'http://gkpt.zq12369.com:8015',//'http://devgkptfc.zhiscity.com',//
    port: '',
    path: '/api'
  }, {
    site: 'http://gkpt.zq12369.com:8016',//'http://devgkptplat.zhiscity.com',//gkpt.zq12369.com:8016',
    port: '',
    path: '/api'
  }, {
      site: 'http://117.119.97.150',
     // site: 'http://10.6.80.93',
      port: '8061',
    path: '/servicePlatform'
  }],
  getRequestUrlByType(type){
    let url = undefined;
    let cf = undefined;
    switch (type.toUpperCase()) {
      case 'MONPOLLUTION':
        cf = this.release[1];
        url = cf.site + cf.port + cf.path + '/Monitoring/GetMonitoringPointReal';
        break;
      case 'MONCHART':
        cf = this.release[1];
        url = cf.site + cf.port + cf.path + '/Monitoring/GetMonitoringPointChart';
        break;
      case 'MONCHARTHISTORY':
        cf = this.release[1];
        url = cf.site + '/Monitoring_7_24/';
        break;
      case 'SENSEPOLLUTION':
        cf = this.release[0];
        url = cf.site + cf.port + cf.path + '/FcStation/GetFcStationList';
        break;
      case 'SENSEPOLLUTIONHISTORY':
        cf = this.release[0];
        url = cf.site + cf.port + cf.path + '/FcStation/GetHourPollution';
        break;
      case 'XHPOLLUTION':
        cf = this.release[1];
        // url = 'http://117.119.97.150:8063/api/XhHb/GetXhHbPoint';
        url = cf.site + cf.port + cf.path + '/XhHb/GetXhHbPointsMicro';
        break;
      case 'XHPOLLUTIONCHAR':
        cf = this.release[1];
        // url = 'http://117.119.97.150:8063/api/XhHb/GetXhHbPoint';
        url = cf.site + cf.port + cf.path + '/XhHb/GetXhHistoriesMicro';
        break;
      case 'VOCPOLLUTION':
        cf = this.release[1];
        // url = 'http://117.119.97.150:8063/api/XhHb/GetXhHbPoint';
        url = cf.site + cf.port + cf.path + '/XhHb/GetXhHbPointsVoc';
        break;
      case 'SENSECHART':
        cf = this.release[0];
        url = cf.site + cf.port + cf.path + '/FcStation/GetSingleStationInfo';
        break;
      case 'VOCCHART':
        cf = this.release[1];
        // url = 'http://117.119.97.150:8063/api/XhHb/GetXhHbHistory';
        url = cf.site + cf.port + cf.path + '/XhHb/GetXhHistoriesVoc';
        break;
      case 'DUSTPOLLUTION':
        cf = this.release[1];
        url = cf.site + cf.port + cf.path + '/Dust/GetDustHourRanking';
        break;
      case 'DUSTCHART':
        cf = this.release[1];
        url = cf.site + cf.port + cf.path + '/Dust/GetDust24Hour';
        break;
      case 'VIDEOTAEGET':
        cf = this.release[1];
        url = cf.site + cf.port + cf.path + '/Video/GetVideoDeviceInfo';
        break;
      case 'XHDUST':
        cf = this.release[1];
        // url = 'http://117.119.97.150:8063/api/XhHb/GetXhHbPoint';
        url = cf.site + cf.port + cf.path + '/XhHb/GetXhHbPointsRaise';
        break;
      case 'XHDUSTCHAR':
        cf = this.release[1];
        // url = 'http://117.119.97.150:8063/api/XhHb/GetXhHbPoint';
        url = cf.site + cf.port + cf.path + '/XhHb/GetXhHistoriesRaise';
        break;
      case 'STATICTARGET':
        cf = this.release[2];
        url = cf.site + ':' + cf.port + cf.path + '/enterprise/allInfo';
        break;
      case 'ENTERPRISE':
        cf = this.release[1];
        url = cf.site + cf.port + cf.path + '/Company/GetCompanyPointList';
        break;
      case 'ENTERPRISECHAR':
        cf = this.release[1];
        url = cf.site + cf.port + cf.path + '/Company/GetCompanyDetai';
        break;
      case 'EMERGENCY':
        cf = this.release[0];
        url = cf.site + cf.port + cf.path + '/EmergencyPlan/GetEmergencyList';
        break;
    }
    return url;
  }
}
