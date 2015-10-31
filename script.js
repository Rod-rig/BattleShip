var square = document.getElementsByClassName("square");
var num_ship = 10;
var fields = 25;
//localStorage.setItem('record', '');
//browser remember your record
if (localStorage.getItem('record') == undefined) {
    localStorage.setItem('record', '25');
}
var record = parseInt(localStorage['record']);
//var record = fields;

$(document).ready(function() {

    //add empty fields to our game
    addEmptyFields(fields);

    startNewGame();

    $('.square').click(function() {
        $(this).addClass('red');

        //change number of destroyed ships after clicking square
        destroyedShipsNum();

        //when game is finished display message
        displayTotalMessage();
    });

    $('button').click(function() {
        $('.message').fadeOut(600);
        startNewGame();
    });

    //add empty fields to our game
    function addEmptyFields(fields) {
      var divSquare = '<div class="square"></div>';
      for (var i = 0; i < fields; i++) {
          $('button').before(divSquare);
      };
    }

    //actions when button is clicked
    //to start new game
    function startNewGame() {
        $('button').text("New Game!");
        $('.red, .green').removeClass('red green');
        var rand_sq = random(0, square.length, num_ship);
        for (var l = 0; l < rand_sq.length; l++) {
            var k = rand_sq[l];
            $('.square:eq(' + k + ')').addClass('green');
        }
        //show number of destroyed ships
        destroyedShipsNum();
    }

    //show number of destroyed ships
    function destroyedShipsNum() {
        var destroyedShips = $('.green.red').length;
        var messageDestroyedShips = "Destroyed ships: " + destroyedShips + "/" + num_ship;
        $('.count').text(messageDestroyedShips);
        
        var recordMessage = "Your best record: " + localStorage['record'];
        $('.record').text(recordMessage);
    }

    //when game is finished display message
    function displayTotalMessage() {
      var num = $('div.red').length;
      if ($('.green.red').length >= num_ship) {
        $('.message').fadeIn(600);
        $('.mes-inner').fadeIn(600);

        //refresh record
        if (record > num) {
            localStorage.setItem('record', num);
        }

        if (num > num_ship) {
            $('.mes-inner').html("You win!!! It takes " + num + " attempts!");
        } else if (num === num_ship) {
            $('.mes-inner').html("You win!!! You are very lucky!!!");
        }
        //You lose if there is only one shot and one ship
        if ((num - 1) === (fields -1)) {
            $('.mes-inner').html("You lose(((");
        }
      }
    }
})

//generation of n different random numbers
function random(min, max, n) {
    if (max - min < n) {
        return false;
    }
    var result = [];
    var arr = [];
    for (var j = min; j < max; j++) {
        arr[j] = j;
    }
    for (var i = 0; i < n; i++) {
        var random_number = Math.floor(Math.random() * arr.length + min);
        result[i] = " " + arr[random_number];
        arr.splice(random_number, 1);
    }
    return result;
}