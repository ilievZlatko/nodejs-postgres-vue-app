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
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: 50px;
  background: transparent;
  color: #868686;
  outline: none;
  transition: all 0.3s ease;
}

.btn:hover {
  color: #42b983;
  background: #eaeaea;
  cursor: pointer;
}

.btn-danger {
  color: #fff;
  background: #e67096;
}

.btn-danger:hover {
  color: #fff;
  background: #d04173;
}

.btn-primary {
  color: #fff;
  background: #5a738c;
}

.btn-primary:hover {
  color: #fff;
  background: #2c3e50;
}

.btn-approve {
  color: #fff;
  background: #42b983;
}

.btn-approve:hover {
  background: #35a974;
  color: #fff;
}

.btn:disabled {
  opacity: 0.6;
  pointer-events: none;
  user-select: none;
}

#app, input, textarea {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

input, textarea {
  font-size: 14px;
  padding: 10px 15px;
  border: 1px solid #e2e2e2;
  border-radius: 20px;
  margin: 8px 0;
  outline: none;
  resize: none;
}

input:focus,
textarea:focus {
  border: 1px solid #42b983;
}
</style>
