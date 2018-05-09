<template>
  <div class="recepie-details">
    <header class="image-holder">
      <img :src="recepie.photo_url" alt="photo recepie">
    </header>
    <Container>
      <h1 class="recepie-name">{{recepie.name}}</h1>

      <section class="ingredients">
        <h4>Ingredients:</h4>
        <div v-if="canEditIngredients">
          <textarea
            :value="recepie.ingredients"
            @input="editIngredients"
          ></textarea>
          <button 
            @click="saveIngredients"
            class="btn btn-danger top-margin"
          >SAVE</button>
        </div>
        <div v-else>
          <p>
            {{recepie.ingredients}}
          </p>
          <button
            @click="onEditIngredients"
            class="btn btn-primary top-margin"
          >EDIT</button>
        </div> 
      </section>

      <section class="directions">
        <h4>Directions:</h4>
        <div v-if="canEditDirections">
          <textarea
            :value="recepie.directions"
            @input="editDirections"
          ></textarea>
          <button
            @click="saveDirections"
            class="btn btn-danger top-margin"
          >SAVE</button>
        </div>
        <div v-else>
          <p>{{recepie.directions}}</p>
          <button @click="onEditDirections" class="btn btn-primary top-margin">EDIT</button>
        </div>
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

  data() {
    return {
      canEditIngredients: false,
      canEditDirections: false,
      editedIngredients: '',
      editedDirections: '',
    };
  },

  computed: {
    ...Vuex.mapState({
      loadingRecepie: state => state.recepies.loadingRecepie,
      recepie: state => state.recepies.recepie,
    }),
  },

  watch: {
    id(recepieId) {
      this.loadOneRecepie({ id: recepieId });
    },
  },

  methods: {
    ...Vuex.mapActions('recepies', [
      'loadOneRecepie',
      'updateRecepieById'
    ]),

    editIngredients(e) {
      this.editedIngredients = e.target.value;
    },

    onEditIngredients() {
      this.canEditIngredients = true;
    },

    saveIngredients() {
      this.canEditIngredients = false;

      const data = {
        ...this.recepie,
        ingredients: this.editedIngredients,
      };

      this.updateRecepieById(data);
    },

    editDirections(e) {
      this.editedDirections = e.target.value;
    },

    onEditDirections() {
      this.canEditDirections = true;
    },

    saveDirections() {
      this.canEditDirections = false;

      const data = {
        ...this.recepie,
        directions: this.editedDirections,
      };

      this.updateRecepieById(data);
    },
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

textarea {
    margin: 0px;
    width: 100%;
    min-height: 150px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: rgb(44, 62, 80);
    font-size: 16px;
    line-height: 1.8;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    resize: none;
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

.top-margin {
  margin-top: 10px;
}
</style>
