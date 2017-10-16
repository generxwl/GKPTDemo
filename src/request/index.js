import RequestConfig from '@/request/RequestConfig'
import Axios from 'axios'

export default {
  request(params, callback1, callback0){
    let qs = require('qs');
    let url = params.url;
    let type = params.type.toUpperCase();
    let pms = params.pms;
    Axios({
      url: url,
      method: type,//'auth':this.$cookies.get('SESSION')
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: type === 'POST' ? qs.stringify(pms) : pms
    }).then(function (result) {
      if (!result.data.errorcode) {
        let data = result.data;
        data = typeof data === 'string' ? JSON.parse(data) : data;
        console.log(data);
        console.log(data.status);
        //parseInt((data.status && data.status.toString()) || (data.Status && data.Status.toString()))
        data = {
          status: data.hasOwnProperty('status') ? data.status : data.Status,
          history:data.history ? (typeof data.history === 'string' ? JSON.parse(data.history) : data.history) : undefined,
          obj: (typeof data.obj === 'string' ? JSON.parse(data.obj) : data.obj) || (typeof data.ExtraData === 'string' ? JSON.parse(data.ExtraData) : data.ExtraData)
        };
        callback1(data);
      }
      else {
        callback0(result.data);
      }
    }).catch(function (ex) {
      callback0(ex);
    })
  },
  getRequestUrl(type){
    return RequestConfig.getRequestUrlByType(type);
  }
};
