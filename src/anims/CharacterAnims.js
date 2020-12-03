import Phaser, { Animations } from 'phaser'

const createCharacterAnims = (anims) => {
    //add animations to main character sprite
    //idle
    anims.create({
        key:'big-demon-idle', 
        frames: anims.generateFrameNames('big-demon',{start:0, end:3, prefix:'big_demon_idle_anim_f', suffix:'.png'}),
        repeat: -1,
        frameRate: 12
    })
    //run-side
    anims.create({
        key: 'big-demon-run',
        frames: anims.generateFrameNames('big-demon',{start:0, end:3, prefix:'big_demon_run_anim_f', suffix:'.png'}),
        repeat: -1,
        frameRate: 12
    })
    //eat ?
    /*anims.create({
        key: 'faune-faint',
        frames: anims.generateFrameNames('faune',{start:1, end:4, prefix:'faint-', suffix:'.png'}),
        frameRate: 15
    })*/
}

export {
    createCharacterAnims
}