const express = require('express')
const router = express.Router()
const { SeederFunc,CreateUser,login} = require('../Controller/seeder')

router.route('/super_admin').get(SeederFunc)
router.route('/Admin').post(CreateUser)
router.route('/Login').post(login)
module.exports = router