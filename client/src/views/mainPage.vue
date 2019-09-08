<template>
  <div>
    <!-- <form action='' -->
    <v-btn href="/api/auth/kakao/">카카오</v-btn>
    <v-btn href="/api/auth/naver/">네이버</v-btn>
    <v-btn href="/api/auth/facebook">페이스북</v-btn>
    <v-btn href="/api/auth/github">깃헙</v-btn>
    
    <v-btn v-if="email" @click="logout">로그아웃</v-btn>

    <div v-if="email">
      {{ email }}님
      {{ provider }}로 로그인했네요.
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  data(){
    return {
      email: '',
      provider: '',
    }
  },
  methods: {
    logout(){
      api.logout()
        .then(() => {
          this.email = ''
          this.provider = ''
          console.log('로그아웃 완료')
        })
        .catch((err) => {
          console.log('로그아웃 에러')
        })
    }
  },
  created(){
    api.getUser().then((res) => {
      console.log(res.data)
      const user = res.data.user
      if (user){
        this.email = user[0].email
        this.provider = user[0].provider
      }
    })
    .catch(err => console.log(err))
  }
}
</script>

<style>

</style>