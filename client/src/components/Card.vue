<template>
  <div class="card">
    <header v-if="showHeader">
      <img :src="headerImage" alt="header image">
      <slot name="header" />
    </header>
    <body>
      <slot name="body" />
    </body>
    <footer v-if="showFooter">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    headerImage: { type: String, default: '' },
    showHeader: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border-radius: 5px;
  overflow: hidden;
  width: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

img {
  width: 100%;
}

body {
  padding: 18px;
}

footer {
  padding: 10px 18px;
  border-top: 1px solid #f1f1f1;
}
</style>
