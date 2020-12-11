import Phaser, { Animations } from 'phaser'

const createCharacterAnims = (anims) => {
    //add animations to main character sprite
    //idle
    anims.create({
        key:'big-demon-idle', 
        //frames: anims.generateFrameNames('big-demon',{start:0, end:3, prefix:'big_demon_idle_anim_f', suffix:'.png'}),
        frames: anims.generateFrameNames('wolf',{start:0, end:11, prefix:'WolfIdle_', suffix:'.png'}),
        repeat: -1,
        frameRate: 12
    })
    //run-side
    anims.create({
        key: 'big-demon-run',
        frames: anims.generateFrameNames('wolf',{start:0, end:7, prefix:'WolfRun_', suffix:'.png'}),
        repeat: -1,
        frameRate: 12
    })
    //attack
    //wolf sprite only
    anims.create({
        key: 'wolf-attack',
        frames: anims.generateFrameNames('wolf-attack',{start:0, end:15, prefix:'WolfAttack_', suffix:'.png'}),
        frameRate: 12
    })
}

export {
    createCharacterAnims
}