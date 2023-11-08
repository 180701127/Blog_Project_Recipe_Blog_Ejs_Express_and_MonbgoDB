const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log('connected to mongo!');
})
.catch((err) => {
    console.error('error connecting to mongo', err);
});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console,'connection error:'));
// db.once('open',function(){
//     console.log('Connected');
// });


// Models
require('./Category');
require('./recipe');
