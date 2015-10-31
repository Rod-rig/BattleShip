var model = {
    numShips: 25,
    numLiveShips: 10,
    numDestroyedShips: 0,
    numMiss: 0,
    notSunked: random(0, 25, 10),
    ship: {},
    addShips: function (n) {
        for (var i = 0; i < n; i++) {
            this.ship[i] = false;
        }
        for (var j = 0; j < this.numLiveShips; j++) {
            this.ship[this.notSunked[j]] = true;
        }
    },
    fire: function () {
        var indexOfChosenShip = $(this).index();
        if (model.ship[indexOfChosenShip] === true) {
            //if fire the ship
            $(this).addClass('green');
            model.numDestroyedShips = $('.green').length;
        } else {
            $(this).addClass('red');
            model.numMiss = $('.red').length;
        }
        view.updateStat();
        model.isLastShot();
    },
    isLastShot: function () {
        if (model.numDestroyedShips === model.numLiveShips) {
            view.popupGoodResult();
            model.setRecord();
        }
        if (model.numMiss === 15) {
            view.popupBadResult();
        }
    },
    record: parseInt(localStorage.getItem('record')),
    setRecord: function () {
        if (localStorage.getItem('record') == undefined) {
            localStorage.setItem('record', '25');
        }
        if (model.record > (model.numMiss + model.numDestroyedShips)) {
            localStorage.setItem('record', (model.numMiss + model.numDestroyedShips));
        }
        model.record = parseInt(localStorage.getItem('record'));
        return model.record;
    }
};
var view = {
    //delete ships & restart the game
    cleanWindow: function () {
        model.numMiss = 0;
        model.numDestroyedShips = 0;
        model.notSunked = random(0, 25, 10);
        $('.ship, .finish-window, .stat, .record').remove();
        $('button').removeClass('good-btn').removeClass('bad-btn');
    },
    //add ships on page
    addShips: function (n) {
        for (var i = n; i > 0; i--) {
            controller.createDiv('ship', '.main_field');
        }
    },
    //add statistics & record block on page
    addStats: function () {
        controller.createDiv('stat', 'body');
        controller.createDiv('record', 'body');
        view.updateStat();
    },
    updateStat: function () {
        $('.stat').html("Destroyed ships: " + model.numDestroyedShips);
    },
    updateRecord: function () {
        $('.record').html("Your best result: " + model.record);
    },
    //make popup
    popupResult: function () {
        controller.createDiv('finish-window', 'body');
        $('.finish-window').fadeIn(400);
    },
    popupGoodResult: function () {
        view.popupResult();
        controller.createDiv('good-news', '.finish-window');
        $('button').addClass("good-btn");
        $('.good-news').html("You win!!! <br> It takes " + (model.numDestroyedShips + model.numMiss) + " attempts");
    },
    popupBadResult: function () {
        view.popupResult();
        controller.createDiv('bad-news', '.finish-window');
        $('button').addClass("bad-btn");
        $('.bad-news').html('You lose(');
    }
};
var controller = {
    //start the game
    startGame: function () {
        view.cleanWindow();
        view.addShips(model.numShips);
        view.addStats();
        view.updateRecord();
        model.addShips(model.numShips);
        controller.shoot();
    },
    shoot: function () {
        $('.ship').click(model.fire);
    },
    //help function to crate div quickly
    createDiv: function (className, whereToAdd) {
        var el = document.createElement('div');
        el.className = className;
        $(whereToAdd).append(el);
    }
};
$(document).ready(function () {
    controller.startGame();
    //new game button
    $('.new-game').click(function () {
        controller.startGame();
    })
});

//generation of n different random numbers
//this work only for min = 0!!!!!!!!
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
        result[i] = arr[random_number];
        arr.splice(random_number, 1);
    }
    return result;
}