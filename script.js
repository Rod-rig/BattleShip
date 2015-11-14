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

    this.shoot = function() {
        if (this.size > 1) {
            this.size--;
        } else {
            this.size = 0;
            this.status = 'dead';
        }
        return this;
    }
}

var ship1 = new Ship(4);

ship1.shoot();
console.log('ship1: ' + ship1.status + '\nsize: ' + ship1.size + '\ndirection: ' + ship1.dir + '\ncoords: ' +
             ship1.shipCoords.x + ' ' + ship1.shipCoords.y);

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
    generate: function (n) {
        for (var i = n; i >= 1; i--) {
            var div = document.createElement('div');
            div.className = 'cell';
            body.appendChild(div);
        }
    },
    viewShip: function (obj, arr) {
        var x = obj.shipCoords.x;
        var y = obj.shipCoords.y;
        arr[x - 1 + (y - 1) * maxCoord].style.background = 'green';
    }
};
view.generate(sizeArea);
//styles
var cell = document.querySelectorAll('.cell');
for (var i = 0; i < cell.length; i++) {
    cell[i].style.width = '50px';
    cell[i].style.height = '50px';
    cell[i].style.display = 'inline-block';
    cell[i].style.background = 'lightgray';
    cell[i].style.marginRight = '4px';
}
body.style.width = maxCoord * 50 + maxCoord * 4 + 'px';
view.viewShip(ship1, cell);