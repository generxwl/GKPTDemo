<template>
  <div class="main-layer">
    <div class="main-layer-handle">筛选监测点</div>
    <ul class="warp-box">
      <li v-for="(item,index) in targets" :id="('Litem_'+ index)" :style="'background:'+(item.checked ? '#2494F2' : 'rgba(0, 0, 0, 0.6)')" :data-index="index" :data-type="item.name" @click="liClick">
        <img :src="item.checked ? item.checkedSrc : item.src" title=""/>
        <span>{{item.value}}</span>
      </li>
    </ul>
    <ol class="kqworp" v-show="kongqi">
      <li style="width: 106px;" v-for="(item,index) in KQtargets" :data-parent-index="item.parentIndex" :data-parent="item.parentName" :data-index="index" :data-type="item.name" @click="OKQClick">
        <img :src="item.src" title=""/>
        <span>{{item.value}}</span>
      </li>
    </ol>
    <ol class="vdworp" v-show="shiping">
      <li style="width: 106px;" v-for="(item,index) in VDtargets" :data-parent-index="item.parentIndex" :data-parent="item.parentName" :data-index="index" :data-type="item.name" @click="OVDClick">
        <img :src="item.src" title=""/>
        <span>{{item.value}}</span>
      </li>
    </ol>
    <a href="https://auth.ys7.com/signIn?from=509cb5ddedd147e486fb&r=1767655759&returnUrl=https%3A%2F%2Fys7.com%2F%3FloginRedirect%3D1&host=www.ys7.com%2Flogin%2F"
       class="ACvideo"
       target="view_window"
        v-show="aclink"
    >
      查看安次区污染源企业视频
    </a>
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
        kongqi: false,
        shiping: false,
        aclink:false,
        defaultType:'LAYER_GS',
        clicksrc:'static/imgs/main/left.png',
        clickchesrc:'static/imgs/main/right.png',
        targets: [
          {
            name: 'layer_cg',
            value: '空气传感器监测',
            src: 'static/imgs/main/left.png',
            checkedSrc: 'static/imgs/main/right.png',
            checked:false
          }, {
            name: 'layer_gs',
            value: '国省控监测',
            src: 'static/imgs/main/gs.png',
            checkedSrc: 'static/imgs/main/gs_c.png',
            checked:true
          },
          {
            name: 'layer_gd',
            value: '工地扬尘监测',
            src: 'static/imgs/main/gd.png',
            checkedSrc: 'static/imgs/main/gd_c.png',
            checked:false
          },
          {
            name: 'layer_qy',
            value: '企业污染源监测',
            src: 'static/imgs/main/qy.png',
            checkedSrc: 'static/imgs/main/qy_c.png',
            checked:false
          },
          {
            name: 'layer_sp',
            value: '视频',
            src: 'static/imgs/main/left.png',
            checkedSrc: 'static/imgs/main/right.png',
            checked:false
          }
          ,
          {
            name: 'layer_lk',
            value: '道路路况',
            src: 'static/imgs/main/lk.png',
            checkedSrc: 'static/imgs/main/lk_c.png',
            checked:false
          }
          ,
          {
            name: 'layer_zt',
            value: '渣土车GPS',
            src: 'static/imgs/main/zt.png',
            checkedSrc: 'static/imgs/main/zt_c.png',
            checked:false
          }
          ,
          {
            name: 'layer_hw',
            value: '环卫车GPS',
            src: 'static/imgs/main/hw.png',
            checkedSrc: 'static/imgs/main/hw_c.png',
            checked:false
          }
          ,
          {
            name: 'layer_jy',
            value: '加油站在线监测',
            src: 'static/imgs/main/jy.png',
            checkedSrc: 'static/imgs/main/jy_c.png',
            checked:false
          }
        ],
        //
        KQtargets: [
          {
            name: 'layer_cgq_lcs',
            value: '六参数监测',
            parentName: 'layer_cg',
            parentIndex: '0',
            src: 'static/imgs/main/cg.png',
            checkedSrc: 'static/imgs/main/cg_c.png'
          },
          {
            name: 'layer_cgq_voc',
            value: 'TVOC监测',
            parentName: 'layer_cg',
            parentIndex: '0',
            src: 'static/imgs/mues/sixzb/vocw.png',
            checkedSrc: 'static/imgs/mues/sixzb/vocw_c.png'
          }
        ],
        VDtargets: [
          {
            name: 'layer_sp_slw',
            value: '散乱污企业',
            parentName: 'layer_sp',
            from:'4',
            parentIndex: '4',
            src: 'static/imgs/mues/video/slw.png',
            checkedSrc: 'static/imgs/mues/video/slw_c.png'
          },
          {
            name: 'layer_sp_voc',
            value: 'VOCs企业',
            parentName: 'layer_sp',
            from:'3',
            parentIndex: '4',
            src: 'static/imgs/mues/video/voc.png',
            checkedSrc: 'static/imgs/mues/video/voc_c.png'
          },
//          {
//            name: 'layer_sp_gd',
//            parentName: 'layer_sp',
//            parentIndex: '4',
//            value: '工地扬尘',
//            src: 'static/imgs/mues/video/gdyc.png',
//            checkedSrc: 'static/imgs/mues/video/gdyc_c.png'
//          },
          {
            name: 'layer_sp_gkw',
            value: '高空五公里',
            parentName: 'layer_sp',
            parentIndex: '4',
            src: 'static/imgs/mues/video/gkw.png',
            checkedSrc: 'static/imgs/mues/video/gkw_c.png'
          }
        ]
      }
    },
    created(){

    },
    mounted(){

    },
    methods: {

      //指标切换点击事件
      liClick(e){
        let t = this;
        let childElement = e.currentTarget;
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let type = childElement.getAttribute('data-type');
        let targets = this.$data.targets;
        let item = targets[index];
        let hasChecked = false;
        if (parseInt(index) === 0) {
          t.kongqi = !t.kongqi;
          t.getParentStyle(index)
        }
        else if (parseInt(index) === 4) {
          t.shiping = !t.shiping;
          t.getParentStyle(index)
        }
        else {
          imgElement.getAttribute('src') !== item.src ? (imgElement.src = item.src, childElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)') : (imgElement.src = item.checkedSrc, childElement.style.backgroundColor = '#2494F2', hasChecked = true);
          bus.$emit('targetMainLayer', type, hasChecked);
        }
      },

      //指标切换点击事件
      OKQClick(e){
        let childElement = e.currentTarget;
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let type = childElement.getAttribute('data-type');
        let parentName = childElement.getAttribute('data-parent');
        let parentIndex = childElement.getAttribute('data-parent-index');
        let targets = this.$data.KQtargets;
        let item = targets[index];
        let hasChecked = false;

        imgElement.getAttribute('src') !== item.src ? (imgElement.src = item.src, childElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)') : (imgElement.src = item.checkedSrc, childElement.style.backgroundColor = '#2494F2', hasChecked = true);

        let hasParentChecked = this.hasCheckedChildElement('KQ') || false;
        this.setParentStates(parentIndex, hasParentChecked, parentName);

        bus.$emit('targetMainLayer', type, hasChecked);
      },

      //指标切换点击事件
      OVDClick(e){
        let t = this;
        let childElement = e.currentTarget;
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let type = childElement.getAttribute('data-type');
        let parentName = childElement.getAttribute('data-parent');
        let parentIndex = childElement.getAttribute('data-parent-index');
        let targets = this.$data.VDtargets;
        let item = targets[index];
        let hasChecked = false;
        let from = item.from;
        if (parseInt(index) === 0 || parseInt(index) === 1) {
              t.aclink = !t.aclink;
        }
        imgElement.getAttribute('src') !== item.src ? (imgElement.src = item.src, childElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)') : (imgElement.src = item.checkedSrc, childElement.style.backgroundColor = '#2494F2', hasChecked = true);
        let hasParentChecked = this.hasCheckedChildElement('SP') || false;
        this.setParentStates(parentIndex, hasParentChecked, parentName);
        bus.$emit('targetMainLayer', type, hasChecked,from);
      },

      //设置父节点状态
      setParentStates(index, hasChecked, name){
        let item = this.$data.targets[index];
        let element = document.querySelectorAll('ul>li[data-type="' + name + '"]');
        if (element && element.length) {
          let el = element[0];
          let imgElement = el.querySelector('img');
          !hasChecked ? el.style.backgroundColor = 'rgba(0, 0, 0, 0.6)' : el.style.backgroundColor = '#2494F2';
        }
      },
      //二级菜单栏父级背景切换
      getParentStyle(index){
          let t = this;
          let id = ('Litem_'+index);
          let backgroundimg = document.getElementById(id).getElementsByTagName("img")[0];
          if (backgroundimg.src.indexOf(t.clicksrc) != -1) {
              backgroundimg.src = t.clickchesrc;
          }
          else {
              backgroundimg.src = t.clicksrc;
          }
      },
      //判断父节点是否选中
      hasCheckedChildElement(type){
        let childTarget = (type.toUpperCase() === 'KQ' ? this.$data.KQtargets : this.$data.VDtargets) || [];
        let childElement = (type.toUpperCase() === 'KQ' ? $('ol[class="kqworp"] li') : $('ol[class="vdworp"] li')) || [];
        for (let i = 0, length = childElement.length; i < length; i++) {
          let childItem = childTarget[i];
          let elementItem = childElement[i];
          let imgElement = elementItem.querySelector('img');
          if (imgElement.getAttribute('src') === childItem.checkedSrc) {
            return true;
          }
        }
        return false;
      }
    },
    components: {MainHandle}
  };
