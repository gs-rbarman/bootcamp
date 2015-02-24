// backbone Github

var UserModel = Backbone.Model.extend({
    initialize: function(attributes, options) {

    }
});

var RepoModel = Backbone.Model.extend({
    initialize: function() {

    }
});

var ReposCollection = Backbone.Collection.extend({
    model: RepoModel,
    initialize: function() {
    }
});

var UserView = Backbone.View.extend({
    initialize:function(){
        var x = this;
        $('#derm').css('display', 'none');
        $('#profSch').on('change', function(){
            x.render();
        });
        
    },
    events:{
            
    },
    render:function(){

        var userId = $('#profSch').val();
        var str = 'https://api.github.com/' + 'users/' + userId;

        $.getJSON( str, function(data){

            $(".userImg").attr('src', data.avatar_url);
            $('.epiDerm').find(".vcard-fullname").html(data.name);
            $('.epiDerm').find(".vcard-username").html(data.login);
            // this.$el.find(".userImg").attr('src', data.get("avatar_url"));
            $('.epiDerm').find(".vcard-details li:first-child").append(data.company);
            $('.epiDerm').find(".vcard-details li:nth-child(2)").append(data.location);
            $('.epiDerm').find(".join-date").attr('datetime', data.created_at);
            $('.epiDerm').find(".vcard-stats a:nth-child(1) strong").html(data.followers);
            $('.epiDerm').find(".vcard-stats a:nth-child(3) strong").html(data.following);
        });

        var str2 = 'https://api.github.com/' + 'users/' + userId + "/repos";
        $.getJSON(str2, function(reposData){
            var repos = reposData;

            var length = repos.length;

            for(var i = 0; i < length; i++ ) {
                $(".repo-list").append(repoList);
                $(".repo-list-item:last").append(repoHead);
                $(".repo-list-item:last").append(repoDesc);
                $(".repo-list-item:last").append(repoTime);

                var name = repos[i]['name'];
                var desc = repos[i]['description'];
                var tyme = repos[i].updated_at;
                $(".repo-list-name:last a").html(name);
                $(".repo-list-name:last a").attr('href', 'repo.html');
                $(".repo-list-description:last").html(desc);
                $(".repo-list-meta:last time").html(tyme);
            }
        });
    }
});

var ReposView = Backbone.View.extend({
    initialize:function(){
                
    },
    render:function(){
        this.$el.empty();
        this.collection.each(function(item, i){
            $(".repo-list").append(repoList);
            $(".repo-list-item:last").append(repoHead);
            $(".repo-list-item:last").append(repoDesc);
            $(".repo-list-item:last").append(repoTime);

            $(".repo-list-name:last a").html(item.get("name"));
            // $(".repo-list-name:last a").attr('href', 'repo.html');
            $(".repo-list-description:last").html(item.get("description"));
            $(".repo-list-meta:last time").html(item.get("updated_at"));
        }.bind(this));
    },
    events:{
            
    }
});



var userView = new UserView({
    el:".epiDerm",
    model:new UserModel({})
});


var reposView = new ReposView({
    el:".derm",
    collection:new ReposCollection({}),
    
});

