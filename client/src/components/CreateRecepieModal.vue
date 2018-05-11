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
        <input type="text" placeholder="name">
        <input type="text" placeholder="image url here">
        <textarea
          name="ingredients"
          id="ingredients"
          cols="50"
          rows="5"
          placeholder="ingredients"
        ></textarea>
        <textarea
          name="directions"
          id="directions"
          cols="50"
          rows="5"
          placeholder="directions"
        ></textarea>
      </form>
    </div>

    <div slot="footer">
      <button class="btn btn-approve" @click="createRecepie">CREATE</button>
      <button class="btn btn-primary" @click="close">CLOSE</button>
    </div>
  </modal>
</template>

<script>
import modal from './Modal';

export default {
  name: 'create-recepie-modal',

  components: {
    modal,
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

    createRecepie() {
      console.log('create recepie');
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
