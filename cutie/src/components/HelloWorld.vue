<template>
    <div class="logo" id="logo">
      <b>{{days}} <span>d</span>ays<br>{{hours}} ho<span>u</span>rs<br>{{minutes}} minut<span>es</span><br>{{seconds}} se<span>con</span>ds</b>
      <br>
      <img  id='img' src="https://thumbs.gfycat.com/AngelicLastingCottonmouth.webp" alt="">
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class HelloWorld extends Vue {
  private days = 0
  private minutes = 0
  private hours = 0
  private seconds = 0

  created () {
    const countDownDate = new Date('Oct 15, 2020 09:00:00').getTime()
    // Update the count down every 1 second
    const x = setInterval (() => {
      const now = new Date().getTime()

      // Find the distance between now and the count down date
      const distance = countDownDate - now

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result in the element with id="demo"
      const y = document.getElementById('logo')

      this.days = days
      this.minutes = minutes
      this.hours = hours
      this.seconds = seconds

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x)
        if (y) {
          y.innerHTML = 'NOW'
        }
      }
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url(//fonts.googleapis.com/css?family=Vibur);
.logo {
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  user-select: none;
}
#img {
  height: 40vh;
  margin: auto;
  bottom: 50px;
  position: absolute;
  left: 0;
  right: 0;
}

.logo b{
  position: absolute;
  top: 50px;
  right: 0;
  left: 0;
  font: 400 6vh "Vibur";
  color: #fee;
  text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #ff4444, 0 0 0.5em #ff4444, 0 0 0.1em #ff4444, 0 10px 3px #000;
}
.logo b span{
  animation: blink linear infinite 2s;
}
.logo b span:nth-of-type(2){
  animation: blink linear infinite 3s;
}
@keyframes blink {
  78% {
    color: inherit;
    text-shadow: inherit;
  }
  79%{
     color: #333;
  }
  80% {
    text-shadow: none;
  }
  81% {
    color: inherit;
    text-shadow: inherit;
  }
  82% {
    color: #333;
    text-shadow: none;
  }
  83% {
    color: inherit;
    text-shadow: inherit;
  }
  92% {
    color: #333;
    text-shadow: none;
  }
  92.5% {
    color: inherit;
    text-shadow: inherit;
  }
}
/* follow me @nodws */
#btn-twtr{
  clear:both;
  color:#fff;
  border:2px solid;
  border-radius:3px;
  text-align:center;
  text-decoration:none;
  display:block;
  font-family:sans-serif;
  font-size:14px;
  width:13em;
  padding:5px 10px;
  font-weight:600;
  position:absolute;
  bottom:20px;
  left:0;
  right:0;
  margin:0 auto;
  background:rgba(0,0,0,0.2);
  box-shadow:0 0 0px 3px rgba(0,0,0,0.2);
  opacity:0.4
}#btn-twtr:hover{color:#fff;opacity:1}
</style>
