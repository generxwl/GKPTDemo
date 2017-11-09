<template>
  <div class="map-handle">
    <ul class="map-handle_ul">
      <li v-for="(value,index) in handleItems" v-show="value.hasVisible" :data-index="index" :data-type="value.type" @click="liClickEvent">
        <img :title="value.name" :src="value.src">
        <span>{{value.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {bus} from '@/js/bus.js'
  export default {
    name: 'MapHandle',
    data () {
      return {
        map: undefined,
        handleItems: [
          {
            name: '放大',
            type: 'ZOOMIN',
            src: 'static/imgs/mapGJ/ceju.png',
            checked: 'static/imgs/mapGJ/ceju1.png',
            hasVisible:false
          }, {
            name: '缩小',
            type: 'ZOOMOUT',
            src: 'static/imgs/mapGJ/zhuashou.png',
            checked: 'static/imgs/mapGJ/zhuashou1.png',
            hasVisible:false
          }, {
            name: '量算',
            type: 'LENGTH',
            src: 'static/imgs/toor/icon_Ruler_1.png',
            checked: 'static/imgs/toor/icon_Ruler_2.png',
            hasVisible:true
          }, {
            name: '抓取',
            type: 'HANDLE',
            src: 'static/imgs/toor/icon_hand_1.png',
            checked: 'static/toor/toor/icon_hand_2.png',
            hasVisible:true
          },{
            name: '原范围',
            type: 'EXTENT',
            src: 'static/imgs/toor/icon_Location_1.png',
            checked: 'static/imgs/toor/icon_Location_2.png',
            hasVisible:true
          }, {
            name: '全屏',
            type: 'FULL',
            src: 'static/imgs/toor/icon_quanping_1.png',
            checked: 'static/imgs/toor/icon_quanping_2.png',
            hasVisible:true
          }
        ]
      };
    },
    beforeCreate(){
    },
    created(){
        bus.$once('getMap', this.getMap);
        bus.$once('getSenseMap', this.getMap);
        bus.$once('getDustMap', this.getMap);
        bus.$once('getGridMap', this.getMap);
        bus.$once('setMainMap', this.getMap);
        bus.$once('setVideoMap',this.getMap);
        bus.$once('setEnterpriseMap',this.getMap);
        bus.$once('setStaticMap', this.getMap);
    },
    mounted(){
      let t = this;
      setTimeout(function () {
        t.ready();
      }, 1);
      $('.map-handle_ul li').on('click', function () {
        //$(this).addClass('active').siblings().removeClass('active');
      })
    },
    methods: {
      ready(){
      },
      getMap(map){
        this.map = map;
      },
      liClickEvent(e){
        //this.resetImg();
        let childElement = e.currentTarget;
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let targets = this.$data.handleItems;
        let item = targets[index];
        //item.style.color = '#1080cc';
        imgElement.src = item.checked;
        let type = childElement.getAttribute('data-type');
        if (this.map) {
            //alert(type.toUpperCase())
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
            case 'LENGTH':
              let distanceTool = new BMapLib.DistanceTool(this.map, {lineStroke : 2});
              distanceTool && distanceTool.open();
              break;
            case 'FULL':
              this.fullScreen(this.map.getContainer());
              //childElement.style.backgroundColor = '#fff';
              break;
          }
        }
        this.resetImg();
      },
      resetImg(){
        let targets = this.$data.handleItems;
        jQuery.find('.map-handle li').forEach(function (value, index) {
          value.style.backgroundColor = '#fff';
        });
        jQuery.find('.map-handle li>img').forEach(function (value, index) {
          let target = targets[index];
          value.src = target.src;
        })
      },fullScreen(docElm) {
        //W3C
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .map-handle {
    position: absolute;
    height: 36px;
    z-index: 1;
  }
  .active {
    background: #1080cc !important;
    color: #fff;
  }
  span{
    display: inline-block;
    width: 60px;
    text-align: left;
    padding-left: 5px;
  }
  .map-handle ul {
    height: auto;
    border: solid 1px #ccc;
    border-top: none;
  }
  .map-handle li {
    background: #fff;
    list-style: none;
    height: 38px;
    width: 104px;
  }
  .map-handle li:hover{
    cursor: pointer;
  }
  .map-handle li img {
    margin-left: 10px;
  }
</style>
