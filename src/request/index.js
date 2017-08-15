import Axios from 'axios'

export default {
  request(params, callback1, callback0){
    let qs = require('qs');
    let url = params.url;
    let type = params.type.toUpperCase();
    let pms = params.pms;
    Axios({
      url: url,
      method: type,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: type === 'POST' ? qs.stringify(pms) : pms
    }).then(function (result) {
      console.log(result);
      if (!result.data.errorcode) {
        let data = result.data;
        data = typeof data === 'string' ? JSON.parse(data) : data;
        callback1(data);
      }
      else {
        callback0(result.data);
      }
    }).catch(function (ex) {
      callback0(ex);
    })
  }
};
