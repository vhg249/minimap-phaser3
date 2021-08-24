var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x161c22,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
        }
    },
    parent: 'login',
    dom: {
        createContainer: true
    },
    scene: [Minimap],

}

class Game extends Phaser.Game{

}

var game = new Phaser.Game(config);


