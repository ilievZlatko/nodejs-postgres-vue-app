<template>
  <transition name="modal">
    <div v-show="isOpen" class="modal-container" @click="closeIfBackdropClicked">
      <div class="modal-popup">
        <header>
          <slot name="header">{{header}}</slot>
          <a class="close-icon" @click="close" ref="close">&#10005;</a>
        </header>
        <section ref="body">
          <slot />
        </section>
        <footer v-if="showFooter" ref="footer">
          <slot name="footer">
            <button class="btn btn-danger" @click="close">CLOSE</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',

  props: {
    header: { type: String, default: 'Information' },
    footer: { type: String, default: null },
    showFooter: { type: Boolean, default: true },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    show() {
      this.isOpen = true;
      this.$emit('show');
    },

    close() {
      this.isOpen = false;
      this.$emit('close');
    },

    closeIfBackdropClicked(e) {
      if (e.target !== this.$el) return;
      this.close();
    },
  },
};
</script>

<style scoped>
  .modal-container {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }

  .modal-popup {
    background: #fff;
    min-width: 400px;
    min-height: 150px;
    border-radius: 5px;
    box-shadow: 0 3px 9px rgba(0, 0, 0, .4);
    overflow: hidden;
  }

  header, footer, section {
    padding: 15px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #42b983;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
  }

  .close-icon {
    display: flex;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #fff;
    background: #3da777;
    cursor: pointer;
    user-select: none;
    transition: all .3s ease;
  }

  .close-icon:hover {
    background: #3c986e;
  }

  section {
    max-height: 80vh;
    overflow: auto;
  }

  footer {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #eaeaea;
  }

  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .modal-popup,
  .modal-leave-active .modal-popup {
    transition: all .3s ease;
  }

  .modal-enter .modal-popup,
  .modal-leave-to .modal-popup {
    opacity: 0;
    transform: translateY(-25%);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.4);
  }
</style>
