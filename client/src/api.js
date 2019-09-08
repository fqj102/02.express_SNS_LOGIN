import axios from 'axios';

const apiUrl = '/api'


// axios.defaults.crossDomain = true;

export default {
  getUser(){
    return axios.get(`${apiUrl}/auth/`)
  },
  logout(){
    return axios.get(`${apiUrl}/auth/logout`)
  }
}