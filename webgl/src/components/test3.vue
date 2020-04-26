<template>
  <div id="container">
    <div id="WebGL-output"></div>
    <div id="Stats-output"></div>

    <div id="label">{{name}}</div>
  </div>
</template>

<script>
    import $ from 'jquery';
    import * as THREE from 'three'
    import Stats from "three/examples/jsm/libs/stats.module";   //ES6
    import * as dat from 'dat.gui';
    const TrackballControls = require('three-trackballcontrols');
    export default {
        name: "test3",
        data() {
            return {
                stats: null,
                scene: null,
                camera: null,
                renderer: null,
                controls: null,
                light: null,
                selectObject: null,
                name: '',
                labelDom: null,
                containerDom: null,
            }
        },
        mounted() {
           this.init();
           this.animate()
        },
        methods: {
            init() {
                this.labelDom = document.getElementById("label")
                this.containerDom = document.getElementById("container")

                this.stats = this.initStats();
                this.initScene();
                this.initCamera();
                this.initRenderer();
                this.initContent();
                this.initLight();
                this.initControls();
                this.initGui();
                addEventListener('dblclick', this.onMouseDblclick, false);
                addEventListener('resize', this.onWindowResize, false);
                addEventListener('keydown', this.onKeyDown, false);
            },
            // 场景
            initScene() {
                this.scene = new THREE.Scene();
            },
            // 相机
            initCamera() {
                this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
                this.camera.position.set(0, 400, 600);
                this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            },
            // 渲染器
            initRenderer() {
                this.renderer = new THREE.WebGLRenderer({antialias: true});
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.setClearColor(0x050505);
                this.containerDom.appendChild( this.renderer.domElement );
            },
            // 初始化模型
            initContent() {
                let helper = new THREE.GridHelper(1200, 50, 0xCD3700, 0x4A4A4A);
                this.scene.add(helper);

                let cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
                let cubeMaterial = new THREE.MeshLambertMaterial({color: 0x9370DB});
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.position.y = 50;
                cube.name = "cube";
                this.scene.add(cube);

                let sphereGeometry = new THREE.SphereGeometry(50, 50, 50, 50);
                let sphereMaterial = new THREE.MeshLambertMaterial({color: 0x3CB371});
                let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                sphere.position.x = 200;
                sphere.position.y = 50;
                sphere.name = "sphere";
                // sphere.position.z = 200;
                this.scene.add(sphere);

                let cylinderGeometry = new THREE.CylinderGeometry(50, 50, 100, 100);
                let cylinderMaterial = new THREE.MeshLambertMaterial({color: 0xCD7054});
                let cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
                cylinder.position.x = -200;
                cylinder.position.y = 50;
                cylinder.name = "cylinder";
                // cylinder.position.z = -200;
                this.scene.add(cylinder);
            },
            // 鼠标双击触发的方法
            onMouseDblclick(event) {
                // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
                let intersects = this.getIntersects(event);
                // 获取选中最近的 Mesh 对象
                if (intersects.length !== 0 && intersects[0].object instanceof THREE.Mesh) {
                    this.selectObject = intersects[0].object;
                    this.changeMaterial(this.selectObject);
                } else {
                    alert("未选中 Mesh!");
                }
            },
            // 获取与射线相交的对象数组
            getIntersects(event) {
                event.preventDefault();
                // 声明 raycaster 和 mouse 变量
                let raycaster = new THREE.Raycaster();
                let mouse = new THREE.Vector2();

                // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
                raycaster.setFromCamera(mouse, this.camera);

                // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
                let intersects = raycaster.intersectObjects(this.scene.children);

                //返回选中的对象
                return intersects;
            },
            // 窗口变动触发的方法
            onWindowResize() {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            },
            // 键盘按下触发的方法
            onKeyDown(event) {
                switch (event.keyCode) {
                    case 13:
                        this.initCamera();
                        this.initControls();
                        break;
                }
            },
            // 改变对象材质属性
            changeMaterial(object) {
                let material = new THREE.MeshLambertMaterial({
                    color: 0xffffff * Math.random(),
                    transparent: object.material.transparent ? false : true,
                    opacity: 0.8
                });
                object.material = material;
            },

            // 初始化轨迹球控件
            initControls() {
                this.controls = new TrackballControls(this.camera, this.renderer.domElement);
                // controls.noRotate = true;
                this.controls.noPan = true;
            },

            // 初始化灯光
            initLight() {
                this.light = new THREE.SpotLight(0xffffff);
                this.light.position.set(-300, 600, -400);
                this.light.castShadow = true;

                this.scene.add(this.light);
                this.scene.add(new THREE.AmbientLight(0x5C5C5C));
            },

            // 初始化 dat.GUI
            initGui() {
                // 保存需要修改相关数据的对象
                let gui = () => {

                }
                // 属性添加到控件
                let guiControls = new dat.GUI();
            },

            // 初始化性能插件
            initStats() {
                let stats = new Stats();

                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';

                this.containerDom.appendChild(stats.domElement);
                return stats;
            },

            // 更新div的位置
            renderDiv(object) {
                // 获取窗口的一半高度和宽度
                let halfWidth = window.innerWidth / 2;
                let halfHeight = window.innerHeight / 2;

                // 逆转相机求出二维坐标
                let vector = object.position.clone().project(this.camera);

                // 修改 div 的位置
                $("#label").css({
                    left: vector.x * halfWidth + halfWidth,
                    top: -vector.y * halfHeight + halfHeight - object.position.y
                });
                // 显示模型信息
                this.name = object.name;
            },

            // 更新控件
            update() {
                this.stats.update();
                this.controls.update();
                this.controls.handleResize();
            },

            animate() {
                if (this.selectObject !== undefined && this.selectObject !== null) {
                    this.renderDiv(this.selectObject);
                }
                requestAnimationFrame(this.animate);
                this.renderer.render(this.scene, this.camera);
                this.update();
            }
        }
    }
</script>

<style scoped>
  #container {
    position: relative;
  }
  #label {
    position: absolute;
    padding: 10px;
    background: rgba(255, 255, 255, 0.6);
    line-height: 1;
    border-radius: 5px;
  }
</style>