import Phaser from 'phaser'

export default class Chort extends Phaser.Physics.Arcade.Sprite
{
    #left = undefined //initial facing direciton
    #moveChangeEvent = undefined //event every few seconds that might change our direction

    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame)

        this.anims.play('chort-idle')

        //create a #moveChangeEvent every 2 secs that might change direction
        this.#moveChangeEvent = scene.time.addEvent({
            delay: 1000,
            callback: () => {
                //get a random number 0 or 1 and update the value of #left 
                const coinFlip = Phaser.Math.Between(0,1)
                if (coinFlip > 0 ){
                    this.#left = true //go left
                } else {
                    this.#left = false //go right
                }
            },
            loop:true
        })
    }

    toggleDirection(){
        //toggle direction
        this.#left = !this.#left 
    }

    preUpdate(t,dt)
    {
        super.preUpdate(t,dt)

        if (this.#left == undefined){
            return //do nothing at first
        }

        //update character direction based on value of #left
        if (this.#left){
            this.setVelocityX(-200)
        } else {
            this.setVelocityX(200)
        }
    }
}