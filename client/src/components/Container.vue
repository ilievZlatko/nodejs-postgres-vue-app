<template>
  <div class="container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Container',
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 15px;
  margin: 0 auto;
  background: transparent;
}
</style>
