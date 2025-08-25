import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    c_id:{type:mongoose.Schema.Types.ObjectId, ref:"Customer"},
    products:[
       {
         p_id:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
         order_qty:{type:Number,required:true},
         price:{type:String,required:true}                                                   
       }
    ],
    
address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
},

    
    total_amount:{type:Number,required:true},
    order_date:{type:Date,default:Date.now()},
    order_status:{type:String, enum:["Pending","Completed","Cancelled"]}
})

export default mongoose.model("Order",orderSchema)