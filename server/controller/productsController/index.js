const Product = require("../../db/models/product");

async function createproduct(product,path){
    const { title,description,price,category} = product;
    const newproduct = {
        title,
        description:description,
        imageUrl:path,
        category,
        data:Date.now()
    };
    const newproductDB = new Product(newproduct);
    await newproductDB.save();
    return {
        data: {
        status: 200,
        message: "created",
        },
    };
}
async function updateproduct(product,path){
    const { id,title ,description,category} = product;
    const newproduct = {
        title,
        description,
        category
    };
    if(path){
        newproduct.imageUrl = path;
    }
    await Product.updateOne({_id:id},newproduct);
    return {
        data: {
        status: 200,
        message: "updated",
        },
    };
}
async function getAllproducts(){
    const products = await Product.find();
    return products;
}
async function getproduct(params){
    const product = await Product.findById(params.id);
    return product;
}

async function deleteProduct(id){
    let product = await Product.deleteOne({_id:id});
    return product;
}

module.exports = {
    createproduct,
    getAllproducts,
    getproduct,
    deleteProduct,
    updateproduct
};