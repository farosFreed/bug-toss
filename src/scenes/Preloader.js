import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene 
{
    constructor()
    {
        super('preloader') //set scene key
    }

    preload()
    {
        //load scene assets
        this.load.image('background', 'assets/bugtossbg.png')
        this.load.image('ground', 'assets/clear_platform.png')

        //load character assets
        this.load.atlas('big-demon', 'characters/big-demon/big-demon.png', 'characters/big-demon/big-demon.json')
        this.load.atlas('chort', 'characters/chort/chort.png', 'characters/chort/chort.json')

        //load bug assets
        this.load.atlas('foods', 'items/foods.png', 'items/foods.json')
    }

    create(){
        //run the game scene after this scene has preloaded
        this.scene.start('game-scene')
    }

}