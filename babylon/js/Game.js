import { Gui } from "./menu/Gui.js";
class Game {
    constructor() {
        // Create canvas and engine.
        this._canvas = document.getElementById("render-canvas");
        this._engine = new BABYLON.Engine(this._canvas, true);
        this.gui = new Gui();
        this.init();
    }
    init() {
        this.gui.cont = document.querySelector('div.control');
        this.gui.init();
    }
    createScene() {
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false);
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
        // this._light.diffuse;
        let sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 12, diameter: 2 }, this._scene);
        sphere.position.y = 1;
        let ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6, subdivisions: 2 }, this._scene);
        // ground.position.y = 0;
        console.log(this._light);
        console.log(ground);
    }
    doRender() {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}
window.onload = () => {
    let game = new Game();
    game.createScene();
    game.doRender();
};
