export default class EscuelaScene extends Phaser.Scene {
    constructor() {
        super({ key: "EscuelaScene" });
    }

    create() {

        // -----------------------
        // FONDOS
        // -----------------------
        this.fondo = this.add.image(1000, 500, "EscuelaFondo").setScale(1).setDepth(1);
        this.fondo2 = this.add.image(1000, 500, "EscuelaFondo").setScale(1).setDepth(1);

        // -----------------------
        // MÚSICA
        // -----------------------
        this.EscuelaMusic = this.sound.add("Escuela_Fondo", { loop: true, volume: 1 });
        this.EscuelaMusic.play();

        // -----------------------
        // PLAYER: Adokenai
        // -----------------------
        this.Ado = this.physics.add.sprite(1400, 820, "ado_idle", 0)
            .setScale(2)
            .setDepth(10)
            .setCollideWorldBounds(true);
        this.Ado.body.setSize(40, 60);
        this.Ado.body.setMass(10000);

        // -----------------------
        // ANIMACIONES
        // -----------------------
        this.anims.create({
            key: "ado_idle",
            frames: this.anims.generateFrameNumbers("idle_adokenai", { start: 1, end: 5 }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "camina",
            frames: this.anims.generateFrameNumbers("adokenai_camina", { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1,
        });

        this.Ado.anims.play("ado_idle");


        // -----------------------
        // ENEMIGO: BULLIE
        // -----------------------
        this.bullie = this.physics.add.sprite(600, 812, "Bullie", 0)
            .setScale(2)
            .setDepth(6)
            .setInteractive()
            .setCollideWorldBounds(true);

        this.physics.add.existing(this.bullie, false);
        this.bullie.body.setSize(70, 70);

        // -----------------------
        // ANIMACIONES
        // -----------------------

         this.anims.create({
            key: "bullie_idle",
            frames: this.anims.generateFrameNumbers("bullie_idle", { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1,
        });

        this.bullie.anims.play("bullie_idle");

        
        this.physics.add.overlap(this.Ado, this.bullie, this.onBullieTouched, null, this);

        // -----------------------
        // ENEMIGO: BULLIES
        // -----------------------

        this.bullies1 = this.add.sprite(600, 400, "Bullies")
            .setScale(2)
            .setDepth(6);

         this.bullies2 = this.add.sprite(750, 400, "Bullies")
            .setScale(2)
            .setDepth(6);

         this.bullies3 = this.add.sprite(900, 400, "Bullies")
            .setScale(2)
            .setDepth(6);


        this.anims.create({
            key: "bullies",
            frames: this.anims.generateFrameNumbers("bullies", { start: 0, end: 12 }),
            frameRate: 2,
            repeat: -1,
        });

        this.bullies1.anims.play("bullies");
        this.bullies2.anims.play("bullies");
        this.bullies3.anims.play("bullies");

        // -----------------------
        // LIMITES DEL MUNDO
        // -----------------------
        this.physics.world.setBounds(0, 0, 1460, 880);

        // -----------------------
        // MESAS
        // -----------------------
        this.mesaA = this.add.image(730, 630, "mesa").setScale(2.5).setDepth(10);
        this.mesaA2 = this.add.image(940, 630, "mesa").setScale(2.5).setDepth(10);
        this.mesaA3 = this.add.image(1160, 630, "mesa").setScale(2.5).setDepth(10);
        this.mesaA4 = this.add.image(730, 800, "mesa").setScale(2.5).setDepth(10);
        this.mesaA5 = this.add.image(940, 800, "mesa").setScale(2.5).setDepth(10);
        this.mesaA6 = this.add.image(1160, 800, "mesa").setScale(2.5).setDepth(10);

        // -----------------------
        // SILLAS
        // -----------------------
        this.sillaA = this.add.image(730, 720, "silla").setScale(2.5).setDepth(9);
        this.silla2 = this.add.image(940, 720, "silla").setScale(2.5).setDepth(9);
        this.silla3 = this.add.image(1160, 720, "silla").setScale(2.5).setDepth(9);

        // -----------------------
        // COLISIONES ESCENARIO
        // -----------------------
        const objetos = [
            this.mesaA, this.mesaA2, this.mesaA3,
            this.mesaA4, this.mesaA5, this.mesaA6,
            this.sillaA, this.silla2, this.silla3
        ];

        objetos.forEach(obj => {
            this.physics.add.existing(obj, true);
            obj.body.setSize(100, 100);
            this.physics.add.collider(this.Ado, obj);
        });

        this.physics.add.existing(this.fondo, true);
        this.fondo.body.setSize(1000, 270);
        this.fondo.body.setOffset(0, 0);
        this.physics.add.collider(this.Ado, this.fondo);

        this.physics.add.existing(this.fondo2, true);
        this.fondo2.body.setSize(200, 900);
        this.fondo2.body.setOffset(-180, 0);
        this.physics.add.collider(this.Ado, this.fondo2);

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
        this.jumpSpeed = -260;

        // -----------------------
        // CÁMARA
        // -----------------------
        this.cameras.main.startFollow(this.Ado);
        this.cameras.main.setBounds(0, 0, 1460, 880);

        
        this.transitioning = false;
    }


    onBullieTouched() {
        if (this.transitioning) return;
        this.transitioning = true;

    
        this.Ado.setVelocity(0);
        this.Ado.body.enable = false;

   
        this.cameras.main.fadeOut(1000, 0, 0, 0);

    
        if (this.EscuelaMusic && this.EscuelaMusic.isPlaying) {
        this.tweens.add({
            targets: this.EscuelaMusic,
            volume: 0,
            duration: 1000,
            onComplete: () => {
                this.EscuelaMusic.stop();
            }
        });
    }

    
    this.time.delayedCall(1000, () => {
        this.scene.start("GlorpScene");
    });
}

    update() {
        
        if (this.transitioning) return;

        const onGround = this.Ado.body.blocked.down || this.Ado.body.touching.down;
        let moving = false;

        if (this.cursors.left.isDown) {
            this.Ado.setVelocityX(-this.speed);
            this.Ado.flipX = true;
            moving = true;
        } else if (this.cursors.right.isDown) {
            this.Ado.setVelocityX(this.speed);
            this.Ado.flipX = false;
            moving = true;
        } else {
            this.Ado.setVelocityX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && onGround) {
            this.Ado.setVelocityY(this.jumpSpeed);
        }

        if (moving && !this.isWalking) {
            this.Ado.anims.play("camina", true);
            this.isWalking = true;
        } else if (!moving && this.isWalking && onGround) {
            this.Ado.anims.play("ado_idle", true);
            this.isWalking = false;
        }
    }
}
