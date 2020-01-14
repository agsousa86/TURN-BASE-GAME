/*  Range of Movement   */
Player.prototype.setRange = function(currentPostion) {
  $("div#mapgen > div").removeClass('range2');

  rX=[]; // porque estao aqui estas duas arrays
  rY=[];

  let up = currentPostion - 10;
  let down= currentPostion + 10;
  let left = currentPostion -1;
  let right = currentPostion + 1;
  let blocked = false;
  let xmin = currentPostion - currentPostion % 10;
  let xmax = xmin + 9;

  while(up >=0 && up >= currentPostion - 30) {
    blocked = false;
    let classList = $("div#"+up).attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
      if (item === 'block' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    });
    if(blocked === true){
      break;
    }else{
      $("div#" + up).addClass('range2');
      rY.push(up);
    }
    up = up - 10;

  }

  while(down <= 99 && down <= currentPostion + 30) {
    blocked = false;
    let classList = $("div#" + down).attr('class').split(/\s+/);

    $.each(classList, function(index, item) {
      if (item === 'block' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    });
    if(blocked === true){
      break;
    }else{
      $("div#" + down).addClass('range2');
      rY.push(down);
    }
    down = down + 10;
  }

  while(left >= xmin && left >= currentPostion - 3){
    blocked = false;
    let classList = $("div#" + left).attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
      if (item === 'block' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    });
    if(blocked === true){
      break;
    }else{
      $("div#" + left).addClass('range2');
      rX.push(left);
    }
    left = left - 1;
  }

  while(right <= xmax && right <= currentPostion + 3) {
    blocked = false;
    let classList = $("div#" + right).attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
      if (item === 'block' || item === 'player2' || item === 'player1') {
          blocked = true;
      }
    });
    if(blocked === true){
      break;
    }else{
      $("div#" + right).addClass('range2');
      rX.push(right);
    }
    right = right + 1;
  }

  return [rX,rY];
};

/*  Change active player   */
Player.prototype.activatePlayer = function() {
  if(this.name === 'player1'){
    activePlayer = player1;
    //animate css
    $("#imgleft1").addClass('animated bounceIn')
    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass('animated bounceIn');});

    passivePlayer = player2;
  }else{
    activePlayer = player2;
    //animate css
    $("#imgright2").addClass('animated bounceIn')
    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass('animated bounceIn');});
    passivePlayer = player1;
  }
  if (fight === false) {
    activePlayer.setRange(this.position);
  }
}

/* Move and check if the fight begins */
Player.prototype.move = function(target) {

  //parses a string and returns an integer
  target = parseInt(target);
  //cells  (array) change
  cells.splice(this.position, 1);
  cells[target] = this.name;

  // class change
  let oldbox = document.getElementById(this.position);
  oldbox.classList.remove(this.name);
  var newbox = document.getElementById(target);
  newbox.classList.add(this.name);

  //check for weapon
  let searchFrom = this.position;
  let searchTo = target;
  checkWeapon(searchFrom, searchTo, target);

  this.position = target;
  playersNearby = [target - 1, target + 1, target - 10, target + 10];

  switch(this.name) { //o que esta a fazer este switch ?
    case 'player1':
      newbox.innerHTML = '<img src="img/' + this.image + '" height="58"></img>';
      break;
    case 'player2':
      newbox.innerHTML = '<img src="img/' + this.image + '" height="58"></img>';
      break;
  }
  oldbox.innerHTML = "";

  //check for adjacents player
  $.each(playersNearby, function(index, playerNearBy) {
    if ($("#" + playerNearBy).find('img').length) {
      fight = true;
    }
  });

  if(fight === false ){
    passivePlayer.activatePlayer();  //player change

  }else{
    //fight
    rX=[]; rY=[];
    $("div#mapgen > div").removeClass('range2');
    fightButtonEnabling();
  }

};

player1.activatePlayer();  //starting player


/*  Movements   */

box.hover(function(){
    if (jQuery.inArray(parseInt(this.id), rX) >= 0 || jQuery.inArray(parseInt(this.id), rY) >= 0) {
      $(this).addClass(window.activePlayer.name + 'Moving');
    }
  }, function(){
    $(this).removeClass(window.activePlayer.name + 'Moving');
});


box.on("click", function() {
  var target = parseInt(this.id);
  if (jQuery.inArray(target, rX) >= 0 || jQuery.inArray(target, rY) >= 0) {
    box.removeClass(window.activePlayer.name+'Moving');
    activePlayer.move(target);
  }
});



/*  Change weapon  */ // esta logica n percebo mm
function checkWeapon(searchFrom, searchTo, target) {
  let diff = searchTo - searchFrom;
  let movedArr = [];
  if (diff > 0){
    if (diff <= 3){
      for(let i = searchFrom; i <= searchTo; i++){
        if (jQuery.inArray(i, rX) >= 0) {
          movedArr.push(i);
        }
      }
    }else{
      for(let i = searchFrom; i <= searchTo; i+=10){
        if (jQuery.inArray(i, rY) >= 0) {
          movedArr.push(i);
        }
      }
    }
  }else{
    if (diff >= -3){
      for(let i = searchFrom; i >= searchTo; i--){
        if (jQuery.inArray(i, rX) >= 0) {
          movedArr.push(i);
        }
      }
    }else{
      for(let i = searchFrom; i >= searchTo; i-=10){
        if (jQuery.inArray(i, rY) >= 0) {
          movedArr.push(i);
        }
      }
    }
  }
  //change weapond and damage value
  for(let j = 0; j <= movedArr.length; j++){
    let passedBox=$( "div#" + movedArr[j] );

    oldWeapon = activePlayer.weapon;

    if (passedBox.hasClass("bean")){
      newWeapon = 'bean';
      activePlayer.damage = 20;
    }else if (passedBox.hasClass("sword")){
      newWeapon = 'sword';
      activePlayer.damage = 30;
    }else if (passedBox.hasClass("pole")){
      newWeapon = 'pole';
      activePlayer.damage = 40;
    }else if (passedBox.hasClass("ball")){
      newWeapon = 'ball';
      activePlayer.damage = 50;
    }else{
      newWeapon='';
    }

    if (newWeapon!=''){
      passedBox.removeClass(newWeapon);
      passedBox.addClass(oldWeapon);
      activePlayer.weapon = newWeapon;
      $("#"+activePlayer.name + "bean").addClass('transparent');
      $("#"+activePlayer.name + "sword").addClass('transparent');
      $("#"+activePlayer.name + "pole").addClass('transparent');
      $("#"+activePlayer.name + "ball").addClass('transparent');

      $("#"+activePlayer.name + "bean").removeClass('range2');
      $("#"+activePlayer.name + "sword").removeClass('range2');
      $("#"+activePlayer.name + "pole").removeClass('range2');
      $("#"+activePlayer.name + "ball").removeClass('range2');

      $("#"+activePlayer.name + newWeapon).removeClass('range2');
      $("#"+activePlayer.name + newWeapon).addClass('range2');

      $("#"+activePlayer.name + "damage").text(activePlayer.damage);
    }
  }
}

