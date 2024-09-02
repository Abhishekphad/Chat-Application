const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const chat=require("./models/chats");
const methodOverride=require("method-override");
const { log } = require("console");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


const port=8080;

main().then(()=>{
    console.log("Connection Successful");
}).catch((err)=>console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1=new chat({
//     from:"Abhishek",
//     to:"Balasaheb",
//     msg:"Hello",
//     created_at: new Date()
// })
// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })


app.get("/",(req,res)=>{
    res.send("Server is on");
});

// Index route
app.get("/chats",async(req,res)=>{
    let chats= await chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
});

// New Route
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
})


// Create route
app.post("/chats",(req,res)=>{
    let{from,to,msg}=req.body;
    let newChat= new chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
    console.log(newChat);
    res.redirect("/chats");
});

// Edit route
app.get("/chats/:id/edit", async (req, res) => {
    let id = req.params.id;
    let chatData = await chat.findById(id);
    res.render("edit.ejs", { chat:chatData });
});

// Update route
app.put("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let {msg: newMsg}=req.body;
    console.log(newMsg);
    let updatedChat=await chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true});
    console.log(updatedChat);
    res.redirect("/chats");
});

// Delete route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deleted = await chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

app.listen(port,()=>{
    console.log(`Server is listning on port: ${port}`);
})
