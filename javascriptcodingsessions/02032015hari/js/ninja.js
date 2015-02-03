var len = data.length;
var priorityNames = [];

for (var i = 0; i < len; i++) {
  if ( priorityNames.indexOf(data[i].PriorityName) == -1)
    priorityNames.push(data[i].PriorityName);
}

for (var i = 0; i < priorityNames.length; i++) {
  $('#priority').append('<option>'+ priorityNames[i]+'</option>');
}

$('#priority').on('change', function() {
  var x = this.value;

  (function def(pValue) {
    $('#dataTableBody').empty();
    var count = 0;
    for (var i = 0; i < len; i++) {
      var output = '<tr>';
      if ( data[i].PriorityName === pValue) {
        var name = data[i].Name;
        output += '<td>' + name + '</td>';
        var acName = data[i].AccountName;
        output += '<td>' + acName + '</td>';
        var asv = data[i].ASV;
        output += '<td>' + asv + '</td>';
        var users = data[i].Users;
        output += '<td>' + users + '</td>';
        var type = data[i].TypeName;
        output += '<td>' + type + '</td>';
        var age = data[i].Age;
        output += '<td>' + age + '</td>';
        output += '</tr>';
        $('#dataTableBody').append(output);
        output = '';
        count++;
      }
    }
    $('#ctaCount').html(count);
    count = 0;
  })(x);
});

var ownerNames = [];
for (var i = 0; i < len; i++) {
  if ( ownerNames.indexOf(data[i].AssigneeName) == -1)
    ownerNames.push(data[i].AssigneeName);
}

for (var i = 0; i < ownerNames.length; i++) {
  $('#owner').append('<option>'+ ownerNames[i]+'</option>');
}

$('#owner').on('change', function() {
  var x = this.value;

  (function def(pValue) {
    $('#dataTableBody').empty();
    var count = 0;
    for (var i = 0; i < len; i++) {
      var output = '<tr>';
      if ( data[i].AssigneeName === pValue) {
        var name = data[i].Name;
        output += '<td>' + name + '</td>';
        var acName = data[i].AccountName;
        output += '<td>' + acName + '</td>';
        var asv = data[i].ASV;
        output += '<td>' + asv + '</td>';
        var users = data[i].Users;
        output += '<td>' + users + '</td>';
        var type = data[i].TypeName;
        output += '<td>' + type + '</td>';
        var age = data[i].Age;
        output += '<td>' + age + '</td>';
        output += '</tr>';
        $('#dataTableBody').append(output);
        output = '';
        count++;
      }
    }
    $('#ctaCount').html(count);
    count = 0;
  })(x);
});

function abc(array, key, id) {
  for (var i = 0; i < len; i++) {
    if ( array.indexOf(data[i].key) == -1)
      array.push(data[i].key);
  }

  var arrayLength = array.length;
  for (var i = 0; i < arrayLength; i++) {
    $('#'+id).append('<option>'+ array[i]+'</option>');
  }

  $('#'+id).on('change', function() {
    var x = this.value;

    (function def(pValue) {
      $('#dataTableBody').empty();
      var count = 0;
      for (var i = 0; i < len; i++) {
        var output = '<tr>';
        if ( data[i].PriorityName === pValue) {
          var name = data[i].Name;
          output += '<td>' + name + '</td>';
          var acName = data[i].AccountName;
          output += '<td>' + acName + '</td>';
          var asv = data[i].ASV;
          output += '<td>' + asv + '</td>';
          var users = data[i].Users;
          output += '<td>' + users + '</td>';
          var type = data[i].TypeName;
          output += '<td>' + type + '</td>';
          var age = data[i].Age;
          output += '<td>' + age + '</td>';
          output += '</tr>';
          $('#dataTableBody').append(output);
          output = '';
          count++;
        }
      }
      $('#ctaCount').html(count);
      count = 0;
    })(x);
  });
}


var groupObjects = [];
var groupClasses = {};
$('#groupBy').on('change', function(){
  var y = this.value;
  console.log(y);
  groupObjects = [];
  groupClasses = {};
  for (var i = 0; i < len; i++) {
    if(groupObjects.indexOf(data[i][y]) == -1) {
      groupObjects.push(data[i][y]);
      if (!groupClasses.hasOwnProperty(data[i][y])) {
        groupClasses[data[i][y]] = [];
        groupClasses[data[i][y]].push(data[i]);
      }
    }
    else {
      groupClasses[data[i][y]].push(data[i]);
    }
  }

  $('#dataTableBody').empty();
  var count = 0;
  for (var j = 0; j < groupObjects.length; j++) {
    var groupedObj = groupClasses[groupObjects[j]];
    for (var k = 0; k < groupedObj.length; k++) {
      var output = '<tr>';
      var name = groupedObj[k].Name;
      output += '<td>' + name + '</td>';
      var acName = groupedObj[k].AccountName;
      output += '<td>' + acName + '</td>';
      var asv = groupedObj[k].ASV;
      output += '<td>' + asv + '</td>';
      var users = groupedObj[k].Users;
      output += '<td>' + users + '</td>';
      var type = groupedObj[k].TypeName;
      output += '<td>' + type + '</td>';
      var age = groupedObj[k].Age;
      output += '<td>' + age + '</td>';
      output += '<td>' + groupObjects[j] + '</td>';
      output += '</tr>';
      $('#dataTableBody').append(output);
      output = '';
      count++;
    }
  }
  $('#ctaCount').html(count);
  count = 0;
});
