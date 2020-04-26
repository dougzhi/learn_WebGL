<template>
  <div id="container">

  </div>
</template>

<script>
    import * as THREE from 'three'   //ES6
    // import {OBJLoader, MTLLoader} from 'three-obj-mtl-loader';
    // // import MTLLoader from  'three-mtl-loader';
    // // import OBJLoader from  'three-obj-loader';
    // import {CSS2DRenderer, CSS2DObject} from 'three-css2drender';
    //
    const OrbitControls = require('three-orbit-controls')(THREE);
    export default {
        name: "test1",
        data() {
            return {
            }
        },
        mounted() {
           this.init();
        },
        // destroyed(){
        //   console.log("实例已经被销毁");
        // },
        methods: {
            init() {
                let scene = new THREE.Scene();
                let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

                let renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                let container = document.getElementById("container");
                container.appendChild( renderer.domElement );

                let geometry = new THREE.BoxGeometry( 1, 1, 1 );
                let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                let cube = new THREE.Mesh( geometry, material );
                scene.add( cube );
                container.addEventListener("click", () => alert(0))

                camera.position.z = 5;

                //自动选装
                let animate = function () {
                    requestAnimationFrame( animate );

                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;

                    renderer.render( scene, camera );
                };

                // animate();

                //鼠标控制
                let animate2 = function () {
                    renderer.render( scene, camera );
                };

                animate2()

                var controls = new OrbitControls(camera);
                controls.addEventListener('change', animate2);
            }
        }
    }
</script>

<style scoped>

</style>