const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.user}:${process.env.passworld}@cluster0.tu3kffr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const app = express();

// for port deployment
const port = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json());

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

    const database = client.db("coffee_shop");
    const col = database.collection("coffee_list");

    const users=database.collection("users");

    //add coffee to database
    app.post('/addcoffee', async(req, res)=>{
      const newCoffee = req.body;
      console.log(newCoffee);
      const result = await col.insertOne(newCoffee);
      res.send(result);
    })

    //read coffees
    app.get('/coffee', async(req, res)=>{
      let users = col.find();
      users = await users.toArray();
      res.send(users);
    })

    // get a coffee
    app.get('/coffee/:id', async(req, res) => {
      let id = req.params.id;
      id = new ObjectId(id);
      const qu = {_id: id} 
      const result = await col.findOne(qu);
      res.send(result);
    })

    // update a coffee
    app.put('/coffee/:id', async(req, res) => {
      let id = req.params.id;
      id = new ObjectId(id);
      
      const updateCoffee = req.body;
      console.log('Catch Data ', id);
      console.log(updateCoffee);
      const qu = {_id: id} 
      const option = {upsert: true}
      const newCoffee = {
        $set:{
          name: updateCoffee.name,
          quantity: updateCoffee.quantity,
          supplier: updateCoffee.supplier,
          taste: updateCoffee.taste,
          price: updateCoffee.price,
          details: updateCoffee.details,
          photo: updateCoffee.photo,
        }
      }
      const result = await col.updateOne(qu, newCoffee, option)
      console.log(result);
      
      res.send(result)
    })

    // delete a coffee
    app.delete('/coffee/:id', async (req, res) => {
      let id = req.params.id;
      id = new ObjectId(id);      
      const qu = {_id: id} 
      const result = await col.deleteOne(qu);
      console.log(result);
      res.json(result)
    })


    //user related 
    //save user
    app.post('/users',async(req, res)=>{
      const newUser = req.body;
      console.log(newUser);
      const result = await users.insertOne(newUser);
      res.send(result);
    })

    //get all  user
    app.get('/users',async(req, res)=>{
      let user = users.find();
      allUsers = await user.toArray();
      console.log(allUsers);
      
      res.send(allUsers);
    })

    //update a user
    app.put('/users/:email',async(req, res)=>{
      let email = req.params.email;
      const filter = {email}
      const updateDoc = {
        $set:{
          lastSignInTime: req.body.lastSignInTime,
        }
      }
      const result = await users.updateOne(filter, updateDoc)
      console.log(result);
    
      res.send(result);
    })

    // delete a user
    app.delete('/users/:id', async (req, res) => {
      let id = req.params.id;
      id = new ObjectId(id);      
      const qu = {_id: id} 
      const result = await users.deleteOne(qu);
      console.log(result);
      res.json(result)
    })
  
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send("coffee is running");
})

app.listen(port, () => {
    console.log(`Coffee listening on port ${port}`)
  })