</script>
<style lang="scss" scoped>
  .main-layer {
    position: absolute;
    left: 0;
    border-right: solid 1px #fff;
    border-radius: 4px;
    top: 50px;
    z-index: 1;
    .warp-box{
      li:nth-child(1){
        img{
          margin: 14px 0;
          float: right;
          padding-right: 6px;
        }
      }
      li:nth-child(5){
        img{
          float: right;
          margin: 14px 0;
          padding-right: 6px;
        }
      }
    }
  }

  .kqworp {
    position: absolute;
    top: 38px;
    left: 150px;
    color: #fff;
  }
  .ACvideo{
      position: fixed;
      display: inline-block;
      padding: 5px 15px;
      color: #fff;
      background:rgba(0, 0, 0, 0.6) ;
      left: calc(50% - 100px);
      bottom:20px;
  }
  .vdworp {
    position: absolute;
    top: 191px;
    left: 150px;
    color: #fff;
  }
  .main-layer-handle {
    width: 148px;
    background: #fff;
    color: #2494F2;
   font-weight: bold;
    line-height: 38px;
    opacity: 0.8;
  }

  .main-layer ul {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    width: 148px;
    color: #fff;
  }

  .main-layer li {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    background-color: rgba(0, 0, 0, 0.6);
    list-style: none;
    line-height: 38px;
    width: 148px;
    padding: 0;
    cursor: pointer;
  }
  .main-layer li img {
    margin: 8px 0;
  }
  .main-layer li span {
    display: inline-block;
    width: calc(100% - 40px);
    vertical-align: baseline;
    text-align: left;
    font-size: 12px;
    font-family: "Microsoft YaHei";
  }
</style>
