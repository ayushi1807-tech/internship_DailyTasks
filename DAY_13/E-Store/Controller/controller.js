import Customer from "../Model/Customer.js"
import Order from "../Model/Order.js"
import Product from "../Model/Product.js"
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import mongoose from "mongoose"
import { response } from "express"


//Create , Delete and Update User 
const createUser = async (req, res) => { 
    const { name, email, password, phone, address } = req.body;
    const customer = await Customer.create({ name, email, password, phone, address })
    
    const accessToken = jwt.sign(
        {customerId : customer._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
    )

    const refreshToken = jwt.sign(
        {customerId:customer._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"7d"}
    )

    customer.refreshToken = refreshToken
    await customer.save()
     res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
 
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
    
    return res.json({ message: customer })

}

const deleteUser =  async(req,res)=>{
    const name = req.params.name
    const findname = await Customer.findOne({name})
    if(!findname) return res.status(404).json({message:"Customer not found"})
    const deleteByName = await Customer.deleteOne(
        { name: req.params.name},
        req.body,
        {new: true}    
    )
    res.json({message:"user Deleted Successfully", deleteByName})
}

const updateUser = async (req, res) => {
    const name = req.params.name
    const findname = await Customer.findOne({name})
    if(!findname) return res.status(404).json({message:"Customer not found"})
    const updateName = await Customer.findOneAndUpdate(
        { name: req.params.name},
        req.body,
        {new: true}    
    )
    res.json({message:"User Updated Successfully",updateName})
}

const cart = async (req, res) => {
    const cartdata = await Order.find({ c_id: req.params.c_id})
    res.json({message: cartdata})
}
  

// Create , Delete and Update Product

const productCreate = async (req,res)=>{
    console.log(req.body)
    const { p_name,p_category, p_desc, p_price, p_stock } = req.body;
    const product = await Product.create({ p_name, p_category, p_desc, p_price, p_stock })
    return res.json({ message:"Product Created Successfully", product })
}

const productDelete = async (req, res) => {
    const id = req.params._id
    const p_id = await Product.findOne({id})
    if(!p_id) return res.status(404).json({message:"product not found"})
    const deletebyid = await Product.deleteOne(
        { name: req.params._id},
        req.body,
        {new: true}    
    )
    res.json({message:"Product Deleted Successfully",deletebyid})
}

const updateProduct = async (req, res) => {
    const name = req.params.p_name
    const findname = await Product.findOne({name})
    if(!findname) return res.status(404).json({message:"Customer not found"})
    const updateName = await Product.findOneAndUpdate(
        { name: req.params.p_name},
        req.body,
        {new: true}    
    )
    res.json({message:"Product Updated Successfully",updateName})
}


// Create and Delete Order 

// const orderCreate = async (req,res)=>{
//     console.log(req.body)
//     const { c_id ,products, total_amount, order_date,order_status} = req.body;
//     const order = await Order.create({ c_id, products, total_amount, order_date, order_status })
//     return res.json({ message: "Order Created Successfully",order })
// }

const orderCreate = async (req, res) => {
    const { c_id, products, total_amount, order_date, order_status } = req.body;
    const customer = await Customer.findById(c_id).select('address');
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    const order = await Order.create({
        c_id,
        products,
        total_amount,
        order_date,
        order_status,
        address: customer.address 
    });

    return res.json({ message: "Order Created Successfully", order });
}


const orderDelete = async (req,res)=>{
    const  c_id  = req.params.c_id;
    const orderDel = await Order.findOne({ c_id})
    if(!orderDel) return res.status(404).json({message:"order not found"})
    const deletebyid = await Order.deleteOne(
        { name: req.params.c_id},
        req.body,
        {new: true}    
    )
    return res.json({ message:"Your order has been Deleted SuccessFully", deletebyid })
}




// Login user with email and password
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    const customer = await Customer.findOne({email}).select("-password -refreshToken")
    if(!customer){
        return res.status(404).json({message:"customer Not Found"})
    }else{
        const accessToken = jwt.sign(
        {customerId : customer._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
    )

    const refreshToken = jwt.sign(
        {customerId:customer._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"7d"}
    )

        return res.json({message:customer ,accessToken, refreshToken})
    }
}


// Logout User with name and email
const logout = async (req, res) => {
    const { email } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
        return res.status(404).json({ message: "customer Not Found" });
    } else {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        return res.json({ message: "Logged out successfully" });
    }
}

const month_sales = async (req, res)=>{
    try {
            const sales = await Order.aggregate([
            {
                $group:{
                    _id:{
                        month:{ $month: "$order_date" }
                    },
                    total_sales:{$sum: "$total_amount"}
                }
            },
            {$sort:{"_id.month":1}}
        ])
        res.json(sales)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sales data" });
    }
}

const cust_order = async (req, res) => {
  try {
    const cust_id = req.params.c_id;
    if (!mongoose.Types.ObjectId.isValid(cust_id)) {
      return res.status(400).json({ error: "Invalid customer id" });
    }
 
    const orders = await Order.aggregate([
      {
        $match: { c_id: new mongoose.Types.ObjectId(cust_id) }
      },
      {
        $group: {
          _id: "$c_id",
          total_orders: { $sum: 1 }
        }
      }
    ]);
 
    res.json({ message: "No. of orders for this customer", orders });
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const topSellingProducts = async (req, res) => {
  try {
    const products = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.p_id",
          totalSold: { $sum: "$products.order_qty" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          productId: "$productDetails._id",
          name: "$productDetails.p_name",
          totalSold: 1
        }
      }
    ]);
    
    res.json({ topProducts: products });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top selling products" });
  }
};

const averageOrderValue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          avgOrderValue: { $avg: "$total_amount" }
        }
      }
    ]);
    res.json({ averageOrderValue: result[0]?.avgOrderValue || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate average order value" });
  }
};

export { createUser , productCreate,orderCreate,loginUser,logout,orderDelete,
productDelete,deleteUser,updateUser,updateProduct,cart,
month_sales,cust_order,topSellingProducts,averageOrderValue}  

//                                                 