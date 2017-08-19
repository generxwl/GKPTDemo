<script>
  import BMap from 'BMap'
  import axios from 'axios'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'SenseManager',
    render () {
    },
    data () {
      return {
        type: 'POINT',
        item: 'AQI'
      };
    },
    mounted(){
    },
    methods: {
      ready () {
        let t = this;
      },
      resetData (map) {
        this.map = map;
        this.setPollutionByType(this.item);
      },
      setMap (map) {
        this.map = map;
      },
      setPollutionByType (type) {
        if (!this.map.getBounds()) {
          return false;
        }
        let t = this;
        let qs = require('qs');
        let mapLevel = this.map.getZoom();
        let bs = this.map.getBounds();
        let bssw = bs.getSouthWest();
        let bsne = bs.getNorthEast();
        let method = 'GETCITYLISTMOBILE';
        let lat1 = (bssw.lat).toString();
        let lng1 = (bssw.lng).toString();
        let lat2 = (bsne.lat).toString();
        let lng2 = (bsne.lng).toString();
        let level = mapLevel.toString();
        let appId = 'f2371c6069d914f1cb8bf7ea812d217e';
        let params = {
          'url': 'https://m.zq12369.com/v2/api/zhenqimobileapi.php',
          'appId': appId,
          'method': encode_param(method),
          'lat1': encode_param(lat1),
          'lng1': encode_param(lng1),
          'lat2': encode_param(lat2),
          'lng2': encode_param(lng2),
          'level': encode_param(level),
          'secret': encode_secret(method, lat1, lng1, lat2, lng2, level)
        };
        axios({
          url: 'http://localhost:6005/Handler.ashx',
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: qs.stringify(params)
        }).then(function (result) {
          if (result.status === 200) {
            if (typeof result.data === 'string') {
              let data = JSON.parse(decode_result(result.data));
              if (data.total > 0) {
                t.data = data.rows;
                t.render(data.rows, type);
              }
            } else {
              console.log(result.data);
            }
          }
        }).catch(function () {
          console.error('Request Error!');
        })
      },
      render(){
      }
    }
  };
</script>
<style scoped>
</style>
