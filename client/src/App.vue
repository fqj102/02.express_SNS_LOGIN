<template>
  <v-app>
    <v-content class="d-flex align-center green lighten-5">
    <div class="font-italic display-2 text-center mb-5">SNS 로그인</div>
      <main-page></main-page>
    </v-content>
  </v-app>
</template>

<script>
import mainPage from './views/mainPage'
export default {
  components:{
    mainPage,
  }
}
</script>

<style>

</style>