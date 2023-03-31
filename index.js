// const {parse}= require('csv-parse');
// const fs= require('fs');

// const results=[];
// fs.createReadStream('kepler_data.csv')
//    .pipe(parse({
//     comment:'#',
//     columns:true,
// }))
//   .on('data',(data)=> {
//     results.push(data)
// })
//    .on('error',(err)=> {
//     console.log(err);
// })
//    .on('end',()=> {
//     console.log( results);
//     console.log('done');
// })

/////////////////////////////////////////////////////////////////////////////////
// // web server?////?/

// const http = require('http')
// const PORT = 3000;

// const server = http.createServer()

// const friends = [
//     {
//         id: 0,
//         name: 'nokia mobile'
//     },
//     {
//         id: 1,
//         name: 'iphone mobile'
//     },
//     {
//         id: 2,
//         name: 'samsung mobile'
//     }
// ]

// server.on('request', (req, res) => {

//     const items = req.url.split('/');


//     if (req.method === 'POST' && items[1] === 'friends') {
//         // res.writeHead(200,{
//         // 'content-Type':'application/json',

//         req.on('data', (data) => {
//             const friend = data.toString();
//             console.log('Request:', friend);
//             friends.push(JSON.parse(friend))
//         });
//         req.pipe(res)
//     } 
    
    
//     else if (req.method === 'GET' && items[1] === 'friends') {
//         res.statusCode = 200;
//         res.setHeader('content-Type', 'application/json')
//         if (items.length === 3) {
//             const friendIndex = Number(items[2]);
//             res.end(JSON.stringify(friends[friendIndex]))
//         } else {
//             res.end(JSON.stringify(friends))
//         }
//     } 
    
    
    
//     else if (req.method === 'GET' && items[1] === 'messages') {
//         res.setHeader('content-Type', 'text/html');
//         res.write('<html>')
//         res.write('<body>')
//         res.write('<p> hello world </p>')
//         res.write('</body>')
//         res.write('</html>')
//         res.end()
//     } else {
//         res.statusCode = 404;
//         res.end();
//     }
// });
// server.listen(PORT, () => {
//     console.log(`listening on port ${PORT}`);
// })
////////////////////////////////////////////////////////////////////////////////





// express.js

const express= require('express');
const app = express();
const port=3000

const friends = [
    {
        id: 0,
        name: 'nokia mobile'
    },
    {
        id: 1,
        name: 'iphone mobile'
    },
    {
        id: 3,
        name: 'nokia mobile'
    }
]


app.get('/friends',(req,res)=> {
    res.json(friends);
});


app.get('/friends/:friendId',(req,res)=>{
    const friendId=Number(req.params.friendId);
    const friend=friends[friendId];
    if(friend){
        res.status(200).json(friend);
    }
    else{
        res.status(404).json({
            error:"friend does not exist"
        })
    }
})

app.post('/message',(req,res)=>{
    console.log("updating message");
})

app.listen(port,()=>{
    console.log(`listening on ${port}`);
})










