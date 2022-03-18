const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://moi:password_secured@cluster0.4g2yc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const app = express();
const User=mongoose.model('User',{name:String, password:String})

app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())
app.use('/login', (req, res) => {
    User.find({name:req.body.username,password:req.body.password}, (err,docs)=>{
      if(err){
        console.log(err);
      }
      else{
        if(docs.length!==0){
          res.send({
            token: 'test123',
            loggedIn: true
          });
        }
        else{
          res.send({
            loggedIn: false
          })
        }
      }
    })
    
  });

app.use('/register', (req,res)=>{
    const { username, password } = req.body;
    console.log(username)
    const docs= User.find({name:username}, (err,docs)=>{
      if(err){
        console.log(err);
      }
      else{
        if(docs.length===0){
          const user= new User({name:username,password:password})
          
          user.save()
          res.send({
            isSaved: true
          });
        }
        else{
          res.send({
            isSaved:false
          });
        }
      }
    })
  });
app.use('/users',(req,res)=>{
  const all_users= User.find({},(err,docs)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(docs);
    }
  })
});
app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));  