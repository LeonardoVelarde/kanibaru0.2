States.Sandbox = {
	create: function(){
    game.duke = DukeSingleton.getInstance();
		game.duke.load();

		this.rangedEnemy = new RangedEnemy(100, 300, 'Down', 1);

		// ----- TESTED OBJECTS -----
		// this.obstacle = this.game.add.sprite(100, 100, 'obstacle');
		// this.physics.arcade.enable(this.obstacle);
		// this.obstacle.body.immovable = true;
		// this.enemy = new MeleeEnemy(100, 200, 50, 'vertical', 30);
		// this.physics.arcade.enable(this.enemy.sprite);
		// ----- TESTED OBJECTS -----
	},
	update: function(){
		// game.physics.arcade.collide(game.duke.colliderSprite, this.obstacle, function(duke, obstacle){
		// 	game.duke.health -= 5;
		// });
		//
		// game.physics.arcade.overlap(game.duke.colliderSprite, this.enemy.sprite, function(duke, meleeEnemy){
		// 	meleeEnemy.health--;
		// 	if(meleeEnemy.health <= 0){
		// 		meleeEnemy.kill();
		// 	}
		// });

		game.duke.update();
		this.rangedEnemy.update();
		if(game.duke.health <= 0){
			this.state.start('Test');
		}
	}
};
