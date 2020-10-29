<template>
  <div>
    <div :data-vimeo-id="text" data-vimeo-defer id="player"></div>
  </div>
</template>
<script>
import Player from '@vimeo/player'

export default {
  name: 'Player',
  props: ['name'],
  data () {
    return {
      text: this.name,
      playerFrame: null
    }
  },
  mounted () {
    this.createPlayer()
    window.addEventListener('orientationchange', (event) => {
      this.text = null
      this.playerFrame.getCurrentTime().then((s) => {
        if (s) {
          this.playerFrame.destroy()
          setTimeout(() => {
            this.createPlayer(s)
          }, 600)
        }
      })
    })
  },
  methods: {
    close () {
      this.text = null
      this.playerFrame.destroy()
    },
    createPlayer (seconds) {
      const options = {
        id: Number(this.name),
        loop: true
      }
      const el = document.getElementsByClassName('player-container')[0]
      el.className = el.className.replace(' horizontal', '')
      if (window.innerWidth > (window.innerHeight * 1.7)) {
        options.height = window.innerHeight - 100
        el.className = el.className + ' vertical'
      } else {
        options.width = window.innerWidth - 50
        el.className = el.className + ' horizontal'
      }
      this.playerFrame = new Player('player', options)
      if (seconds) this.playerFrame.setCurrentTime(seconds)
      this.playerFrame.play()
    }
  }
}
</script>
<style scoped>
</style>
