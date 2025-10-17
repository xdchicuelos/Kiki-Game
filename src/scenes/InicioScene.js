export default class InicioScene extends Phaser.Scene {
    constructor() {
        super({ key: "InicioScene" });
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("inicio", "inicio.jpg");   
        this.load.image("petalo", "petalos.png");   
        this.load.image("titulo", "titulo.png");       
        this.load.image("startBtn", "start.png");      
        this.load.image("navecita", "navecita.png");
        this.load.image("zipzip", "zipzip.png");
        this.load.audio("start_song", "start_song.mp3");
    }

    create() {
        const centerX = this.scale.width / 2;

        // -------------------------------
        // Música de fondo
        // -------------------------------
        this.musica = this.sound.add("start_song", { loop: true, volume: 0.5 });
        this.musica.play();

        // -------------------------------
        // Fondo
        // -------------------------------
        const fondo = this.add.image(0, 0, "inicio").setOrigin(0, 0).setDepth(0);
        const scaleX = this.scale.width / fondo.width;
        const scaleY = this.scale.height / fondo.height;
        const scale = Math.min(scaleX, scaleY);
        fondo.setScale(scale);
        const offsetX = (this.scale.width - fondo.displayWidth) / 2;
        const offsetY = (this.scale.height - fondo.displayHeight) / 2;
        fondo.setPosition(offsetX, offsetY);

        // -------------------------------
        // Nave y marciano
        // -------------------------------
        this.nave = this.add.image(
            Phaser.Math.Between(100, this.scale.width - 100),
            Phaser.Math.Between(50, this.scale.height - 200),
            "navecita"
        ).setDepth(2);
        this.nave.setScale(0.35);

        this.marciano = this.add.image(this.nave.x, this.nave.y + 100, "zipzip").setDepth(2);
        this.marciano.setScale(0.2);

        // Movimiento libre de la nave
        const moverAleatorio = (obj, duracionMin = 3000, duracionMax = 6000) => {
            const x = Phaser.Math.Between(50, this.scale.width - 50);
            const y = Phaser.Math.Between(50, this.scale.height - 200);

            this.tweens.add({
                targets: obj,
                x: x,
                y: y,
                duration: Phaser.Math.Between(duracionMin, duracionMax),
                ease: 'Sine.easeInOut',
                onComplete: () => moverAleatorio(obj, duracionMin, duracionMax)
            });
        };

        moverAleatorio(this.nave, 4000, 8000);

        // -------------------------------
        // Título 
        // -------------------------------
        const titulo = this.add.image(centerX, 300, "titulo").setDepth(10);
        titulo.setOrigin(0.5);
        const scaleTitulo = (this.scale.width * 0.8) / titulo.width;
        titulo.setScale(scaleTitulo);

        // -------------------------------
        // Botón start 
        // -------------------------------
        const startButton = this.add.image(centerX, 500, "startBtn").setDepth(10);
        startButton.setOrigin(0.5);
        const scaleBtn = (this.scale.width * 0.7) / startButton.width;
        startButton.setScale(scaleBtn);

        startButton.setInteractive({ useHandCursor: true, pixelPerfect: true })
            .on("pointerover", () => startButton.setTint(0xffffaa))
            .on("pointerout", () => startButton.clearTint())
            .on("pointerdown", () => this.iniciarJuego());

        this.tweens.add({
            targets: startButton,
            scale: scaleBtn * 1.1,
            yoyo: true,
            repeat: -1,
            duration: 800
        });

        // -------------------------------
        // Pétalos 
        // -------------------------------
        const cantidadPetalos = 35;
        for (let i = 0; i < cantidadPetalos; i++) {
            this.crearPetalo();
        }
    }

    update() {
        if (this.nave && this.marciano) {
            // Marciano sigue a la nave horizontal y vertical
            const offsetY = 100 + Math.sin(this.time.now / 500) * 15; // movimiento vertical
            const offsetX = Math.sin(this.time.now / 300) * 20;        // movimiento horizontal
            this.marciano.x = this.nave.x + offsetX;
            this.marciano.y = this.nave.y + offsetY;
        }
    }

    crearPetalo() {
        const startX = Phaser.Math.Between(0, this.scale.width);
        const startY = Phaser.Math.Between(-300, -50);
        const petalo = this.add.image(startX, startY, "petalo");

        let scale = Phaser.Math.FloatBetween(0.2, 0.6);
        petalo.setScale(scale);
        petalo.setAlpha(Phaser.Math.FloatBetween(0.4, 1));
        petalo.setDepth(5); 

        const velocidadY = Phaser.Math.Between(12000, 22000);
        const amplitudX = Phaser.Math.Between(50, 200);
        const duracionOscilacion = Phaser.Math.Between(3000, 6000);
        const rotacionMax = Phaser.Math.Between(-45, 45);

        // Caída vertical
        this.tweens.add({
            targets: petalo,
            y: this.scale.height + 50,
            duration: velocidadY,
            repeat: -1,
            onRepeat: () => {
                petalo.y = Phaser.Math.Between(-300, -50);
                petalo.x = Phaser.Math.Between(0, this.scale.width);
                scale = Phaser.Math.FloatBetween(0.2, 0.6);
                petalo.setScale(scale);
                petalo.setAlpha(Phaser.Math.FloatBetween(0.4, 1));
            }
        });

        // Oscilación horizontal
        this.tweens.add({
            targets: petalo,
            x: petalo.x + amplitudX,
            duration: duracionOscilacion,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // Rotación
        this.tweens.add({
            targets: petalo,
            angle: rotacionMax,
            duration: Phaser.Math.Between(2000, 5000),
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // Escala ligera
        this.tweens.add({
            targets: petalo,
            scale: scale * Phaser.Math.FloatBetween(0.8, 1.2),
            duration: Phaser.Math.Between(2000, 4000),
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // Alpha ligera
        this.tweens.add({
            targets: petalo,
            alpha: Phaser.Math.FloatBetween(0.3, 1),
            duration: Phaser.Math.Between(3000, 6000),
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });
    }

    iniciarJuego() {
        if (this.musica) this.musica.stop();
        this.cameras.main.fadeOut(800, 0, 0, 0);
        this.time.delayedCall(800, () => {
            this.scene.start("EscuelaScene");
        });
    }
}
