const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let lists=[];

app.get("/lists",(req,res)=>{
    res.json(lists);
});

app.post("/lists/",(req,res)=>{
    const item = {id:req.body.id,name:req.body.name};
    lists.push(item);
    res.status(201).json(item);
});

app.patch("/lists/:id",(req,res)=>{
    const items = lists.find(i=>i.id==req.params.id);
    if(items){
        items.name = req.body.name;
        res.json(items);
    }else{
        res.status(404).json({message:"Item not found"});
    }
});

app.delete("/lists/:id",(req,res)=>{
    lists = lists.filter(i=>i.id!=req.params.id);
    res.json({message:"Item deleted"});
});

const PORT = 5001;
app.listen(PORT, ()=> console.log(`engine start on port ${PORT}`));