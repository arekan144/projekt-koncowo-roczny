import {
    Box3,
    Box3Helper,
    BoxGeometry,
    Color,
    Material,
    Mesh,
    MeshBasicMaterial,
    Raycaster,
    Ray,
    Vector3,
    DoubleSide,
    FrontSide,
} from "three";


export default class Collisions {
    constructor(colisionBlocks, colider, scene) {
        this.collisionBlocks = colisionBlocks;
        this.mesh = colider;
        this.table = new Array();

        this.collisionBlocks.forEach((block, index) => {
            let bx3 = new Box3();
            block.geometry.computeBoundingBox();
            bx3.setFromObject(block)
            const elper = new Box3Helper(bx3, 0xff0000)
            scene.add(elper)
            this.table.push({ box: bx3, i: index })
        })

        const ge = new BoxGeometry(10, 100, 10)
        const mat = new MeshBasicMaterial({ visible: false, side: DoubleSide })
        this.object = new Mesh(ge, mat)
        this.object.position.set(this.mesh.position.x, this.mesh.position.y - 25, this.mesh.position.z)
        this.meshBox = new Box3();
        this.meshBox.setFromObject(this.object);
        const helper = new Box3Helper(this.meshBox, 0xffff00);
        
        scene.add(this.object, helper)
        // this.elpers = []
        // // console.log(enemies)
        // this.enemies.forEach((block, index) => {
        //     let bx3 = new Box3();
        //     block.geometry.computeBoundingBox();
        //     bx3.setFromObject(block)
        //     // const elper = new Box3Helper(bx3, 0xff0000)
        //     let oper = new Mesh(new BoxGeometry(100, 200, 100), new MeshBasicMaterial({ side: FrontSide, visible: false, }))
        //     // console.log(block.position)

        //     oper.position.set(block.position.x, block.position.y + 30, block.position.z)
        //     // console.log(oper)
        //     this.elpers.push(oper)

        //     scene.add(oper)
        //     // arr.push(this.object);
        //     // console.log(arr)
        //     this.able.push({ box: block, elper: oper, alive: 20, checked: false, caster: new CustRaycaster([this.object], block), i: index })
        // })
        // this.trTab = [];
        // tresure.forEach((tr, index) => {
        //     let bx3 = new Box3();
        //     tr.geometry.computeBoundingBox();
        //     bx3.setFromObject(tr)
        //     // const elper = new Box3Helper(bx3, 0xff0000)
        //     // scene.add(elper)

        //     this.trTab.push({ box: bx3, block: tr, i: index, active: true })
        // })
        // this.playerCaster = new CustRaycaster(this.elpers, this.mesh)
        // this.playerCaster.long = 2000
        // this.object.position.set(this.mesh.position.x, this.mesh.position.y - 25, this.mesh.position.z)
        // scene.add(this.object)
        // // console.log(helper)
        // helper.visible = false;
        // scene.add(helper);
        // // console.log(this.table)

    }


    update() {

        let ball = []
        // let t = []
        this.object.position.set(this.mesh.position.x, this.mesh.position.y - 25, this.mesh.position.z)
        this.meshBox.setFromObject(this.object);
        this.table.forEach(element => {
            if (this.meshBox.intersectsBox(element.box)) {
                ball.push(this.collisionBlocks[element.i])
            }
        });
        // this.trTab.forEach(element => {
        //     if (this.meshBox.intersectsBox(element.box) && element.active) {
        //         t.push(this.tresure[element.i])
        //     }
        // })
        // // console.log(t)

        return ball;
    }

}

