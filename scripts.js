(function() {
"use strict";

var x_turn = true;
var turn_count = 0;

function play_again() {
    $(".board").removeClass("col-one").removeClass("col-two").removeClass("col-three")
    .removeClass("row-one").removeClass("row-two").removeClass("row-three")
    .removeClass("diag-one").removeClass("diag-two");
    $(".square").removeClass("x").removeClass("o");
    x_turn = true;
    turn_count = 0;
}

function check_win(begin, end, increment) {
    console.log("check_win(" + begin + ", " + end + ", " + increment + ")");
    var count = 0;
    for (var n = begin; n < end; n += increment) {
        var square = $($(".square").get(n));
        if ((x_turn && square.hasClass("x")) || (!x_turn && square.hasClass("o"))) {
            count++;
            console.log("count incremented to " + count);
        }
    }
    return (count == 3);
}

function increment_score() {
    if (x_turn) {
        $("#x-score").text(1 + parseInt($("#x-score").text()));
    }
    else {
        $("#o-score").text(1 + parseInt($("#o-score").text()));
    }
}

$(function() {

$(".square").on("click", function(e) {

    var elem = $(this);

    if (elem.hasClass("x") || elem.hasClass("o")) return;

    if (x_turn) {
        elem.toggleClass("x");
    }
    else {
        elem.toggleClass("o");
    }

    // Check for win
    var index = elem.index(".square");
    var row = Math.floor(index / 3); // 0, 1, or 2
    var col = index % 3; // 0, 1, or 2
    var diag = (index == 4) ? 3 : (index == 0 || index == 8) ? 1 : (index == 2 || index == 6) ? 2 : 0;

    // Check for win in row
    console.log("Checking row " + row);
    if (check_win(row * 3, row * 3 + 3, 1)) {
        console.log("won row " + row);
        var cls = (row == 0) ? "one" : (row == 1) ? "two" : "three";
        $(".board").toggleClass("row-" + cls);
        increment_score();
        setTimeout(play_again, 2500);
    }

    // Check for win in column
    console.log("Checking column " + col);
    if (check_win(col, col + 7, 3)) {
        console.log("won column " + col);
        var cls = (col == 0) ? "one" : (col == 1) ? "two" : "three";
        $(".board").toggleClass("col-" + cls);
        increment_score();
        setTimeout(play_again, 2500);
    }

    // Check for win in \ diagonal
    if (diag == 1 || diag == 3) {
        console.log("Checking \\ diagonal");
        if (check_win(0, 9, 4)) {
            console.log("won \\ diagonal");
            // TODO: Display win
            $(".board").toggleClass("diag-one");
            increment_score();
            setTimeout(play_again, 2500);
        }
    }

    // Check for win in / diagonal
    if (diag == 2 || diag == 3) {
        console.log("Checking / diagonal");
        if (check_win(2, 7, 2)) {
            console.log("won / diagonal");
            // TODO: Display win
            $(".board").toggleClass("diag-two");
            increment_score();
            setTimeout(play_again, 2500);
        }
    }

    x_turn = !x_turn;

    if (++turn_count == 9) {
        // End of game
        setTimeout(play_again, 2000);
    }

});

$("#reset-scores").on("click", function(e) {
    $("#x-score").text("0");
    $("#o-score").text("0");
    play_again();
});

});
})();