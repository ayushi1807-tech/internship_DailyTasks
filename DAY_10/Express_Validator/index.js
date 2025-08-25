const express = require('express')
const app = express()
const {body,validationResult } = require('express-validator')

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({msg:"Welcome guyzzz"})
})

app.post('/',body('username').isLength({min:1}),(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    res.json({'data':req.body})
})

app.listen(3000,()=>{
    console.log(`Server is listening on http://localhost:3000`)
})