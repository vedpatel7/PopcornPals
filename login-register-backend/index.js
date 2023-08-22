const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Create an instance of the Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.static(path.join(__dirname, "public")));


const videoFileMap={
    'cdn':'videos/cdn.mp4',
    'generate-pass':'videos/generate-pass.mp4',
    'get-post':'videos/get-post.mp4',
}

mongoose.connect("mongodb://127.0.0.1:27017/userDB"
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected Successfully'))
.catch (error => console.log(error));

const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String
})

const User= mongoose.model("User",userSchema)



app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (password === user.password) {
            res.send({ message: "Login successful", user: user });
          } else {
            res.send({ message: "Incorrect password" });
          }
        } else {
          res.send({ message: "User not found" });
        }
      })
      .catch((err) => {
        console.error("Error checking user:", err);
        res.status(500).send("Internal Server Error");
      });
  });
  

app.post("/register", (req,res)=>{
    const{name,email, password}=req.body

    User.findOne({email:email})
    .then((user)=>{
        if(user)
        res.send({message:"user already registered"})

        else
        {
            const user = new User({
                name: name,
                email: email,
                password: password
            })
            user.save()
            .then(() => {
                res.send({ message: "Successfully registered" });
            })
            .catch((err) => {
                console.error("Error registering user:", err);
                res.status(500).send("Internal Server Error");
            });
        }

    })
    .catch(function(err)
    {
        console.log(err)
    })
   
})

app.get('/videos/:filename', (req, res)=>{
    const fileName = req.params.filename;
    const filePath = videoFileMap[fileName]
    if(!filePath){
        return res.status(404).send('File not found')
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if(range){
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(206, head);
        file.pipe(res);
    }
    else{
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res)
    }
})


app.listen(9002,()=>{
    console.log("Started on port 9002")
})