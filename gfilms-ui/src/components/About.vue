<template>
  <div class="about-container">
    <div id="aboutme-text" class="about-text-container" style="padding-top: 20px;" v-html="aboutme">
      <h3>
          Raised in Phoenix, I first delved into film my sophomore year along with Youth and Government.
      </h3>
      <br>
      <h3>
          I became passionate about sharing my views, and I learned to express myself through my content.
          My passion developed
          with every film video created with. That passion then transformed into making videos for
          non-profits. My first
          advertisement video was one made with a friend for a charter school called Vista College
          Preparatory in an impoverished
          part of Phoenix. Afterwards, I created a video for a YMCA award ceremony. The project led to me
          being able to attain a
          job at the YMCA as a videographer and cinematographer.
      </h3>
      <br>
      <h3>
          My passion for film and political advocacy continues to drive me forward. I not only want to
          make films, but I want to
          make films that matter. That is why I have worked with nonprofits and hope to make more
          creative films that have an
          impact.
      </h3>
    </div>
    <img class="profile" src="../assets/hero-high.jpeg" alt="">
  </div>
</template>

<script>
import videoServices from '../services/videoServices'

export default {
  name: 'About',
  data () {
    return {
      isLoading: false,
      aboutme: ''
    }
  },
  created () {
    videoServices.getAboutMe().then((val) => { this.aboutme = val.data.value })
  }
}
</script>
<style scoped>
.about-text-container {
  max-width: 1000px;
  margin: auto;
  padding: 100px 15px 0px 15px;
  z-index: 10;
}

.profile {
  width: 100%;
  z-index: 0;
}

</style>
