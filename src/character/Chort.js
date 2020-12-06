import Phaser from 'phaser'

export default class Chort extends Phaser.Physics.Arcade.Sprite
{
    //movement vars
    #left = undefined //initial facing direciton
    #moveChangeEvent = undefined //event every few seconds that might change our direction

    //bug vars
    #bugs = undefined
    #bugDrop = undefined

    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame)
        //this.bugs = undefined //Phaser.Physics.Arcade.GROUP //yes, we have no bug group yet

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

        //create a #bugDrop event every .5 secs
        this.#bugDrop = scene.time.addEvent({
            delay: 500,
            callback: () => {
                if (this.#bugs == undefined){
                    return //if no bugs yet, do nothing
                }
                //else make a bug from array
                const bugs = [
                    {frame: 'Apple-good.png', gravity:50},
                    {frame: 'Beer-bad.png', gravity:225},
                    {frame: 'DragonFruit-good.png', gravity:100},
                    //{frame: 'Eggplant-good.png', gravity:200},
                    {frame: 'Peach-good.png', gravity:50},
                    {frame: 'MelonWater-good.png', gravity:100},
                    {frame: 'Whiskey-bad.png', gravity:175},
                    {frame: 'Strawberry-good.png', gravity:50},
                    {frame: 'Pineapple-good.png', gravity:100},
                    {frame: 'Turnip-good.png', gravity:175},
                    {frame: 'Tomato-good.png', gravity:150},
                    {frame: 'Moonshine-bad.png', gravity:250}
                ]
                
                const randNum = Phaser.Math.Between(0,bugs.length - 1)

                //spawn it slightly below chorts location and add to #bugs group
                const bug = this.#bugs.get(this.x, this.y + 60, 'foods', bugs[randNum].frame)
                bug.setScale(2)
                bug.setVelocityY(bugs[randNum].gravity)
            },
            loop:true
        })
    }

    //movement 
    toggleDirection(){
        //toggle direction
        this.#left = !this.#left 
    }

    //bugs
    setBugs(bugs){
        this.#bugs = bugs
    }
    getBugs(){
        return this.#bugs
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

//register faune key with gameobjectfactory
Phaser.GameObjects.GameObjectFactory.register('chort', function(x,y,texture,frame){
    const self = this

    //get the logic from the physics/arcade/factory/sprite class in phaser
    var sprite = new Chort(self.scene,x,y,texture,frame)
    sprite.setScale(3)
    
    //remove sys
    self.displayList.add(sprite)
    self.updateList.add(sprite)

    self.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    //now we can change our body size!
    //sprite.body.setSize(sprite.width * .75, sprite.height * .9)
    sprite.body.onCollide = true
    sprite.body.collideWorldBounds = true

    return sprite
})