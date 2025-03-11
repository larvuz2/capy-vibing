import * as RAPIER from '@dimforge/rapier3d';

export class PhysicsWorld {
    constructor() {
        this.world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
        this.setupGround();
    }

    setupGround() {
        const groundBodyDesc = RAPIER.RigidBodyDesc.fixed();
        const groundBody = this.world.createRigidBody(groundBodyDesc);
        
        const groundColliderDesc = RAPIER.ColliderDesc.cuboid(50, 0.1, 50);
        this.world.createCollider(groundColliderDesc, groundBody);
    }

    update() {
        this.world.step();
    }
} 