function Duke(game){
	this.game = game;
	this.health = 100;
	this.headSprite = null;
	this.torsoSprite = null;
	this.legsSprite = null;
	this.colliderSprite = null;
	this.speed = 350;
	this.headAnimation = 'normalHead';
	this.torsoAnimation = 'normalTorso';
	this.legsAnimation = 'normalLegs';
	this.direction = 'Down';
	this.arrowKeys = null;
	this.stopped = true;
	this.canMove = true;
}

var configurationObject = {
	initialPosition: { x: 10, y: 230 },
	colliderPositionDifference: {x: 22, y: 15},
	directionArray: ['Up', 'Down', 'Left', 'Right']
};

Duke.prototype.boot = function(){
	this.cursors = this.game.input.keyboard.createCursorKeys();
}

Duke.prototype.getDirectionIndex = function(){
	return configurationObject.directionArray.indexOf(this.direction);
}

Duke.prototype.render = function(){
	// load sprites
	this.colliderSprite = this.game.add.sprite(configurationObject.initialPosition.x + configurationObject.colliderPositionDifference.x, configurationObject.initialPosition.y, 'dukeCollider');
	this.headSprite = this.game.add.sprite(configurationObject.initialPosition.x, configurationObject.initialPosition.y, 'normalHead');
	this.torsoSprite = this.game.add.sprite(configurationObject.initialPosition.x, configurationObject.initialPosition.y, 'normalTorso');
	this.legsSprite = this.game.add.sprite(configurationObject.initialPosition.x, configurationObject.initialPosition.y, 'normalLegs');

	// set sprite properties
	// this.colliderSprite.alpha = 0; // uncomment this last

	this.game.physics.arcade.enable(this.colliderSprite);
	this.game.physics.arcade.enable(this.headSprite);
	this.game.physics.arcade.enable(this.torsoSprite);
	this.game.physics.arcade.enable(this.legsSprite);

	game.input.keyboard.onUpCallback = function(key){
		if(key.keyCode == Phaser.Keyboard.SPACEBAR){
			var axis, direction;
			switch (game.duke.getDirectionIndex()) {
				//Up=0; Down=1; Left=2; Right=3
				case 0: axis = 'y'; direction = -1 ; break;
				case 1: axis = 'y'; direction = 1 ; break;
				case 2: axis = 'x'; direction = -1 ; break;
				case 3: axis = 'x'; direction = 1 ; break;
			}
			new Projectile(game.duke.colliderSprite.body.x, game.duke.colliderSprite.body.y, axis, direction);
		}
	}
};

Duke.prototype.addAnimations = function () {
	this.headSprite.animations.add(this.headAnimation + 'Left', [0], 1, true);
	this.headSprite.animations.add(this.headAnimation + 'Right', [1], 1, true);
	this.headSprite.animations.add(this.headAnimation + 'Up', [2], 1, true);
	this.headSprite.animations.add(this.headAnimation + 'Down', [3], 1, true);

	this.torsoSprite.animations.add(this.torsoAnimation + 'Left', [9, 10, 9, 11], 10, true);
	this.torsoSprite.animations.add(this.torsoAnimation + 'Right', [3, 4, 3, 5], 10, true);
	this.torsoSprite.animations.add(this.torsoAnimation + 'Up', [0, 1, 0, 2], 10, true);
	this.torsoSprite.animations.add(this.torsoAnimation + 'Down', [6, 7, 6, 8], 10, true);

	this.legsSprite.animations.add(this.legsAnimation + 'Left', [9, 10, 9, 11], 10, true);
	this.legsSprite.animations.add(this.legsAnimation + 'Right', [3, 4, 3, 5], 10, true);
	this.legsSprite.animations.add(this.legsAnimation + 'Up', [0, 1, 0, 2], 10, true);
	this.legsSprite.animations.add(this.legsAnimation + 'Down', [6, 7, 6, 8], 10, true);
}

Duke.prototype.load = function(){
	this.boot();
	this.render();
	this.addAnimations();
}

Duke.prototype.startAnimation = function(){
	this.headSprite.play(this.headAnimation + this.direction);
	this.torsoSprite.play(this.torsoAnimation + this.direction);
	this.legsSprite.play(this.legsAnimation + this.direction);
}

Duke.prototype.stopAnimation = function(direction){
	this.headSprite.animations.stop();
	this.torsoSprite.animations.stop();
	this.legsSprite.animations.stop();

	switch (this.getDirectionIndex()) {
		//Up=0; Down=1; Left=2; Right=3
		case 2:
			this.headSprite.frame = 0;
			this.torsoSprite.frame = 9;
			this.legsSprite.frame = 9;
			break;
		case 3:
			this.headSprite.frame = 1;
			this.torsoSprite.frame = 3;
			this.legsSprite.frame = 3;
			break;
		case 0:
			this.headSprite.frame = 2;
			this.torsoSprite.frame = 0;
			this.legsSprite.frame = 0;
			break;
		case 1:
			this.headSprite.frame = 3;
			this.torsoSprite.frame = 6;
			this.legsSprite.frame = 6;
			break;
	}
}

Duke.prototype.stop = function(){
	this.stopped = true;
	this.colliderSprite.body.velocity.x = 0;
	this.colliderSprite.body.velocity.y = 0;

	this.headSprite.body.velocity.y = 0;
	this.headSprite.body.velocity.x = 0;

	this.torsoSprite.body.velocity.y = 0;
	this.torsoSprite.body.velocity.x = 0;

	this.legsSprite.body.velocity.y = 0;
	this.legsSprite.body.velocity.x = 0;
}

Duke.prototype.moveVertically = function(speed){
	this.stopped = false;
	this.colliderSprite.body.velocity.y = speed;
}

Duke.prototype.moveHorizontally = function(speed){
	this.stopped = false;
	this.colliderSprite.body.velocity.x = speed;
}

Duke.prototype.setBodyPosition = function(x, y){
	this.headSprite.x = x;
	this.headSprite.y = y;
	this.torsoSprite.x = x;
	this.torsoSprite.y = y;
	this.legsSprite.x = x;
	this.legsSprite.y = y;
}

Duke.prototype.handleMovement = function(){
	this.stop();

	if (this.cursors.up.isDown){
		this.direction = "Up";
		this.moveVertically(-this.speed);
	}
	else if (this.cursors.down.isDown){
		this.direction = "Down";
		this.moveVertically(this.speed);
	}

	if (this.cursors.left.isDown){
		this.direction = "Left";
		this.moveHorizontally(-this.speed);
	}
	else if (this.cursors.right.isDown){
		this.direction = "Right";
		this.moveHorizontally(this.speed);
	}

	if(this.stopped){
		this.stopAnimation();
	}
	else{
		this.startAnimation();
	}

	this.setBodyPosition(this.colliderSprite.x - configurationObject.colliderPositionDifference.x, this.colliderSprite.y - configurationObject.colliderPositionDifference.x);
}

Duke.prototype.update = function(){
	this.handleMovement();
}

var DukeSingleton = (function(){
	var instance;

	function createInstance(){
		var instance = new Duke(window.game);
		return instance;
	}

	return {
			getInstance: function(){
				if(!instance){
					instance = createInstance();
				}
				return instance;
			}
	}
})();
