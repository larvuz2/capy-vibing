import RAPIER from '@dimforge/rapier3d/rapier_wasm3d_bg.js';
import { SceneSetup } from './SceneSetup.js';
import { PhysicsWorld } from './PhysicsWorld.js';
import { Player } from './Player.js';

// We need to import the WASM file directly
import init from '@dimforge/rapier3d/rapier_wasm3d.js';

async function initPhysics() {
    // Initialize Rapier with the WASM module
    await init();
    return RAPIER;
}

async function initApp() {
    // Initialize Rapier physics
    const RAPIER = await initPhysics();
    
    const sceneSetup = new SceneSetup();
    const physicsWorld = new PhysicsWorld(RAPIER);
    const player = new Player(sceneSetup.scene, physicsWorld.world, RAPIER);

    // Camera positioning
    sceneSetup.camera.position.set(0, 5, 10);

    // Animation loop
    let lastTime = 0;
    function animate(time) {
        requestAnimationFrame(animate);
        
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        physicsWorld.update();
        player.update(delta);
        
        sceneSetup.camera.lookAt(player.mesh.position);
        sceneSetup.renderer.render(sceneSetup.scene, sceneSetup.camera);
    }

    animate(0);
}

initApp(); 