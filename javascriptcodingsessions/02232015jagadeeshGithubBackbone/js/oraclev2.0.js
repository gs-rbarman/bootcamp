var UserModel = Backbone.Model.extend({
    urlRoot:"https://api.github.com/",
    url:function(){
       return this.urlRoot + "users/" + this.handle;
    },
    initialize: function(attributes, options) {
        this.handle = options.userLogin;
    }
});

var UserView = Backbone.View.extend({
    
    initialize: function(){
        
        this.model.fetch();

        this.listenTo(this.model,"change", function(){
             this.render();   
        });
        
    },
    render:function(){
         this.$el.html(this.model.get("name").toUpperCase())
    }
});

var userView = new UserView({
    el:"._user1",
    model:new UserModel({},{userLogin:"angular"})
});


var RepoModel = Backbone.Model.extend({
    urlRoot:"https://api.github.com/",
    url:function(){
       return this.urlRoot + "users/" + this.userLogin + "/"+this.repo
    },
    initialize: function(attributes, options) {
        this.userLogin = options.userLogin;
    }
});

var ReposCollection = Backbone.Collection.extend({
    model: RepoModel,
    urlRoot:"https://api.github.com/",
    url:function(){
       return this.urlRoot + "users/" + this.userLogin + "/repos";
    },
    initialize: function(attributes, options) {
        this.userLogin = options.userLogin;
    }
});

var ReposView = Backbone.View.extend({
    initialize:function(){
                
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
        this.$el.empty();
        this.collection.each(function(item, i){
           this.$el.append("<div>"+item.get("name")+"</div>");
        }.bind(this));
    },
    events:{
            
    }
});


var reposView = new ReposView({
    el:"._reposView",
    collection:new ReposCollection({},{userLogin:"angular"}),
    
});

