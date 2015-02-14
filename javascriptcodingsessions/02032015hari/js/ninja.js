function prettyPrint(x) {
  if (x == undefined) {
    return "NA";
  }
  else return x;
}

// function abc(array, key, id, data) {
//
//   var len = data.length;
//
//   for (var i = 0; i < len; i++) {
//     if ( array.indexOf(data[i][key]) == -1)
//       array.push(data[i][key]);
//     }
//
//     var arrayLength = array.length;
//     for (var i = 0; i < arrayLength; i++) {
//       $('#'+id).append('<option>'+ array[i]+'</option>');
//     }
//
//     $('#'+id).on('change', function() {
//
//       var x = this.value;
//
//       (function def(pValue) {
//         $('#dataTableBody').empty();
//         var count = 0;
//         for (var i = 0; i < len; i++) {
//           var output = '<tr>';
//           if ( data[i][key] === pValue) {
//             var name = data[i].Name;
//             output += '<td>' + prettyPrint(name) + '</td>';
//             var acName = data[i].AccountName;
//             output += '<td>' + prettyPrint(acName) + '</td>';
//             var asv = data[i].ASV;
//             output += '<td>' + prettyPrint(asv) + '</td>';
//             var users = data[i].Users;
//             output += '<td>' + prettyPrint(users) + '</td>';
//             var type = data[i].TypeName;
//             output += '<td>' + prettyPrint(type) + '</td>';
//             var age = data[i].Age;
//             output += '<td>' + prettyPrint(age) + '</td>';
//             output += '</tr>';
//             $('#dataTableBody').append(output);
//             output = '';
//             count++;
//           }
//         }
//         $('#ctaCount').html(count);
//         count = 0;
//       })(x);
//     });
//   }
//
// var priorityNames = [];
// var ownerNames = [];
// abc(priorityNames, "PriorityName", "priority", data);
//
// abc(ownerNames, "AssigneeName", "owner", data);
//
//
//
// var groupObjects = [];
// var groupClasses = {};
// $('#groupBy').on('change', function(){
//   $('#priority').val("None");
//   $('#owner').val("None");
//   var len = data.length;
//   var y = this.value;
//   if ( y === "None") {
//     $('#dataTableBody').empty();
//     $('#ctaCount').html("");
//     return;
//   }
//   groupObjects = [];
//   groupClasses = {};
//   for (var i = 0; i < len; i++) {
//     if(groupObjects.indexOf(data[i][y]) == -1) {
//       groupObjects.push(data[i][y]);
//       if (!groupClasses.hasOwnProperty(data[i][y])) {
//         groupClasses[data[i][y]] = [];
//         groupClasses[data[i][y]].push(data[i]);
//       }
//     }
//     else {
//       groupClasses[data[i][y]].push(data[i]);
//     }
//   }
//
//   $('#dataTableBody').empty();
//   var count = 0;
//   for (var j = 0; j < groupObjects.length; j++) {
//     var groupedObj = groupClasses[groupObjects[j]];
//     for (var k = 0; k < groupedObj.length; k++) {
//       var output = '<tr>';
//       var name = groupedObj[k].Name;
//       output += '<td>' + prettyPrint(name) + '</td>';
//       var acName = groupedObj[k].AccountName;
//       output += '<td>' + prettyPrint(acName) + '</td>';
//       var asv = groupedObj[k].ASV;
//       output += '<td>' + prettyPrint(asv) + '</td>';;
//       var users = groupedObj[k].Users;
//       output += '<td>' + prettyPrint(users) + '</td>';
//       var type = groupedObj[k].TypeName;
//       output += '<td>' + prettyPrint(type) + '</td>';
//       var age = groupedObj[k].Age;
//       output += '<td>' + prettyPrint(age) + '</td>';
//       output += '<td>' + groupObjects[j] + '</td>';
//       output += '</tr>';
//       $('#dataTableBody').append(output);
//       output = '';
//       count++;
//     }
//   }
//   $('#ctaCount').html(count);
//   count = 0;
// });

// function to find various property values for a property for select options and putting in array
function findUniques(list, property) {
  var _uniqeValues = [];
  var _len = list.length;
  for (var i = 0; i < _len; i++) {
    if ( _uniqeValues.indexOf(list[i][property]) == -1)
      _uniqeValues.push(list[i][property]);
    }
  return _uniqeValues;
}

