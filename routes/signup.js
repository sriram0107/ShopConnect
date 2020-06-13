const express = require("express");
const fs = require("fs");
const router = express.Router()

router.post("/",(req,res)=>{
    res.render("signup");
})


module.exports=router;