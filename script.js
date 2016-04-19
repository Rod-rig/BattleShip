//constants
var sizeArea = 4;
var numberOfShips = 1;
var maxCoord = Math.sqrt(sizeArea);

//variables
var body = document.getElementsByTagName('body')[0];

var directions = ['vertical', 'horizontal'];

//helpful functions
/**
 * @param max {number}
 * @returns {number} - return number from 1 to max
 */
function makeRandom(max) {
    return Math.floor(Math.random() * max) + 1;
}
//convert coords to order of cell
function orderFromCoords(areaObj) {
    var x = areaObj.x,
        y = areaObj.y;
    return (y - 1) * maxCoord + (x - 1);
}
/**
 * @param ship {Object}
 * @returns {Array} - example [{x: 2, y: 5}, {x: 2, y: 6}, {x: 2, y: 7}]
 */
function calcArea(ship) {
    var coordX = makeRandom(maxCoord),
        coordY = makeRandom(maxCoord),
        coordArr = [{
            x: coordX,
            y: coordY
        }];

    if(ship.size === 1) {
        return coordArr;
    }

    if ((!isContained(ship, coordX) && isHorizontal(ship.dir)) || (!isContained(ship, coordY) && isVertical(ship.dir))) {
        coordX = makeRandom(maxCoord);
        coordY = makeRandom(maxCoord);
        return calcArea(ship);
    } else {
        if (isHorizontal(ship.dir)) {
            for (var i = 1; i < ship.size; i++) {
                coordX += 1;
                coordArr.push({
                    x: coordX,
                    y: coordY
                })
            }
            return coordArr;
        } else if (isVertical(ship.dir)) {
            for (var j = 1; j < ship.size; j++) {
                coordY += 1;
                coordArr.push({
                    x: coordX,
                    y: coordY
                })
            }
            return coordArr;
        }
    }
}

//check is areaCoords correct
function isContained(ship, coord) {
    var size = ship.size - 1;
    return (coord + size <= maxCoord);
}

//check directions
function isHorizontal(dir) {
    if(dir === "horizontal") return true;
}
function isVertical(dir) {
    if(dir === "vertical") return true;
}

//ship properties
function Ship(size) {
    this.size = size;

    // this.status = 'live';

    this.dir = directions[makeRandom(directions.length) - 1];
    this.shipCoords = calcArea(this);

    this.print = function () {
        console.log('Ship coords: ', this.shipCoords,
            '\nSize: ' + this.size +
            '\nDirection: ' + this.dir);
    }
}

//check repeating of ships' coords
var green = 'rgb(120, 201, 50)',
    red = 'rgb(255, 0, 0)';
function checkRepeating(el) {
    if ((getComputedStyle(el).backgroundColor === green) ||
        (getComputedStyle(el).backgroundColor === red))
    {
        //paint it red
        el.css({ background: red });
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
        for (var i = 0; i < obj.size; i++) {
            var cellNumber = orderFromCoords(obj.shipCoords[i]);
            checkRepeating(arr[cellNumber]);
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
    margin: '0 4px 0 0',
    cursor: 'pointer'
};
HTMLElement.prototype.css = function (obj) {
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
(function createShips() {
    var ships = [];
    for (var l = 0; l < numberOfShips; l++) {
        var newShip = new Ship(2);
        ships.push(newShip);
        view.viewShip(ships[l], cell);
        ships[l].print();
    }
})();