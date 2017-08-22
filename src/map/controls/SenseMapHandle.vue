<template>
  <div class="sense-map-handle">
    <ul>
      <li v-for="(value,index) in handleItems" :data-index="index" :data-type="value.type" @click="liClickEvent"><img :title="value.name" :src="value.src"></li>
    </ul>
  </div>
</template>
<script>
  import {bus} from '@/js/bus.js'
  export default {
    name: 'SenseMapHandle',
    data () {
      return {
        map: undefined,
        drawingManager: undefined,
        drawOverlay: [],
        styleOptions: {
          strokeColor: "red",    //边线颜色。
          fillColor: "",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 1,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'dashed' //边线的样式，solid或dashed。
        },
        handleItems: [
          {
            name: '放大',
            type: 'ZOOMIN',
            src: 'static/imgs/map/ZoomIn.png',
            checked: 'static/imgs/map/ZoomIn1.png'
          }, {
            name: '缩小',
            type: 'ZOOMOUT',
            src: 'static/imgs/map/ZoomOut.png',
            checked: 'static/imgs/map/ZoomOut1.png'
          }, {
            name: '原范围',
            type: 'EXTENT',
            src: 'static/imgs/map/Extent.png',
            checked: 'static/imgs/map/Extent1.png'
          }, {
            name: '抓取',
            type: 'HANDLE',
            src: 'static/imgs/map/Handle.png',
            checked: 'static/imgs/map/Handle1.png'
          }, {
            name: '地域',
            type: 'REGION',
            src: 'static/imgs/map/Region.png',
            checked: 'static/imgs/map/Region1.png'
          }
        ]
      };
    },
    beforeCreate(){
    },
    created(){
      bus.$on('getSenseMap', this.getMap);
    },
    mounted(){
      let t = this;
      setTimeout(function () {
        t.ready();
      }, 1);
    },
    methods: {
      ready(){
      },
      getMap(map){
        this.map = map;
        if (this.map) {
          this.drawingManager = new BMapLib.DrawingManager(this.map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            drawingToolOptions: {
              anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
              offset: new BMap.Size(5, 5), //偏离值
            },
            circleOptions: this.styleOptions, //圆的样式
            polylineOptions: this.styleOptions, //线的样式
            polygonOptions: this.styleOptions, //多边形的样式
            rectangleOptions: this.styleOptions //矩形的样式
          });
        }
      },
      liClickEvent(e){
        if (!this.map) {
          bus.$on('getSenseMap', this.getMap);
        }
        this.resetImg();
        let childElement = e.currentTarget;
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let targets = this.$data.handleItems;
        let item = targets[index];
        childElement.style.backgroundColor = '#FFF';
        imgElement.src = item.checked;
        let type = childElement.getAttribute('data-type');
        if (this.map) {
          let zoom = this.map.getZoom();
          switch (type.toUpperCase()) {
            case 'ZOOMIN':
              this.map.setZoom(zoom + 1);
              break;
            case 'ZOOMOUT':
              this.map.setZoom(zoom - 1);
              break;
            case 'EXTENT':
              this.map.centerAndZoom('廊坊', 10);
              break;
            case 'HANDLE':
              this.map.setDefaultCursor();
              break;
            case 'REGION':
              if (this.drawingManager) {
                this.drawingManger.open();
                //this.drawingManger.setDrawingMode(DrawingType);
              }
              break;
          }
        }
        if (type.toUpperCase() !== 'REGION') {
          this.resetImg();
        }
      },
      resetImg(){
        let targets = this.$data.handleItems;
        jQuery.find('.sense-map-handle li').forEach(function (value, index) {
          value.style.backgroundColor = '#1080CC';
        });
        jQuery.find('.sense-map-handle li>img').forEach(function (value, index) {
          let target = targets[index];
          value.src = target.src;
        })
      },
      clearOverlay(){
        for (let i = 0, length = this.drawOverlay.length; i < length; i++) {
          this.map.removeOverlay(this.drawOverlay[i]);
        }
        this.drawOverlay.length = 0;
      }
    }
  };
</script>
<style scoped>
  .sense-map-handle {
    position: absolute;
    height: 37px;
    z-index: 1;
    top: 20px;
    left: 80px;
  }

  .sense-map-handle ul {
    height: 37px;
    border: solid 1px #1080CC;
  }

  .sense-map-handle li {
    list-style: none;
    float: left;
    height: 35px;
    width: 40px;
    background-color: #1080CC;
  }

  .sense-map-handle li img {
    margin: 5px 0;
  }
</style>
