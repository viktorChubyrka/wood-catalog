<template>
    <div class="create-product-form">
        <h5>Назва товару</h5>
        <input v-model="title" class="mb-10" type="text">
        <h5>Категорія товару</h5>
        <select name="" v-model="category" id="">
            <option value="Заготовки">Заготовки</option> 
            <option value="Дрова">Дрова</option> 
            <option value="Брикет">Брикет</option> 
        </select>
        <h5 v-if="!update">Фото товару</h5>
        <h5 v-else>Змінити фото товару</h5>
        <input  class="mb-10" id="file-input" type="file">
        <h5>Опис товару</h5>
        <textarea v-model="description" class="mb-10" name="" id="" cols="30" rows="10"></textarea>
        <button v-if="!update" @click="createProduct()">Створити товар</button>
        <button class="mb-10" v-else @click="updateProduct()">Редагувати товар</button>
        <button v-if="update" @click="$emit('fail')">Відмінити редагування</button>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:{
        update:{
            type:Boolean,
            default:false
        },
        product:{
            type:Object,
            default:()=>{}
        }
    },
    data:()=>{
        return{
            title:null,
            description:null,
            category:''
        }
    },
    created(){
        if(this.update){
            this.title = this.product.title;
            this.description = this.product.description;
            this.category = this.product.category;
        }
    },
    methods:{
        async createProduct(){
            var image = document.getElementById("file-input").files[0];
            if(this.title && this.description && image &&  this.category){
                var formData = new FormData();
                formData.append("file", image);
                formData.append('title',this.title);
                formData.append('category',this.category);
                formData.append("description",this.description);
                let res = await axios.post('http://localhost:3000/api/products/create',formData);
                if(res.data.data.status == 200){
                    this.$emit('created')
                }else{
                    this.$emit('fail')
                }
            }
        },
        async updateProduct(){
            var image = document.getElementById("file-input").files[0];
            var formData = new FormData();
            if(image){
                formData.append("file", image);
            }
            if(this.title && this.description && this.category){
                formData.append('id',this.product._id);
                formData.append('title',this.title);
                formData.append('category',this.category);
                formData.append("description",this.description);
                let res = await axios.post('http://localhost:3000/api/products/update',formData);
                if(res.data.data.status == 200){
                    this.$emit('updated')
                }else{
                    this.$emit('fail')
                }
            }
        }
    }
}
</script>
<style scoped>
.create-product-form{
    display: flex;
    flex-direction: column;
}
</style>