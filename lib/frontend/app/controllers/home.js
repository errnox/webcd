import Ember from 'ember';

export default Ember.ArrayController.extend({
  path: '/path/to/some/directory/',
  init: function() {
    this.send('goToDirectory', this.get('path'));
    this._super();
  },
  currentDirectory: null,
  currentFileContent: null,
  isLoadingParentDirectory: false,
  parentDirectory: [
    {'path': '/one/two'},
    {'path': '/three/four'},
    {'path': '/five/six'},
    {'path': '/seven/eight'},
  ],
  parentDirectoryPath: null,
  setCurrentDirectory: function() {
    this.set('model', this.get('currentDirectory'));
  }.property('currentDirectory.@each'),
  isDirectory: function(directory) {
    return directory.type === 'directory' ? true : false;
  },
  showFileError: function() {
    console.log('NO CONTENT');  // DEBUG
    this.set('currentFileContent', '');
  },
  fetchParentDirectory: function() {
    var self = this;
    Ember.$.ajax({
      type: 'get',
      url: '/api/parent?path=' + this.get('path'),
      success: function(data) {
        var response = JSON.parse(data);
        var listings = response.directory.listings;
        var path = response.directory.path;
        self.set('parentDirectory', listings);
        self.set('parentDirectoryPath', path);
      }
    });
  },
  actions: {
    showListing: function(done) {
      var self = this;
      var done = done || function() { /* Do nothing. */ };
      // Set the current directory listing.
      Ember.$.ajax({
        type: 'get',
        url: '/api/directories?path=' +
          encodeURIComponent(self.get('path')),
        success: function(data) {
          var response = JSON.parse(data);
          var listings = response.directory.listings;
          self.set('currentDirectory', listings);
          self.get('setCurrentDirectory');
          done();
        }
      });
      // Set the parent directory listing.
      this.fetchParentDirectory();
    },
    goToDirectory: function(path, done) {
      var done = done || function() { /* Do nothing. */ };
      // Do not show file contents anymore.
      this.set('currentFileContent', null);
      // Actually change the directory.
      this.set('path', path);
      this.send('showListing', done);
    },
    goToParentDirectory: function(done) {
      var self = this;
      var done = done || function() { /* Do nothing. */ };
      this.set('isLoadingParentDirectory', true);
      // Do not show file contents anymore.
      this.set('currentFileContent', null);
      done();
      Ember.$.ajax({
        type: 'get',
        url: '/api/parent?path=' + encodeURIComponent(self.get('path')),
        success: function(data) {
          var response = JSON.parse(data);
          var listings = response.directory.listings;
          var path = response.directory.path;
          if (!((listings.length <= 1) && (listings[0] == null))) {
            self.set('currentDirectory', listings);
            self.set('path', path);
            self.get('setCurrentDirectory');
          }
	  self.set('isLoadingParentDirectory', false);
	  // Set the parent directory listing.
	  self.fetchParentDirectory();
        }
      });
    },
    showFileContents: function(path, done) {
      var self = this;
      var done = done || function() { /* Do nothing. */ };
      Ember.$.ajax({
        type: 'get',
        url: '/api/file?path=' + encodeURIComponent(path),
        success: function(data) {
          var response = JSON.parse(data);
          var content = response.content;
	  if (content !== null) {
            self.set('currentFileContent', content);
	  } else {
	    self.showFileError();
	  }
        },
	error: function() {
	  self.showFileError();
	}
      });
      done();
    }
  }
});
