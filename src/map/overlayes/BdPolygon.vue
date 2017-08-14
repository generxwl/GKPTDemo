<script>
import Axios from 'axios'
import BMap from 'BMap'
import Coordtransform from 'coordtransform'
import { bus } from '@/js/bus.js'

export default {
  name: 'BdPolygon',
  render() {},
  data() {
    return {
      layers: [{
        url: '/static/data/Y.json',
        hasVisible: true,
        geometry: []
      }, {
        url: '/static/data/E.json',
        hasVisible: false,
        geometry: []
      }, {
        url: '/static/data/S.json',
        hasVisible: false,
        geometry: []
      }]
    }
  },
  mounted() {
    let t = this
    setTimeout(function() {
      t.map = t.$parent.$parent.map;
      t.ready();
    }, 10);
    bus.$on('setVisible', this.setLayerVisible)
  },
  methods: {
    ready() {
      let t = this;
      for (let j = 0, count = this.layers.length; j < count; j++) {
        let layer = t.layers[j];
        let url = layer.url;
        let visible = layer.hasVisible;
        Axios({
          url: url,
          method: 'GET',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {}
        }).then(function(result) {
          if (result.status === 200) {
            t.createPolygon(result.data, layer.geometry);
            for (let i = 0, length = layer.geometry.length; i < length; i++) {
              let ply = layer.geometry[i];
              t.map.addOverlay(ply);
              visible ? ply.show() : ply.hide();
            }
          }
        }).catch(function(ex) {
          console.log(ex)
        })
      }
    },
    setLayerVisible(index) {
      this.setLayerHide();
      let layer = this.layers[index];
      let geometry = layer.geometry;
      for (let i = 0, length = geometry.length; i < length; i++) {
        geometry[i].show();
      }
    },
    setLayerHide() {
      for (let i = 0, length = this.layers.length; i < length; i++) {
        let geometry = this.layers[i].geometry;
        for (let j = 0, count = geometry.length; j < count; j++) {
          geometry[j].hide();
        }
      }
    },
    createPolygon(data, layer, hasVisible) {
      let transformRing = this.getBdPolygon(data);
      for (let i = 0, length = transformRing.length; i < length; i++) {
        let lsRings = transformRing[i];
        let geometry = lsRings.geometry;
        let attributes = lsRings.attributes;
        let fillColor = this.getRandomColor();
        for (let j = 0, count = geometry.length; j < count; j++) {
          let polygon = this.getStringPolygon(geometry[j]);
          let ply = new BMap.Polygon(polygon, { strokeWeight: 1, strokeColor: '#ff0000', fillColor: fillColor })
          ply.attributes = attributes;
          layer.push(ply);
          this.map.addOverlay(ply);
          hasVisible ? ply.show() : ply.hide();
          ply.addEventListener('click', function(e) {
            console.log(e);
          })
        }
      }
    },
    getBdPolygon(data) {
      let rtValue = [];
      let features = data.features || [];
      for (let i = 0, length = features.length; i < length; i++) {
        let feature = features[i];
        let attributes = feature.attributes || {};
        let geometry = feature.geometry;
        let rings = geometry.rings || [];
        rtValue.push({ attributes: attributes, geometry: this.ringsTransform(rings) });
      }
      return rtValue
    },
    ringsTransform: function(data) {
      if (!data) {
        return undefined;
      }
      let rtValue = [];
      for (let i = 0, length = data.length; i < length; i++) {
        let item = data[i];
        if (Array.isArray(item)) {
          let bdPoints = this.wgsPointToBd(data[i]);
          rtValue.push(bdPoints);
        }
      }
      return rtValue;
    },
    wgsPointToBd: function(data) {
      let lsTransPoints = [];
      if (!this.convert) {
        this.convert = new BMap.Convertor();
      }
      for (let i = 0, length = data.length; i < length; i++) {
        let pts = data[i];
        let transPoint = this.transformFun(pts);
        let bdPoint = new BMap.Point(transPoint[0], transPoint[1]);
        lsTransPoints.push(bdPoint);
      }
      return lsTransPoints;
    },
    transformFun: function(path) {
      let gcPoint = Coordtransform.wgs84togcj02(path[0], path[1]);
      return Coordtransform.gcj02tobd09(gcPoint[0], gcPoint[1]);
    },
    getStringPolygon: function(ring) {
      let rtValue = '';
      for (let i = 0; i < ring.length; i++) {
        let pt = ring[i];
        if (rtValue === '') {
          rtValue = pt.lng + ',' + pt.lat;
        } else {
          rtValue += ';' + pt.lng + ',' + pt.lat;
        }
      }
      return rtValue;
    },
    getRandomColor: function() {
      return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    }
  }
}

</script>
