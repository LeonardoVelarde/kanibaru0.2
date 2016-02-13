function Projectile(x, y, movementAxis, direction){
  var sprite;
  sprite = game.add.sprite(x + 18, y + 10, 'bullet');
  game.physics.arcade.enable(sprite);
  sprite.body.velocity[movementAxis] = 150 * direction;
  sprite.checkWorldBounds = true;
  sprite.outOfBoundsKill = true;
  sprite.events.onKilled.add((function() {
    return this.destroy();
  }), sprite);
  this.sprite = sprite;
}
