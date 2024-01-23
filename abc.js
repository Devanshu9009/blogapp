const express=require("express")
const app=express()
const cors=require("cors")
require("./mongoose")
app.use(express.json())
app.use(cors())
const student=require("./blogModel")
const multer=require("multer")
app.use(express.static("public"))

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"public/uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null,file.originalname)
    }
});
const upload = multer({storage: storage}).single("pimage");
app.post("/",async(req,resp)=>
{
    upload(req,resp,async(err)=>
{
        const newimage=new student({
            name:req.body.name,
            image:"localhost:4000/uplodes/"+req.file.filename
        })
       newimage.save()
       resp.send("file upload")
        
    })
    // const data=new student(req.body)
    // const result=await data.save()
    // resp.send(result)
app.get("/",async(req,res)=>{
    const data = await student.find()
    res.send(data)
})
}).listen(4000)


