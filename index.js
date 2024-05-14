import express from "express"
import cors from "cors"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"

const app = express()

//multer middleware

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
})

// multer config

const upload = multer({storage: storage})

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
        credentials: true
    })
)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*") //watch it
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
    );
    next()
})

app.use(express.json())
app.use(express.urlencoded({extendes:true}))
app.use("/uploads", express.static("uploads"))

app.get('/', function(req, res){
    res.json({message: "Hello user"})
})

app.post("/upload", upload.single('file'), function(req, res){
    console.log("file uploaded")
})

app.listen(3000,function(){
    console.log("App is listening at port 3000...")
})