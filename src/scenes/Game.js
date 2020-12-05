import Phaser from 'phaser'

import { createCharacterAnims } from '../anims/characterAnims'
import { createEnemyAnims } from '../anims/EnemyAnims'

import BigDemon from '../character/BigDemon'
import Chort from '../character/Chort'

export default class GameScene extends Phaser.Scene
{
	constructor()
	{
        super('game-scene')
        
        this.cursors = undefined
        this.player = undefined
        this.chort = undefined
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
        createEnemyAnims(this.anims)

        //add player & collisions
        this.player = this.add.bigdemon(400,510,'big-demon')
        this.physics.add.collider(this.player, platforms)
        this.player.body.collideWorldBounds=true

        //add chort and collisions
        //use a group to set the object type
        const chortgrp = this.physics.add.group({classType:Chort})
        this.chort = chortgrp.get(400, 100, 'chort')
        this.physics.add.collider(chortgrp, platforms)
        this.chort.setScale(3)
        this.chort.body.onCollide = true
        this.chort.body.collideWorldBounds=true
    }

    update()
    {
        //turn chort if he hits the edge
        if (this.chort.body.blocked.left || this.chort.body.blocked.right) {
            this.chort.toggleDirection()
        }
        //if player loaded
        if (this.player){
            //pass cursor keys to character
            this.player.update(this.cursors)
        }
    }
}
