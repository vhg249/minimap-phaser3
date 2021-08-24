class Login extends Phaser.Scene{
    constructor(){
        super('Login')
    }

    preload(){
        this.load.html('nameform', './login.html');
        this.load.image('snake', '../assets/circle.png');
    }

    create(){
        let x = this.cameras.main.worldView.x+ this.cameras.main.width / 2;
        let y = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        localStorage.setItem('username', '');

        this.form = this.add.dom(x, y).createFromCache('nameform');

        this.form.addListener('click');
        this.form.on('click', function(e) {
            if(e.target.name === 'playBtn'){
                let inputText = this.getChildByName('usernameField').value
                console.log(inputText);
                if(inputText !== ''){
                    localStorage.setItem('username', inputText);
                    this.scene.scene.start('Minimap')
                }
            }
        })
    }
}