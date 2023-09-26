const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");

var cors = require('cors'); 
app.use(cors())

app.use(bodyParser.json());

// mongoose.connect('mongodb+srv://hanniebeke47:Hannah_12345@cluster0.bkpcmwn.mongodb.net/')
mongoose.connect('mongodb://127.0.0.1:27017/TaskManagerApp')
  .then(() => console.log('Connected!'))
  .catch((err) => console.error(err.message))


const studentSchema = new mongoose.Schema(
 
  { 
    firstName : String,
    lastName : String,
    email: String,
    password: String,
  }

);

const taskSchema = new mongoose.Schema(
 
  { 
    taskName : String,
    taskDate : Date,
    taskTime: String,
    taskDescription: String
  }

);

const Student = mongoose.model('Student', studentSchema);
const Task = mongoose.model('Task', taskSchema);



app.post('/register', async (req, res) => {
  const {firstName, lastName, email, password} = req.body

 const user = await Student.findOne({email})
 if(user){
  console.log("User Exists")
  return res.status(400).json({error:'User Exists!'})

}

const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new Student({
    firstName,
    lastName,
    email,
    password : hashedPassword,
   
  });

  newUser.save()
  return res.status(200).json({message : "Registration Successful"})


 })



app.post('/login', async (req, res) => {
 const {email, password} = req.body
 const user =  await Student.findOne({email})

 const validated = await bcrypt.compare(password, user.password);
if(email == user.email && validated){

  console.log("Logged in Successfully")
  res.send({message:'Logged in Successfully', user : user})
}else{
  console.log("Wrong Credentials!")
  return res.status(400).json({error:'Wrong Credentials!'})

}
})


app.post('/create_task', async (req, res) => {
  const {email, password} = req.body
  const user =  await Student.findOne({email})
 
  const validated = await bcrypt.compare(password, user.password);
 if(email == user.email && validated){
 
   console.log("Logged in Successfully")
   res.send({message:'Logged in Successfully', user : user})
 }else{
   console.log("Wrong Credentials!")
   return res.status(400).json({error:'Wrong Credentials!'})
 
 }
 })


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8080)