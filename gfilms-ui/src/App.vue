<template>
  <div id="app">
    <nav id="slider-nav">
      <span class="menu material-icons" v-on:click="openNav()">menu</span>
      <h2>Angel Gutierrez</h2>
      <ul>
        <li><router-link to="home">Home</router-link></li>
        <li><router-link to="about">About Me</router-link></li>
        <li><router-link to="resume">Resume</router-link></li>
      </ul>
    </nav>
    <nav id="nav">
      <span class="menu material-icons" v-on:click="openNav()">menu</span>
      <h2>Angel Gutierrez</h2>
      <ul>
        <li><router-link to="home">Home</router-link></li>
        <li><router-link to="about">About Me</router-link></li>
        <li><router-link to="resume">Resume</router-link></li>
      </ul>
    </nav>
    <div id="nav-menu">
      <span class="close material-icons" v-on:click="closeNav()">close</span>
      <ul>
        <li><router-link to="home">Home</router-link></li>
        <hr>
        <li><router-link to="about">About Me</router-link></li>
        <hr>
        <li><router-link to="resume">Resume</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export default {
  name: 'App',
  watch: {
    '$route' (to, from) {
      this.closeNav()
    }
  },
  data () {
    return {
      posLast: 0,
      direction: '',
      posDirection: '',
      aboutmeText: '',
      resumeText: ''
    }
  },
  mounted () {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY < 150) {
        document.getElementById('slider-nav').className = ''
        return
      }
      const currDirection = this.direction
      this.direction = (window.scrollY < this.posLast) ? 'UP' : 'DOWN'
      if (currDirection !== this.direction) this.posDirection = window.scrollY

      if (Math.abs(this.posDirection - window.scrollY) > 180) {
        if (this.direction === 'UP') document.getElementById('slider-nav').className = 'visible'
        else document.getElementById('slider-nav').className = ''
      }
      this.posLast = window.scrollY
    })
  },
  methods: {
    openNav () {
      const el = document.getElementById('nav-menu')
      if (!el.className.includes('open')) {
        el.className = 'open'
        disableBodyScroll(document.body)
      }
    },
    closeNav () {
      const el = document.getElementById('nav-menu')
      if (el.className.includes('open')) {
        el.className = ''
        enableBodyScroll(document.body)
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
  padding: 70px 0 300px 0;
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
nav ul {
  display: none;
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
  color: black;
}
#nav-menu {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 0;
  -webkit-transition: width 300ms ease-out;
  -moz-transition: width 300ms ease-out;
  -o-transition: width 300ms ease-out;
  transition: width 300ms ease-out;
  background-color: rgba(255, 255, 255, 0.97);
}
#nav-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  padding-top: 20vh;
}
#nav-menu ul li {
  opacity: 0;
  box-sizing: content-box;
  font-size: 2em;
  padding: 30px 10px;
  -webkit-transition: opacity 200ms;
  -moz-transition: opacity 200ms;
  -o-transition: opacity 200ms;
  transition: opacity 200ms;
}
hr {
  opacity: 0;
  padding: 0;
  margin: auto;
  width: 50%;
  border: 1px solid #961717;
  -webkit-transition: opacity 200ms;
  -moz-transition: opacity 200ms;
  -o-transition: opacity 200ms;
  transition: opacity 200ms;
}
#nav-menu ul li a {
  color: black;
  text-decoration: none; /* no underline */
}
#nav-menu.open {
  width: 100%;
  z-index: 1000;
  background-color: #fffffff6;
  -webkit-transition: width 350ms ease-in-out;
  -moz-transition: width 350ms ease-in-out;
  -o-transition: width 350ms ease-in-out;
  transition: width 350ms ease-in-out;
}
#nav-menu.open li, #nav-menu.open hr, #nav-menu.open .close {
  opacity: 1;
  -webkit-transition: opacity 100ms ease-in-out 150ms;
  -moz-transition: opacity 100ms ease-in-out 150ms;
  -o-transition: opacity 100ms ease-in-out 150ms;
  transition: opacity 100ms ease-in-out 150ms;
}
.close {
  opacity: 0;
  position: absolute;
  left: 15px;
  top: 25px;
  font-size: 3em;
  -webkit-transition: opacity 200ms;
  -moz-transition: opacity 200ms;
  -o-transition: opacity 200ms;
  transition: opacity 200ms;
}

#slider-nav {
  display: flex;
  position: fixed;
  top: 0;
  height: 0;
  -webkit-transition: height 250ms ease-in-out;
  -moz-transition: height 250ms ease-in-out;
  -o-transition: height 250ms ease-in-out;
  transition: height 250ms ease-in-out;
}

#slider-nav h2, #slider-nav .menu {
  opacity: 0;
  -webkit-transition: opacity 150ms ease-out;
  -moz-transition: opacity 150ms ease-out;
  -o-transition: opacity 150ms ease-out;
  transition: opacity 150ms ease-out;
}

#slider-nav.visible {
  height: 88px;
  -webkit-transition: height 250ms ease-in-out;
  -moz-transition: height 250ms ease-in-out;
  -o-transition: height 250ms ease-in-out;
  transition: height 250ms ease-in-out;
}
#slider-nav.visible h2, #slider-nav.visible .menu {
  opacity: 1;
  -webkit-transition: opacity 100ms ease-out 100ms;
  -moz-transition: opacity 100ms ease-out 100ms;
  -o-transition: opacity 100ms ease-out 100ms;
  transition: opacity 100ms ease-out 100ms;
}

@media (min-width: 750px) {
  .menu.material-icons {
    display: none;
  }
  nav h2 {
    width: auto;
    padding: 0 150px;
  }
  nav ul {
    margin: auto;
    padding: 0;
    display: flex;
  }
  nav ul li {
    display: inline-block;
    padding: 0 15px;
    font-size: 1.5em;
  }
  nav ul li a {
    color: black;
    text-decoration: none; /* no underline */
  }
  #slider-nav li {
    display: none;
  }
  #slider-nav.visible li {
    display: inline-block;
  }
}
</style>
