<template>
  <div id="container">
    <div id="info">Description</div>
  </div>
</template>

<script>
    import * as THREE from 'three'   //ES6
    // import {OBJLoader, MTLLoader} from 'three-obj-mtl-loader';
    // // import MTLLoader from  'three-mtl-loader';
    // // import OBJLoader from  'three-obj-loader';
    // import {CSS2DRenderer, CSS2DObject} from 'three-css2drender';
    //
    // const OrbitControls = require('three-orbit-controls')(THREE);
    export default {
        name: "test2",
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
                var renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                document.body.appendChild( renderer.domElement );

                var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
                camera.position.set( 0, 0, 100 );
                camera.lookAt( 0, 0, 0 );

                var scene = new THREE.Scene();
                //create a blue LineBasicMaterial
                var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
                geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
                geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

                var texture = new THREE.TextureLoader().load( "textures/water.jpg" );
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set( 4, 4 );

                var line = new THREE.Line( geometry, material );
                scene.add( line );
                scene.add(texture);
                renderer.render( scene, camera );
            }
        }
    }
</script>

<style scoped>
  #info {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    z-index: 100;
    display:block;
  }
</style>