//constants
var field = {
    sizeArea: 16,
    // numberOfShips: 5,
    notAvail: [],
    ships: [],      //order of ships in field
    numberOfShots: 0,
    shots: []
};
maxCoord = Math.sqrt(field.sizeArea);

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
    if (x < 1 || x > maxCoord || y < 1 || y > maxCoord) {
        return false;
    }
    return (y - 1) * maxCoord + (x - 1);
}
//collect all ship coords
function collectNotAvailCoords(shipCoords, isShip) {
    shipCoords.forEach(function (i) {
        field.notAvail.push(orderFromCoords(i));
    });
    if (isShip) {
        shipCoords.forEach(function (i) {
            field.ships.push(orderFromCoords(i));
        });
    }
}
//check is avail coords for new ship
function checkIsUnique(ship, headCoords) {
    var fieldCoord = orderFromCoords(headCoords[0]);

    if (isHorizontal(ship.dir)) {
        for (var i = 0; i < ship.size; i++) {
            if (field.notAvail.indexOf(fieldCoord + i) > -1) {
                return false;
            }
        }
        return true;
    } else if (isVertical(ship.dir)) {
        for (var j = 0; j < ship.size; j++) {
            if (field.notAvail.indexOf(fieldCoord + j * maxCoord) > -1) {
                return false;
            }
        }
        return true;
    }
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

    if (ship.size === 1 && checkIsUnique(ship, coordArr)) {
        collectNotAvailCoords(coordArr, true);
        return coordArr;
    } else if (ship.size === 1 && !checkIsUnique(ship, coordArr)){
        coordX = makeRandom(maxCoord);
        coordY = makeRandom(maxCoord);
        return calcArea(ship);
    }

    //if !(horizontally or vertically ship place in field) or !(ship coord is unique)
    if ((!isContained(ship, coordX) && isHorizontal(ship.dir)) || (!isContained(ship, coordY) && isVertical(ship.dir)) || !checkIsUnique(ship, coordArr)) {
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
                });
            }
            collectNotAvailCoords(coordArr, true);
            return coordArr;
        } else if (isVertical(ship.dir)) {
            for (var j = 1; j < ship.size; j++) {
                coordY += 1;
                coordArr.push({
                    x: coordX,
                    y: coordY
                });
            }
            collectNotAvailCoords(coordArr, true);
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

/**
 * @param ship
 * @returns {Array} [{x: 2, y: 5}, {x: 2, y: 6}, {x: 2, y: 7}]
 */
function findGap(ship) {
    var head = ship.shipCoords[0],
        x = head.x,
        y = head.y,
        dir = ship.dir,
        size = ship.size,
        gap = [];

    if (isVertical(dir)) {
        for (var i = 0; i < size; i++) {
            gap.push({x: x - 1, y: y + i});
            gap.push({x: x + 1, y: y + i});
        }
        for (var j = -1; j <= 1; j++) {
            gap.push({x: x - j, y: y - 1});
            gap.push({x: x - j, y: y + size});
        }
    }

    if (isHorizontal(dir)) {
        for (var k = 0; k < size; k++) {
            gap.push({x: x + k, y: y - 1});
            gap.push({x: x + k, y: y + 1});
        }
        for (var l = -1; l <= 1; l++) {
            gap.push({x: x - 1, y: y - l});
            gap.push({x: x + size, y: y - l});
        }
    }

    collectNotAvailCoords(gap);
    return gap;
}

//ship properties
function Ship(size) {
    //transform string into number
    this.size = +size;

    this.status = 'live';

    this.dir = directions[makeRandom(directions.length) - 1];
    this.shipCoords = calcArea(this);

    this.gap = findGap(this);

    this.print = function () {
        console.table(this.shipCoords);
        console.log('Size: ' + this.size +
            '\nDirection: ' + this.dir + '\nNot Avail Coords: ' + field.notAvail);
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
    makeDiv: function (className) {
        var div = document.createElement('div');
        div.className = className;
        body.appendChild(div);
        return div;
    },
    generateCells: function (n) {
        for (var i = n; i >= 1; i--) {
            view.makeDiv('cell');
        }
    },
    viewShips: function (obj, arr) {
        for (var i = 0; i < obj.size; i++) {
            var cellShip = orderFromCoords(obj.shipCoords[i]);
            checkRepeating(arr[cellShip]);
        }

        for (var j = 0; j < obj.gap.length; j++) {
            var cellGap = orderFromCoords(obj.gap[j]);
            if (arr[cellGap] !== undefined && getComputedStyle(arr[cellGap]).backgroundColor !== green) {
                arr[cellGap].css({'background': 'yellow'});
            }
        }
    },
    paintChosenCoord: function (shootedCoord, color) {
        cell[shootedCoord].css({'background': color});
    },
    addStat: function () {
        view.statContainer = view.makeDiv('stat');
        view.updateStat();
    },
    updateStat: function () {
        view.statContainer.innerText = "Number of shots: " + field.numberOfShots;
    }
};

//create cells
view.generateCells(field.sizeArea);
view.addStat();

//styles
var styles = {
    width: '50px',
    height: '50px',
    display: 'inline-block',
    background: 'lightgray',
    margin: '0 4px 0 0',
    cursor: 'pointer',
    transition: 'all 0.2s'
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
    //add click listener
    cell[i].addEventListener('click', shoot);
    cell[i].addEventListener('contextmenu', makeTip);
}
body.css({
    width: maxCoord * parseInt(styles.width) + maxCoord * parseInt(getComputedStyle(cell[0]).marginRight) + 'px'
});

function createShips(shipsConfig) {
    for (var key in shipsConfig) {
        var shipNumber = shipsConfig[key];
        while (shipNumber > 0) {
            var newShip = new Ship(key);

            // view all ships
            // view.viewShips(newShip, cell);
            // newShip.print();
            shipNumber--;
        }
    }
}
createShips({1: 1, 2: 1, 3: 0, 4: 0});


//controls
function findAllPreviousElements(node) {
    var prevAll = [];
    while (node.className === 'cell') {
        node = node.previousSibling;
        prevAll.push(node);
    }
    return prevAll;
}
function getShipNumber(node) {
    //numbering starts from 0
    return findAllPreviousElements(node).length - 1;
}
function isInArray(arr, el) {
    return arr.indexOf(el) >= 0;
}
function updateShotStat(coord) {
    var isNewShot = isInArray(field.shots, coord);
    if (!isNewShot) {
        field.shots.push(coord);
        field.numberOfShots += 1;
        view.updateStat();
    }
}
function shoot() {
    var shootCoord = getShipNumber(this),
        isAccurateShot = isInArray(field.ships, shootCoord);

    updateShotStat(shootCoord);
    if (isAccurateShot) {
        view.paintChosenCoord(shootCoord, green);
    } else {
        view.paintChosenCoord(shootCoord, red);
    }
}

function makeTip() {
    var shootCoord = getShipNumber(this);
    view.paintChosenCoord(shootCoord, 'yellow');
}