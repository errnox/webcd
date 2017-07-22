import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['directoryAction', 'fileAction', 'parentAction',
		      'name', 'path', 'type'],
  isDirectory: function() {
    return this.get('type') === 'directory' ? true : false;
  }.property('type'),
  isFile: function() {
    return this.get('type') === 'file' ? true : false;
  }.property('type'),
  isParent: function() {
    return this.get('type') === 'parent' ? true : false;
  }.property('type'),
  click: function(e) {
    var elm = Ember.$(e.target);
    if (elm.hasClass('js-showDirectoryButton')) {
      elm.html('<em class="text-muted">Loading...</em>');
      this.sendAction('directoryAction', this.get('path'));
    } else if (elm.hasClass('js-showFileButton')) {
      this.sendAction('fileAction', this.get('path'));
    } else if (elm.hasClass('js-goToParentDirectory')) {
      this.sendAction('parentAction');
    }
  }
});
