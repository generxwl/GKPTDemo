<template>
  <div class="main-layer">
    <div class="main-layer-handle">筛选监测点</div>
    <ul>
      <li v-for="(item,index) in targets" :data-index="index" :data-type="item.name" @click="liClick">
        <img :src="item.src" title="" />
        <span>{{item.value}}</span>
      </li>
    </ul>
    <ol class="kqworp" v-if="kongqi">
      <li v-for="(item,index) in KQtargets" :data-index="index" :data-type="item.name" @click="OKQClick">
        <img :src="item.src" title="" />
        <span>{{item.value}}</span>
      </li>
    </ol>
    <ol class="vdworp" v-if="shiping">
      <li v-for="(item,index) in VDtargets" :data-index="index" :data-type="item.name" @click="OVDClick">
        <img :src="item.src" title="" />
        <span>{{item.value}}</span>
      </li>
    </ol>
    <main-handle></main-handle>
  </div>
</template>
<script>
  import MainHandle from '@/map/handle/MainHandle'
  import {bus} from '@/js/bus'

  export default {
    name: 'MainLayerHandle',
    data () {
      return {
        kongqi:false,
        shiping:false,
        targets: [
            {
          name: 'layer_cg',
          value: '空气传感器',
          src:'static/imgs/main/cg.png',
          checkedSrc:'static/imgs/main/cg_c.png'
        },{
          name: 'layer_gs',
          value: '国省控点',
          src:'static/imgs/main/gs.png',
          checkedSrc:'static/imgs/main/gs_c.png'
        },
        {
          name: 'layer_gd',
          value: '工地',
          src:'static/imgs/main/gd.png',
          checkedSrc:'static/imgs/main/gd_c.png'
        },
        {
           name: 'layer_voc',
           value: 'TVOC监测',
           src:'static/imgs/mues/sixzb/vocw.png',
           checkedSrc:'static/imgs/mues/sixzb/vocz.png'
        },
//        {
//          name: 'layer_qy',
//          value: '企业',
//          src:'static/imgs/main/qy.png',
//          checkedSrc:'static/imgs/main/qy_c.png'
//        },
            {
          name: 'layer_sp',
          value: '视频',
          src:'static/imgs/main/sp.png',
          checkedSrc:'static/imgs/main/sp_c.png'
        },{
          name: 'layer_lk',
          value: '路况',
          src:'static/imgs/main/lk.png',
          checkedSrc:'static/imgs/main/lk_c.png'
        },{
          name: 'layer_zt',
          value: '渣土车',
          src:'static/imgs/main/zt.png',
          checkedSrc:'static/imgs/main/zt_c.png'
        },{
          name: 'layer_hw',
          value: '环卫车',
          src:'static/imgs/main/hw.png',
          checkedSrc:'static/imgs/main/hw_c.png'
        },{
          name: 'layer_jy',
          value: '加油站',
          src:'static/imgs/main/jy.png',
          checkedSrc:'static/imgs/main/jy_c.png'
        }],
      //
          KQtargets:[
              {
                  name: 'layer_kq_lcs',
                  value: '六参数监测',
                  src:'static/imgs/mues/sixzb/gdycw.png',
                  checkedSrc:'static/imgs/mues/sixzb/gdycw.png'
              },
              {
                  name: 'layer_kq_gsx',
                  value: 'β射线扬尘',
                  src:'static/imgs/mues/sixzb/btw.png',
                  checkedSrc:'static/imgs/mues/sixzb/btz.png'
              },
//              {
//                  name: 'layer_kq_tvo',
//                  value: 'TVOC监测',
//                  src:'static/imgs/mues/sixzb/vocw.png',
//                  checkedSrc:'static/imgs/mues/sixzb/vocz.png'
//              }
          ],
          VDtargets:[
              {
                  name: 'layer_vd_slw',
                  value: '散乱污企业',
                  src:'static/imgs/mues/video/voc.png',
                  checkedSrc:'static/imgs/mues/video/voc.png'
              },
              {
                  name: 'layer_vd_voc',
                  value: 'VOCs企业',
                  src:'static/imgs/mues/video/gdyc.png',
                  checkedSrc:'static/imgs/mues/video/gdyc.png'
              },
              {
                  name: 'layer_vd_gd',
                  value: '工地扬尘',
                  src:'static/imgs/mues/video/slw.png',
                  checkedSrc:'static/imgs/mues/video/slw.png'
              },
              {
                  name: 'layer_vd_gkw',
                  value: '高空五公里',
                  src:'static/imgs/mues/video/gkw.png',
                  checkedSrc:'static/imgs/mues/video/gkw.png'
              }
          ]
      };
    },
    created(){},
    mounted(){},
    methods:{
      liClick(e){
        let t = this;
        let childElement = e.currentTarget;
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let type = childElement.getAttribute('data-type');
        let targets = this.$data.targets;
        let item = targets[index];
        let hasChecked = false;
//        if(index == 0){
//            t.kongqi = !t.kongqi;
//        }
//        if(index == 4){
//              t.shiping = !t.shiping;
//        }
        imgElement.getAttribute('src') !== item.src ? (imgElement.src=item.src,childElement.style.backgroundColor = 'rgba(0, 79, 137, 0.6)') : (imgElement.src = item.checkedSrc,childElement.style.backgroundColor = '#1080cc',hasChecked=true);
        bus.$emit('targetMainLayer',type,hasChecked);
      },
        OKQClick(e){
            let childElement = e.currentTarget;
            let imgElement = childElement.querySelector('img');
            let index = childElement.getAttribute('data-index');
            let type = childElement.getAttribute('data-type');
            let targets = this.$data.KQtargets;
            let item = targets[index];
            let hasChecked = false;
            imgElement.getAttribute('src') !== item.src ? (imgElement.src=item.src,childElement.style.backgroundColor = 'rgba(0, 79, 137, 0.6)') : (imgElement.src = item.checkedSrc,childElement.style.backgroundColor = '#1080cc',hasChecked=true);
//            bus.$emit('targetMainLayer',type,hasChecked);
        },
        OVDClick(e){
            let childElement = e.currentTarget;
            let imgElement = childElement.querySelector('img');
            let index = childElement.getAttribute('data-index');
            let type = childElement.getAttribute('data-type');
            let targets = this.$data.VDtargets;
            let item = targets[index];
            let hasChecked = false;
            imgElement.getAttribute('src') !== item.src ? (imgElement.src=item.src,childElement.style.backgroundColor = 'rgba(0, 79, 137, 0.6)') : (imgElement.src = item.checkedSrc,childElement.style.backgroundColor = '#1080cc',hasChecked=true);
//            bus.$emit('targetMainLayer',type,hasChecked);
        }
    },
    components:{MainHandle}
  };
</script>
<style lang="scss" scoped>
  .main-layer {
    position: absolute;
    left: 0;
    top:50px;
    z-index: 1;
  }
  .kqworp{
    position: absolute;
    top:26px;
    left:100px;
    color: #fff;

  }
  .vdworp{
    position: absolute;
    top:168px;
    left:100px;
    color: #fff;
    img{
      width: 15px!important;
      height: 15px!important;
    }
  }
  .main-layer-handle {
    width: 100px;
    background: #fff;
    color: #1080cc;
    border: solid 1px #1080cc;
    line-height: 25px;
  }

  .main-layer ul {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    border: solid 1px #1080CC;
    width: 100px;
    color: #fff;
  }

  .main-layer li {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    background-color: rgba(0, 79, 137, 0.6);
    list-style: none;
    line-height: 30px;
    width: 98px;
    padding: 0;
    cursor: pointer;
  }

  .main-layer li img {
    margin: 10px 0;
  }

  .main-layer li span{
    display:inline-block;
    width:calc(100% - 20px);
    vertical-align: baseline;
    text-align: left;
    font-size:12px;
    font-family:"Microsoft YaHei";
  }
</style>
