const mongoose = require('mongoose');

// Wrap the mongoose.connect() method in a try...catch block
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    
    useNewUrlParse: true,
    useUnifiedTopology: true,
} );

module.exports = mongoose.connection;


