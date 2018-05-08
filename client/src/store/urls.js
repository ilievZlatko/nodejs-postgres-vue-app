export default {
  getRecepies: 'http://localhost:5000/api/recepies',
  getSingleRecipe: id => `http://localhost:5000/api/recepies/${id}`,
  getUsers: 'http://localhost:5000/api/users',
  getSingleUser: userId => `http://localhost:5000/api/users/${userId}`,
};
