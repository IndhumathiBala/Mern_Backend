//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create restapi
router.post("/", (req, res) => {
let obj = req.body
//connect to mongodb
mcl.connect(url, (err, conn) => {
    if (err)
    console.log('Error in connection :- ', err)
    else {
    let db = conn.db("miniprj")
    db.collection('products').insertOne(obj, (err) => {
        if (err)
        res.json({ 'insert': 'Error ' + err })
        else {
        console.log("Data inserted")
        res.json({ 'insert': 'success' })
        conn.close()
    }
})
}
})
})
router.post("/createUser", (req, res) => {
    let obj = {
    userid:req.body.userid,
    uname: req.body.uname,
    upwd: req.body.upwd,
    email: req.body.email,
    address: req.body.address,
    contact: req.body.contact
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
    if (err)
    console.log('Error in connection :- ', err)
    else {
    let db = conn.db("miniprj")
    db.collection('users').insertOne(obj, (err) => {
    if (err)
    res.json({ 'userInsert': 'Error ' + err })
    else {
    console.log("User inserted")
    res.json({ 'userInsert': 'success' })
    conn.close()
    }
    })
    }
    })
    })

    router.post("/cartInsert", (req, res) => {
        // let obj = req.body
        let obj={
            p_id:req.body.p_id,
            p_cost:req.body.p_cost,
            p_img:req.body.p_img,
            uname:req.body.uname    
        }
        //connect to mongodb
        mcl.connect(url, (err, conn) => {
        if (err)
        console.log('Error in connection :- ', err)
        else {
        let db = conn.db("miniprj")
        db.collection('cart').insertOne(obj, (err) => {
        if (err)
        res.json({ 'cartInsert': 'Error ' + err })
        else {
        console.log("Product inserted")
        res.json({ 'productInsert': 'success' })
        conn.close()
        }
        })
        }
        })
        })
//export router
module.exports = router