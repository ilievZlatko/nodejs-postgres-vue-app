<template>
  <div class="create-button" @click="handleClick">
    <div class="cross">+</div>
  </div>
</template>

<script>
export default {
  name: 'create-button',

  methods: {
    handleClick(e) {
      this.$emit('new-order', e);
    },
  },
};
</script>

<style scoped>
.create-button {
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #42b983;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in-out;
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 2;
}

.create-button:hover {
  cursor: pointer;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.cross {
  font-size: 28px;
  user-select: none;
}
</style>
