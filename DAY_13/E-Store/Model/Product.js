import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    p_name:{type:String,required:true},
    p_category:{type:String,required:true},
    p_desc:{type:String,required:true},
    p_price:{type:Number,required:true},
    p_stock:{type:Number,required:true},
})

export default mongoose.model("Product",productSchema)