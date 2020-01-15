<template>
  <div class="hello">
    <transition name="fade">
      <div v-if="isLoading" class="loading-cont">
        <h1>Angel Gutierrez</h1>
        <img class="loading-anim" src="../assets/loading.svg" alt="loading">
      </div>
    </transition>
    <div name="fade" v-if="showPosts">
      <NavBar />
      <h3>My videos</h3>
      <ul >
          <li class="mdc-image-list__item" v-for="post in posts" v-bind:key="post.uri">
            <p class="title">{{post.name}}</p>
            <p class="description">{{post.description}}</p>
            <div class="video-container mdc-image-list__image-aspect-container">
              <img class="mdc-image-list__image" :src="post.pictures.sizes[2].link" alt="">
              <div class="mdc-image-list__supporting"><i class="material-icons">play_circle_outline</i></div>
            </div>
          </li>
      </ul>

      <footer>
          <div class="mdc-layout-grid">
              <div class="mdc-layout-grid__inner footer">
                  <div class="mdc-layout-grid__cell--span-4-desktop 
                              mdc-layout-grid__cell--span-4-tablet
                              mdc-layout-grid__cell--span-8-phone">
                      <h3>
                          Angel Gutierrez
                      </h3>
                      <h3>
                          Filmmaker
                      </h3>
                  </div>
                  <div class="mdc-layout-grid__cell--span-4-desktop 
                              mdc-layout-grid__cell--span-4-tablet
                              mdc-layout-grid__cell--span-8-phone">
                      <h3>
                          Angel@GutiProductions.com
                      </h3>
                      <h3>
                          602-516-5639
                      </h3>
                  </div>
                  <div class="mdc-layout-grid__cell--span-4-desktop 
                              mdc-layout-grid__cell--span-4-tablet
                              mdc-layout-grid__cell--span-8-phone">
                      <h3>
                          Phoenix, AZ
                      </h3>
                      <h3>
                          85042
                      </h3>
                  </div>
              </div>
          </div>
      </footer>

    </div>
    
  </div>
</template>

<script>
import NavBar from './NavBar';
import videoServices from '../services/videoServices';
import { setTimeout } from 'timers';

export default {
  name: 'HelloWorld',
  components: {
      NavBar
  },
  props: {
    msg: String
  },
  data() {
    return {
      isLoading: true,
      hasError: false,
      showPosts: false,
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
        if(val && val.data && val.data.data) {
          this.isLoading = false;
          setTimeout(() => {
            this.showPosts = true;
            this.posts = val.data.data;
          }, 1000);
        } else {
          this.hasError = true;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import "@material/image-list/mdc-image-list";
@import "@material/layout-grid/mdc-layout-grid";

$mdc-theme-primary: rgb(255, 250, 235);
$mdc-theme-secondary: #471c1c;
$mdc-theme-on-primary: #351111;
$mdc-theme-on-secondary: #fff3b1;

$gutter-size: 15px;
$width-height-ratio: (1560/878);

footer {
    background-color: $mdc-theme-secondary;
    color: $mdc-theme-on-secondary;
    margin-top: 100px;
    padding: 35px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  max-width: 400px;
  margin: auto;
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
.loading-cont {
    margin: auto;
    padding-top: 25vh;
    display: block;
    height: 20%;
    width: 30%;
}
.mdc-image-list__image-aspect-container {
    position: relative;
}

.mdc-image-list__image {
    opacity: 1;
    display: block;
    width: 100%;
    transition: .5s ease;
    backface-visibility: hidden;
}

.mdc-image-list__supporting {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.mdc-image-list__image-aspect-container:hover .mdc-image-list__image {
    opacity: 0.3;
    cursor: pointer;
}

.mdc-image-list__image-aspect-container:hover .mdc-image-list__supporting {
    opacity: 1;
    cursor: pointer;
    @include mdc-image-list-aspect($width-height-ratio);
}

.material-icons {
    font-size: 50px
}

.video-container {
  @include mdc-image-list-aspect($width-height-ratio);
  // max-width: 300px;
  // max-height: 300px;
  // margin: auto;
}

@media screen {
    @media (max-width: 840px) {
        #video-list {
            @include mdc-image-list-standard-columns(2, $gutter-size);
        }
    }
}

@media screen {
    @media (max-width: 480px) {
        #video-list {
            @include mdc-image-list-standard-columns(1, $gutter-size);
        }
    }
}
</style>
