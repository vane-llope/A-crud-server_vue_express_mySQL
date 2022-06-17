const mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zahra5596864625",
    database: "contacts"
})



con.connect((err) => {
    if (err) console.log(err)
    console.log('connected to database!')
})

const create = async function (req, res) {
  var sql = 'INSERT INTO contact VALUES  ?'
    var values = [[,req.body.contact.shopname,req.body.contact.image, req.body.contact.name, req.body.contact.phone,
         req.body.contact.email, req.body.contact.idnumber, req.body.contact.state, req.body.contact.city, req.body.contact.address]]
    const result = await con.query(sql, [values], (err, result) => {
        if (err) console.log(err)
        else   console.log('User Added')
     
    })
    res.send('user added')
}

const remove =async function (req, res) {
    const id = req.params.id
    var sql = "DELETE FROM contact WHERE id = "+ id
    con.query(sql,(err,result) => {
      if(err) throw err
   else
    res.send('user deleted')
    })
}
//problem
const update =async function (req,res) {
    //console.log(req.body[0].name)
    var value = [req.body[0].shopname,req.body[0].image, req.body[0].name, req.body[0].phone,
        req.body[0].email, req.body[0].idnumber, req.body[0].state, req.body[0].city, req.body[0].address]
    var sql = "UPDATE contact SET shopname = ? ,image = ? , name = ? , phone = ? , email = ? , idnumber = ? , state = ? , city = ? , address = ?  WHERE id = "+req.body[0].id
    const result = await con.query(sql,value,(err,result) => {
      if(err) throw err
      res.send(result)
    })
}


const display = async function (req, res)  {
    var sql = 'select * from contact'
    con.query(sql, (err, result) => {
        res.send(result)
    })
}

const search =async function (req,res) {
    const id = req.params.id
    var sql ='SELECT * FROM contact WHERE id =  '+id
    const result = await con.query(sql,(err,result) => {
        if (err) throw err 
        res.send(result)
    })
}


module.exports = {
    create,
    remove,
    update,
    display,
    search,
}