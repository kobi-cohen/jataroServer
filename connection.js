// host : localhost

// port: 5432

// dbName : luna

// username : postgres

// password : admin


const {Pool} = require('pg')
 
const client = Client ({
  host: 'dpg-ckt6h68168ec73f0548g-a.oregon-postgres.render.com',
  port: 5432,
  database: 'luna_075k',
  user: 'root',
  password: 'Z2I5gGNsmzhiU24hZTSr3Uokr0hN1Hil',
  ssl:true,
 

})


module.exports={pool}