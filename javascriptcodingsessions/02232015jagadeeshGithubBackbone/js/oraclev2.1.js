
var UserModel = Backbone.Model.extend({
	urlRoot: "https://api.github.com/",
	url: "",
	updateUrl:function(x){
		this.url = this.urlRoot + 'users/' + x;
		return this.url;
	}
});

var UserView = Backbone.View.extend({
	initialize: function(){
		$('#derm').css('display', 'none');
		var self = this;
		var handle = $('#profSch');
		handle.on('change', function(){
            var userId = handle.val();
        	var str = 'https://api.github.com/' + 'users/' + userId;
        	self.model.updateUrl(userId);
        	self.model.fetch();
        });
        
        this.model.on('change', function(){
	    	self.render();
	    });
	},
	events: {
	        	
	},
	render: function(){
		var domContainer = this.$el.parents('.wrapper').find('.epiDerm .vcard');
		var data = this.model;
		domContainer.find('.vcard-fullname').html(data.get('name'));
        domContainer.find(".userImg").attr('src', data.get('avatar_url'));
	    domContainer.find(".vcard-username").html(data.get('login'));
	    // this.$el.find(".userImg").attr('src', data.get("avatar_url"));
	    domContainer.find(".vcard-details #cmpny").html(data.get('company'));
	    domContainer.find(".vcard-details #hloc").html(data.get('location'));
	    domContainer.find(".join-date").attr('datetime', data.get('created_at'));
	    domContainer.find(".vcard-stats a:nth-child(1) strong").html(data.get('followers'));
	    domContainer.find(".vcard-stats a:nth-child(3) strong").html(data.get('following'));
		
	}
});

var v = new UserView({
	el: '#profSch',
	model: new UserModel({})
});