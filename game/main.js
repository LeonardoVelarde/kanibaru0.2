var Game, game;

Game = {
  States: States
};

window.game = game = new Phaser.Game(900, 650, Phaser.AUTO, '');

game.state.add('Boot', Game.States.Boot);
game.state.add('Sandbox', Game.States.Sandbox);
game.state.add('Test', Game.States.Test);

game.state.start('Boot');
