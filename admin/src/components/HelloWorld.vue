<template>
  <div class="hello">
    <div v-if="!addingVimeo && !addingYoutube && !editingAboutMe && !editingResume">
      <h1>ADMIN WEBSITE</h1>
      <button class="pageButton" v-on:click="addingVimeoVideos()">ADD VIMEO VIDEOS</button>
      <button class="pageButton" v-on:click="addingYoutubeVideos()">ADD YOUTUBE VIDEOS</button>
      <button class="pageButton" v-on:click="editAboutMe()">EDIT ABOUT ME</button>
      <button class="pageButton" v-on:click="editResume()">EDIT RESUME</button>

      <!-- display added videos -->
      <ul>
        <li class="video-list" v-for="video in videos" v-bind:key="video.uri">
          <button class="remove" v-on:click="removeVideo(video)">remove</button>
          <span class="title">{{video.name}}</span>
          <div class="video-container">
            <img v-if="video.type === 'vimeo'" :src="video.pictures.sizes[2].link" alt="">
            <img v-if="video.type === 'youtube'" :src="video.pictures.medium.url" alt="">
            <p> {{video.description}} </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- youtube videos that can be added -->
    <div class="adding" v-if="addingYoutube">
      <button v-on:click="doneAddingYoutubeVideos()">DONE</button>
      <ul class="video-list-container">
        <li class="video-list" v-for="youtube in youtubeVideos" v-bind:key="youtube.snippet.thumbnails.standard.url">
          <button v-on:click="addYoutube(youtube)">add</button> <span class="title">{{youtube.snippet.title}}</span>
          <p class="added" v-if="youtube.added">has been added</p>
          <div class="video-container">
            <img :src="youtube.snippet.thumbnails.medium.url" alt="">
            <p> {{youtube.snippet.description}} </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- vimeo videos that can be added -->
    <div class="adding" v-if="addingVimeo">
      <button v-on:click="doneAddingVimeoVideos()">DONE</button>
      <ul class="video-list-container">
        <li class="video-list" v-for="vimeo in vimeoVideos" v-bind:key="vimeo.uri">
          <button v-on:click="addVimeo(vimeo)">add</button> <span class="title">{{vimeo.name}}</span>
          <p class="added" v-if="vimeo.added">has been added</p>
          <div class="video-container">
            <img :src="vimeo.pictures.sizes[2].link" alt="">
            <p> {{vimeo.description}} </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- editing About Me page -->
    <div class="editing" v-if="editingAboutMe">
      <button v-on:click="doneEditAboutMe()">DONE</button> About Me <br>
      <textarea id="aboutmeText" v-model="aboutmeText" placeholder="edit about me text"></textarea>
    </div>

    <!-- editing Resume page -->
    <div class="editing" v-if="editingResume">
      <button v-on:click="doneEditingResume()">DONE</button> Resume <br>
      <textarea id="resumeText" v-model="resumeText" placeholder="edit resume text"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import videoServices from '../services/videoServices'
// import vimeoData from '../services/sample-data/vimeo.dev.json'
import youtubeData from '../services/sample-data/youtube.dev.json'

export default class HelloWorld extends Vue {
  vimeoVideos: any = []
  youtubeVideos: any = []
  videos = []
  addingVimeo = false
  addingYoutube = false
  editingAboutMe = false
  editingResume = false
  aboutmeText = ''
  resumeText = ''

  created () {
    this.loadVideos()

    console.log(this.youtubeVideos)
  }

  loadVideos () {
    videoServices.getAboutMe().then((val: any) => { this.aboutmeText = val.data.value })
    videoServices.getResume().then((val: any) => { this.resumeText = val.data.value })
    videoServices.getVideos().then((val: any) => {
      this.videos = val.data
      this.youtubeVideos = youtubeData.items
      // videoServices.getYoutubeVideos().then((val: any) => {
      //   this.youtubeVideos = val.data.items
      // })

      // this.vimeoVideos = vimeoData.data
      videoServices.getVimeoVideos().then((val: any) => {
        if (val && val.data && val.data.data) {
          this.vimeoVideos = val.data.data
          this.vimeoVideos.map((v: any) => {
            v.added = false
            this.videos.map((added: any) => {
              if (added.id === v.uri.split('/videos/')[1]) v.added = true
            })
          })
        }
      })
      this.youtubeVideos.map((v: any) => {
        v.added = false
        this.videos.map((added: any) => {
          if (added.id === v.id) v.added = true
        })
      })
    })
  }

  addVimeo (video: any) {
    videoServices.addVideo({
      id: video.uri.split('/videos/')[1],
      uri: video.uri,
      name: video.name,
      pictures: video.pictures,
      description: video.description,
      type: 'vimeo'
    }).then((v: any) => console.log(v))
    video.added = true
  }

  addYoutube (video: any) {
    videoServices.addVideo({
      id: video.id,
      name: video.snippet.title,
      pictures: video.snippet.thumbnails,
      description: video.snippet.description,
      type: 'youtube'
    }).then((v: any) => console.log(v))
    video.added = true
  }

  addingVimeoVideos () {
    this.addingVimeo = true
  }

  addingYoutubeVideos () {
    this.addingYoutube = true
  }

  doneAddingVimeoVideos () {
    this.loadVideos()
    this.addingVimeo = false
  }

  doneAddingYoutubeVideos () {
    this.loadVideos()
    this.addingYoutube = false
  }

  removeVideo (video: any) {
    videoServices.removeVideo(video.id).then(() => this.loadVideos())
  }

  editAboutMe () {
    this.editingAboutMe = true
  }

  editResume () {
    this.editingResume = true
  }

  doneEditAboutMe () {
    this.editingAboutMe = false
    videoServices.updateAboutMe(`${this.resumeText}`)
  }

  doneEditingResume () {
    this.editingResume = false
    videoServices.updateResume(`${this.resumeText}`).then(() => {
      console.log('successfully updated resume')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.adding {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 100px 50px 0 50px;
}
.video-list {
  width: 450px;
  border: solid black 1px;
  margin: 5px;
  padding: 5px;
  background-color: rgb(245, 245, 245);
}
.added {
  color: green;
  font-weight: bolder;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  padding: 5px;
  border: solid darkslategrey 2px;
  background-color: snow;
  border-radius: 3px;
  margin: 3px;
}
button:hover {
  cursor: pointer;
}
button.remove {
  border-color: darkred;
  border-width: 2px;
  background-color: darkred;
  font-weight: bolder;
  color: white;
}

.pageButton {
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 10px 5px;
  margin: 15px 5px;
}

.editing {
  padding-top: 75px;
}

.editing textarea {
  width: 85%;
  min-width: 500px;
  height: 50vh;
  margin-top: 30px;
}
</style>
