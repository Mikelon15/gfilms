<template>
    <div>
        {{text}}
        <div :data-vimeo-id="text" data-vimeo-defer data-vimeo-width="500" id="player"></div>
    </div>
</template>
<script>
import Player from '@vimeo/player';

export default {
  name: 'Player',
  props: ['name',],
  data() {
    return {  
        text: this.name,
        playerFrame: null
    };
  },
  mounted() {

    // const frame = document.querySelector('player');
    const options = {
        id: Number(this.name),
        width: 640,
        loop: true
    };
    // eslint-disable-next-line no-console
    console.log(options);
    this.playerFrame = new Player('player', options);
    this.playerFrame.play();
  },
  methods: { 
    close(){
      this.text = null;
      this.playerFrame.destroy();
    }
  }
}
</script>