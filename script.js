//variables
var sizeArea = 16;
var numberOfShips = 10;
var maxCoord = Math.sqrt(sizeArea);
var body = document.getElementsByTagName('body')[0];

var coordsArray = [];
for (var k = 1; k <= sizeArea; k++) {
    coordsArray.push(k);
}

//generate random choice in array
function randomChoiceInArr(arr) {
    var random = Math.floor(Math.random() * sizeArea);
    return arr[random];
}
//convert number into coordinates
function convertNumber(num) {
    var x = num % maxCoord;
    if (x == 0) {
        x = maxCoord;
    }
    var y = Math.ceil(num / maxCoord);
    //coordsArray[num - 1] = 1;
    //coordsArray[num - 1] = undefined;
    //console.log(num);
    return [x, y];
}

//ship properties
function Ship(size) {
    this.size = size;
    //this.status = 'live';

    var direction = ['horizontal', 'vertical'];
    this.dir = randomChoiceInArr(direction);

    this.resCoords = convertNumber(randomChoiceInArr(coordsArray));
    this.shipCoords = {
        x: this.resCoords[0],
        y: this.resCoords[1]
    };

    //this.shoot = function() {
    //    if (this.size > 1) {
    //        this.size--;
    //    } else {
    //        this.size = 0;
    //        this.status = 'dead';
    //    }
    //    return this;
    //}

    this.print = function () {
        console.log('x: ' + this.shipCoords.x + ' y: ' + this.shipCoords.y + ' array: ' + coordsArray);
    }
}

//ship1.shoot();
//console.log('ship1: ' + ship1.status + '\nsize: ' + ship1.size + '\ndirection: ' + ship1.dir + '\ncoords: ' +
//             ship1.shipCoords.x + ' ' + ship1.shipCoords.y);

//generate random number from 1 to n
//function randomNumber(n) {
//    return Math.floor(Math.random() * n) + 1;
//}
//check repeating of ships' coords
var green = 'rgb(120, 201, 50)',
    red = 'rgb(255, 0, 0)';
function checkRepeating(el) {
    if ((getComputedStyle(el).backgroundColor === green) ||
        (getComputedStyle(el).backgroundColor === red))
    {
        //paint it red
        el.css({ background: red });
        //el.resCoords = convertNumber(randomChoiceInArr(coordsArray));
        //el.shipCoords = {
        //    x: el.resCoords[0],
        //    y: el.resCoords[1]
        //};
        //console.log(el.resCoords);
        //view.viewShip(el, cell);
    } else {
        //paint it green
        el.css({ background: green });
    }
}
//build view
var view = {
    generateCells: function (n) {
        for (var i = n; i >= 1; i--) {
            var div = document.createElement('div');
            div.className = 'cell';
            body.appendChild(div);
        }
    },
    viewShip: function (obj, arr) {
        var x = obj.shipCoords.x;
        var y = obj.shipCoords.y;
        var shipHorizHead = x - 1 + (y - 1) * maxCoord;
        for (var i = 0; i < obj.size; i++) {
            if (obj.dir === 'horizontal') {
                checkRepeating(arr[shipHorizHead + i]);
            } else {
                checkRepeating(arr[x - 1 + (y - 1 + i) * maxCoord]);
            }
        }
    }
};

view.generateCells(sizeArea);
//styles
var styles = {
    width: '50px',
    height: '50px',
    display: 'inline-block',
    background: 'lightgray',
    margin: '0 4px 0 0'
};
Object.prototype.css = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            this.style.setProperty(prop, obj[prop], null);
        }
    }
    return this;
};
var cell = document.querySelectorAll('.cell');

for (var i = 0; i < cell.length; i++) {
    cell[i].css(styles);
}
body.css({
    width: maxCoord * parseInt(styles.width) + maxCoord * parseInt(getComputedStyle(cell[0]).marginRight) + 'px'
});

//create ships
(function createShips(qwe) {
    var ships = [];
    for (var l = 0; l < qwe; l++) {
        var newShip = new Ship(1);
        ships.push(newShip);
        view.viewShip(ships[l], cell);
        ships[l].print();
    }
})(numberOfShips);