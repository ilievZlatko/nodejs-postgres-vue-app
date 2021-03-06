<template>
  <div class="recepie-details">
    <header class="image-holder">
      <img :src="recepie.photoUrl" alt="photo recepie">
    </header>
    <Container>
      <h1 class="recepie-name">{{recepie.name}}</h1>

      <section class="ingredients">
        <h4>Ingredients:</h4>
        <div v-if="canEditIngredients">
          <textarea
            v-model="ingredients"
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
            v-if="canEdit"
            @click="onEditIngredients"
            class="btn btn-primary top-margin"
          >EDIT</button>
        </div>
      </section>

      <section class="directions">
        <h4>Directions:</h4>
        <div v-if="canEditDirections">
          <textarea
            v-model="directions"
          ></textarea>
          <button
            @click="saveDirections"
            class="btn btn-danger top-margin"
          >SAVE</button>
        </div>
        <div v-else>
          <p>{{recepie.directions}}</p>
          <button
            v-if="canEdit"
            @click="onEditDirections"
            class="btn btn-primary top-margin"
          >EDIT</button>
        </div>
      </section>

      <section v-if="canEdit">
        <button
          class="btn btn-danger"
          @click="confirmDelete"
        >DELETE</button>
      </section>
    </Container>

    <confirmation-modal
      ref="confirmationModal"
      :recepie="recepie"
      @delete-recepie="deleteRecepie"
    />
  </div>
</template>

<script>
/* eslint-disable */
import Vuex from 'vuex';
import Header from '@/components/Header';
import Container from '@/components/Container';
import ConfirmationModal from '@/components/ConfirmationModal';

export default {
  name: 'RecepieDetails',

  components: {
    Container,
    Header,
    ConfirmationModal,
  },

  props: {
    id: { type: Number, required: true },
  },

  data() {
    return {
      canEditIngredients: false,
      canEditDirections: false,
      ingredients: null,
      directions: null,
    };
  },

  computed: {
    ...Vuex.mapState({
      loadingRecepie: state => state.recepies.loadingRecepie,
      recepie: state => state.recepies.recepie,
      user: state => state.users.user
    }),

    canEdit() {
      return localStorage.getItem('userId') == this.recepie.userId;
    }
  },

  watch: {
    id: {
      handler: 'fetchRecepie',
      immediate: true,
    },

    ['recepie.ingredients'](value) {
      this.ingredients = value;
    },

    ['recepie.directions'](value) {
      this.directions = value;
    },
  },

  methods: {
    ...Vuex.mapActions('recepies', [
      'loadOneRecepie',
      'updateRecepieById',
      'deleteRecepieById',
    ]),

    fetchRecepie() {
      this.loadOneRecepie({ id: this.id });
    },

    onEditIngredients() {
      this.canEditIngredients = true;
    },

    saveIngredients() {
      this.canEditIngredients = false;

      const data = {
        ...this.recepie,
        ingredients: this.ingredients,
      };

      this.updateRecepieById(data);
    },

    onEditDirections() {
      this.canEditDirections = true;
    },

    saveDirections() {
      this.canEditDirections = false;

      const data = {
        ...this.recepie,
        directions: this.directions,
      };

      this.updateRecepieById(data);
    },

    confirmDelete() {
      this.$refs.confirmationModal.show();
    },

    deleteRecepie() {
      this.deleteRecepieById(this.recepie)
        .then(() => {
          this.$router.push({
            name: 'home'
          });
        })
        .catch(err => {
          throw err;
        });
    },
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

section {
  margin: 20px 0;
}
</style>
