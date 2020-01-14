/* declare Variables */

var arr =[];
var rY=[], rX=[];
var cell;
var activePlayer, passivePlayer;
var box = $( "div#mapgen > div" );

var playersNearby;
// fight variables
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
  while (!(arr[cell] == null))
  return cell;
}


/* Define Block Object*/
function Block(name, image) {
	this.name = name;
	this.image = image;
}

Block.prototype.setPosition = function() {
	for (var i=0;i<10;i++) {
    cell = findAvailableCell();
    arr[cell] = this.name;
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
  arr[cell] = this.name;
  var mybox = document.getElementById(cell);
  mybox.classList.add(this.name);

  mybox.innerHTML = '<img src="img/'+this.image +'" height="58" ></img>';
  //in order not to place players in adjacent divs
  var contacts= [cell-1,cell+1,cell-10,cell+10];
  $.each(contacts, function(index, contact) {
    if ((contact >= 0 && contact < 100) && arr[contact] == null) {
      arr[contact] = 'full';
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
  arr[cell] = this.name;
  var mybox = document.getElementById(cell);
  mybox.classList.add(this.name);
}

/*  Instantiate objects */
var block = new Block("block", "obstacle.png");

var player1 = new Player("player1","player1.png");
var player2 = new Player("player2", "player2.png");

var bean = new Weapond("bean", "senzu_bean.png", 20);
var sword = new Weapond("sword", "sword.png", 30);
var pole = new Weapond("pole", "pole.png", 40);
var ball = new Weapond("ball", "dragon_ball.png", 50);

/* Set Positions of each objects*/
block.setPosition();
player1.setPosition();
player2.setPosition();
bean.setPosition();
sword.setPosition();
pole.setPosition();
ball.setPosition();

