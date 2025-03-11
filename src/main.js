import * as RAPIER from '@dimforge/rapier3d';
import { SceneSetup } from './SceneSetup.js';
import { PhysicsWorld } from './PhysicsWorld.js';
import { Player } from './Player.js';

async function init() {
    await RAPIER.init();
    
    const sceneSetup = new SceneSetup();
    const physicsWorld = new PhysicsWorld();
    const player = new Player(sceneSetup.scene, physicsWorld.world);

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

init(); 