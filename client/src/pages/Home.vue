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

    <button
      class="btn btn-approve logout"
      @click="handleLogout"
    >logout</button>

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
    <create-button @new-order="openCreateNewRecepieModal"/>

    <create-recepie-modal
      ref="createRecepieModal"
      @create-recepie="handleCreateRecepie"
    />
  </div>
</template>

<script>
import Vuex from 'vuex';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Card from '@/components/Card';
import CreateButton from '@/components/CreateButton';
import CreateRecepieModal from '@/components/CreateRecepieModal';

export default {
  name: 'Home',

  components: {
    Header,
    Container,
    Card,
    CreateButton,
    CreateRecepieModal,
  },

  computed: {
    ...Vuex.mapState({
      loadingRecepies: state => state.recepies.loadingRecepies,
      recepies: state => state.recepies.recepies,
      token: state => state.users.token,
    }),
  },

  data() {
    return {
      msg: 'Welcome to recepie book',
      subheading: 'You can find big viriety of recepies here.',
    };
  },

  methods: {
    ...Vuex.mapActions('recepies', [
      'loadRecepies',
      'createNewRecepie',
    ]),

    ...Vuex.mapActions('users', [
      'logout',
    ]),

    previewRecepie(recepie) {
      this.$router.push({
        name: 'recepie-details',
        params: {
          id: recepie.id,
        },
      });
    },

    openCreateNewRecepieModal() {
      this.$refs.createRecepieModal.show();
    },

    handleCreateRecepie(data) {
      this.createNewRecepie(data)
        .then(() => this.loadRecepies())
        .catch((err) => {
          throw new Error(err);
        });
    },

    handleLogout() {
      this.logout();
      this.$router.push({
        name: 'login',
      });
    },
  },

  mounted() {
    this.loadRecepies();
  },
};
</script>

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
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.heading-line {
  margin-top: 20px;
}

.btn.btn-danger:hover {
  color: #ec3e7b;
}

.logout {
  position: absolute;
  top: 50px;
  right: 50px;
}
</style>
