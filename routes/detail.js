const express = require("express");
const fs = require("fs");
const router = express.Router()

router.get("/",(req,res)=>{
    if(req.session.login==true)
    {
    res.render("detail");
    }
    else
    res.send("Login To View");
})

router.post("/",(req,res)=>{
    var newUser = new Object();
    newUser.username = req.body.username ;
    newUser.password = req.body.password ;
    newUser.hospital = req.body.hospital ;
    newUser.address = req.body.address ;
    fs.readFile("user.json","utf8",(err,file)=>{
        var users = JSON.parse(file);
        users.forEach(mem=>{
            if(mem.username===req.session.user.username)
            {
                mem.username = newUser.username?newUser.username:mem.username;
                mem.password = newUser.password?newUser.password:mem.password;
                mem.hospital = newUser.hospital?newUser.hospital:mem.hospital;
                mem.address = newUser.address?newUser.address:mem.address;
                req.session.user = mem ;
            }
        })
        var data = JSON.stringify(users);
        fs.writeFile("user.json",data,(err)=>{
            if(err)
             console.log(err);
            else 
             res.redirect("/main");
    })
})
});

module.exports=router ;
