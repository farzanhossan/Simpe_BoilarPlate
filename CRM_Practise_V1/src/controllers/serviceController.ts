import { Request , Response, Express} from 'express'
import db from '../../connection';
import fetch from 'node-fetch';
require('dotenv').config();
let jwt = require('jsonwebtoken');


export class ServiceController {

    async getServices(req: any, res: any , next: any){
        let tokenId = req.userData;
        let sql = 'select * from services'
        db.query(sql , (err:any , result:any)=>{
            if (err) throw err;
            return res.status(200).json({
                result
            })
        })
    }

    async createServices(req: any, res: any, next: any){
        let {name} = req.body;

        let tokenId = req.userData;
        let serviceDetails = {
                name: name
            }
            let sql2 = 'select name from services where name =?'
            db.query(sql2, name , (err:any, result:any)=>{
                if(err) throw err;
                if(result !=""){
                    return res.status(200).json({
                        message: "Service Name Already Exists"
                    })
                }

                let sql1 = 'insert into services set ?'
                db.query(sql1,serviceDetails, (err:any , result: any)=>{
                    if(err) throw err;
                    return res.status(200).json({
                        message: "Service Registered Successfully"
                    })
                })
            })  
    }

    async updateServices(req: any , res: any , next: any){
        let service_id = req.params.service_id;
        let {name} = req.body;
        let sql = `UPDATE services SET  ? where id = ${ service_id }`;
        let serviceDetails = {
            name: name
        }

        db.query(sql , serviceDetails , (err: any ,result: any)=>{
            if (err) throw err;
            if(result.changedRows != 0){
                return res.status(200).json({
                    message: 'Update Successfully',
                    result : result
                })
            }else{
                return res.status(200).json({
                    message: 'Already Up to date'
                })
            }
        })
        
    }

    async deleteServices(req: any , res: any , next : any){
        let service_id = req.params.service_id;
        let sql = 'delete from services where id = ?';
        db.query(sql, service_id, (err: any, result: any)=>{
            if(err) throw err;
            // console.log(result.affectedRows);
            if(result.affectedRows != 0){
                return res.status(200).json({
                    message: 'Deleted Successfully',
                    result : result
                })
            }else{
                return res.status(200).json({
                    message: 'Already Deleted'
                })
            }
        }) 
    }
    
}



// async test(req: any , res: any , next : any){
        
// }