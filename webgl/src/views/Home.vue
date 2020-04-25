<template>
  <div class="home">
    <router-link to="/test1">课程一</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import host from '@/components/test1.vue'

export default {
  name: 'Home',
  components: {
    host
  }
}
</script>