var priorityNames = findUniques(data, "PriorityName");
var ownerNames = findUniques(data, "AssigneeName");

// function to take those values from array and create the html
function population(array, domId) {
  var _arrayLength = array.length;
  for (var i = 0; i < _arrayLength; i++) {
    $('#'+domId).append('<option>'+ array[i]+'</option>');
  }
}

population(priorityNames, "priority");
population(ownerNames, "owner");

// listen for select of values from the select filters, pull data and show in tabular form
$('.setA').on("change", function(){
  $('#groupBy').val("None");
  $('#groupType').html("(None)");
  $('#aggregations').val("None");
  $('#agData').empty();
  var filters = $('.setA');
  var priorityValue = filters[0].value;
  var ownerValue = filters[1].value;

  var len = data.length;

  // use keys(property name) and property values(select menu values) for predicate logic while
  // looping over the data. If logic satisfies, display them
  for (var i = 0; i < len; i+=1) {

    $('#dataTableBody').empty();
    var count = 0;
    for (var i = 0; i < len; i++) {
      var output = '<tr>';
      if ( data[i]["PriorityName"] === priorityValue && data[i]["AssigneeName"] === ownerValue) {
        var name = data[i].Name;
        output += '<td>' + prettyPrint(name) + '</td>';
        var acName = data[i].AccountName;
        output += '<td>' + prettyPrint(acName) + '</td>';
        var asv = data[i].ASV;
        output += '<td>' + prettyPrint(asv) + '</td>';
        var users = data[i].Users;
        output += '<td>' + prettyPrint(users) + '</td>';
        var type = data[i].TypeName;
        output += '<td>' + prettyPrint(type) + '</td>';
        var age = data[i].Age;
        output += '<td>' + prettyPrint(age) + '</td>';
        output += '</tr>';
        $('#dataTableBody').append(output);
        output = '';
        count++;
      }
    }
    $('#ctaCount').html(count);
    count = 0;
  }
});

// as per grouping selected, group all data and show in tabular form
var groups;
$('#groupBy').on('change', function(){
  $('#dataTableBody').empty();
  $('#priority').val("None");
  $('#owner').val("None");

  var len = data.length;
  var y = this.value;

  $('#groupType').html("("+y+")");
  if ( y === "None") {
    $('#dataTableBody').empty();
    $('#ctaCount').html("");
    $('#agData').remove();
    $('#aggregations').val("None");
    return;
  }
  var count = 0;
  groups = [];
  for (var i = 0; i < len; i++) {
    var className = data[i][y].replace(/ /g,"-");
    if (groups.indexOf(className) == -1) {
      groups.push(className);
    }
    var output = '<tr class="'+className+'">';
    var name = data[i].Name;
    output += '<td>' + prettyPrint(name) + '</td>';
    var acName = data[i].AccountName;
    output += '<td>' + prettyPrint(acName) + '</td>';
    var asv = data[i].ASV;
    output += '<td>' + prettyPrint(asv) + '</td>';;
    var users = data[i].Users;
    output += '<td>' + prettyPrint(users) + '</td>';
    var type = data[i].TypeName;
    output += '<td>' + prettyPrint(type) + '</td>';
    var age = data[i].Age;
    output += '<td>' + prettyPrint(age) + '</td>';
    output += '<td>' + data[i][y] + '</td>';
    output += '</tr>';
    if ($('.'+data[i][y]).length != 0) {
      $('.'+data[i][y]).last().after(output);
    }
    else {
      $('#dataTableBody').append(output);
    }
    output = '';
    count++;
  }
  $('#ctaCount').html(count);
  process();
  count = 0;
});

// listen for the select and provide aggregated values on the grouped data
$('#aggregations').on("change", function(){
  if ($(this).val() == "None") {
    $('#agData').empty();
  }
  process();
});

