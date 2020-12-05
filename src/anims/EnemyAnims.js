import Phaser from 'phaser'

const createEnemyAnims = (anims) => {
    //idle 
    anims.create({
        key: 'chort-idle',
        frames: anims.generateFrameNames('chort', {start:0, end:3, prefix:'chort_idle_anim_f', suffix: '.png'}),
        repeat: -1,
        frameRate: 12
    })

    //run
    anims.create({
        key: 'chort-run',
        frames: anims.generateFrameNames('chort', {start:0, end:3, prefix:'chort_run_anim_f', suffix: '.png'}),
        repeat: -1,
        frameRate: 12
    })
}

export {
    createEnemyAnims
}