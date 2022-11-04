const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ckrddue.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const productCollection = client.db('emaJohn').collection('products')
        app.get('/products', async(req, res) =>{
            const page = parseInt(req.query.page)
            const size = parseInt(req.query.size)
            console.log(page, size)
            const quary = {}
            const cursor = productCollection.find(quary)
            const products = await cursor.skip(page*size).limit(size).toArray()
            const count = await productCollection.estimatedDocumentCount()
            res.send({count,products})
        })

    }
    finally{

    }
}
run().catch(error => console.error(error))




app.use('/', (req, res)=>{
    res.send('api is running')
})
app.listen(port , (req, res) =>{
    console.log('api is running on', port)
})