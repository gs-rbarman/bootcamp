
var UserModel = Backbone.Model.extend({

	urlRoot: "https://api.github.com/",

	updateUrl:function(x){
		this.url = this.urlRoot + 'users/' + x;
		return this.url;
	}
});





var RepoModel = Backbone.Model.extend({
    urlRoot:"https://api.github.com/",
    updateUrl:function(x, y){
		this.url = this.urlRoot + 'repos/' + x + '/' + y;
		return this.url;
	}
});

var ReposCollection = Backbone.Collection.extend({
    model: RepoModel,
    urlRoot:"https://api.github.com/",
	updateUrl:function(x){
		this.url = this.urlRoot + 'users/' + x + '/repos';
		return this.url;
	}
});

