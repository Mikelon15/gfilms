<template>
    <nav>
        <ul>
            <li>about me</li>
            <li>my videos</li>
            <li>my resume</li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isLoading: false,
      hasError: false,
      posts: [],
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul, li {
    list-style: none;
}
ul {
    display: flex;
    align-content: center;
    justify-content: center;
}
li {
    margin: 0 25px;
}
</style>
