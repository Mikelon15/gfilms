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
    const options = {
      id: Number(this.name),
      width: document.body.scrollWidth - 50,
      loop: true
    }
    this.playerFrame = new Player('player', options)
    this.playerFrame.play()
  },
  methods: {
    close () {
      this.text = null
      this.playerFrame.destroy()
    }
  }
}
</script>
<style scoped>
</style>
