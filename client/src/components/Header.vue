<template>
  <header :class="generateClass">
    <slot/>
  </header>
</template>

<script>
export default {
  name: 'Header',

  props: {
    flexDirection: { type: String, default: 'row' },
    horizontalAlignment: { type: String, default: 'left' },
    verticalAlignment: { type: String, default: 'top' },
  },

  computed: {
    generateClass() {
      return {
        column: this.flexDirection === 'column',
        row: this.flexDirection === 'row',
        ['align-left']: this.horizontalAlignment === 'left',
        ['align-right']: this.horizontalAlignment === 'right',
        ['align-center']: this.horizontalAlignment === 'center',
        ['space-between']: this.horizontalAlignment === 'spaced',
        ['vertical-center']: this.verticalAlignment === 'center',
        ['vertical-top']: this.verticalAlignment === 'top',
        ['vertical-bottom']: this.verticalAlignment === 'bottom',
        stretched: this.verticalAlignment === 'stretch',
      };
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  width: 100%;
  padding: 15px 25px;
  margin-bottom: 40px;
  background: transparent;
}

header.column {
  flex-direction: column;
}

header.row {
  flex-direction: row;
}

header.align-left {
  justify-content: flex-start;
}

header.align-right {
  justify-content: flex-end;
}

header.align-center {
  justify-content: center;
}

header.space-between {
  justify-content: space-between;
}

header.vertical-center {
  align-items: center;
}

header.vertical-top {
  align-items: flex-start;
}

header.vertical-bottom {
  align-items: flex-end;
}

header.stretched {
  align-items: stretch;
}
</style>
