import * as RAPIER from '@dimforge/rapier3d';

export class PhysicsWorld {
    constructor(RAPIER) {
        this.RAPIER = RAPIER;
        this.world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
        this.setupGround();
    }

    setupGround() {
        const groundBodyDesc = this.RAPIER.RigidBodyDesc.fixed();
        const groundBody = this.world.createRigidBody(groundBodyDesc);
        
        const groundColliderDesc = this.RAPIER.ColliderDesc.cuboid(50, 0.1, 50);
        this.world.createCollider(groundColliderDesc, groundBody);
    }

    update() {
        this.world.step();
    }
} 