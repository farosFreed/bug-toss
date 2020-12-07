import Phaser from 'phaser'

//scenes
import Preloader from './scenes/Preloader'
import GameScene from './scenes/Game'
import EndScene from './scenes/End'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: false
		}
	},
	scene: [Preloader, GameScene, EndScene]
}

export default new Phaser.Game(config)
