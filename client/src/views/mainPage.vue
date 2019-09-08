<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="d-flex justify-center">
        <v-btn height="5rem" width="5rem"
        v-for="(s, index) in sns" :key="index" 
        flat depressed :href="'api/auth/' + s"
        class="mx-3"
        >
          <img :src="require(`../assets/${s}.svg`)" class="icon">
        </v-btn>
      </v-flex>
  </v-layout>

  <div class="d-flex justify-center mt-5"> 
    <div v-if="email" class="title">
      <span class="font-weight-bold">{{ email }}</span>님 안녕하세요<br>
      <span class="font-weight-bold">{{ provider }}</span>계정으로 로그인 하셨습니다.
    </div>
  </div>

  <div class="d-flex justify-center mt-5">
    <v-btn v-if="email" @click="logout" outlined x-large color="error">
      <span class="font-weight-medium">로그아웃</span>
      </v-btn>
  </div>

  </v-container>
</template>

<script>
import api from '../api'
var path = require('path')

export default {
  data(){
    return {
      email: '',
      provider: '',
      sns:[
        'kakao',
        'naver',
        'facebook',
        'github',
      ]
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

<style scoped>
.icon, button{
  width:5rem;
  height:5rem;
}

</style>