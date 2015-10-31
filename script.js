$('.square').click(function() {
  $(this).addClass('red');
  var num = $('div.red').length;
  if($(this).hasClass('green red')) {
    $('.message').fadeIn(600);
    $('.mes-inner').fadeIn(600);
    
    if (num > 1) {
      $('.mes-inner').html("You win!!! It takes " + num + " attepts!");
    }
    else {
      $('.mes-inner').html("You win!!! You are very lucky!!!");
    }
    return false;
    $('button').click();
  }
});

var square = document.getElementsByClassName("square");

$('button').click(function() {
  $('button').text("New Game!");
  $('.red').removeClass('red green');
  var j = Math.floor(Math.random() * $('.square').length);
  square[j].className += ' green';
})

$(document).ready(function() {
  $('button').click();
  $('.message').click(function() {
    $(this).fadeOut(600);
    $('button').click();
  })
})