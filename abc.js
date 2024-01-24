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
const upload = multer({storage: storage}).single("bimage");
app.post("/",async(req,resp)=>
{
    upload(req,resp,async(err)=>
{
        const newimage=new student({
            bid:req.body.bid,
            bname:req.body.bname,
            bdesc:req.body.bdesc,
            bcat:req.body.bcat,
            bimage:"localhost:4000/uploads/"+req.file.filename
        })
       newimage.save()
       resp.send("file upload")
        
    })
})
    // const data=new student(req.body)
    // const result=await data.save()
    // resp.send(result)
app.get("/",async(req,res)=>{
    let data = await student.find()
    res.send(data)
})

app.listen(4000)


