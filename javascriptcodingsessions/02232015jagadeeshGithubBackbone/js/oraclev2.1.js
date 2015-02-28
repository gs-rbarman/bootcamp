(function(window, _, $, Backbone){

var UserModel = Backbone.Model.extend({

	urlRoot: "https://api.github.com/",

	updateUrl:function(x){
		this.url = this.urlRoot + 'users/' + x;
		return this.url;
	}
});

var UserView = Backbone.View.extend({
	initialize: function(){
        this.listenTo(this.model, 'change', function(){
	    	this.render();
	    });
	},
	events: {
	        	
	},
    updateUser:function(user){
    	var userId = user;
    	var str = 'https://api.github.com/' + 'users/' + userId;
    	this.model.updateUrl(userId);
    	this.model.fetch();
    },
	render: function(){
		var data = this.model;
		this.$('.vcard-fullname').html(data.get('name'));
        this.$(".userImg").attr('src', data.get('avatar_url'));
	    this.$(".vcard-username").html(data.get('login'));
	    // this.$(".userImg").attr('src', data.get("avatar_url"));
	    this.$(".vcard-details #cmpny").html(data.get('company'));
	    this.$(".vcard-details #hloc").html(data.get('location'));
	    this.$(".join-date").attr('datetime', data.get('created_at'));
	    this.$(".vcard-stats a:nth-child(1) strong").html(data.get('followers'));
	    this.$(".vcard-stats a:nth-child(3) strong").html(data.get('following'));
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

var ReposView = Backbone.View.extend({
    initialize:function(){

    },
    updateUser:function(user){

    	var userId = user;
        	var str = 'https://api.github.com/' + 'users/' + userId;
        	this.collection.updateUrl(userId);
        	this.collection.fetch({
	            success:function(){
	                this.render();                
	            }.bind(this),
	            error: function(data,err){
	                console.info(err.responseJSON.message);
	            }
       		});

    },
    render:function(){
    	var self = this.$(".repo-list");
    	console.log(self);
		this.collection.each(function(item){
		    self.append(repoList);
            self.find(".repo-list-item:last").append(repoHead);
            self.find(".repo-list-item:last").append(repoDesc);
            self.find(".repo-list-item:last").append(repoTime);

            self.find(".repo-list-name:last a").html(item.get("name"));
            // $(".repo-list-name:last a").attr('href', 'repo.html');
            self.find(".repo-list-description:last").html(item.get('description'));
            self.find(".repo-list-meta:last time").html(item.get('updated_at'));
		});
    },
    events:{
            
    }
});

var GitHubApp = Backbone.View.extend({
	initialize:function(){

		this._userView  = new UserView({
			el: this.$el.find(".vcard"),
			model: new UserModel()
		});

		this._reposView = new ReposView({
		    el: this.$el.find(".repo-tab"),
		    collection: new ReposCollection()
		});

	},
	events:{
		"change #profSch":function(evt){
			this._userView.updateUser(evt.currentTarget.value);
			this._reposView.updateUser(evt.currentTarget.value);
		}
	}
});

var _githubApp = new GitHubApp({
	el:$(".wrapper")[0]
});

var _githubApp = new GitHubApp({
	el:$(".wrapper")[1]
});

})(window, _, jQuery, Backbone);