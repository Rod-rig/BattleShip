//constants
var field = {
    sizeArea: 100,
    notAvail: [],
    ships: [],      //order of ships in field
    shipObjects: [],
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
function putOrdersInArray(arrCoords) {
    var ordersArr = [];
    arrCoords.forEach(function (i) {
        ordersArr.push(orderFromCoords(i));
    });
    return ordersArr;
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
    this.shipOrder = putOrdersInArray(this.shipCoords);

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

    //view ship in field
    viewShips: function (obj) {
        for (var i = 0; i < obj.size; i++) {
            var cellShip = orderFromCoords(obj.shipCoords[i]);
            cell[cellShip].css({ background: green });
        }
        return this;
    },
    //view ship gap in field
    viewShipsGap: function (obj) {
        obj.gap.forEach(function (item) {
            var killedShipGap = orderFromCoords(item);
            if (cell[killedShipGap] && cell[killedShipGap].css('backgroundColor') !== red) {
                view.paintChosenCoord(killedShipGap, 'yellow');
            }
        });
        return this;
    },

    paintChosenCoord: function (shootedCoord, color) {
        var shootedCell = cell[shootedCoord];
        if (shootedCell) {
            shootedCell.css({'background': color});
        }
    },
    writeMessage: function (elSelector, msg, number) {
        document.querySelector(elSelector).innerText = msg + number;
    }
};

//create cells
view.generateCells(field.sizeArea);

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
HTMLElement.prototype.css = function (cssProp) {
    if (typeof cssProp === 'string') {
        return getComputedStyle(this)[cssProp];
    }
    for (var prop in cssProp) {
        if (cssProp.hasOwnProperty(prop)) {
            this.style.setProperty(prop, cssProp[prop], null);
        }
    }
    return this;
};
var cell = document.querySelectorAll('.cell');

for (var i = 0; i < cell.length; i++) {
    cell[i].css(styles);
    //add click listener
    cell[i].addEventListener('click', shoot);
}
body.css({
    width: maxCoord * parseInt(styles.width) + maxCoord * parseInt(getComputedStyle(cell[0]).marginRight) + 'px'
});

function createShips(shipsConfig) {
    for (var key in shipsConfig) {
        var shipNumber = shipsConfig[key];
        while (shipNumber > 0) {
            var newShip = new Ship(key);
            field.shipObjects.push(newShip);

            // view all ships
            // view.viewShips(newShip).viewShipsGap(newShip);
            // newShip.print();
            shipNumber--;
        }
    }
}
createShips({1: 4, 2: 3, 3: 2, 4: 1});


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
function isKilled(ship) {
    return ship.status === 'killed';
}
function isNewShot(coord) {
    return !isInArray(field.shots, coord);
}
function getShipByOrderNumber(shipCoord) {
    for (var i = 0; i < field.shipObjects.length; i++) {
        if (isInArray(field.shipObjects[i].shipOrder, shipCoord)) {
            return field.shipObjects[i];
        }
    }
}
function checkIsWinner() {
    if (field.shipObjects.length === 0) {
        var champDiv = 'winner';
        view.makeDiv(champDiv);
        view.writeMessage('.' + champDiv, "Winner!!!", "");
    }
}

function updateShipList(ship) {
    if (isKilled(ship)) {
        var shipIndex = field.shipObjects.indexOf(ship);
        field.shipObjects.splice(shipIndex, 1);
    }
}

function updateShotStat(coord) {
    if (field.numberOfShots < 1) {
        view.makeDiv('stat');
    }
    if (isNewShot(coord)) {
        field.shots.push(coord);
        field.numberOfShots += 1;
        view.writeMessage(".stat", "Number of shots: ", field.numberOfShots);
    }
}

function updateShootedShipStat(ship) {
    if (ship.size > 0) ship.size -= 1;
    ship.status = ship.size === 0 ? "killed" : "injured";
    return ship;
}

function paintKilledShipGap(ship) {
    if (isKilled(ship)) {
        view.viewShipsGap(ship, cell);
    }
}

function shoot() {
    var shootCoord = getShipNumber(this),
        isAccurateShot = isInArray(field.ships, shootCoord),
        isAnotherShot = isNewShot(shootCoord);

    updateShotStat(shootCoord);

    if (isAccurateShot && isAnotherShot) {
        var shootedShip = getShipByOrderNumber(shootCoord);
        updateShootedShipStat(shootedShip);
        updateShipList(shootedShip);

        //write message about shooted ship status
        // view.writeMessage("Shooted ship status: ", shootedShip.status);
        view.paintChosenCoord(shootCoord, green);
        paintKilledShipGap(shootedShip);
        checkIsWinner();
    } else if (isAnotherShot) {
        view.paintChosenCoord(shootCoord, red);
    }
}