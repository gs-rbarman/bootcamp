// repo.html js
var x = localStorage.getItem('user');
var y = localStorage.getItem('repoName');
$('#user-handle').html(x);
$('.js-current-repository').html(y);
