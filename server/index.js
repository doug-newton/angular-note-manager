require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
const path = require('path')

if (process.env.MONGO_URL == undefined) {
    throw new Error("MONGO_URL not defined")
}
if (process.env.DB_NAME == undefined) {
    throw new Error("DB_NAME not defined")
}
if (process.env.PORT == undefined) {
    throw new Error("PORT not defined")
}

const mongoUrl = process.env.MONGO_URL
const dbName = process.env.DB_NAME
const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json({limit: '64mb'}));

app.get('/api', (req, res) => {
    res.json({msg: 'hello world'})
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public_html/index.html');
});

const notesApi = express.Router()

notesApi.get('/', (req, res)=>{
    req.app.locals.db.collection('notes').find({}).toArray((err, result) => {
        if (err) {
            res.status(500)
            res.json({msg: err})
        }
        else {
            res.json(result)
        }
    })
})

notesApi.post('/', (req, res) => {
    const note = req.body
    delete note._id
    req.app.locals.db.collection('notes').insertOne(note).then(
        result => {
            res.json(result)
        }
    ).catch(err => {
        res.status(500)
        res.json({ msg: err })
    })
})

notesApi.put('/', (req, res) => {
    const note = req.body
    const id = note._id
    delete note._id
    req.app.locals.db.collection('notes').updateOne({ _id: new ObjectId(id) }, { $set: note })
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.status(500)
            res.json({ msg: err })
        })
})

notesApi.get('/:id', (req, res) => {
    const id = req.params.id
    req.app.locals.db.collection('notes').findOne({ _id: new ObjectId(id) })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500)
            res.json({ msg: err })
        })
})

app.use('/api/notes', notesApi)

app.use(express.static(path.join(__dirname, 'public_html')))

function gracefulShutdown() {
    app.locals.db_connection.close(() => {
        console.log("mongodb connection is closed")
        process.exit()
    })
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGKILL', gracefulShutdown);

MongoClient.connect(mongoUrl, (err, db) => {
    if (err) throw err;

    app.locals.db_connection = db;
    app.locals.db = db.db(dbName);

    app.listen(port, () => {
        console.log(`serving on port ${port}`)
    })
})
