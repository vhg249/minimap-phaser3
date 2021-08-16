var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
        }
    },
    scene: [Minimap],

}

class Game extends Phaser.Game{

}

var game = new Phaser.Game(config);


