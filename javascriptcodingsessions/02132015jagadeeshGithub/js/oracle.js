if ($('body').attr('body-name') == 'body1') {
  var repoName;
  var handle;
  $('#profSch').on('change', function(){
    var x = $(this).val();

    var url = "https://api.github.com/users/" + x;

    $.getJSON(url, function(data){
      var imgSrc = data.avatar_url;
      var org = data.company;
      var loc = data["location"];
      var name = data["name"];
      handle = data.login;
      var joinDate = data.created_at;
      var followers = data.followers;
      var following = data.following;
      $('.userImg').attr('src', imgSrc);
      $('.vcard-details li:first-child').append(org);
      $('.vcard-details li:nth-child(2)').append(loc);
      $('.vcard-fullname').html(name);
      $('.vcard-username').html(handle);
      $('.join-date').attr('datetime', joinDate);
      $('.vcard-stats a:nth-child(1) strong').html(followers);
      $('.vcard-stats a:nth-child(3) strong').html(following);
    });


    var url2 = "https://api.github.com/users/"+ x + "/repos";

    $.getJSON(url2, function(reposData){
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
  });

  $(".repo-tab").on("click", ".repo-list-name a", function(){
    var href = $(this).attr("href");
    repoName = $(this).html();
    localStorage.setItem('user', handle);
    localStorage.setItem('repoName', repoName);
    console.log(localStorage);
    window.location = href;
  });
}

if ($('body').attr('body-name') == 'body2') {
  var x = localStorage.getItem('user');
  var y = localStorage.getItem('repoName');
  $('#user-handle').html(x);
  $('.js-current-repository').html(y);
}
