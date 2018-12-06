const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatekit-server')


const app = express()

const chatkit =new Chatkit.default({
  appId: '664115',
  key: '25840b3e7a4367938027',
  secret: '72c1d5286b343ae2700e',
  cluster: 'ap2',
  encrypted: true
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users',(req ,res) =>{
  const {username} = req.body
  chatkit.createUser({
    name:username,
    id: username
  })
  .then(() => res.sendStatus(201))
  .catch((error =>{
    if(error.error_type === 'services/chatkit/user_already_exists'){
      res.sendStatus(200)
    }else{
      res.status(error.statusCode).json(error)
    }
  }))
})   

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})

