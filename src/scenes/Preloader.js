import Phaser from 'phaser'
//bg music in 3 diff formats
import BgMusicMp3 from '../../public/sfx/swing.mp3'
import BgMusicOgg from '../../public/sfx/swing.ogg'
import BgMusicWav from '../../public/sfx/swing.wav'
//eat sfx in 3 diff formats
import EatSfxMp3 from '../../public/sfx/eat_04.mp3'
import EatSfxOgg from '../../public/sfx/eat_04.ogg'
import EatSfxWav from '../../public/sfx/eat_04.wav'
//powerup sfx in 3 diff formats
import BurpSfxMp3 from '../../public/sfx/burp_02.mp3'
import BurpSfxOgg from '../../public/sfx/burp_02.ogg'
import BurpSfxWav from '../../public/sfx/burp_02.wav'

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

        //load sfx
        this.load.audio('bg-music', [
            BgMusicMp3,
            BgMusicOgg,
            BgMusicWav
        ])
        this.load.audio('eat', [
            EatSfxMp3,
            EatSfxOgg,
            EatSfxWav
        ])
        this.load.audio('burp', [
            BurpSfxMp3,
            BurpSfxOgg,
            BurpSfxWav
        ])
    }

    create(){
        //run the game scene after this scene has preloaded
        this.scene.start('game-scene')
    }

}