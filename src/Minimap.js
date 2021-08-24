class Slot extends Phaser.Geom.Rectangle{
    constructor(game){
        super(game);
        this.game = game;

        this.x = config.width - 250;
        this.y = 100;
        this.width =  500;
        this.height = 200;

        this.reactagle = '';
        this.reactagle = this.game.add.rectangle(this.x, this.y, this.width, this.height, 0x6666ff);
        this.reactagle.setScrollFactor(0, 0);
        
        this.setVisible
    }

    setVisible(){
        this.reactagle.visible = false
        console.log('adasdsadsass');
    }

    preload(){

    }

    create(){
    }

    update(){
        
    }
}

class AlignGrid {
    constructor(configGrid) {
        
        if(!configGrid.scene){
            console.log('missing scene');
            return;
        }
        this.h = configGrid.height;
        this.w = configGrid.width;
        this.rows = configGrid.rows;
        this.cols = configGrid.cols;
        this.scene = configGrid.scene;
        this.visible = false;

        this.cellWidth = this.w / this.cols;
        this.cellHeight = this.h / this.rows;

        this.slot = this.scene.add.image(config.width-260, 110, 'rectangle');
        this.slot.setScrollFactor(0, 0);
        this.scene.minimap.ignore(this.slot)

        console.log('slot', this.slot);
    }
     
    show(){
        console.log('show grid');
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(4, 0xffffff, 1);
        this.graphics.x = this.slot.x-250;
        this.graphics.y = this.slot.y-100;

        for (let i = 0; i <= this.w; i += this.cellWidth) {
            console.log(this.cols);
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.h);
        }
        for (let i = 0; i <= this.h; i += this.cellHeight) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.w, i);
        }
        this.graphics.strokePath();
        console.log('graphic', this.graphics);
        
        this.graphics.setScrollFactor(0,0);
        this.scene.minimap.ignore(this.graphics)
    }

    click(){
        if(this.visible){
            this.slot.visible = false;
            this.graphics.visible = false;
        }
        else{
            this.slot.visible = true;
            this.graphics.visible = true;
        }
        this.visible = !this.visible;
    }

    placeAt(xx, yy, obj){
        let x2 = this.cellWidth * xx + this.cellWidth / 2 + this.graphics.x;
        let y2 = this.cellHeight * yy + this.cellHeight/2 + this.graphics.y;
        obj.x = x2;
        obj.y = y2;
        obj.displayWidth = this.cellWidth;
        obj.scaleY = obj.scaleX;
    }
}

class Skills{
    constructor(scene){
        this.scene = scene;

        this.skill1 = this.scene.add.image(30, config.height - 30, 'skill1').setScrollFactor(0, 0);
        this.skill2 = this.scene.add.image(this.skill1.x + +this.skill1.width + 10, config.height - 30, 'skill2').setScrollFactor(0, 0)
        this.skill3 = this.scene.add.image(this.skill2.x + +this.skill2.width + 10, config.height - 30, 'skill3').setScrollFactor(0, 0)
        this.skill4 = this.scene.add.image(this.skill3.x + +this.skill3.width + 10, config.height - 30, 'skill4').setScrollFactor(0, 0)

        this.keys = this.scene.input.keyboard.addKeys('Q,W,E,R');
        console.log('input', this.keys);
    }

    activeSkill1(){
        console.log('active 1');
        if(this.alpha !== 1) this.setAlpha(1)
    }
    activeSkill2(){
        console.log('active 2');
        if(this.skill2.alpha !== 1) this.skill2.setAlpha(1)
    }

    update(){
        if(this.keys.Q.isDown) {
            this.skill1.setAlpha(0.5);
            this.scene.time.addEvent({ delay: 3000, callback: this.activeSkill1, callbackScope: this.skill1});
        } 
        if(this.keys.W.isDown){
            this.skill2.setAlpha(0.5);
            this.scene.time.addEvent({ delay: 3000, callback: this.activeSkill2, callbackScope: this});
        }
    }
}

