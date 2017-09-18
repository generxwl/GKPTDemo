<script>
  import {bus} from '@/js/bus'
  export default {
    name: 'VideoHandle',
    ready(){
    },
    data () {
      return {};
    },
    created(){
      bus.$once('setVideoMap', this.setMap(map));
    },
    methods: {
      setMap(map){
        !this.map && (this.map = map);
      }
    }
  };
</script>
<style scoped>
</style>
