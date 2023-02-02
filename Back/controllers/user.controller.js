const uuid=require("uuid")
const fs= require("fs")


const file = process.cwd() + "/data/users.json";
const uniqueRandomID = uuid.v4()

exports.create=(req,res)=>{
    const {name} = req.body
    console.log(req.body)

    fs.readFile(file,"utf-8",(readErr,data)=>{
        if(readErr){
            res.json({status:"false",message: readErr})
        }

        const obj =data? JSON.parse(data):[]

        const newUser = {
            id:uniqueRandomID,
            name
        }

        obj.push(newUser)

        fs.writeFile(file,JSON.stringify(obj),(err)=>{
            if(err){
                res.json({status:"false",message:err})
            }

            res.json({status:true,result:obj})
        })
    })
}
exports.update = (req, res) => {
    const { id } = req.params;
    const {name} = req.body
    fs.readFile(file, "utf-8", (readErr, data) => {
      if (readErr) {
        return res.json({ status: false, message: readErr });
      }
  
      const parsedData = JSON.parse(data);
  
      const updateData = parsedData.map((userObj) => {
        if (userObj.id == id) {
          return { ...userObj, name};
        } else {
          return userObj;
        }
      });
  
      fs.writeFile(file, JSON.stringify(updateData), (writeErr) => {
        if (writeErr) {
          return res.json({ status: false, message: writeErr });
        }
  
        return res.json({ status: true, result: updateData });
      });
    });
  };

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

