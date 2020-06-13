const express = require("express");
const router = express.Router()

router.post("/",(req,res)=>{
req.session.login = false ;
req.session.user = null ;
res.redirect("/");
})

module.exports=router;