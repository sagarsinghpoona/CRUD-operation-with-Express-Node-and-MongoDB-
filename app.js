require('dotenv').config();
const express = require("express");
const app = express()
const user = require('./models/usermodel');




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");



app.get("/", (req, res) => {
res.render("index");
});
app.get("/read", async(req, res) => {
    let users =await user.find();
    res.render("read",{users});
    });
    app.get('/delete/:id',async(req,res)=>{
        let users= await user.findOneAndDelete({_id:req.params.id});
        res.redirect("/read");
    });
app.get("/edit/:userid",async(req,res)=>{
    let boy = await user.findOne({_id:req.body.userid});
        
res.render("edit" ,{boy})
});

    app.post("/create", async(req,res)=>{
    let{name,email,image}= req.body;
    let usercreated = await user.create({
        name,
        email,
        image,
        
    });
    res.redirect("/read");
});


app.listen(3000);
