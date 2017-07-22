import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  // ajaxSuccess: function(req, res) {
  //   console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');  // DEBUG
  //   console.log(JSON.stringify(res));  // DEBUG
  //   return res;
  // }
});
