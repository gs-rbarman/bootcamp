(function(window, _, $, Backbone){
"use strict"

var GITAPP; // Is the main Variable hat holds the Instances of all Subviews




var UserView = Backbone.View.extend({
	initialize: function(){
		
		this.template = $("#userViewTemp").text().trim();		

        this.listenTo(this.model, 'change', function(){
	    	this.render();
	    	this.populateData();
	    });
	},
	events: {
	       "click .logOut": function(evt){
	       		console.log('success');
	       } 	
	},
    updateUser:function(user){
    	var userId = user;
    	var str = 'https://api.github.com/' + 'users/' + userId;
    	this.model.updateUrl(userId);
    	this.model.fetch();
    },
	render: function(){
		this.$el.html(this.template);

	},
	populateData : function() {
		var data = this.model;
		
		this.$el.find('.vcard-fullname').html(data.get('name'));
        this.$el.find(".userImg").attr('src', data.get('avatar_url'));
	    this.$el.find(".vcard-username").html(data.get('login'));
	    this.$el.find(".vcard-details #cmpny").html(data.get('company'));
	    this.$el.find(".vcard-details #hloc").html(data.get('location'));
	    this.$el.find(".join-date").attr('datetime', data.get('created_at'));
	    this.$el.find(".vcard-stats a:nth-child(1) strong").html(data.get('followers'));
	    this.$el.find(".vcard-stats a:nth-child(3) strong").html(data.get('following'));
	}
});




var ReposView = Backbone.View.extend({
    initialize:function(){
    	this.template = $("#repoTemp").text().trim();
    },

    updateUser:function(user){
    	var self = this;
    	var userId = user;
        	var str = 'https://api.github.com/' + 'users/' + userId;
        	this.collection.updateUrl(userId);
        	this.collection.fetch({
	            success:function(){
	                self.render();
	                self.populateData();
	                           
	            }.bind(this),
	            error: function(data,err){
	                console.info(err.responseJSON.message);
	            }
       		});

    },
    render:function(){
    	
    	this.$el.html(this.template);

    },
    populateData : function() {
    	var self = this.$el.find(".repo-list");
    	
    	this.collection.each(function(item){
		    self.append(repoList);
            self.find(".repo-list-item:last").append(repoHead);
            self.find(".repo-list-item:last").append(repoDesc);
            self.find(".repo-list-item:last").append(repoTime);

            self.find(".repo-list-name:last a").html(item.get("name"));
            self.find(".repo-list-name:last a").attr('href', "#/home/"+item.get("name"));
            self.find(".repo-list-description:last").html(item.get('description'));
            self.find(".repo-list-meta:last time").html(item.get('updated_at'));
		});
    },	
    events:{
    	
    }
});

var IndRepoView = Backbone.View.extend({
	initialize : function() {
		this.template = $("#derm").text().trim();
	},
	render: function(x){
		this.$el.html(this.template);
		return this;
	},
	events: {

	}
});




var GitHubApp = Backbone.View.extend({
	initialize:function(){


		this.template = $("#headerTemp").text().trim();


		this._userView  = new UserView({
			model: new UserModel()
		});

		this._reposView = new ReposView({
		    collection: new ReposCollection()
		});


	},
	
	loadIndRepo : function(query) {

		if(!this._indRepoView) {
			this._indRepoView = new IndRepoView({
				el: this.$el.find(".dermContainer"),
				collection: this._reposView.collection
			});
		}
		
		this._indRepoView.render(query).$el.show();

	},
	
	render : function() {
		this.$el.find(".navbarHeader").html(this.template);
		this.$el.find(".mainPageContainer").append(this._userView.$el);
		this.$el.find(".mainPageContainer").append(this._reposView.$el);

	},
	
	events:{
		"change #profSch":function(evt){
			this._userView.updateUser(evt.currentTarget.value);
			this._reposView.updateUser(evt.currentTarget.value);
		}
	}
});



/**Router here***/


var octopus = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'home/:query': 'loadIndRepo'

	},
	home: function(){
		if(!GITAPP) {

			window.Gitapp = GITAPP = new GitHubApp({
				el:$(".wrapper")
			});

			GITAPP.render();
		}

		GITAPP._userView.$el.show();
		GITAPP._reposView.$el.show();
		
		if(GITAPP._indRepoView) {
			GITAPP._indRepoView.$el.hide();
		}
		
	},
	loadIndRepo: function(query) {

		if(!GITAPP) {

			window.Gitapp = GITAPP = new GitHubApp({
				el:$(".wrapper")
			});

			GITAPP.render();
		}

		GITAPP._userView.$el.hide();
		GITAPP._reposView.$el.hide();
		GITAPP.loadIndRepo(query);
	}
});

var router = new octopus();
window.aaa = router;

Backbone.history.start();

})(window, _, jQuery, Backbone);