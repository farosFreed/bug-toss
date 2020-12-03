import Phaser from 'phaser'

import { createCharacterAnims } from '../anims/characterAnims'

import BigDemon from '../character/BigDemon'

export default class GameScene extends Phaser.Scene
{
	constructor()
	{
        super('game-scene')
        
        this.cursors = undefined
        this.player = undefined
	}

	preload()
    {
        //get the cursors
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
        //background set
        this.add.image(400, 300, 'background')

        //create platforms
        const platforms = this.physics.add.staticGroup()
        platforms.create(400,225,'ground')
        platforms.create(400,600,'ground')

        //create anims before adding characters
        createCharacterAnims(this.anims)

        //add player
        this.player = this.add.bigdemon(400,510,'big-demon')

        //add collisions
        this.physics.add.collider(this.player, platforms)


        /*const particles = this.add.particles('red')

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        })

        const logo = this.physics.add.image(400, 100, 'logo')

        logo.setVelocity(100, 200)
        logo.setBounce(1, 1)
        logo.setCollideWorldBounds(true)

        emitter.startFollow(logo)*/
    }

    update()
    {
        //detect collision before player and platform before passing cursors?

        //if player loaded
        if (this.player){
            //pass cursor keys to character
            this.player.update(this.cursors)
        }
    }
}
