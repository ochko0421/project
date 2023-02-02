
const fs= require("fs")


const file = process.cwd() + "/data/products.json";


exports.create=(req,res)=>{
    const {price,id,title,description,category,image,rating,rate,count} = req.body
    console.log(req.body)

    fs.readFile(file,"utf-8",(readErr,data)=>{
        if(readErr){
            res.json({status:"false",message: readErr})
        }

        const productObj =data? JSON.parse(data):[]

        const newProduct = {
            price,
            id,
            title,
            description,
            category,
            image,
            rating,
            rate,
            count
        }

        productObj.push(newProduct)

        fs.writeFile(file,JSON.stringify(productObj),(err)=>{
            if(err){
                res.json({status:"false",message:err})
            }

            res.json({status:true,result:productObj})
        })
    })
}

exports.getAll=(req,res)=>{
    fs.readFile(file,"utf-8",(readErr,data)=>{
        if(readErr){
            res.json({status:"false",message: readErr})
        }

        const obj =data? JSON.parse(data):[]
        res.json({status:true,result:obj})
    })
}

exports.delete=(req,res)=>{

    const {id} = req.params;
    fs.readFile(file,"utf-8",(readErr,data)=>{
        if(readErr){
            res.json({status:"false",message: readErr})
        }

        const obj =data? JSON.parse(data):[]
       const newArr= obj.filter((e)=>{

           return e.id != id
        })

        fs.writeFile(file,JSON.stringify(newArr),(err)=>{
            if(err){
                res.json({status:"false",message:err})
            }

            res.json({status:true,result:newArr})
        })

        res.json({status:true,result:newArr})
    })
}

