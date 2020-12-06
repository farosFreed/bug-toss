import Phaser, { Animations } from 'phaser'

const createbugAnims = (anims) => {
    //good bugs
    anims.create({
        key:'apple',
        frames: [{ key:'foods', frame:'Apple-good.png'}]
    })
    anims.create({
        key:'avocado',
        frames: [{ key:'foods', frame:'Avocado-good.png'}]
    })

    //bad bugs
    //closed chest, static
    /*anims.create({
        key:'chest-closed',
        frames: [{ key:'treasure', frame:'chest_empty_open_anim_f0.png'}]
    })*/
}

export {
    createbugAnims
}