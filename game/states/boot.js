var States = {};

States.Boot = {
	preload: function(){
		// ------- DUKE -------
		this.game.load.spritesheet('normalHead', 'assets/images/duke/normalHeadSheet.png', 87, 130);
		this.game.load.spritesheet('normalTorso', 'assets/images/duke/normalTorsoSheet.png', 87, 130);
		this.game.load.spritesheet('normalLegs', 'assets/images/duke/normalLegsSheet.png', 87, 130);
		this.game.load.image('dukeCollider', 'assets/images/duke/collider.png');
		// ------- DUKE -------

		// ------- TEST -------
		this.game.load.image('obstacle', 'assets/images/duke/collider.png');
		// ------- TEST -------

		// ------- ENEMIES -------
		this.game.load.spritesheet('ghost', 'assets/images/melee-enemy/ghost.png', 64, 64);
		this.game.load.spritesheet('bat', 'assets/images/melee-enemy/bat.png', 64, 64);
		// ------- ENEMIES -------

		// ------ ITEMS ------
		this.game.load.image('bullet', 'assets/images/projectiles/stone.png');
		// ------ ITEMS ------
	},
	create: function(){
		this.state.start('Sandbox');
	}
};
