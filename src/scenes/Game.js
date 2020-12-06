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
        this.bugs = undefined

        this.score = 0
        this.gameOver = false
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
        //slightly lower platform for collisions with dropped items
        const ground = platforms.create(400,619,'ground')

        //create anims before adding characters
        createCharacterAnims(this.anims)
        createEnemyAnims(this.anims)
        //createbugAnims(this.anims)

        //add player & collisions
        this.player = this.add.bigdemon(400,510,'big-demon')
        this.physics.add.collider(this.player, platforms)
        this.player.body.collideWorldBounds=true

        //create bugs for chort
        this.bugs = this.physics.add.group()
        //add chort and collisions
        this.chort = this.add.chort(400, 140,'chort')
        //this.physics.add.existing(this.chort)

        this.physics.add.collider(this.chort, platforms)
        this.chort.setBugs(this.bugs) //pass bugs group to chort, chort makes bugs in group
        this.physics.add.collider(this.bugs, this.player, this.handleBugPlayerCollision, undefined, this) //add collider for bugs and player
        this.physics.add.collider(this.bugs, ground, this.handleBugGroundCollision, undefined, this) //add collider for bugs and ground
    }

    handleBugPlayerCollision(obj1, obj2){
        //when bug hits player
        const bug = obj2
        const parts = bug.anims.parent.frame.name.split('-')
        //gameover if bad bug hits player
        if (parts[1] == 'bad.png')
        {
        this.gameOver = true
        return
        }
        //else, destroy bug and increase score
        this.score++
        this.bugs.killAndHide(obj2) 
        this.bugs.remove(obj2)//remove the physics body to prevent errors
        console.log(this.score)
    }

    handleBugGroundCollision(obj1, obj2){
        //when bug hits ground
        const bug = obj2
        const parts = bug.anims.parent.frame.name.split('-')
        //gameover if good bug hits ground
        if (parts[1] == 'good.png')
        {
        this.gameOver = true
        return
        } 
        //else, destroy bug
        this.bugs.killAndHide(obj2) 
        this.bugs.remove(obj2)//remove the physics body to prevent errors

    }

    update()
    {
        //if game over
        if (this.gameOver){
            //transition to end scene over 1 second and pass the value of our score
            this.scene.transition({target:'end-scene', duration:2000, data:{score:this.score}, moveAbove:true, remove:true})
            //stop physics and take away chorts bugs
            this.physics.pause()
            this.chort.setBugs(undefined)
        } else {
            //turn chort if he hits the world edge
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
}
