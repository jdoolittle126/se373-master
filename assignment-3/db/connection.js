const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://assignment3:ChZ&R4B9&26^iu$@cluster0.ks9kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let connection;

module.exports = {
    connect:  (callback) => {
        client.connect( (err, db) => {
            if (err || !db) {
                return callback(err);
            }
            connection = db.db('assignment3');
            return callback();
        });
    },
    getDatabase: () => {
        return connection;
    },
};
