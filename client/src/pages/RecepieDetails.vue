<template>
  <div class="recepie-details">
    <Container>
      <h1>Recepie Details Page</h1>
      <p>{{id}}</p>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container';

export default {
  name: 'RecepieDetails',

  components: {
    Container,
  },

  props: {
    id: { type: Number, required: true },
  },
};
</script>

<style scoped>
</style>
