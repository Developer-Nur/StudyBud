const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middle were
app.use(cors({
    origin: ['http://localhost:5173',
        'https://study-bud-87051.web.app',
        'https://study-bud-87051.firebaseapp.com',
    ],
    credentials: true,
}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3mw13ci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // await client.connect();

        const assignmentCollections = client.db("assignmentDB").collection("allAssignment");
        const pendingCollections = client.db("assignmentDB").collection("pending");
        const mysubmittedCollections = client.db("assignmentDB").collection("submitted");

        // post an assignment to the server (api)
        app.post('/addassignment', async (req, res) => {
            const data = req.body;
            const result = await assignmentCollections.insertOne(data);
            res.send(result);
        })

        // all assignment data api
        app.get('/allassignmens', async (req, res) => {
            const cursor = assignmentCollections.find();
            const result = await cursor.toArray()
            res.send(result)
        })

        // get filtered assignment data api
        app.get('/allassignment-filter', async (req, res) => {
            const filter = req.query.filter;
            const result = await assignmentCollections.find({ difficulty: filter }).toArray();
            res.send(result)
        })


        // delete item api
        app.delete('/deleteassignment/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await assignmentCollections.deleteOne(query)
            res.send(result);
            // console.log(result);
        })


        // get single item for update Api
        app.get('/allassignmens/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await assignmentCollections.findOne(query)
            res.send(result);
            // console.log(result);
        })

        // Update an item, api
        app.put('/update-item/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }

            const options = { upsert: true };
            const assignmentItem = req.body;
            const updateDoc = {
                $set: {
                    title: assignmentItem.title,
                    image: assignmentItem.image,
                    marks: assignmentItem.marks,
                    dueDate: assignmentItem.dueDate,
                    difficulty: assignmentItem.difficulty,
                    description: assignmentItem.description,
                },
            };

            const result = await assignmentCollections.updateOne(filter, updateDoc, options);

            res.send(result)
        })

        // Api for assignment that are taken but on pending
        app.post('/pending-assignments', async (req, res) => {
            const data = req.body;
            const result = await pendingCollections.insertOne(data);
            res.send(result);
            // console.log(result)
        })

        // get all pending assignment data (api)
        app.get('/all-pending-assignments', async (req, res) => {
            const cursor = pendingCollections.find({ status: { $ne: "completed" } });
            const result = await cursor.toArray();
            res.send(result);
        });

        // give marks to pending assignment api
        app.put('/give-marks/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }

            const options = { upsert: true };
            const markeGivenItem = req.body;
            const updateDoc = {
                $set: {
                    obtainedMarks: markeGivenItem.obtainedMarks,
                    feedback: markeGivenItem.feedback,
                    status: markeGivenItem.status,
                    examinerEmail: markeGivenItem.examinerEmail,
                },
            };
            const result = await pendingCollections.updateOne(filter, updateDoc, options);
            res.send(result);
        })


        // Api for assignment that are taken but on pending
        app.get('/submit-assignments', async (req, res) => {
            const userEmail = req.query.email;
            const result = await pendingCollections.find({ email: userEmail }).toArray();
            res.send(result)
        })













        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("StudyBud")
})

app.listen(port, () => {
    console.log("StudyBud is running on port 500");
})