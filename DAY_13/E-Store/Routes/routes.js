import express from "express"
const router = express.Router()
import {createUser,productCreate,orderCreate,orderDelete,loginUser,logout,
productDelete,deleteUser,updateUser,updateProduct,
cart,month_sales,cust_order,topSellingProducts,averageOrderValue} from "../Controller/controller.js"

router.route('/createCustomer').post(createUser)
router.route('/DeleteCustomer/:name').delete(deleteUser)
router.route('/updateCustomer/:name').patch(updateUser)
router.route('/Cart_customer/:c_id').get(cart)


router.route('/createProduct').post(productCreate)
router.route('/productDelete/:id').delete(productDelete)
router.route('/productUpdate/:name').patch(updateProduct)

router.route('/createOrder').post(orderCreate)
router.route('/orderDelete/:c_id').delete(orderDelete)

router.route('/login').post(loginUser)
router.route('/logout').post(logout)

router.route('/sales_month').get(month_sales)
router.route('/Orders_per_customer/:c_id').get(cust_order)
router.route('/topSellingProducts').get(topSellingProducts)
router.route('/average_order_value').get(averageOrderValue)



export default router
