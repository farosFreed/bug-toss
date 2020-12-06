import Phaser from 'phaser'

export default class EndScene extends Phaser.Scene 
{
    constructor(){
        super('end-scene')
        this.score = undefined
    }

    init(data){
        this.score = data.score
    }
    create(){
        //get our score to display nicely
        const scoreDisplay = '' + this.score + ' foods eaten'

        //delay a few seconds
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                const scoreText = this.add.text(300,200, scoreDisplay, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize:40 })
            }
        })
    }
}