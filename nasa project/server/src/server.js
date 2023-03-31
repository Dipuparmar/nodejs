const http= require('http');
const mongoose = require('mongoose')

const app=require('./app')

const {loadplanetsData}=require('./models/planets.model')

const PORT= process.env.PORT || 8000

const MONGO_URL= "mongodb+srv://deepparmar:HELLOWORLD@cluster0.ezcl6yf.mongodb.net/nasa?retryWrites=true&w=majority"

const server= http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('monhoDB connection ready:');
})

mongoose.connection.on('error',(err)=>{
    console.error(err);
})



async function startserver(){
 

    // all details must be required to use latest feature of mongoose database
    await mongoose.connect(MONGO_URL,{
        // userNewUrlParser:true,
        // useFindAndModify:false,
        // useCreateIndex:true,
        // useUnifiedTopology:true,
    })
    await loadplanetsData();

server.listen(PORT,()=>{
    console.log(`listrning on port ${PORT}..`);
})
}

startserver();