<template>
  <div class="home">
    <Header
      horizontal-alignment="center"
      flex-direction="column"
      vertical-alignment="center"
    >
      <h1 class="heading-line">{{ msg }}</h1>
      <h3>{{ subheading }}</h3>
    </Header>

    <Container>
      <div class="cards-holder">
        <Card
        v-for="recepie in recepies"
        :key="recepie.id"
        :header-image="recepie.photo_url">
          <template slot="body">
            <a class="card-title" @click="previewRecepie(recepie)"><h4>{{recepie.name}}</h4></a>
            <p class="card-description">{{recepie.ingredients}}</p>
          </template>
          <template slot="footer">
            <button @click="previewRecepie(recepie)" class="btn">DETAILS</button>
          </template>
        </Card>
      </div>
    </Container>
    <create-button @new-order="handleCreateNewOrder"/>
  </div>
</template>

<script>
import Vuex from 'vuex';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Card from '@/components/Card';
import CreateButton from '@/components/CreateButton';

export default {
  name: 'Home',

  components: {
    Header,
    Container,
    Card,
    CreateButton,
  },

  computed: {
    ...Vuex.mapState({
      loadingRecepies: state => state.recepies.loadingRecepies,
      recepies: state => state.recepies.recepies,
    }),
  },

  data() {
    return {
      msg: 'Welcome to recepie book',
      subheading: 'You can find big viriety of recepies here.',
    };
  },

  methods: {
    ...Vuex.mapActions('recepies', ['loadRecepies']),

    previewRecepie(recepie) {
      this.$router.push({
        name: 'recepie-details',
        params: {
          id: recepie.id,
        },
      });
    },

    handleCreateNewOrder(e) {
      console.log(e);
    },
  },

  mounted() {
    this.loadRecepies();
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
  font-weight: 500;
}

.card-description {
  font-size: 14px;
  max-height: 55px;
  overflow: auto;
}

.card-title h4 {
  margin-bottom: 15px;
}

a {
  color: #42b983;
  cursor: pointer;
}

.cards-holder {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.heading-line {
  margin-top: 20px;
}

.btn.btn-danger:hover {
  color: #ec3e7b;
}
</style>
