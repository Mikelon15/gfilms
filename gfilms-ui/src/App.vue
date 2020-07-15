<template>
  <div id="app">
    <nav id="nav">
      <span class="menu material-icons" v-on:click="openNav()">menu</span>
      <h2>Angel Gutierrez</h2>
      <ul>
        <li><a href="">Home</a></li>
        <hr>
        <li><a href="">About Me</a></li>
        <hr>
        <li><a href="">Resume</a></li>
      </ul>
    </nav>
    <h3 class="hero-description">Hi! I'm a video producer in Phoenix, AZ</h3>
    <img class="hero" src="./assets/hero.png" alt="Angel Gutierrez">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    openNav () {
      const el = document.getElementById('nav')
      const classes = el.className
      if (classes.includes('open')) {
        el.className = ''
      } else {
        el.className += classes + 'open'
      }
      console.log(classes)
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
  width: 100%;
  background-color: white;
  z-index: 100;
  justify-content: flex-start;
}
nav .menu {
  margin: auto;
  margin-left: 20px;
  margin-right: 0px;
  font-size: 2.5em;
  z-index: 100;
}
nav .menu:hover {
  cursor: pointer;
}
h2 {
  width: calc(100% - 120px);
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
.hero {
  height: 100vh;
  width: 100%;
  object-fit: cover;
  z-index: 0;
}
.hero-description {
  position: absolute;
  top: 80px;
  width: 100%;
  font-size: 1.5em;
  box-sizing: border-box;
  padding: 10px 15px;
}
</style>
