const pg = require('pg')
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const {client} = require('./connection')

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// const func =async ()=>{
    
//     const q =await client.query('select * from workers')
    
//     console.log(q.rows)
// }
console.log('Server Started !')
const insert = async(tableName,{item,phone,time})=>{
    try{

        client.connect()
        console.log('connected ')
        const i = await client.query(`
        insert into ${tableName}
        (item,phone,date)
        values('${item}','${phone}','${time}')
        `)
        
        client.end(()=>console.log('disconnected'))
    }
    catch(e){
        console.log(e+' in the insert function !!!')
    }
    
}



app.get('/res',(req,res)=>{
    console.log('request was fired')
    res.json({name:Math.floor(Math.random()*1_000_000)+1})
})

app.post('/req',(req,res)=>{
    console.log(req.body)
    console.log('request was fired !')
    const d = new Date().toString()
console.log(d)
insert('items',{item:req.body.item,phone:req.body.phone,time:d})
res.send('great !')
})


app.listen(port)