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


app.listen(9002,()=>{
    console.log("Started on port 9002")
})