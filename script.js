function Ship(size) {
    this.size = size;
    this.status = 'live';
    this.dir = randomChoiceInArr(direction);
}

var direction = ['horizontal', 'vertical'];

var ship1 = new Ship(4);
var ship2 = new Ship(2);

console.log('ship1 is ' + ship1.status + ' and has size: ' + ship1.size + ' and has direction: ' + ship1.dir);
console.log('ship2 is ' + ship2.status + ' and has size: ' + ship2.size + ' and has direction: ' + ship2.dir);

function randomChoiceInArr(arr) {
    var randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
}