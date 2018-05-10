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

.btn {
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: 5px;
  background: transparent;
  color: #868686;
  outline: none;
}

.btn:hover {
  color: #42b983;
  cursor: pointer;
}

.btn-danger {
  color: #fff;
  background: #ec3e7b;
}

.btn-primary {
  color: #fff;
  background: #2c3e50;
}

#app, input, textarea {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

input, textarea {
  font-size: 14px;
  padding: 10px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  margin: 8px 0;
  outline: none;
}

input:focus,
textarea:focus {
  border: 1px solid #42b983;
}
</style>
