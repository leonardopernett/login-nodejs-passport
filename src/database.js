const mongoose = require('mongoose')

//mongo database
mongoose.connect('mongodb://localhost/login-node',{
    useNewUrlParser: true ,
    useUnifiedTopology: true

}).then((db)=>console.log('db connected'))
  .catch(err => console.error(err))


  