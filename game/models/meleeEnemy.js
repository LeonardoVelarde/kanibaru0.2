function MeleeEnemy(initialx, initialy, moveRange, direction, speed){
  var sprite;

  // ---------- RENDER ----------
  sprite = game.add.sprite(initialx, initialy, 'ghost');
  game.physics.arcade.enable(sprite);
  sprite.animations.add('walking', [0, 1, 2], 5, true);
  sprite.animations.play('walking');
  // ---------- RENDER ----------

  // --------- MOBILITY ---------
  this.initialx = initialx
  this.initialy = initialy
  this.moveRange = moveRange

  this.direction = direction;
  if(direction === 'vertical'){
    sprite.body.velocity.y = speed;
  }
  else{
    sprite.body.velocity.x = speed;
  }
  // --------- MOBILITY ---------

  sprite.health = 15;

  sprite.events.onKilled.add((function() {
    return this.destroy();
  }), sprite);
  this.sprite = sprite;
}

MeleeEnemy.prototype.changeDirection = function(axis){
  if(this.sprite[axis] > this['initial' + axis] + this.moveRange){
    this.sprite[axis] -= 1;
    this.sprite.body.velocity[axis] *= -1;
  }

  if(this.sprite[axis] < this['initial' + axis]){
    this.sprite[axis] += 1;
    this.sprite.body.velocity[axis] *= -1;
  }
}

MeleeEnemy.prototype.update = function(){
  if(this.direction === 'vertical'){
    this.changeDirection('y');
  }
  else{
    this.changeDirection('x');
  }
}
