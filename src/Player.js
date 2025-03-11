import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d';

export class Player {
    constructor(scene, physicsWorld) {
        this.scene = scene;
        this.world = physicsWorld;
        this.moveSpeed = 5;
        this.jumpForce = 5;
        this.setupPlayer();
        this.setupControls();
    }

    setupPlayer() {
        // Visual representation
        const capsuleGeo = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
        const capsuleMat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(capsuleGeo, capsuleMat);
        this.mesh.position.y = 1;
        this.scene.add(this.mesh);

        // Physics body
        const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(0, 1, 0);
        this.body = this.world.createRigidBody(bodyDesc);
        
        const colliderDesc = RAPIER.ColliderDesc.capsule(0.5, 0.5);
        this.world.createCollider(colliderDesc, this.body);
    }

    setupControls() {
        this.keys = {
            w: false, s: false, a: false, d: false, space: false
        };

        window.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'w': this.keys.w = true; break;
                case 's': this.keys.s = true; break;
                case 'a': this.keys.a = true; break;
                case 'd': this.keys.d = true; break;
                case ' ': this.keys.space = true; break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch(e.key.toLowerCase()) {
                case 'w': this.keys.w = false; break;
                case 's': this.keys.s = false; break;
                case 'a': this.keys.a = false; break;
                case 'd': this.keys.d = false; break;
                case ' ': this.keys.space = false; break;
            }
        });
    }

    update(delta) {
        const velocity = this.body.linvel();
        let movement = new THREE.Vector3();

        // WASD movement
        if (this.keys.w) movement.z -= 1;
        if (this.keys.s) movement.z += 1;
        if (this.keys.a) movement.x -= 1;
        if (this.keys.d) movement.x += 1;

        movement.normalize().multiplyScalar(this.moveSpeed);
        
        // Apply movement
        this.body.setLinvel({ 
            x: movement.x, 
            y: velocity.y, 
            z: movement.z 
        }, true);

        // Jump
        if (this.keys.space && Math.abs(velocity.y) < 0.1) {
            this.body.applyImpulse({ x: 0, y: this.jumpForce, z: 0 }, true);
            this.keys.space = false;
        }

        // Sync mesh with physics body
        const position = this.body.translation();
        this.mesh.position.set(position.x, position.y, position.z);
    }
} 