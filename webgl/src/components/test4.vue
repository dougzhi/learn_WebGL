<template>
  <div id="import-template">
  </div>
</template>

<script>
    import * as THREE from 'three'
    import * as Stats from 'stats.js'
    // import * as dat from 'dat.gui'
    import OrbitControls from 'three-orbitcontrols'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
    export default {
        name: 'test4',
        data() {
            return {}
        },
        created() {
            this.init()
        },
        methods: {
            //初始化
            init() {
                //创建场景
                let scene = new THREE.Scene()

                //创建相机 - 视野、长宽比、近、远裁剪平面
                let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
                camera.position.set(0, 0, 15)

                //创建渲染器 - 设置显示窗口大小
                let renderer = new THREE.WebGLRenderer()
                renderer.setSize(window.innerWidth, window.innerHeight)
                document.body.appendChild(renderer.domElement)

                //创建性能检测
                let stats = new Stats()
                stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
                document.body.appendChild(stats.dom)

                //创建相机控件
                let control = new OrbitControls(camera, renderer.domElement)
                control.enableDamping = true
                control.dampingFactor = 0.25
                control.enableZoom = false

                // this.importGLTF(scene, camera, renderer, stats, control)
                this.importJSON(scene, camera, renderer, stats, control)
            },
            //导入GLTF格式模型
            importGLTF(scene, camera, renderer, stats, control) {
                //设置相机位置
                camera.position.z = 130
                camera.position.y = 80

                //创建GLTF加载器
                let loader = new GLTFLoader()

                // debugger
                loader.load('models/gltf/scene.gltf', gltf => {
                    //缩放
                    gltf.scene.scale.set(.1, .1, .1)

                    //处理加载模型为黑色问题
                    gltf.scene.traverse(child => {
                        if (child.isMesh) {
                            child.material.emissive = child.material.color
                            child.material.emissiveMap = child.material.map
                        }
                    })

                    scene.add(gltf.scene)
                }, xhr => {
                    // called while loading is progressing
                    console.log(`${( xhr.loaded / xhr.total * 100 )}% loaded`);
                }, error => {
                    // called when loading has errors
                    console.error('An error happened', error);
                })

                let animate = () => {
                    //循环调用函数
                    requestAnimationFrame(animate)

                    //更新性能插件
                    stats.update()

                    //更新相机控件
                    control.update()

                    //渲染界面
                    renderer.render(scene, camera)
                }
                animate()
            },
            //导入JSON格式模型
            importJSON(scene, camera, renderer, stats, control) {
                //设置相机位置
                camera.position.z = 130
                camera.position.y = 80

                let loader = new THREE.ObjectLoader()

                loader.load('models/test.js', group => {
                    scene.add(group)
                }, xhr => {
                    // called while loading is progressing
                    console.log(`${( xhr.loaded / xhr.total * 100 )}% loaded`);
                }, error => {
                    // called when loading has errors
                    console.error('An error happened', error);
                })

                let animate = () => {
                    //循环调用函数
                    requestAnimationFrame(animate)

                    //更新性能插件
                    stats.update()

                    //更新相机控件
                    control.update()

                    //渲染界面
                    renderer.render(scene, camera)
                }
                animate()
            }
        }
    }
</script>

<style scoped>
</style>