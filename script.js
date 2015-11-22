//variables
var sizeArea = 25;
var maxCoord = Math.sqrt(sizeArea);
var body = document.getElementsByTagName('body')[0];

var arrX = [], arrY = [], arrayCoords = [], xCoordsShip, yCoordsShip;
for (var k = 1; k <= maxCoord; k++) {
    arrX.push(k);
    arrY.push(k);
}

//ship properties
function Ship(size) {
    this.size = size;
    //this.status = 'live';

    var direction = ['horizontal', 'vertical'];
    this.dir = randomChoiceInArr(direction);

    this.shipCoords = {
        //x: randomNumber(maxCoord),
        //y: randomNumber(maxCoord)
        x: arrayCoords[0],
        y: arrayCoords[1]
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
        console.log('x: ' + this.shipCoords.x + ' y: ' + this.shipCoords.y);
    }
}

var ship1 = new Ship(1);
var ship2 = new Ship(1);
var ship3 = new Ship(1);
var ship4 = new Ship(1);
var ship5 = new Ship(1);
var ship6 = new Ship(1);
var ship7 = new Ship(1);
var ship8 = new Ship(1);


//ship1.shoot();
//console.log('ship1: ' + ship1.status + '\nsize: ' + ship1.size + '\ndirection: ' + ship1.dir + '\ncoords: ' +
//             ship1.shipCoords.x + ' ' + ship1.shipCoords.y);

//generate random choice in array
function randomChoiceInArr() {
    var randomX = Math.floor(Math.random() * maxCoord);
    var randomY = Math.floor(Math.random() * maxCoord);
    xCoordsShip = arrX[randomX];
    yCoordsShip = arrY[randomY];
    arrayCoords = [xCoordsShip, yCoordsShip];
    xCoordsShip = undefined;
    yCoordsShip = undefined;
    console.log(arrX + ' ' + arrY);
    return arrayCoords;
}
//generate random number from 1 to n
//function randomNumber(n) {
//    return Math.floor(Math.random() * n) + 1;
//}
//check repeating of ships' coords
function checkRepeating(el) {
    if (getComputedStyle(el).backgroundColor === 'rgb(0, 128, 0)') {
        el.css({
            background: 'red'
        });
    } else {
        el.css({
            background: 'green'
        });
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
                //arr[shipHorizHead + i].style.background = 'green';
                checkRepeating(arr[shipHorizHead + i]);
            } else {
                //arr[x - 1 + (y - 1 + i) * maxCoord].style.background = 'green';
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

view.viewShip(ship1, cell);
view.viewShip(ship2, cell);
view.viewShip(ship3, cell);
view.viewShip(ship4, cell);
view.viewShip(ship5, cell);
view.viewShip(ship6, cell);
view.viewShip(ship7, cell);
view.viewShip(ship8, cell);
ship1.print();
ship2.print();
ship3.print();
ship4.print();
ship5.print();
ship6.print();
ship7.print();
ship8.print();