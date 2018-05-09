<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  display: block;
  width: 100%;
  height: 100%;
  background: #f1f4f7;
}

img {
  width: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
