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
    site: 'http://lftdkfc.zhiscity.com',
    port: '',
    path: '/api'
  }, {
    site: 'http://lftdkplat.zhiscity.com',
    port: '',
    path: '/api'
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
      case 'SENSEPOLLUTION':
        cf = this.release[0];
        url = cf.site + cf.port + cf.path + '/FcStation/GetFcStationList';
        break;
      case 'SENSECHART':
        cf = this.release[0];
        url = cf.site + cf.port + cf.path + '/FcStation/GetSingleStationInfo';
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
    }
    return url;
  }
}
