const pg = require('pg')
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const {client} = require('./connection')

app.use(cors())
app.use(express.json())

console.log('Server Started !')
const insert = async(tableName,{item,phone,time})=>{
    try{

        await client.connect(()=>console.log('connected now !'))
       
        await client.query(`
        insert into ${tableName}
        (item,phone,date)
        values('${item}','${phone}','${time}')
        `)
        
    
        
        
    }
    catch(e){
        console.log(e+' in the insert function !!!')
    }
    finally{
        
        await client.end(()=>console.log('disconnected'))
    }

}



app.get('/res',(req,res)=>{
    console.log('request was fired')
    res.json({name:Math.floor(Math.random()*1_000_000)+1})
})

app.post('/req',(req,res)=>{
    console.log(req.body)
    console.log('request was fired !')
    const date = new Date().toString()

insert('items',{item:req.body.item,phone:req.body.phone,time:date})
res.send('great !')
})


app.listen(port)