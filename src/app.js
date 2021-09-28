const express = require("express");
const path = require("path");
require("./db/conn");
const user = require("./models/usermessage")
const hbs = require("hbs");
const {registerPartials} = require("hbs");
const User = require("./models/usermessage");

const app = express(); //all the methods and prop of express are now avail in app var too.
const port = process.env.PORT || 3000; //to get the port no. , the def. port is set to 3000

//setting the path
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");


//middleware
app.use('/CSS',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false})) //to get userData from form
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

//routing
//app.get(path,callback)
app.get("/",(req,res) => {   //req,res : both are objects
    res.render("index");
    //res.send("hi I am Ironman");
})

app.post("/contact", async(req,res) =>{
    try{
        //res.send(req.body);
        const userData = new User(req.body);  //'User'=>Collection name defined in usermessage.js page
        await userData.save();  //saving the userData document
        res.status(201).render("index");  // render:show, // 201: if something is created.
    } 
    catch(error){
        //res.status(500).send(error); //500: server error
    }
});

//server creation
app.listen( port, () => {
    console.log(`server is running at port no. ${port}`) //template litrel is used.
});