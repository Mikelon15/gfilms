<template>
  <div id="app">
    <div class="hero">
      <h1>Angel Gutierrez</h1>
    </div>
    <NavBar/>
    <VideoList/>
  </div>
</template>

<script>
import VideoList from './components/VideoList.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'app',
  components: {
    VideoList,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.hero {
  box-sizing: content-box;
  height: 125px;
  background: url(http://gutiproductions.com/73d35b7c4197e20d46846d9bc06e746c.jpg);
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
