import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.get('store').findAll('user');
  },

  actions: {

    deleteUser(user) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        user.destroyRecord();
      }
    }
  }

})