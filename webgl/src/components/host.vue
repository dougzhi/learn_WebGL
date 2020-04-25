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
    // const OrbitControls = require('three-orbit-controls')(THREE);
    export default {
        name: "host",
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
                var scene = new THREE.Scene();
                var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



                var renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                document.body.appendChild( renderer.domElement );
            }
        }
    }
</script>

<style scoped>

</style>