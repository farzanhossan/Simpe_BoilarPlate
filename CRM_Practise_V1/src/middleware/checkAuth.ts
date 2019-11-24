import { Request , Response, Express} from 'express'
let jwt = require('jsonwebtoken');
import db from '../../connection';

export default class CheckAuth{
     checkAuth (req: any,res: Response ,next: any) {
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
                        req.userData = tokenId;
                        next();
                    }
                    
                })
            })    
            
        } catch (error) {
            if(error) throw error;
        }
    }
}