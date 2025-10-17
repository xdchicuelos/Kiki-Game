// /scenes/Bootloader.js
export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: "Bootloader" });
    }

    preload() {
        this.load.path = "./assets/";

    //Escuela Scene
    
        this.load.image("EscuelaFondo", "EscuelaFondo.png");
        this.load.image("mesa", "mesa.png");
        this.load.image("silla", "silla.png");
        this.load.image("Bullie","Bullie.png");
        this.load.image("Adokenai","Adokenai.png");

        this.load.atlas('ado_idle', 'ado_idle.png','ado_idle_atlas.json');
        this.load.animation('ado_idle_anim', 'ado_idle_anim.json'); 

        this.load.atlas('camina', 'camina.png','camina_atlas.json');
        this.load.animation('camina_anim', 'camina_anim.json'); 

        this.load.atlas('bullie_idle', 'bullie_idle.png','bullie_idle_atlas.json');
        this.load.animation('bullie_idle_eanim', 'bullie_idle_anim.json'); 

        this.load.atlas('bullies', 'bullies.png','bullies_atlas.json');
        this.load.animation('bullies_anim', 'bullies_anim.json'); 

    //Escuela Musica 
        this.load.audio("Escuela_Fondo","Escuela_Fondo.mp3");
    
    //Glorp Scene
        this.load.image("GlorpFondo_1", "GlorpFondo_1.png");
        this.load.image("GlorpFondo_2", "GlorpFondo_2.png");
        this.load.image("GlorpFondo_3", "GlorpFondo_3.png");
        this.load.image("GlorpFondo_4", "GlorpFondo_4.png");
        this.load.image("GlorpFondo_5", "GlorpFondo_5.png");
        this.load.image("Glorp_Oro","Glorp_Oro.png");
        this.load.image("Glorp_brillio","Glorp_brillio.png");
        this.load.image("Glorp_memoria","Glorp_memoria.png");

        this.load.atlas('glorp_idle', 'glorp_idle.png','glorp_idle_atlas.json');
        this.load.animation('glorpidleanim', 'glorp_idle_anim.json'); 
        
        this.load.atlas('glorp_walk', 'glorp_walk.png','glorp_walk_atlas.json');
        this.load.animation('glorpwalkanim', 'glorp_walk_anim.json');
        
        this.load.atlas('bush_arriba', 'bush_arriba.png','bush_arriba_atlas.json');
        this.load.animation('bush_arriba_anim', 'bush_arriba_anim.json');

        this.load.atlas('bush_bajo', 'bush_bajo.png','bush_bajo_atlas.json');
        this.load.animation('bush_bajo_anim', 'bush_bajo_anim.json');

        this.load.atlas('rosa_arriba', 'rosa_arriba.png','rosa_arriba_atlas.json');
        this.load.animation('rosa_arriba_anim', 'rosa_arriba_anim.json');

        this.load.atlas('rosa_bajo', 'rosa_bajo.png','rosa_bajo_atlas.json');
        this.load.animation('rosa_bajo_anim', 'rosa_bajo_anim.json');

        this.load.atlas('flor_arriba', 'flor_arriba.png','flor_arriba_atlas.json');
        this.load.animation('flor_arriba_anim', 'flor_arriba_anim.json');

        this.load.atlas('flor_bajo', 'flor_bajo.png','flor_bajo_atlas.json');
        this.load.animation('flor_bajo_anim', 'flor_bajo_anim.json');

    // Glorp Music
       this.load.audio("Glorp_Fondo", "Glorp_Fondo.mp3");
      
    }

    create() {
        const eventos = Phaser.Input.Events;
        
        this.scene.start("InicioScene");    
    }
}
