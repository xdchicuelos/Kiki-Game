import Bootloader from "./scenes/Bootloader.js";
import InicioScene from "./scenes/InicioScene.js";
import EscuelaScene from "./scenes/EscuelaScene.js";
import GlorpScene from "./scenes/GlorpScene.js";

const config = {
    title: "Curso Phaser",
    url: "http://google.es",
    version: "0.0.1",
    type: Phaser.AUTO,
    width: 2000,
    height: 1000,
    parent: "contenedor",
    pixelArt: true,
    backgroundColor: "#000000ff",
    scene: [
        Bootloader,
        InicioScene,
        EscuelaScene,
        GlorpScene
    ],
    physics: { 
        default: 'arcade', 
        'arcade': { 
            'gravity': { y: 100 },
            //debug: true
        }    
    },
    banner: {
        hidePhaser: true,
        text: "#fff00f",
        background: ["#16a085", "#2ecc71", "#e74c3c", "#000000"]
    },

};

const game = new Phaser.Game(config);