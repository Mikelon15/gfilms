<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Strait', sans-serif;
}
.hero {
  box-sizing: content-box;
  height: 125px;
  background-size: cover;
  background-position-y: center;
  background-blend-mode: overlay;
  background-color: #e9e7d2;

  padding-top: 20px;
  width: 100%;
  color: #181818;
  box-shadow: inset 0 -10px 14px 8px white;
}
body{
  margin: 0px;
}

</style>
