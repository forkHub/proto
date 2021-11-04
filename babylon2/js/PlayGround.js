// import { DefObj3D } from "./DefObj.js";
// import { app } from "./App.js";
export class Playground {
    constructor() {
        this._engine = null;
        this._scene = null;
    }
    get scene() {
        return this._scene;
    }
    init() {
        this.canvas = document.getElementById("renderCanvas");
        this._engine = this.createDefaultEngine(this.canvas);
        this._scene = this.createDefScene(this._engine, this.canvas);
        // this._scene.debugLayer.show({
        //     embedMode: true,
        //     handleResize: false
        // });
        // this.createObj(this.scene);
        this._engine.runRenderLoop(() => {
            if (this.scene && this.scene.activeCamera) {
                this.scene.render();
            }
        });
        window.addEventListener("resize", () => {
            this._engine.resize();
        });
    }
    createDefaultEngine(canvas) {
        return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
    }
    ;
    /*
    private createObj(scene: BABYLON.Scene): void {
        let bolaObj: IBolaData = app.def.defBola('sphere1');
        bolaObj.posisi.y = 1;
        app.prim.bola(bolaObj, scene);

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        let tanahObj: ITanahData = app.def.defTanah('ground1');

        // let ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
        let ground = BABYLON.Mesh.CreateGround(
            tanahObj.nama,
            tanahObj.pjg,
            tanahObj.lbr,
            tanahObj.sub,
            scene);

        ground.position.x = 0;
        ground.position.y = 0;
    }
    */
    createDefScene(engine, canvas) {
        // This creates a basic Babylon Scene object (non-mesh)
        let scene = new BABYLON.Scene(engine);
        // This creates and positions a free camera (non-mesh)
        let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        // let camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        // camera.setPosition(new BABYLON.Vector3(0, 8, -17));
        // camera.attachControl(canvas, true);
        // BABYLON.mesh
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 1), scene);
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
        return scene;
    }
}
/*
function init(): void {
    var canvas: HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement;

    var engine: BABYLON.Engine = null;
    var scene: BABYLON.Scene = null;
    var sceneToRender: BABYLON.Scene = null;

    var createDefaultEngine = () => { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };

    var createScene = () => { return Playground.CreateScene(engine, engine.getRenderingCanvas()); }

    var initFunction = async () => {

        var asyncEngineCreation = async function () {
            try {
                return createDefaultEngine();
            } catch (e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
            }
        }

        engine = await asyncEngineCreation();
        if (!engine) throw 'engine should not be null.';
        scene = createScene();
    };

    initFunction().then(() => {
        sceneToRender = scene
        engine.runRenderLoop(function () {
            if (sceneToRender && sceneToRender.activeCamera) {
                sceneToRender.render();
            }
        });
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
}
*/
// init();
// new Playground();
