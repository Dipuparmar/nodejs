
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
        id: 2,
        name: 'nokia mobile'
    }
]
app.use((req,res,next)=>{
    const start= Date.now();
    next(); 
    const delta =Date.now()-start;
console.log(`${req.method} ${req.url} ${delta}min`);
});

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
app.use(express.json());

app.post('/friends',(req,res)=>{

    if(!req.body.name){
        return res.status(400).json({
            error:'missing friend name'
        })
    }
   const newFriend={
    name: req.body.name,
    id:friends.length
   }
   friends.push(newFriend)

   res.json(newFriend)
})

app.listen(port,()=>{
    console.log(`listening on ${port}`);
})



