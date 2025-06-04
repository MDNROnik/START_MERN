const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongodb = require('mongodb')
const jwt = require('jsonwebtoken');


const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tu3kffr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db(process.env.DB_NAME);
    const menuCollection = database.collection('menu');
    const reviewCollection = database.collection('review');
    const cartCollection = database.collection('cart');
    const userCollection = database.collection('user');

    //verfity token
    const verifyToken=(req,res, next)=>{
      console.log("inside verifyToken ",  req.headers);
      if(!req.headers.jwttoken){
        console.log('NOT FOUND TOKEN');
        
        return res.status(401).send({
          message : 'forbidden-access'
        })
      }
      else{
        console.log('FOUND TOKEN');
        const token = req.headers.jwttoken.split(' ')[1];
        // console.log(token);
        
        if(!token){
          console.log('TOKEN EMPTY');
          return res.status(401).send({
            message : 'forbidden-access'
          })
        }
        else{
          console.log('TOKEN HAVE VALUE');
          jwt.verify(token, process.env.JWT_SECRET, (error, decode)=>{
            if(error){
              console.log('TOKEN ERROR');
              return res.status(401).send({
                message : 'forbidden-access'
              })
            }
            else{
              console.log('TOKEN VALID');
              req.decode = decode;
              next();
            }
          })
        }
      }
      // next();
    }

    const verifyAdmin = async(req, res, next)=>{
      const id = req.decode.uid;
      const query = { uid: id };
      const result = await userCollection.findOne(query);
      if(result?.role == 'admin'){
        next();
      }
      else{
        return res.status(401).send({
          message : 'forbidden-access'
        })
      }
    }


    //jwt related auth apis
    //auth related APIS
    app.post('/jwt', async(req, res)=>{
      const user  = req.body;
      // console.log(user);
      const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '6h'});
      // res.cookie('token', token, {
      //   httpOnly: true, 
      //   secure: false, // set true for production https
      //   sameSite: 'lax',
      // })
      res.send({token});
    })

    //auth logout
    app.post('/logoutJwt', async(req, res)=>{
      res.clearCookie('token',{
        httpOnly:true,
        secure:false
      })
      // console.log(111111111);
      res.send({result: 'logout successfully'})
    })

    //post user
    app.post('/user', async(req, res)=>{
      const user = req.body;
      // console.log(user);
      //first check the user exit or not
      //check by user uid
      const query = {uid: user.uid};
      const response = await userCollection.findOne(query);
      if(response){
        return res.send({response: "user exit"});
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    //get users
    app.get('/user',verifyToken, verifyAdmin, async(req, res)=>{
      // console.log(req.headers);
      
      const result = await userCollection.find().toArray();
      res.send(result);
    })

    //get a user
    app.get('/user/:id' ,verifyToken, verifyAdmin , async(req, res)=>{
      const id = req.params.id;
      // res.send({mes:"IN"})
      if(id == req.decode.uid){
        const query = { uid: id };
        const result = await userCollection.findOne(query);
        return res.send(result);
      }
      else{
        return res.status(403).send({message: 'unauthorized access'})
      }
    })

    //delete user
    app.delete('/user/:id',verifyToken, verifyAdmin, async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
      // res.send({res:id})
    })

    //update user as admin or remove as admin
    app.patch('/user/admin/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = { _id: new mongodb.ObjectId(id) };
      const updatedDoc ={
        $set:{
          role:'admin'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    })

    //get menu
    app.get('/menu', async(req, res)=>{
      const result = await menuCollection.find().toArray();
      res.send(result);
    })

    // post menu
    app.post('/menu',verifyToken, verifyAdmin, async(req, res)=>{
      const menuItem = req.body;
      const result = await menuCollection.insertOne(menuItem);
      res.send(result);
    })

    // get review
    app.get('/review', async(req, res)=>{
      const result = await reviewCollection.find().toArray();
      res.send(result);
    })

    // post cart
    app.post('/cart', async(req, res)=>{
      const cart = req.body;
      const result = await cartCollection.insertOne(cart);
      res.send(result);
    })
    
    // get cart data
    app.get('/cart', async(req, res)=>{

      const userId = req.query.userId;
      const status = req.query.status;

      const query = { userId: userId };
      const result = await cartCollection.find(query).toArray();
      res.json(result);
    })

    // delete cart data by id
    app.delete('/cart/:id', async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    })





  
  
  
  
  
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("server is running for resturent");
});

app.listen(port, () => {
  console.log(`server in running on ${port}`);
});
