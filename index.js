const pg = require('pg')
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
// const {pool} = require('./connection')

app.use(cors())
app.use(express.json())

console.log('Server Started !')


const insert = async(tableName,{item,phone,time})=>{
    const client = new pg.Client ({
        host: 'dpg-ckt6h68168ec73f0548g-a.oregon-postgres.render.com',
        port: 5432,
        database: 'luna_075k',
        user: 'root',
        password: 'Z2I5gGNsmzhiU24hZTSr3Uokr0hN1Hil',
        ssl:true,
       
      
      })
    try{
          
        await client.connect(()=>console.log('connected via object  !'))
       
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
        
        await client.end(()=>console.log('disconnected via client'))
    }

}

const showResults = async ()=>{
    const client = new pg.Client ({
        host: 'dpg-ckt6h68168ec73f0548g-a.oregon-postgres.render.com',
        port: 5432,
        database: 'luna_075k',
        user: 'root',
        password: 'Z2I5gGNsmzhiU24hZTSr3Uokr0hN1Hil',
        ssl:true,
       
      
      })
    try{
          
        await client.connect(()=>console.log('connected via object  !'))
       
        const dbReq = await client.query(`
      select * from items`)
        
        return dbReq.rows
        
        
    }
    catch(e){
        console.log(e+'Error in the fetch select function !!!')
    }
    finally{
        
        await client.end(()=>console.log('disconnected via client'))
    }


}

app.get('/res',async(req,res)=>{
    console.log('request was fired')
    const reqDb =await showResults()
    console.log(reqDb)
    res.json(reqDb)
})

app.post('/req',(req,res)=>{
    console.log(req.body)
    console.log('request was fired !')
    const date = new Date().toString()

insert('items',{item:req.body.item,phone:req.body.phone,time:date})
res.send('great !')
})


app.listen(port)