// function containing the aggregation operations
function process() {
  if ($("#groupBy").val() != "None") {
    if ($('#aggregations').val() == "sum") {
      $('#agData').empty();
      for (var i = 0; i < groups.length; i += 1) {
        var total = 0;
        var str = '.'+groups[i];
        var noOfIndGrps = $(str).length;

        $(str +' td:nth-child(3)').each(
          function() {
            if ( $(this).html() == "NA") {
              total += 0;
            }
            else {
              total += eval($(this).html());
            }
          });

          $('#agData').append('<tr><td>'+groups[i]+'</td><td>'+ total.toFixed(2) +'</td></tr>');
        }
    }
    if ( $('#aggregations').val() == "min") {
      $('#agData').empty();

      for (var i = 0; i < groups.length; i += 1) {
        var min;
        var str = '.'+groups[i];
        var noOfIndGrps = $(str).length;

        // setting first value as minimum
        if ( $(str +' td:nth-child(3)')[0].innerHTML == "NA" ) {
          min = 0;
        }
        else {
          min = eval($(str +' td:nth-child(3)')[0].innerHTML);
        }

        for (var j = 1; j < $(str +' td:nth-child(3)').length; j+=1) {
          var currVal = $(str +' td:nth-child(3)')[j].innerHTML;
          if ( currVal == "NA") {
            currVal = 0;
          }
          else {
            currVal = eval(currVal);
          }
          if ( currVal < min ) {
            min = currVal;
          }
        }
        $('#agData').append('<tr><td>'+groups[i]+'</td><td>'+ min +'</td></tr>');
      }
    }
    if ($('#aggregations').val() == "max") {
      $('#agData').empty();
      for (var i = 0; i < groups.length; i += 1) {
        var max;
        var str = '.'+groups[i];
        var noOfIndGrps = $(str).length;

        // setting first value as maximum
        if ( $(str +' td:nth-child(3)')[0].innerHTML == "NA" ) {
          max = 0;
        }
        else {
          max = eval($(str +' td:nth-child(3)')[0].innerHTML);
        }

        for (var j = 1; j < $(str +' td:nth-child(3)').length; j+=1) {
          var currVal = $(str +' td:nth-child(3)')[j].innerHTML;
          if ( currVal == "NA") {
            currVal = 0;
          }
          else {
            currVal = eval(currVal);
          }
          if ( currVal > max ) {
            max = currVal;
          }
        }
        $('#agData').append('<tr><td>'+groups[i]+'</td><td>'+ max +'</td></tr>');
      }
    }
  }
  else return;
}


// for (var i = 0; i < priorityNames.length; i++) {
//   $('#priority').append('<option>'+ priorityNames[i]+'</option>');
// }


// for (var i = 0; i < ownerNames.length; i++) {
//   $('#owner').append('<option>'+ ownerNames[i]+'</option>');
// }

// $('#priority').on('change', function() {
//   var x = this.value;
//
//   (function def(pValue) {
//     $('#dataTableBody').empty();
//     var count = 0;
//     for (var i = 0; i < len; i++) {
//       var output = '<tr>';
//       if ( data[i].PriorityName === pValue) {
//         var name = data[i].Name;
//         output += '<td>' + name + '</td>';
//         var acName = data[i].AccountName;
//         output += '<td>' + acName + '</td>';
//         var asv = data[i].ASV;
//         output += '<td>' + asv + '</td>';
//         var users = data[i].Users;
//         output += '<td>' + users + '</td>';
//         var type = data[i].TypeName;
//         output += '<td>' + type + '</td>';
//         var age = data[i].Age;
//         output += '<td>' + age + '</td>';
//         output += '</tr>';
//         $('#dataTableBody').append(output);
//         output = '';
//         count++;
//       }
//     }
//     $('#ctaCount').html(count);
//     count = 0;
//   })(x);
// });
//


// $('#owner').on('change', function() {
//   var x = this.value;
//
//   (function def(pValue) {
//     $('#dataTableBody').empty();
//     var count = 0;
//     for (var i = 0; i < len; i++) {
//       var output = '<tr>';
//       if ( data[i].AssigneeName === pValue) {
//         var name = data[i].Name;
//         output += '<td>' + name + '</td>';
//         var acName = data[i].AccountName;
//         output += '<td>' + acName + '</td>';
//         var asv = data[i].ASV;
//         output += '<td>' + asv + '</td>';
//         var users = data[i].Users;
//         output += '<td>' + users + '</td>';
//         var type = data[i].TypeName;
//         output += '<td>' + type + '</td>';
//         var age = data[i].Age;
//         output += '<td>' + age + '</td>';
//         output += '</tr>';
//         $('#dataTableBody').append(output);
//         output = '';
//         count++;
//       }
//     }
//     $('#ctaCount').html(count);
//     count = 0;
//   })(x);
// });
