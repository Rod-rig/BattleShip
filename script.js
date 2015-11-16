//variables
var sizeArea = 100;
var maxCoord = Math.sqrt(sizeArea);
var body = document.getElementsByTagName('body')[0];

//ship properties
function Ship(size) {
    this.size = size;
    this.status = 'live';

    var direction = ['horizontal', 'vertical'];
    this.dir = randomChoiceInArr(direction);

    this.shipCoords = {
        x: randomNumber(maxCoord),
        y: randomNumber(maxCoord)
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
}

var ship1 = new Ship(4);
var ship2 = new Ship(3);
var ship3 = new Ship(2);
var ship4 = new Ship(1);


//ship1.shoot();
//console.log('ship1: ' + ship1.status + '\nsize: ' + ship1.size + '\ndirection: ' + ship1.dir + '\ncoords: ' +
//             ship1.shipCoords.x + ' ' + ship1.shipCoords.y);

//generate random choice in array
function randomChoiceInArr(arr) {
    var randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
}
//generate random number from 1 to n
function randomNumber(n) {
    return Math.floor(Math.random() * n) + 1;
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
        if (obj.dir === 'horizontal') {
            for (var i = 0; i < obj.size; i++) {
                arr[shipHorizHead + i].style.background = 'green';
            }
        } else {
            for (var j = 0; j < obj.size; j++) {
                arr[x - 1 + (y - 1 + j) * maxCoord].style.background = 'green';
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
Object.prototype.css = function(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            this.style.setProperty(prop, obj[prop], null);
        }
    }
};
var cell = document.querySelectorAll('.cell');

for (var i = 0; i < cell.length; i++) {
    cell[i].css(styles);
}
body.style.width = maxCoord * 50 + maxCoord * 4 + 'px';
view.viewShip(ship1, cell);
view.viewShip(ship2, cell);
view.viewShip(ship3, cell);
view.viewShip(ship4, cell);