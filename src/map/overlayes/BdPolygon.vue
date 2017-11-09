<script>
  import Axios from 'axios'
  import BMap from 'BMap'
  import Coordtransform from 'coordtransform'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'BdPolygon',
    render() {
    },
    data() {
      return {
        layers: [{
          url: '/static/data/Y.json',
          hasVisible: true,
          displayFieldName: 'NAME99',
          geometry: []
        }, {
          url: '/static/data/E.json',
          hasVisible: false,
          displayFieldName: 'NAME99',
          geometry: []
        }, {
          url: '/static/data/S.json',
          hasVisible: false,
          displayFieldName: 'FCNAME',
          geometry: []
        }],
        labelSymbol: new BMap.Label()
      }
    },
    create(){

    },
    mounted() {
      let t = this;
      setTimeout(function () {
        t.map = t.$parent.$parent.$parent.$parent.map;
        t.map.addOverlay(t.labelSymbol);
        t.labelSymbol.hide();
        t.labelSymbol.setStyle({color: '#333', backgroundColor: '#fff', border: 'solid 1px #333'});
        t.ready();
      }, 10);
//      bus.$once('setPolygonMap', this.setMap);
      bus.$on('setVisible', this.setLayerVisible);
      bus.$on('setOpacity', this.setOpacity);//setLayerHide
      bus.$on('setLayerHide', this.setLayerHide);//setLayerHide
    },
    methods: {
//      setMap(map){
//        this.map = map;
//        this.map.addOverlay(this.labelSymbol);
//        this.labelSymbol.hide();
//        this.labelSymbol.setStyle({color: '#333', backgroundColor: '#fff', border: 'solid 1px #333'});
//        this.ready();
//      },
      ready() {
        let t = this;
        for (let j = 0, count = this.layers.length; j < count; j++) {
          let sle = this.getLeaveColor(j);
          let layer = t.layers[j];
          let url = layer.url;
          let visible = layer.hasVisible;
          let displayFieldName = layer.displayFieldName;
          Axios({
            url: url,
            method: 'GET',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {}
          }).then(function (result) {
            if (result.status === 200) {
              t.createPolygon(result.data, layer.geometry, displayFieldName, sle);
              for (let i = 0, length = layer.geometry.length; i < length; i++) {
                let ply = layer.geometry[i];
                t.map.addOverlay(ply);
                visible ? ply.show() : ply.hide();
              }
            }
          }).catch(function (ex) {
//            console.log(ex)
          })
        }
      },
      setLayerVisible(index, hasVisible) {
        this.setLayerHide();
        let layer = this.layers[index];
        let geometry = layer.geometry;
        for (let i = 0, length = geometry.length; i < length; i++) {
          hasVisible ? geometry[i].show() : geometry[i].hide();
        }
      },
      setOpacity(index, opacity){
        let layer = this.layers[index];
        let geometry = layer.geometry;
        for (let i = 0, length = geometry.length; i < length; i++) {
          geometry[i].setFillOpacity(opacity);
          geometry[i].setStrokeOpacity(opacity);
        }
      },
      setLayerHide(hasVisible = false) {
        for (let i = 0, length = this.layers.length; i < length; i++) {
          let geometry = this.layers[i].geometry;
          for (let j = 0, count = geometry.length; j < count; j++) {
            hasVisible ? geometry[j].show() : geometry[j].hide();
          }
        }
      },
      createPolygon(data, layer, displayFieldName, polygonStyle) {
        let transformRing = this.getBdPolygon(data);
        let t = this;
        for (let i = 0, length = transformRing.length; i < length; i++) {
          let lsRings = transformRing[i];
          let geometry = lsRings.geometry;
          let attributes = lsRings.attributes;
          //let fillColor = color || this.getRandomColor();
          for (let j = 0, count = geometry.length; j < count; j++) {
            let polygon = this.getStringPolygon(geometry[j]);
            let ply = new BMap.Polygon(polygon, polygonStyle);
            ply.attributes = attributes;
            ply.displayFieldName = displayFieldName;

            layer.push(ply);
//            this.map.addOverlay(ply);
//            hasVisible ? ply.show() : ply.hide();
//            ply.addEventListener('click', function (e) {
////              console.log(e);
//            });
            ply.addEventListener('mouseover', function (e) {
//              t.labelSymbol.show();
//              console.log(t.labelSymbol);
            });
            ply.addEventListener('click', this.mouseClickEvent);
            ply.addEventListener('mouseout', function (e) {
              t.labelSymbol.hide();
//              console.log(t.labelSymbol);
            });
          }
        }
      },
      mouseClickEvent(e){
        let t = this;
        t.labelSymbol.show();
        t.labelSymbol.setPosition(e.point);
        let displayFieldName = e.target.displayFieldName;
        let attributes = e.target.attributes;
//        console.log(e);
        (attributes && displayFieldName) && (t.labelSymbol.setContent(attributes[displayFieldName]));
      },
      getBdPolygon(data) {
        let rtValue = [];
        let features = data.features || [];
        for (let i = 0, length = features.length; i < length; i++) {
          let feature = features[i];
          let attributes = feature.attributes || {};
          let geometry = feature.geometry;
          let rings = geometry.rings || [];
          rtValue.push({attributes: attributes, geometry: this.ringsTransform(rings)});
        }
        return rtValue
      },
      ringsTransform: function (data) {
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
      wgsPointToBd: function (data) {
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
      transformFun: function (path) {
        let gcPoint = Coordtransform.wgs84togcj02(path[0], path[1]);
        return Coordtransform.gcj02tobd09(gcPoint[0], gcPoint[1]);
      },
      getStringPolygon: function (ring) {
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
      getRandomColor: function () {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
      },
      getLeaveColor: function (type) {
        let sle = {};
        switch (type) {
          case 0:
            sle = {strokeWeight: 1, strokeStyle: 'dashed', strokeColor: '#0070CE', fillColor: '#2D96EF', fillOpacity: 0.2};
            break;
          case 1:
            sle = {strokeWeight: 1, strokeStyle: 'dashed', strokeColor: '#1C7B2A', fillColor: '#6FB779', fillOpacity: 0.2};
            break;
          case 2:
            sle = {strokeWeight: 1, strokeStyle: 'dashed', strokeColor: '#BB2C00', fillColor: '#F48670', fillOpacity: 0.2};
            break;
        }
        return sle;
      }
    }
  }

</script>
