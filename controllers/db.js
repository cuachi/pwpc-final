const url = require('../config/config'),
    mongo = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID;

module.exports = {
    insert: (req, col) => {
        mongo.connect(url.DB, (err, db) => {
            var collection = db.collection(col);
            collection.insert(req.body, (err, data) => {
                if (err) throw err;
                db.close();
            });
        });
        return true;
    },
    find: (req, col, ob, callback) => {
        for (key in ob) {
            if (key === '_id') {
                var id = ObjectId(ob[key]);
                ob = { _id: id }
            }
        }
        mongo.connect(url.DB, (err, db) => {
            var collection = db.collection(col);
            collection.find(ob).toArray((err, documents) => {
                if (err) throw err;
                callback(documents, true);
            });
            db.close();
        });
    },
    update: (req, col, item) => {
        var id;
        for (key in item) {
            if (key === '_id') {
                id = ObjectId(item[key]);
                item[key] = id;
            }
        };
        mongo.connect(url.DB,(err,db)=>{
            var collection = db.collection(col);
            collection.update({_id:id},item,(err)=>{
                if (err) throw err;
            });
        });
    }
}