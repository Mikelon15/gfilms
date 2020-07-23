<template>
  <div id="app">
    <nav id="nav">
      <span class="menu material-icons" v-on:click="openNav()">menu</span>
      <div class="overlay"></div>
      <h2>Angel Gutierrez</h2>
      <ul>
        <li><router-link to="home">Home</router-link></li>
        <hr>
        <li><router-link to="about">About Me</router-link></li>
        <hr>
        <li><router-link to="resume">Resume</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route' (to, from) {
      this.openNav()
    }
  },
  methods: {
    openNav () {
      const el = document.getElementById('nav')
      const classes = el.className
      if (classes.includes('open')) {
        el.className = ''
      } else {
        el.className += classes + 'open'
      }
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: Strait,sans-serif;
  color: #2c3e50;
  padding: 70px 0 100px 0;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
nav {
  position: absolute;
  display: flex;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 100;
  justify-content: flex-start;
}
nav .overlay {
  display: none;
}
nav .menu {
  margin: auto;
  margin-left: 15px;
  margin-right: 0px;
  font-size: 2.5em;
  z-index: 100;
}
nav .menu:hover {
  cursor: pointer;
}
h2 {
  width: calc(100% - 110px);
  font-size: 2em;
}
nav ul {
  margin: 0;
  padding: 0;
  display: none;
  padding-bottom: 10px;
}
nav li {
  display: block;
  box-sizing: content-box;
  font-size: 1.5em;
  padding: 10px;
}
nav hr {
  padding: 0;
  margin: auto;
  width: 50%;
  border: 1px solid #961717;
}
nav li a {
  color: black;
  text-decoration: none; /* no underline */
}
nav.open ul {
  display: block;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0px 6px 4px 0px #3535357a;
  border-radius: 0 0 5px 5px;
  background-color: white;
}
nav.open .overlay {
  position: fixed;
  display: block;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00000040;
}
</style>
