import { Request , Response, Express} from 'express'
let jwt = require('jsonwebtoken');
import db from '../../connection';

export default class CheckAuth{

    checkAuth(option: any){
        return (req: any,res: any ,next: any)=>{
            try {
                const accesstoken = req.headers['authorization'];
                if (accesstoken == null) {
                    return res.status(403).json({
                    message: "Token Not Exist"
                    })
                }
                const token = accesstoken.split(' ')[1];
                jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err: any, result: any) =>{
                    if(err) throw err;
                    let tokenId = result.id;
                    let sql1 = `select * from users where id = ?`
                    db.query(sql1,tokenId,(err: any, result: any)=>{
                        if(err) throw err;
                        if(result == ""){
                            return res.status(403).json({
                                message: 'Please Login First',
                            })
                        }else{
                            let sql = `select permission_name from permissions right join role_permission on
                            permissions.id = role_permission.permission_id where role_permission.role_id =
                            (select role_id from users where id = ? )`
                            //let sql = `select role from roles where id = (select role_id from users where id = ?)`
                            db.query(sql, tokenId, (err:any , result: any)=>{
                                if (err) throw err;
                                for(let i =0;i<result.length;i++){
                                    if(result[i].permission_name == option){
                                        req.userData = tokenId;
                                        return next();
                                    }
                                }
                                return res.status(400).json({
                                    message: "You Are Not Allowed"
                                })
                            }) 
                            
                        }
                        
                    })
                })    
                
            } catch (error) {
                if(error) throw error;
            }
        }
    } 

    
}