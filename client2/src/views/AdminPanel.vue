<template>
    <div >
        <div v-if="show" >
            <div class="container">
                <div  class="page-head mb-20">
                    <span   @click="create_product=!create_product" class="create-product">Створити товар</span>
                </div>
                <CreateproductForm class="mb-10" @created="create_product=false,getAllProduct()" @fail="create_product=false" v-if="create_product"/>
                <CreateproductForm class="mb-10" @updated="product_for_update=null,getAllProduct()" :update="true" :product="product_for_update" @fail="product_for_update=null" v-if="product_for_update"/>

                <input v-model="filter" type="text" class="search mb-20" placeholder="Пошук">
                <div class="category-tabs">
                    <span :class="selected_category=='Заготовки'?'active':''" @click="selected_category = 'Заготовки' " >Заготовки</span> |
                    <span :class="selected_category=='Дрова'?'active':''" @click="selected_category = 'Дрова' ">Дрова</span> |
                    <span :class="selected_category=='Брикет'?'active':''" @click="selected_category = 'Брикет' " >Брикет</span> 
                </div>
                
                <div class="catalogue-list">
                    <div  v-for="product in filteredProduct" :key="product._id" class="mb-20 product-item">
                        <img :src="product.imageUrl" alt="">
                        <div class="info-block">
                            <h3 class="title">{{product.title}}</h3>
                        </div>
                        <button @click="deleteProduct(product._id)">Видалити товар</button>
                        <button @click="product_for_update = product">Редагувати товар</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import CreateproductForm from "../components/CreateProductForm.vue"

import axios from 'axios'
export default {
    data:()=>{
        return{
            create_product:false,
            message:null,
            product:null,
            filter:'',
            selected_category:'Заготовки',
            product_for_update:"",
            show:false
        }
    },
    components:{CreateproductForm},
    created(){
        let pass = prompt('Пароль від адмін панелі:', );
        if(pass!='admin'){
            window.location.reload()
        }else{
            setTimeout(()=>this.show = true,1000)
        }
        this.getAllProduct();
    },
    computed:{
        user(){
            return this.$store.getters.user;
        },
        filteredProduct(){
            if(this.product){
                let products = this.product.filter((el)=> el.title.toLowerCase().includes(this.filter.toLowerCase()));
                return products.filter(el=>el.category==this.selected_category);
            }
            else return []
            
        }
    },
    methods:{
        async getAllProduct(){
            let product = await axios.get('/api/products/all_products');
            this.product = product.data.reverse();
        },
        goToproduct(productId){
            this.$router.push(`/product${productId}`)
        },
        async deleteProduct(id){
             await axios.post('/api/products/delete',{id});
             this.getAllProduct();
        }
       
    }
}
</script>
<style scoped>
.page-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.create-product{
    font-size: 3vh;
    cursor: pointer;
    border-radius: 2vh;
    padding:0 1vh;
    transition: background 0.5s;
}
.create-product:hover{
    background: white;
}
.product-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    width:calc((100% - 4vh) / 3 );
    transition: background 0.5s;
    border-radius: 2vh;
    padding: 2vh;
    box-sizing: border-box;
    margin-right: 2vh;
}
.product-item:nth-child(3n){
    margin-right: 0;
}
.product-item:hover{
    background: rgba(255, 255, 255, 0.664);
}
.product-item img{
    width:100%;
    height: 20vh;
    object-fit: cover;
}
.search{
    width:100%;
    height:5vh;
    border-radius:2vh;
    border:none;
    padding: 0 3vh;
    box-sizing: border-box;
    font-size: 3vh;
}
.search:focus{
    outline: none;
}.sorting-container{
    display: flex;
    justify-content: space-between;
}
.sort-btn-container{
    display: flex;
    flex-direction: column;
}
.catalogue-list{
    width:100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}
.info-block{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top:2vh;
}
.info-block h3{
    width:100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;display:
     -webkit-box;
}

.category-tabs{
    margin:2vh 0
}
.category-tabs span{
    font-size: 3vh;
    color: grey;
    cursor: pointer;
    margin:0 2vh;   
}
.category-tabs span.active{
    color:black
}
</style>