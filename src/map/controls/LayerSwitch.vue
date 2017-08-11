<template>
  <div class="layerSwitch">
    <ul>
      <li class="title"><b class="b-icon"></b><span>图层控制</span></li>
      <li v-for="(layer,key,index) in layers" :id="layer.id">
        <input :data-attr="key" title="" @click="radioClick" name="layer" type="radio" :checked="key===0?true:false" />{{layer.name}}</li>
    </ul>
    <bd-polygon></bd-polygon>
    <bd-label></bd-label>
  </div>
</template>
<script>
  import BdPolygon from '@/map/overlayes/BdPolygon'
  import BdLabel from '@/map/overlayes/BdLabel'
  import { bus } from '@/js/bus.js'

  export default {
    name: 'LayerSwitch',
    data() {
      return {
        layers: [{
          id: 'YW',
          name: '一级网格',
          url: ''
        }, {
          id: 'EW',
          name: '二级网格',
          url: ''
        }, {
          id: 'SW',
          name: '三级网格',
          url: ''
        }]
      }
    },
    mounted() {
      this.ready();
    },
    methods: {
      ready() {},
      radioClick(e) {
        let ckLayerId = e.target.getAttribute('data-attr');
        bus.$emit('setVisible', ckLayerId);
        bus.$emit('setLabelVisible',ckLayerId);
      }
    },
    components: { BdPolygon,BdLabel }
  }

</script>
<style  scoped>
  .layerSwitch {
    position: absolute;
    bottom: 30px;
    left: 80px;
    z-index: 1;
    width: 210px;
  }

  .b-icon{
    height:18px;
    width:18px;
    display:inline-block;
    vertical-align: middle;
    margin:0 5px;
    background:url('/static/imgs/map/layer.png') no-repeat;
  }

  .layerSwitch li:first-child{
    height:37px;
    width: 210px;
    text-align: center;
    margin: 0;
    background-color:#1080CC;
  }

  .layerSwitch li span{
    font-size:18px;
    line-height:36px;
    vertical-align: middle;
    font-family:"Microsoft YaHei UI";
    color:#fff;
  }

  .layerSwitch ul {
    border:solid 1px #1080CC;
    background: #fff;
    width:212px;
    list-style-type: none;
    padding: 0;
  }

  .layerSwitch li {
    width:210px;
    list-style-type: none;
    text-align: left;
    margin: 5px 0;
    border-radius: 0;
    color: #333;
    padding:0 10px;
    background-color:#fff;
  }

</style>
