var square = document.getElementsByClassName("square");
var num_ship = 10;

$('.square').click(function() {
  $(this).addClass('red');
  var num = $('div.red').length;
  
  //if bingo
  if($('.green.red').length >= num_ship) {
    $('.message').fadeIn(600);
    $('.mes-inner').fadeIn(600);
    
    if (num > num_ship) {
      $('.mes-inner').html("You win!!! It takes " + num + " attepts!");
    }
    else {
      $('.mes-inner').html("You win!!! You are very lucky!!!");
    }
    return false;
    button_click();
  }
});

$('button').click(function() {
  button_click();
})
$(document).ready(function() {
  $('button').click();
  $('.message').click(function() {
    $(this).fadeOut(600);
    button_click();
  })
})

//actions when button is clicked
function button_click() {
  $('button').text("New Game!");
  $('.red, .green').removeClass('red green');
  var rand_sq = random(0, square.length, num_ship);
  for (var l = 0; l < rand_sq.length; l++) {
    var k = rand_sq[l];
    $('.square:eq(' + k + ')').addClass('green');
  }
}

//generation of n different random numbers
function random(min, max, n) {
  if (max - min < n) {return false;}
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