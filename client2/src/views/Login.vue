<template>
    <div>
        <div class="background-with-image"></div>
        <div class="blur-container">
            <div class="login-container">
                <h1 v-if="!registaration" class="mb-20 t-center">Вхід</h1>
                <h1 v-else class="mb-20 t-center">Реєстрація</h1>
                <h5 class="error" v-if="error">{{error}}</h5>
                <h5>Нікнейм</h5>
                <input class="dino-input mb-10" v-model="nickname" type="text">
                <h5 v-if="registaration">Емайл</h5>
                <input v-if="registaration" class="dino-input mb-10" v-model="email" type="text">
                <h5>Пароль</h5>
                <input class="dino-input mb-20" v-model="password" type="password">
                <button v-if="!registaration" @click="login()" class="dino-btn mb-10">Увійти</button>
                <h5 v-if="!registaration">Немає аккаунту? <span @click="registaration=!registaration" class="register-link">Зареєструйся тут</span></h5>
                <button v-if="registaration" @click="register()" class="dino-btn mb-20">Зареєструватися</button>
                <h5 v-if="registaration"><span @click="registaration=!registaration" class="register-link">Повернутися на сторінку входу</span></h5>
            </div>
        </div> 
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data:()=>{
        return{
            registaration:false,
            email:null,
            nickname:null,
            password:null,
            error:null
        }
    },
    methods:{
        async register(){
            if(this.email && this.password && this.nickname){
                let user = {
                    email:this.email,
                    password:this.password,
                    nickname:this.nickname
                }
                let res = await axios.post('https://dino-back.herokuapp.com/api/autorization/registration',user);
                if(res.data.data.status == 200){
                    this.$store.commit('setUser',res.data.data.user);
                    localStorage.setItem('user',JSON.stringify(res.data.data.user));
                    
                    this.$router.push('/')
                }
                else{
                    this.error = res.data.data.message;
                }
            }
        },
        async login(){
            if(this.password && this.nickname){
                let user = {
                    password:this.password,
                    nickname:this.nickname
                }
                let res = await axios.post('https://dino-back.herokuapp.com/api/autorization/login',user);
                if(res.data.data.status == 200){
                    this.$store.commit('setUser',res.data.data.user);
                    localStorage.setItem('user',JSON.stringify(res.data.data.user));
                    this.$router.push('/')
                }
                else{
                    this.error = res.data.data.message;
                }
            }
        }
    },created(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
       this.$store.commit('setUser',user);
       this.$router.push('/')
    }else{
      this.$router.push('login')
    }
  },
}
</script>
<style scoped>
.login-container{
    display: flex;
    align-items: center;
    width:100%;
    height: 100%;
    flex-direction: column;
    padding-top: 10vh;
}
.register-link{
    color:darkblue;
    cursor:pointer
}
.error{
    color:red
}
</style>