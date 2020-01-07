<template>
  <div class="hello">
    <h3>My videos</h3>
    <transition name="fade">
      <div v-if="isLoading">
        <img src="../assets/loading.svg" alt="loading">
      </div>
    </transition>
    <ul >
        <li v-for="post in posts" v-bind:key="post.uri">
          <p class="title">{{post.name}}</p>
          <p class="description">{{post.description}}</p>
          <div class="video-container">
            <img :src="post.pictures.sizes[2].link" alt="">
            <!-- <span v-html="post.embed.html"></span> -->
          </div>
        </li>
    </ul>
  </div>
</template>

<script>
import videoServices from '../services/videoServices';
import { setTimeout } from 'timers';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      isLoading: false,
      hasError: false,
      posts: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch () {
      this.isLoading = true;
      videoServices.getAll().then((val) => {
        this.isLoading = false;
        if(val && val.data && val.data.data) {
          setTimeout(() => {
            this.posts = val.data.data;
          }, 500);
        } else {
          this.hasError = true;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
.title {
  font-weight: bold;
  font-size: 14pt;
}
a {
  color: #42b983;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.video-container {
}
</style>
