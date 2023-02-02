const express= require("express")
const app= express();
const port= 8000;
const cors = require("cors")
const fs= require("fs")
const {json} = require("body-parser")
const uuid=require("uuid")
const menuRouter = require("./routes/menu.route.js")
const userRouter= require("./routes/users.route.js")
const productRouter = require("./routes/product.route.js")

app.use(cors())
app.use(json())
app.use("/api",menuRouter)
app.use("/",userRouter)
app.use("/",productRouter)



app.listen(port,()=>{
    console.log("Server is running on" + port);
})