//create express app
const exp=require('express')
const app=exp();
const path = require("path")

//connecting build of react with current server
app.use(exp.static(path.join(__dirname,'./build')))


//import apis
const userApi=require("./APIS/users-api")
const adminApi=require("./APIS/admin-api")
const productApi=require("./APIS/product-api")
//const productApi=require("./APIS/products-api")

//db connectivity
//import mongo client
const mongoClient = require("mongodb").MongoClient;

//db connection url
const dburl="mongodb+srv://spandu:R.Span@1234@javapoint.64azt.mongodb.net/cdb21dx003db?retryWrites=true&w=majority"
//database obj
//let userCollectionObject;

//let databaseObject;
//connect with mongodb server
mongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("err in db connect ",err)
    }
    else{
        //create database object
        let databaseObject=client.db("cdb21dx003db")
        //create user collection object
        let userCollectionObject=databaseObject.collection("usercollection")
        let adminCollectionObject=databaseObject.collection("admincollection")
        let productCollectionObject=databaseObject.collection("productcollection")

        //sharing db collection objects
        app.set("userCollectionObject",userCollectionObject)
        app.set("adminCollectionObject",adminCollectionObject)
        app.set("productCollectionObject",productCollectionObject)

        console.log("DB connection success")


    }
})














//execute specific api based on path
app.use('/user',userApi)
app.use('/admin',adminApi)
app.use('/product',productApi)


//app.use('/product',productApi)

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

//handle invalid path
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})
//handle servers
app.use((err,req,res,next)=>{
  console.log(err)
  res.send({message:err.message})
})







//assign port 
app.listen(8080,()=>{
    console.log(`server on 8080......`)
})