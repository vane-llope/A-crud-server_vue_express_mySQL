var express = require('express')
var app = express()
const cors = require('cors')
const controller = require('./controllers/controller.js')

//to form the post data
const bodyParser = require('body-parser');
//2 different ways:
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.urlencoded({ extended : true}))
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())


app.get('/contacts', controller.display)
app.get('/contacts/user/:id',controller.search)
app.post('/contacts/create',urlencodedParser,controller.create)
app.put('/contacts/edit/:id',jsonParser,controller.update)
//PROBLEM => can use delete 
app.get('/contacts/delete/:id',controller.remove)

app.use( (req,res) => {
    res.status(404).send('not Found')
})

app.listen(3000,()=>console.log('listening on port 3000'))