class Leaderboard {
    constructor(scene){
        this.scene = scene;
        
        let titleStyle = {
            fill: '#ffffff', 
            strokeThickness: 1, 
            fontSize: "26px",
            align: "center",
            fontFamily: "Arial"
        }
        let listStyle = {
            fill: '#ffffff', 
            fontSize: "18px",
            fontFamily: "Arial",
            tabs: 200
        }
        this.title = this.scene.add.text(10, 10, 'Leaderboard', titleStyle);
        console.log('title', this.title.style);
        this.list = this.scene.add.text(10, 50, '', listStyle);

        this.top = [
            {
                name: 'aaa',
                score: 10000
            },
            {
                name: 'bbb',
                score: 9000
            },
            {
                name: 'ccadsc',
                score: 8000
            },
        ]

        let str = [];
        for(let i in this.top){
            let tmp = '#' + i + '\t' + this.top[i].name + '\t' + this.top[i].score + '\n';
            str.push(tmp)
        }
        console.log(str);
        // this.list.setText(str)
        let text = this.scene.add.text(100, 64, "#1\tSpells\t10000", listStyle);
        let text1 = this.scene.add.text(100, 84, "#1\tasdadadsa\t10000", listStyle);
        console.log(text);
        
    }
}

class Minimap extends Phaser.Scene
{
    constructor (){
        super('Minimap');
    }

    preload (){
        this.load.image('background', '../assets/background.jpg');
        this.load.image('snake', '../assets/snake.png');
        this.load.image('circle', '../assets/circle.png');
        this.load.image('rectangle', '../assets/Rectangle.png');
        this.load.image('skill1', '../assets/skill1.png');
        this.load.image('skill2', '../assets/skill2.png');
        this.load.image('skill3', '../assets/skill3.png');
        this.load.image('skill4', '../assets/skill4.png');
        this.load.html('nameform', './login.html');
    }

    create(){
        this.matter.world.setBounds(0, 0, 3000, 1000);
        this.cameras.main.setBounds(0, 0, 3000, 1000).setName('main');

        this.minimap = this.cameras.add(config.width - 200, config.height-200, 200, 200).setZoom(0.05).setName('mini');
        this.minimap.setBackgroundColor(0x002244);
        this.minimap._scrollX = 1600;
        this.minimap._scrollY = 450;

        this.background = this.add.tileSprite(0, 0, 3000, 1000, 'background');
        this.background.setOrigin(0,0)

        this.player = this.matter.add.sprite(0, 200, 'snake').setFixedRotation().setFrictionAir(0.05)
        this.player.setScale(0.1);
        console.log('snake', this.player);

        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.minimap.scrollY = 400;
        console.log(this.minimap);

        var gridConfig = {
            'scene': this,
            'cols': 10,
            'rows': 4,
            'height': 200,
            'width': 500
        }

        this.aGrid = new AlignGrid(gridConfig);
        this.aGrid.show();
        console.log('grid', this.aGrid);
        this.rightClick(this.aGrid);

        this.cirle = this.matter.add.image(0,0, 'circle');
        this.cirle.setScale(1.5)
        this.aGrid.placeAt(2, 2, this.cirle)

        this.skills = new Skills(this)

        this.form = this.add.dom(400, 600).createFromCache('nameform');

        this.leaderboard = new Leaderboard(this);
    }

    update(){
        this.skills.update()
        
        if (this.cursors.left.isDown)
        {
            this.player.thrustBack(0.1);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.thrust(0.1);
            this.player.flipX = false;
        }
        if (this.cursors.up.isDown)
        {
            this.player.thrustLeft(0.1);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.thrustRight(0.1);
        }
        
        this.minimap.scrollX = Phaser.Math.Clamp(this.player.x , 400, 2400);

        // this.input.on('pointermove', function (point){
        //     console.log(point.worldX, point.worldY);
        // })
    }

    rightClick(slot){
        this.input.mouse.disableContextMenu();

        this.input.on('pointerdown', function (pointer){
            if(pointer.rightButtonDown()){
                console.log('haha');
                console.log(slot);
                
                slot.click()
            }
        })
    }
}


