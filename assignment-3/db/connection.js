if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { MongoClient } = require('mongodb');
const uri = process.env.MDB_CONN;
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
