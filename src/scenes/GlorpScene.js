export default class GlorpScene extends Phaser.Scene {
    constructor() {
        super({ key: "GlorpScene" });
    }

    create() {
        // -----------------------
        // FONDOS
        // -----------------------
        this.fondo1 = this.add.image(1000, 500, "GlorpFondo_1").setScale(1).setDepth(1);
        this.fondo2 = this.add.image(1000, 500, "GlorpFondo_2").setScale(1).setDepth(2);
        this.fondo3 = this.add.image(1000, 500, "GlorpFondo_3").setScale(1).setDepth(3);
        this.fondo4 = this.add.image(1000, 500, "GlorpFondo_4").setScale(1).setDepth(4);
        this.fondo5 = this.add.image(1000, 500, "GlorpFondo_5").setScale(1).setDepth(5);
        this.Glorp_brillio = this.add.image(1000, 500, "Glorp_brillio").setScale(1).setDepth(7);

        // -----------------------
        // MÚSICA
        // -----------------------
        this.GlorpMusic = this.sound.add("Glorp_Fondo", { loop: true, volume: .5 });
        this.GlorpMusic.play();

   
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.GlorpMusic.setVolume(0);
        this.tweens.add({
        targets: this.GlorpMusic,
        volume: 1,
        duration: 1500,
        ease: "Sine.easeInOut"
    });

        // -----------------------
        // PLAYER: GLORP
        // -----------------------
        this.Glorp = this.physics.add.sprite(200, 600, "glorp_idle", 0)
            .setScale(2)
            .setDepth(10)
            .setCollideWorldBounds(true);
        this.Glorp.body.setSize(40, 60);
        this.Glorp.body.setOffset(15, 70);
        this.Glorp.body.setBounce(0);
        this.Glorp.body.setMass(10);

        // -----------------------
        // ORO
        // -----------------------
        this.oro = this.physics.add.image(1000, 500, "Glorp_Oro")
            .setScale(1)
            .setDepth(6)
            .setImmovable(true)
            .setInteractive(false);

        this.physics.add.existing(this.oro, true);
        this.oro.body.setSize(120, 120);
        this.oro.body.setOffset(1780, 500);

        // Colisión desde cualquier lado
        this.physics.add.overlap(this.Glorp, this.oro, () => {
            if (!this.memoriaActiva) {
                this.memoriaActiva = true;
                this.showMemoria();
                this.handleOroTouched();
            }
        });

        // -----------------------
        // LIMITES DEL MUNDO
        // -----------------------
        this.physics.world.setBounds(0, 0, 1900, 700);

        // -----------------------
        // COLISIONES ESCENARIO
        // -----------------------
        this.physics.add.existing(this.fondo2, true);
        this.fondo2.body.setSize(280, 420);
        this.fondo2.body.setOffset(1180, 0);
        this.physics.add.collider(this.Glorp, this.fondo2);

        this.physics.add.existing(this.fondo3, true);
        this.fondo3.body.setSize(2000, 250);
        this.fondo3.body.setOffset(0, 0);
        this.physics.add.collider(this.Glorp, this.fondo3);

        this.physics.add.existing(this.fondo4, true);
        this.fondo4.body.setSize(280, 420);
        this.fondo4.body.setOffset(1180, 590);
        this.physics.add.collider(this.Glorp, this.fondo4);

        // -----------------------
        // ANIMACIONES
        // -----------------------
        this.anims.create({
            key: "glorp_idle",
            frames: this.anims.generateFrameNumbers("glorp_idle", { start: 0, end: 8 }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "glorp_walk",
            frames: this.anims.generateFrameNumbers("glorp_walk", { start: 0, end: 8 }),
            frameRate: 8,
            repeat: -1,
        });

        this.Glorp.anims.play("glorp_idle");

        // -----------------------
        // FLORES 🌸
        // -----------------------
        this.florA = this.add.sprite(500, 150, "flor_arriba").setScale(2.5).setDepth(10);
        this.florB = this.add.sprite(500, 840, "flor_bajo").setScale(2.5).setDepth(10);

        this.florA2 = this.add.sprite(400, 150, "flor_arriba").setScale(2.5).setDepth(10);
        this.florA3 = this.add.sprite(600, 150, "flor_arriba").setScale(2.5).setDepth(10);
        this.florA4 = this.add.sprite(700, 150, "flor_arriba").setScale(2.5).setDepth(10);

        this.florB2 = this.add.sprite(400, 840, "flor_bajo").setScale(2.5).setDepth(10);
        this.florB3 = this.add.sprite(600, 840, "flor_bajo").setScale(2.5).setDepth(10);
        this.florB4 = this.add.sprite(700, 840, "flor_bajo").setScale(2.5).setDepth(10);

        this.anims.create({
            key: "flor_arriba",
            frames: this.anims.generateFrameNumbers("flor_alto_animation_1_0", { start: 0, end: 15 }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "flor_bajo",
            frames: this.anims.generateFrameNumbers("flor_bajo_animation_1_0", { start: 0, end: 15 }),
            frameRate: 2,
            repeat: -1,
        });

        this.florA.anims.play("flor_arriba");
        this.florA2.anims.play("flor_arriba");
        this.florA3.anims.play("flor_arriba");
        this.florA4.anims.play("flor_arriba");

        this.florB.anims.play("flor_bajo");
        this.florB2.anims.play("flor_bajo");
        this.florB3.anims.play("flor_bajo");
        this.florB4.anims.play("flor_bajo");

        // -----------------------
        // BUSHES 🌿
        // -----------------------
        this.bushA = this.add.sprite(900, 150, "bush_arriba").setScale(2.5).setDepth(10);
        this.bushB = this.add.sprite(100, 840, "bush_bajo").setScale(2.5).setDepth(10);

        this.anims.create({
            key: "bush_arriba",
            frames: this.anims.generateFrameNumbers("bush_bajo_animation_1_0", { start: 0, end: 15 }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "bush_bajo",
            frames: this.anims.generateFrameNumbers("bush_alto_animation_1_0", { start: 0, end: 15 }),
            frameRate: 2,
            repeat: -1,
        });

        this.bushA.anims.play("bush_arriba");
        this.bushB.anims.play("bush_bajo");

        // -----------------------
        // ROSAS 🌹
        // -----------------------
        this.rosaA = this.add.sprite(100, 150, "rosa_arriba").setScale(2.5).setDepth(10);
        this.rosaB = this.add.sprite(900, 840, "rosa_bajo").setScale(2.5).setDepth(10);

        this.anims.create({
            key: "rosa_arriba",
            frames: this.anims.generateFrameNumbers("rosa_bajo_animation_1_0", { start: 0, end: 15 }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "rosa_bajo",
            frames: this.anims.generateFrameNumbers("rosa_alto_animation_1_0", { start: 0, end: 15 }),
            frameRate: 2,
            repeat: -1,
        });

        this.rosaA.anims.play("rosa_arriba");
        this.rosaB.anims.play("rosa_bajo");

        // -----------------------
        // TWEENS VISUALES
        // -----------------------
        this.tweens.add({
            targets: [this.florA, this.florA2, this.florA3, this.florA4],
            x: "+=15",
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        this.tweens.add({
            targets: [this.florB, this.florB2, this.florB3, this.florB4],
            x: "-=15",
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        this.tweens.add({
            targets: this.oro,
            y: this.oro.y - 20,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        this.tweens.add({
            targets: this.Glorp_brillio,
            scale: { from: 1, to: 1.05 },
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // -----------------------
        // CONTROLES
        // -----------------------
        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
        });

        this.speed = 200;
        this.jumpSpeed = -400;
        this.isWalking = false;

        this.cameras.main.startFollow(this.Glorp);
        this.cameras.main.setBounds(0, 0, 1900, 550);
    }

    handleOroTouched() {
        this.tweens.add({
            targets: [this.oro, this.Glorp_brillio],
            alpha: 0,
            duration: 800,
            onComplete: () => {
                this.oro.destroy();
                this.Glorp_brillio.destroy();
            }
        });

        // Baja volumen
        this.tweens.add({
            targets: this.GlorpMusic,
            volume: 0.3,
            duration: 500
        });
    }

   showMemoria() {
    const memoria = this.add.image(1000, 500, "Glorp_memoria")
        .setScale(.1,.1)
        .setDepth(50)
        .setAlpha(0);

    
    this.tweens.add({
        targets: memoria,
        alpha: 1,
        duration: 500,
        ease: "Sine.easeInOut"
    });

    this.time.delayedCall(10000, () => {
        this.tweens.add({
            targets: memoria,
            alpha: 0,
            duration: 1000,
            ease: "Sine.easeInOut",
            onComplete: () => {
                memoria.destroy();
                this.memoriaActiva = false;

                
                this.transitionBackToEscuela();
            }
        });
   
    });
    
}
    transitionBackToEscuela() {
        if (this.transitioning) return;
        this.transitioning = true;

    
        this.cameras.main.fadeOut(1500, 0, 0, 0);

    
        this.tweens.add({
        targets: this.GlorpMusic,
        volume: 0,
        duration: 1500,
        ease: "Sine.easeInOut"
    });

    
    this.time.delayedCall(1600, () => {
        this.scene.start("EscuelaScene");
    });
}
    update() {
        const onGround = this.Glorp.body.blocked.down || this.Glorp.body.touching.down;
        let moving = false;

        if (this.cursors.left.isDown) {
            this.Glorp.setVelocityX(-this.speed);
            this.Glorp.flipX = true;
            moving = true;
        } else if (this.cursors.right.isDown) {
            this.Glorp.setVelocityX(this.speed);
            this.Glorp.flipX = false;
            moving = true;
        } else {
            this.Glorp.setVelocityX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && onGround) {
            this.Glorp.setVelocityY(this.jumpSpeed);
        }

        if (moving && !this.isWalking) {
            this.Glorp.anims.play("glorp_walk", true);
            this.isWalking = true;
        } else if (!moving && this.isWalking && onGround) {
            this.Glorp.anims.play("glorp_idle", true);
            this.isWalking = false;
        }
    }
}



