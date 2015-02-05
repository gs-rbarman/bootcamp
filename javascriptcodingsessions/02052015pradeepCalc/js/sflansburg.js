/**
 * Created by Rajdeep Barman on 2/5/2015.
 */

$(".numbers, #operators td").on("click", function(){
    var value = $("#display").val();
    value += this.innerHTML;
    $("#display").val(value);
});

$("#equals").on("click", function(){
    var expression = $("#display").val();
    $("#display").val(eval(expression));
});

$("#purge").on("click", function(){
    var displaying = $("#display").val();
    var toDisplay = displaying.substring(0, displaying.length-1);
    $("#display").val(toDisplay);
});

$("#reset").on("click", function(){
    $("#display").val("");
});