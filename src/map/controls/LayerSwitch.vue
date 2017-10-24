<template>
  <div class="layerSwitch">
    <ul>
      <li class="title"><b class="b-icon"></b><span>图层控制</span></li>
      <li :id="layers[0].id" data-attr="0" @click="radioClick" class="layer-checked">
        {{layers[0].name}}
        <!--<input data-attr="0" title="" @click="radioClick" name="layer" type="radio" checked/>{{layers[0].name}}-->
        <!--<div class="block layerSwitch-slider">-->
        <!--<el-slider id="slider_0" data-attr="0" v-model="sliderValue0" :disabled="disabledSlider0" @change="sliderChangeEvent"></el-slider>-->
        <!--</div>-->
      </li>
      <li :id="layers[1].id" data-attr="1" @click="radioClick">
        {{layers[1].name}}
        <!--<input data-attr="1" title="" @click="radioClick" name="layer" type="radio"/>{{layers[1].name}}-->
        <!--<div class="block layerSwitch-slider">-->
        <!--<el-slider id="slider_1" data-attr="1" v-model="sliderValue1" :disabled="disabledSlider1" @change="sliderChangeEvent"></el-slider>-->
        <!--</div>-->
      </li>
      <li :id="layers[2].id" data-attr="2" @click="radioClick">
        {{layers[2].name}}
        <!--<input data-attr="2" title="" @click="radioClick" name="layer" type="radio"/>{{layers[2].name}}-->
        <!--<div class="block layerSwitch-slider">-->
        <!--<el-slider id="slider_2" data-attr="2" v-model="sliderValue2" :disabled="disabledSlider2" @change="sliderChangeEvent"></el-slider>-->
        <!--</div>-->
      </li>
    </ul>
    <bd-polygon></bd-polygon>
    <!--<bd-label></bd-label>-->
  </div>
</template>
<script>
  import BdPolygon from '@/map/overlayes/BdPolygon'
  import BdLabel from '@/map/overlayes/BdLabel'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'LayerSwitch',
    data() {
      return {
        sliderValue0: 0,
        sliderValue1: 0,
        sliderValue2: 0,
        disabledSlider0: false,
        disabledSlider1: true,
        disabledSlider2: true,
        checkedId: 0,
        layers: [
          {
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
      bus.$on('resetLayerLi',this.resetLi);
    },
    methods: {
      ready() {

      },
      radioClick(e) {
        this.resetLi();
        let el = e.target;
        let qel = jQuery(el);
        let ckLayerId = el.getAttribute('data-attr');

        this.setSliderDisable(ckLayerId);
        this.checkedId = ckLayerId;
        let hasChecked = false;
        qel.hasClass('layer-checked') ? (qel.removeClass('layer-checked')) : (qel.addClass('layer-checked').siblings().removeClass('layer-checked'),hasChecked=true);
        bus.$emit('setVisible', ckLayerId,hasChecked);
        bus.$emit('setLabelVisible', ckLayerId);
        //$(e.target).addClass('layer-checked').siblings().removeClass('layer-checked');
      },
      setSliderDisable(id){
        this.disabledSlider0 = true;
        this.disabledSlider1 = true;
        this.disabledSlider2 = true;
        if (parseInt(id) === 0) {
          this.disabledSlider0 = false;
        } else if (parseInt(id) === 1) {
          this.disabledSlider1 = false;
        } else if (parseInt(id) === 2) {
          this.disabledSlider2 = false;
        }
      },
      sliderChangeEvent(e){
        bus.$emit('setOpacity', this.checkedId, e === 100 ? 0.001 : 1.0 - e / 100)
      },
      resetLi(hasReset){
        jQuery.find('.layerSwitch li').forEach(function (value, index) {
          index !== 0 && (value.style.backgroundColor = 'rgba(0, 79, 137, 0.6)',value.className='');
        });
      }
    },
    components: {BdPolygon, BdLabel}
  }

</script>
<style scoped>
  .layerSwitch {
    position: absolute;
    bottom: 30px;
    left: 0;
    z-index: 1;
    width: 60px;
    border-radius: 2px;
  }

  .b-icon {
    height: 18px;
    width: 18px;
    /*display: inline-block;*/
    vertical-align: middle;
    margin: 0 5px;
    display: none;
    background: url('/static/imgs/map/layer.png') no-repeat;
  }

  .layerSwitch li:first-child {
    line-height: 25px;
    width: 60px;
    text-align: center;
    margin: 0;
    background-color: #fff;
    font-size: 12px;
  }

  .layerSwitch li span {
    font-size: 12px;
    line-height: 20px;
    vertical-align: middle;
    font-family: "Microsoft YaHei UI";
    color: #1080cc;
  }

  .layerSwitch ul {
    border: solid 1px #fff;
    box-shadow: 0 0 6px #666;
    border-radius: 2px;
    width: 62px;
    list-style-type: none;
    padding: 0;
  }

  .layerSwitch li {
    width: 60px;
    list-style-type: none;
    text-align: center;
    font-size: 12px;
    margin: 0;
    border-radius: 0;
    color: #fff;
    padding: 1px 5px;
    line-height: 30px;
    background-color: rgba(0, 79, 137, 0.6);
  }

  .layerSwitch li:hover {
    cursor: pointer;
  }

  .layer-checked {
    background-color: #1080cc !important;
  }

  .layerSwitch-slider {
    float: right;
    width: 100px;
    height: 5px;
    margin: -5px 0 0 0;
  }
</style>
