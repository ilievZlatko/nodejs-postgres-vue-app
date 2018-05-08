<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <h3>{{ subheading }}</h3>
    <ul>
      <li v-for="recepie in recepies" :key="recepie.id">
        <p><strong>name: </strong>{{recepie.name}}</p>
        <p><strong>ingredients: </strong>{{recepie.ingredients}}</p>
        <p><strong>directions: </strong>{{recepie.directions}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',

  computed: {
    recepies() {
      return this.$store.state.recepies;
    },
  },

  data() {
    return {
      msg: 'Welcome to recepie book',
      subheading: 'You can find big viriety of recepies here.',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
