import * as THREE from 'three';
import { SceneSetup } from './SceneSetup.js';
import { PhysicsWorld } from './PhysicsWorld.js';
import { Player } from './Player.js';

// Import Rapier
import RAPIER from '@dimforge/rapier3d-compat';

async function initApp() {
    try {
        // Create a loading message
        const loadingElement = document.createElement('div');
        loadingElement.style.position = 'absolute';
        loadingElement.style.top = '50%';
        loadingElement.style.left = '50%';
        loadingElement.style.transform = 'translate(-50%, -50%)';
        loadingElement.style.color = 'white';
        loadingElement.style.fontSize = '24px';
        loadingElement.textContent = 'Loading physics engine...';
        document.body.appendChild(loadingElement);
        
        console.log('Initializing Rapier physics...');
        
        // Initialize scene setup first
        const sceneSetup = new SceneSetup();
        
        // Initialize physics world after Rapier is loaded
        const physicsWorld = new PhysicsWorld(RAPIER);
        const player = new Player(sceneSetup.scene, physicsWorld.world, RAPIER);

        // Camera positioning
        sceneSetup.camera.position.set(0, 5, 10);

        // Remove loading message
        document.body.removeChild(loadingElement);

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
    } catch (error) {
        console.error('Error initializing application:', error);
        // Display error message to user
        const errorElement = document.createElement('div');
        errorElement.style.position = 'absolute';
        errorElement.style.top = '50%';
        errorElement.style.left = '50%';
        errorElement.style.transform = 'translate(-50%, -50%)';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '18px';
        errorElement.style.textAlign = 'center';
        errorElement.style.maxWidth = '80%';
        errorElement.innerHTML = `
            <h2>Error Loading Application</h2>
            <p>${error.message}</p>
            <p>Please try refreshing the page or using a different browser.</p>
        `;
        document.body.appendChild(errorElement);
    }
}

// Start the application when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    initApp();
}); 