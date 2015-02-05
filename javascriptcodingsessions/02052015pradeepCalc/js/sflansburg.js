/**
 * Created by Rajdeep Barman on 2/5/2015.
 */

// keeping operators from being pressed initially
$("#operators button").attr("disabled", "disabled");

// preventing ill-legal key presses that may cause an expression that causes error on evaluation
function buttonState(){
    var str = $("#display").val();
    var strLen = str.length;
    var lastOfStrLen = str[strLen-1];
    if ( lastOfStrLen == "+" || lastOfStrLen == "-" || lastOfStrLen == "/" || lastOfStrLen == "*" ) {
        $("#operators button").attr("disabled", "disabled");
        $("#equals button").attr("disabled", "disabled");
        $("#dot button").attr("disabled", "disabled");
    }
    else {
        $("#operators button").removeAttr("disabled");
        $("#equals button").removeAttr("disabled");
        $("#dot button").removeAttr("disabled");
    }
}

$(".numbers button, #operators button").on("click", function(){
    var value = $("#display").val();
    value += this.innerHTML;
    $("#display").val(value);
    buttonState();
});

$("#equals").on("click", function(){
    var expression = $("#display").val();
    $("#display").val(eval(expression));
    buttonState();
});

$("#purge").on("click", function(){
    var displaying = $("#display").val();
    var toDisplay = displaying.substring(0, displaying.length-1);
    $("#display").val(toDisplay);
    buttonState();
});

$("#reset").on("click", function(){
    $("#display").val("");
    buttonState();
});
