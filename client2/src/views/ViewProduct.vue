<template>
    <div>
        <div class="container">
            <div class="info-block">
                <img class="mb-20 image" :src="product.imageUrl" alt="">
                <div>
                    <h1 class="mb-10">{{product.title}}</h1>
                    <h3 class="mb-20">Ціна - договірна</h3>
                    <h3 class="mb-20">ID товару: {{product.data}}</h3>
                    <h3 style="line-height:140%" class="mb-20">Контактна інформація для оформлення покупки:<br/>
                    Email: example@email.com<br/>
                    Phone: +380994356257
                    </h3>
                </div>
            </div>
            <h3 style="text-align:center">Опис товару</h3>
            <div class="description">{{product.description}}</div>
            <button v-if="user && user.isSuperuser" @click="product_modal_active=true" class="delete">Редагувати статтю</button>
            <div class="comment-block">
                <h2 v-if="product.comments">Коментарії</h2>
                <div v-if="user">
                    <textarea v-model="comment" class="comment-body" name="" id="" cols="30" rows="10"></textarea>
                    <button @click="commentproduct()" class="comment dino-btn mb-20">Коментувати</button>
                </div>
                <div v-for="(comment,index) in product.comments" :key="index" class="comment-item mb-10">
                    <div class="comment-item-body">
                        <h3>{{comment.nickname}}</h3>
                        <h5>{{comment.comment}}</h5>
                    </div>
                    <button @click="deleteComment(comment.date)" v-if="user && user.isSuperuser" class="delete"> Видалити</button>
                </div>
            </div>
        </div>
        <div v-if="product_modal_active" class="update-product-modal">
            <CreateProductForm :product="product" @fail="product_modal_active=false" @updated="product_modal_active=false,getproduct()" :update="true"/>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

import CreateProductForm from "../components/CreateProductForm.vue"

export default {
    components:{
        CreateProductForm
    },
    data:()=>{
        return {
            product:null,
            comment:null,
            product_modal_active:false
        }
    },
    methods:{
         async getproduct(){
            let product = await axios.get('/api/products/product'+this.$route.params.id);
            this.product = product.data;
        },
        async commentproduct(){
            await axios.product('/api/products/comment', {id:this.$route.params.id,nickname:this.user.nickname,comment:this.comment});
            this.getproduct();
        },
        async deleteComment(date){
            await axios.product('/api/products/delete_comment', {date,id:this.$route.params.id});
            this.getproduct();
        },
        async updateproduct(){

        }
    },
    created(){
        this.getproduct();
    },

}
</script>
<style scoped>
.image{
    width:40%;
    height:50vh;
    object-fit: cover;
    margin-right: 2vh;
}

.delete{
    width:10%
}

.update-product-modal{
    width:100vw;
    height:100vh;
    position: fixed;
    top:0;
    left:0;
    z-index: 10;
    background: rgba(255, 200, 80, 0.884);
    backdrop-filter: blur(10px);
    padding: 10vh;
    box-sizing: border-box;
}
.info-block{
    display: flex;
    align-items: flex-start;
}
.description{
    width:100%;
    text-align: left;
    font-size: 3vh;
}

</style>