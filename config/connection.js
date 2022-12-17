const { connect, connection } = require('mongoose');

// const mongoose = require('mongoose');

// Wrap the mongoose.connect() method in a try...catch block
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    
//     useNewUrlParse: true,
//     useUnifiedTopology: true,
// } );
const connectionString =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;

// module.exports = mongoose.connection;


