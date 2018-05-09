<template>
  <div class="recepie-details">
    <header class="image-holder">
      <img :src="recepie.photo_url" alt="photo recepie">
    </header>
    <Container>
      <h1 class="recepie-name">{{recepie.name}}</h1>
      <section class="ingredients">
        <h4>Ingredients:</h4>
        <p>{{recepie.ingredients}}</p>
      </section>
      <section class="directions">
        <h4>Directions:</h4>
        <p>{{recepie.directions}}</p>
      </section>
    </Container>
  </div>
</template>

<script>
import Vuex from 'vuex';
import Header from '@/components/Header';
import Container from '@/components/Container';

export default {
  name: 'RecepieDetails',

  components: {
    Container,
    Header,
  },

  props: {
    id: { type: Number, required: true },
  },

  computed: {
    ...Vuex.mapState({
      loadingRecepie: state => state.recepies.loadingRecepie,
      recepie: state => state.recepies.recepie,
    }),
  },

  watch: {
    ['recepie.id']() {
      this.loadOneRecepie({ id: this.id });
    },
  },

  methods: {
    ...Vuex.mapActions('recepies', ['loadOneRecepie']),
  },

  mounted() {
    this.loadOneRecepie({ id: this.id });
  },
};
</script>

<style scoped>
h1, h4 {
  color: #42b983;
}

h4 {
  margin-bottom: 20px;
  text-transform: uppercase;
}

p {
  line-height: 1.8;
}

.image-holder {
  max-height: 400px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.recepie-name {
  margin-bottom: 30px;
  text-transform: uppercase;
}

.ingredients {
  margin-bottom: 30px;
}
</style>
