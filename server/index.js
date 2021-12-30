const { MongoClient, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
const path = require('path')

const mongoUrl = "mongodb://localhost:27017"
const dbName = "mean-100"
const port = 8080

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

const tagsApi = express.Router()

tagsApi.get('/', (req, res) => {
    req.app.locals.db.collection('notes').aggregate([
        {
            '$project': {
                'tags': 1
            }
        }, {
            '$unwind': {
                'path': '$tags',
                'preserveNullAndEmptyArrays': false
            }
        }, {
            '$group': {
                '_id': null,
                'allTags': {
                    '$addToSet': '$tags'
                }
            }
        }, {
            '$unwind': {
                'path': '$allTags',
                'preserveNullAndEmptyArrays': false
            }
        }, {
            '$sort': {
                'allTags': 1
            }
        }, {
            '$group': {
                '_id': null,
                'tags': {
                    '$push': '$allTags'
                }
            }
        }
    ]).toArray((err, result) => {
        if (err) {
            res.status(500)
            res.send({ msg: err })
        }
        else {
            res.send(result[0])
        }
    })
})

app.use('/api/tags', tagsApi)

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
