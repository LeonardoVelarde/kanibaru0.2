function RangedEnemy(initialx, initialy, direction, shootsPerSecond){
  var sprite;

  // ---------- RENDER ----------
  sprite = game.add.sprite(initialx, initialy, 'bat');
  game.physics.arcade.enable(sprite);
  sprite.animations.add('walking', [0, 1, 2], 5, true);
  sprite.animations.play('walking');
  // ---------- RENDER ----------

  // --------- SHOOTING ---------
  this.firingRate = 1000 / shootsPerSecond;
  this.lastShotAt = 0;
  var axis, direction;
  switch (configurationObject.directionArray.indexOf(direction)) {
    //Up=0; Down=1; Left=2; Right=3
    case 0: axis = 'y'; direction = -1 ; break;
    case 1: axis = 'y'; direction = 1 ; break;
    case 2: axis = 'x'; direction = -1 ; break;
    case 3: axis = 'x'; direction = 1 ; break;
  }
  this.axis = axis;
  this.direction = direction;
  // --------- SHOOTING ---------

  sprite.health = 15;

  sprite.events.onKilled.add((function() {
    return this.destroy();
  }), sprite);
  this.sprite = sprite;
}

RangedEnemy.prototype.timeSinceLastShot = function() {
  return (new Date().getTime() - this.lastShotAt);
};

RangedEnemy.prototype.canShoot = function() {
  return this.timeSinceLastShot() > this.firingRate;
};

RangedEnemy.prototype.shoot = function() {
  this.lastShotAt = new Date().getTime();
  new Projectile(this.sprite.body.x, this.sprite.body.y, this.axis, this.direction);
};

RangedEnemy.prototype.update = function () {
  if(this.canShoot()){
    this.shoot();
  }
};
