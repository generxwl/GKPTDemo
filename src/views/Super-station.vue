<template>
  <div class="superstation">
      <!--超级站-->
      <v-header></v-header>
      <iframe
              frameborder="0"
              width="100%"
              height="100%"
              :src="superstationURL"
              scrolling="no"
      >

      </iframe>
      <!--弹出框-->
      <div class="dingwei">
          <el-button type="primary" @click="MaintenanceOpen()">运维记录</el-button>
      </div>
      <div class="tanchukuang" v-if="tanchu">
          <div class="fadess"></div>
          <div class="succ-pop">
              <div class="title">
              <a>运维记录</a><div class="el-icon-close" @click="MaintenanceShut"></div>
              </div>
              <div class="item-input">
                  <strong>设备名称</strong><input type="text">
              </div>
              <div class="item-input">
                  <strong>设备参数</strong><input type="text">
              </div>
              <div class="item-input">
                  <strong>最近运维时间</strong><input type="text">
              </div>
              <div class="item-input">
                  <strong>负责人</strong><input type="text">
              </div>
              <div class="item-input">
                  <strong>设备型号</strong><input type="text">
              </div>
              <div class="item-input">
                  <strong>用途简述</strong><input type="text">
              </div>
              <div class="item-input">
                  <strong>备品备件更换情况</strong><input type="text">
              </div>
              <div class="item-input">
                  <strong>巡查周期（天）</strong><input type="text">
              </div>
              <!--<div class="item-input">-->
                  <!--<el-button type="primary" >提交</el-button>-->
                  <!--<el-button >重置</el-button>-->
              <!--</div>-->
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'superstation',
  data () {
    return {
        superstationURL:'http://60.10.151.97:8090/new/hiddenWeb_2.php',
        fullscreenLoading: false,
        tanchu:false
    }
  },
    mounted(){
        this.openFullScreen()
    },
    methods: {
        //加载动画
        openFullScreen() {
            this.fullscreenLoading = true;
            setTimeout(() => {
                this.fullscreenLoading = false;
            }, 4000);
        },
        //运维弹出
        MaintenanceOpen() {
            this.tanchu = true;
        },
        //运维关闭
        MaintenanceShut(){
            this.tanchu = false
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .superstation{
        width: 100%;
        height: calc(100% - 50px);
        position: relative;
        .dingwei{
            position: absolute;
            right: 30px;
            bottom: 30px;
        }
        .tanchukuang{
            /*灰色遮罩层*/
            .fadess{
                width:100%;
                height:100%;
                background:rgba(0, 0, 0, 0.8);
                position: fixed;
                left: 0;
                top: 0;
                z-index: 998;
            }
            /*弹出层*/
            .succ-pop {
                width: 490px;
                height: 390px;
                background: #fff;
                position: fixed;
                left: 50%;
                top: 50%;
                margin-left: -200px;
                margin-top: -150px;
                z-index: 999;
                border-radius: 5px;
                border: solid 1px #357ebd;
                .title{
                    width: 100%;
                    height: 32px;
                    line-height: 30px;
                    text-align: left;
                    background:#1080cc;
                    a{
                        color: #fff;
                        font-size: 18px;
                        padding-left: 20px;
                    }
                    div{
                        margin-top: 8px;
                        float: right;
                        width: 24px;
                        height: 24px;
                        color: #fff;
                        margin-right: 6px;
                    }

                }
                .item-input{
                    margin-left: -20px;
                    margin-top: 16px;
                    strong{
                        display:inline-block;
                        width: 130px;
                        text-align: right;
                        padding-right: 10px;
                    }

                }
            }
        }
    }
</style>
