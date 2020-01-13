/* declare Variables */

let cells =[]; // array
let cell; // cellId
var rY=[]; // horinzontal
var rX=[]; // vertical


var activePlayer;
var passivePlayer;
var box = $( "div#mapgen > div" );
let playersNearby;

var buttonP1A = $("#P1A");
var buttonP1D = $("#P1D");
var buttonP2A = $("#P2A");
var buttonP2D = $("#P2D");
var fight = false;


// Find Available Cell for Objects
function findAvailableCell(){
  do {
    cell = Math.floor((Math.random() * 100));
  }
  while (!(cells[cell] == null))
  return cell;
}

/* Define Block Object*/
function Block(name, image) {
  this.name = name;
  this.image = image;
}

Block.prototype.setPosition = function() {
  for (let i = 0; i < 10; i++) {
    cell = findAvailableCell();
    cells[cell] = this.name;
    var mybox = document.getElementById(cell);
    mybox.classList.add(this.name);
  }
}

/* Define Player Object*/
function Player(name, image) {
  this.name = name;
  this.image = image;
  this.weapond = null;
  this.lifePoint = 100;
  this.damage = 10;
}

Player.prototype.setPosition = function() {
  cell = findAvailableCell();
  cells[cell] = this.name;
  var mybox = document.getElementById(cell);
  mybox.classList.add(this.name);

  mybox.innerHTML = '<img src="img/'+this.image +'" height="58" ></img>';
  //in order not to place players in adjacent divs
  var contacts= [cell - 1, cell + 1, cell - 10, cell + 10];
  $.each(contacts, function(index, contact) {
    if ((contact >= 0 && contact < 100) && cells[contact] == null) {
      cells[contact] = 'full';
    }
  });
  return this.position = cell;
}

/* Define Weapond Object*/
function Weapond(name, image, damage) {
  this.name = name;
  this.image = image;
  this.damage = damage;
}

Weapond.prototype.setPosition = function() {
  cell = findAvailableCell();
  cells[cell] = this.name;
  var mybox = document.getElementById(cell);
  mybox.classList.add(this.name);
}

/*  Instantiate objects */
let block = new Block("block", "beer.png");

let player1 = new Player("player1","player1.png");
let player2 = new Player("player2", "player2.png");

let bean = new Weapond("bean", "senzu_bean.png", 20);
let sword = new Weapond("sword", "sword.png.png", 30);
let pole = new Weapond("pole", "pole.png", 40);
let ball = new Weapond("ball", "dragon_ball.png", 50);

/* Set Positions of each objects*/
block.setPosition();
player1.setPosition();
player2.setPosition();
bean.setPosition();
sword.setPosition();
pole.setPosition();
ball.setPosition();
