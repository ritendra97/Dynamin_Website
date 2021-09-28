const mongoose = require("mongoose");

//creating a database
mongoose.connect("mongodb://localhost:27017/dynamic_website", {
useCreateIndex:true,
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Successful");
}).catch((error)=>{
    console.log(error);
})