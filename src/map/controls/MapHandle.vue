<template>
  <div class="map-handle">
    <ul>
      <li v-for="(value,index) in handleItems" :data-index="index" :data-type="value.type" @click="liClickEvent"><img :title="value.name" :src="value.src"></li>
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
          }
        ]
      };
    },
    beforeCreate(){
    },
    created(){
      bus.$on('getMap', this.getMap);
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
      },
      liClickEvent(e){
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
          }
        }
        this.resetImg();
      },
      resetImg(){
        let targets = this.$data.handleItems;
        jQuery.find('.map-handle li').forEach(function (value, index) {
          value.style.backgroundColor = '#1080CC';
        });
        jQuery.find('.map-handle li>img').forEach(function (value, index) {
          let target = targets[index];
          value.src = target.src;
        })
      }
    }
  };
</script>
<style scoped>
  .map-handle {
    position: absolute;
    height: 37px;
    z-index: 1;
    top: 20px;
    left: 80px;
  }

  .map-handle ul {
    height: 37px;
    border: solid 1px #1080CC;
  }

  .map-handle li {
    list-style: none;
    float: left;
    height: 35px;
    width: 40px;
    background-color: #1080CC;
  }

  .map-handle li img {
    margin: 5px 0;
  }
</style>
