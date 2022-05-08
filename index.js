const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middlewar

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j8ljx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run () {
    try{
        await client.connect()
        const inventoryCollection =client.db('motorHouse').collection('inventory')

        app.get('/inventory',async(req,res)=>{
            const query ={}
            const cursor = inventoryCollection.find(query)
            const inventories = await cursor.toArray();
            res.send(inventories)
        });
        app.get ('/inventory/:_id',  async(req,res)=>{
            const id = req.params._id
            console.log(id)
            const query = {_id:ObjectId(id)}
            const inventory = await inventoryCollection.findOne(query)
            res.send(inventory);
        }) ;        
       
        

    }

    finally{
    
    }
}
run().catch(console.dir)


app.get('/',(req,res)=>{
    res.send('running the server')
})


app.listen(port,()=>{
    console.log('listening to warhouse server')
})