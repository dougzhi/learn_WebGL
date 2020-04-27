<template>
  <div id="container">
    <model-obj
      id="place"
      src="model/test.obj"
      mtl="model/test.mtl"
      backgroundColor="rgb(0,0,0)"
      :scale="{ x: 0.8, y: 0.8, z: 0.8 }"
    >
    </model-obj>>
  </div>
</template>

<script>
    import { ModelObj } from 'vue-3d-model'
    export default {
        name: "test1",
        components: {
            ModelObj
        },
        data() {
            return {
            }
        },
        mounted() {
           this.init();
        },
        methods: {
            init() {}
        }
    }
</script>

<style scoped>

</style>