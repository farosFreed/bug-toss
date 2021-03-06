import Phaser from 'phaser'

//1 for 100% scale
const scale = 3.5

export default class BigDemon extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame)

        this.anims.play('big-demon-idle')
    }

    //burp animation
    usePowerUp(){
        this.anims.play('wolf-attack', true)
    }

    //death animation
    death(){
        //this.anims.play('')
    }

    //animate character based on cursor
    update(cursors){
        super.update(cursors)

        const speed = 350

        //if left go left
        if (cursors.left.isDown){
            this.setVelocity(-speed, 0)
            this.anims.play('big-demon-run', true)
            this.scaleX  = -scale //flip sprite - we are already at 4x scale so we use -4
            this.body.offset.x = 52 //offset hitbox
        } else if (cursors.right.isDown){ //if right go right
            this.setVelocity(speed, 0)
            this.anims.play('big-demon-run', true)
            this.scaleX  = scale //flip sprite back
            this.body.offset.x = 15
        } else {
            this.setVelocityX(0)
            this.anims.play('big-demon-idle', true)
        }
        //otherwise idle
    }
}

//register faune key with gameobjectfactory
Phaser.GameObjects.GameObjectFactory.register('bigdemon', function(x,y,texture,frame){
    const self = this

    //get the logic from the physics/arcade/factory/sprite class in phaser
    var sprite = new BigDemon(self.scene,x,y,texture,frame)
    sprite.setScale(scale)
    
    //remove sys
    self.displayList.add(sprite)
    self.updateList.add(sprite)

    self.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    //now we can change our body size!
    sprite.body.setSize(sprite.width * .50, sprite.height * .30)

    return sprite
})