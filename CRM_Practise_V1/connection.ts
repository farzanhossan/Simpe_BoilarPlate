const mysql2 =require('mysql');

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'crm_v1'
});

db.connect((error: any)=>{
    if(error){
        throw error;
    }
    else{
        console.log("Database Connected");
        
    }
})

export default db;