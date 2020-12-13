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
        const winDisplay = 'You Won!'
        const musicCredit = 'music by bramd | opengameart.org/content/swing-along'

        //delay a few seconds
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                const scoreText = this.add.text(300,200, scoreDisplay, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize:40 })
                const credits = this.add.text(285,575,musicCredit)
                if (this.score >= 100){
                    const winText = this.add.text(300,250, winDisplay, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize:60})
                }

            }
        })
    }
}