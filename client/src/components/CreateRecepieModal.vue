<template>
  <modal
    ref="createRecepieModal"
    @close="onClose"
    @show="$emit('show')"
    class="create-recepie-modal"
    show-footer
  >
    <div slot="header">
      <h3>Create new recepie</h3>
    </div>

    <div>
      <form action="post">
        <input
          type="text"
          placeholder="name"
          v-model="recepieName">
        <input
          type="text"
          placeholder="image url here"
          v-model="recepieImage">
        <textarea
          name="ingredients"
          id="ingredients"
          cols="50"
          rows="5"
          placeholder="ingredients"
          v-model="recepieIngredients"
        ></textarea>
        <textarea
          name="directions"
          id="directions"
          cols="50"
          rows="5"
          placeholder="directions"
          v-model="recepieDirections"
        ></textarea>
      </form>
    </div>

    <div slot="footer">
      <button
        class="btn btn-approve"
        :disabled="!isValidInput"
        @click="createRecepie">CREATE</button>
      <button class="btn btn-primary" @click="close">CLOSE</button>
    </div>
  </modal>
</template>

<script>
import Vuex from 'vuex';
import modal from './Modal';

export default {
  name: 'create-recepie-modal',

  components: {
    modal,
  },

  data() {
    return {
      recepieName: '',
      recepieImage: '',
      recepieIngredients: '',
      recepieDirections: '',
    };
  },

  computed: {
    ...Vuex.mapState({
      user: state => state.users.user,
    }),

    isValidInput() {
      return this.recepieName.trim()
        && this.recepieIngredients.trim()
        && this.recepieDirections.trim();
    },
  },

  methods: {
    onClose() {
      this.$emit('close');
    },

    show() {
      this.$refs.createRecepieModal.show();
    },

    close() {
      this.$refs.createRecepieModal.close();
    },

    resetFields() {
      this.recepieName = '';
      this.recepieImage = '';
      this.recepieIngredients = '';
      this.recepieDirections = '';
    },

    createRecepie() {
      const recepie = {
        name: this.recepieName,
        photoUrl: this.recepieImage,
        ingredients: this.recepieIngredients,
        directions: this.recepieDirections,
        userId: localStorage.getItem('userId'),
      };

      this.$emit('create-recepie', recepie);
      this.resetFields();
      this.close();
    },
  },
};
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
</style>
