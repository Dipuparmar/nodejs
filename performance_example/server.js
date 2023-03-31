const express = require('express');
// const cluster= require('cluster');
const os= require('os');


const app=express();

function delay(duration){
    const startTime =Date.now();
    console.log(startTime);
    while(Date.now()-startTime<duration){
  ///event block 
    }
}


app.get('/',(req,res)=>{
    res.send('performance example')
})


app.get('/timer',(req,res)=>{
    delay(9000)
    res.send(`performance---------------------- example ${process.pid}`)
})

console.log("running sever.js");
console.log('worker process ');

///-----clustering 

// if(cluster.isMaster){
//     console.log('master peocess');
//     const NUM_WORKERS= os.cpus().length;
//     for(let i=0;i<NUM_WORKERS;i++){

//         cluster.fork();
//     }
// }else{
//     console.log('worker process ');
//     app.listen(3001);
// }

app.listen(3001);
