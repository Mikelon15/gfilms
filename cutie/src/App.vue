<template>
  <HelloWorld/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from './components/HelloWorld.vue'

@Options({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">

html,body{
  height:100%
}
body {
  background: #112 url(//images.squarespace-cdn.com/content/v1/5bdc5211b27e39f6e3a56c93/1542607333858-0J69I34D9MB46ZE14V0N/ke17ZwdGBToddI8pDm48kGCKKYHD_9InxIOqMU8JWD57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmLLxGPZs9cXJqW7PQ94qJw-WL1XilVhlx0ccHfj5siWAtFCAUdXhV4rKjCKTzugQo/Boston+Skyline+from+Cambridge.jpg?format=2500w)  top no-repeat;
  background-size:cover;
  background-blend-mode: darken;
  background-color: rgba(0,0,45,.7);
  margin:0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
