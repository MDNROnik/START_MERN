const express = require('express')
const cors = require('cors')
const mongodb = require('mongodb')
const dotenv = require('dotenv')
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



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
    const jobsCollection = database.collection('job');
    const jobApplicationCollection = database.collection('jobapplication');
    const usersCollection = database.collection('users');

    // Post a job
    app.post('/jobs', async (req, res) => {
      const job = req.body;
      const result = await jobsCollection.insertOne(job);
      res.send(result);
    })

    // Get all jobs
    app.get('/jobs', async (req, res) => {
      const cursor = jobsCollection.find({});
      const jobs = await cursor.toArray();
      res.send(jobs);
    })
  
    // Get a job by id
    app.get('/jobdetails/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const job = await jobsCollection.findOne(query);
      res.send(job);
    })

    //Post a job application
    app.post('/job-application', async (req, res) => {
      const application = req.body;
      const result = await jobApplicationCollection.insertOne(application);
      res.send(result);
    })

    // Get a job application by id
    app.get('/job-application/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const application = await jobApplicationCollection.findOne(query);
      res.send(application);
    })

    // Get all job applications
    app.get('/job-application', async (req, res) => {
      const cursor = jobApplicationCollection.find({});
      const applications = await cursor.toArray();
      res.send(applications);
    })
    




} finally {
    // Ensures that the client will close when you finish/error
    // await client.close();   
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

