<template>
  <modal
    ref="confirmationModal"
    @close="onClose"
    @show="$emit('show')"
    class="confirmation-modal"
    show-footer
  >
    <div slot="header">
      <h3>Delete {{recepie.name}}</h3>
    </div>

    <div>
      <p>Are you sure you want to delete this recepie?</p>
    </div>

    <div slot="footer">
      <button
        class="btn btn-approve"
        @click="deleteRecepie">CONTINUE</button>
      <button class="btn btn-primary" @click="close">CLOSE</button>
    </div>
  </modal>
</template>

<script>
import modal from './Modal';

export default {
  name: 'create-recepie-modal',

  props: {
    recepie: { type: Object, required: true },
  },

  components: {
    modal,
  },

  methods: {
    onClose() {
      this.$emit('close');
    },

    show() {
      this.$refs.confirmationModal.show();
    },

    close() {
      this.$refs.confirmationModal.close();
    },

    deleteRecepie() {
      this.$emit('delete-recepie');
      this.close();
    },
  },
};
</script>

<style scoped>
p {
  margin: 20px 5px;
}
</style>
