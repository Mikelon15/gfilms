<template>
  <div id="home-container" class="hello">
    <div class="loading" v-if="isLoading"><img class="loading-img" src="./../assets/loading.svg" alt="loading"></div>
    <h2 class="hero-description">Hi! I'm a video producer in Phoenix, AZ</h2>
    <picture>
      <source media="(max-width: 1200px)" type="image/webp" srcset="./../assets/hero-1200.webp">
      <source media="(max-width: 1200px)" type="image/jp2" srcset="./../assets/hero-1200.jp2">
      <source media="(min-width: 1600px)" type="image/webp" srcset="./../assets/hero-1600.webp">
      <source media="(min-width: 1600px)" type="image/jp2" srcset="./../assets/hero-1600.jp2">
      <img class="hero" src="./../assets/hero-high.jpeg" alt="Angel Gutierrez">
    </picture>

    <h3>My videos</h3>
    <ul class="video-list-container" v-bind:class="{ 'locked': selectedVideo}">
      <li class="video-list" v-for="post in posts" v-bind:key="post.uri">
        <p class="title">{{post.name}}</p>
        <div class="video-container" v-on:click="selectVideo(post)">
          <img :src="post.pictures.sizes[2].link" alt="">

          <div class="overlay">
            <p> {{post.description}} </p>
          </div>
          <i class="play material-icons">play_circle_outline</i>
        </div>
      </li>
    </ul>

    <!-- video player -->
    <div class="player-container" v-if="selectedVideo" v-on:click="closeVideo()">
      <Player v-if="selectedVideo" v-bind:name="selectedVideo"></Player>
    </div>
  </div>
</template>

<script>
import videoServices from '../services/videoServices'
import Player from './Player'
import { setTimeout } from 'timers'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
export default {
  name: 'Home',
  components: {
    Player
  },
  props: {
    msg: String
  },
  data () {
    return {
      isLoading: false,
      hasError: false,
      showPosts: true,
      selectedVideo: null,
      posts: [],
      image: '@/assets/logo.png'
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.isLoading = true
      videoServices.getAll().then((val) => {
        if (val && val.data && val.data.data) {
          setTimeout(() => {
            this.showPosts = true
            this.posts = val.data.data
            setTimeout(() => { this.isLoading = false }, 200)
            const el = document.getElementsByClassName('loading')[0]
            el.className = el.className + ' hide'
          }, 1000)
        } else {
          this.hasError = true
        }
      })
    },
    selectVideo (post) {
      this.selectedVideo = post.uri.split('/')[2]
      disableBodyScroll(document.body)
    },
    closeVideo () {
      this.selectedVideo = null
      enableBodyScroll(document.body)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
h3 {
  font-size: 2.0em;
  margin: 80px 0 40px 10px;
  text-align: left;
}

img {
  width: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: auto;
  min-height: 500px;
}

a {
  color: #42b983;
}

p {
  text-align: left;
  margin: 15px;
}

.video-container {
  position: relative;
  display: inline-block;
  width: 100%;
}
.video-container i {
  display: none;
}
.video-container .overlay {
  display: none;
}
.video-container:hover {
  background-blend-mode: overlay;
  background: white;
  cursor: pointer;
}

.video-container:hover i {
  display: inline;
}

.video-container:hover .overlay {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5fa;
}

.title {
  font-weight: bold;
  font-size: 28px;
  margin: 35px 10px 15px 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.loading-cont {
    margin: auto;
    padding-top: 25vh;
    display: block;
    height: 20%;
    width: 30%;
}
.play {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 50pt;
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
.player-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(15, 15, 15, .97);
  z-index: 1000;
  overflow: hidden;
}
.horizontal {
  padding: 15% 25px;
}
.vertical {
  padding: 3% 25px;
}
.locked {
  overflow: hidden;
  overflow: hidden;
}
.loading {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: white;
  z-index: 1000;
}

.loading-img {
  width: 25%;
  max-width: 200px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.loading.hide {
  opacity: 0;
  -webkit-transition: opacity 150ms ease-out;
  -moz-transition: opacity 150ms ease-out;
  -o-transition: opacity 150ms ease-out;
  transition: opacity 150ms ease-out;
}

@media (min-width: 750px) {
  li {
    width: 40%;
    display: inline-block;
    padding: 4%;
  }
}
@media (min-width: 750px) {
  li.video-list {
    width: 46%;
    display: inline-block;
    padding: 1%;
  }
}
@media (min-width: 1200px) {
  li.video-list {
    width: 30%;
    display: inline-block;
    padding: 1%;
  }
}

</style>
