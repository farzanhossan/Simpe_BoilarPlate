import { Request , Response, Express} from 'express'
import db from '../../connection';
import fetch from 'node-fetch';
require('dotenv').config();
let jwt = require('jsonwebtoken');


export class PackageController {

    async getPackage(req: any, res: any , next: any){
        let tokenId = req.userData;
        let sql = 'select * from packages'
        db.query(sql , (err:any , result:any)=>{
            if (err) throw err;
            return res.status(200).json({
                result
            })
        })
    }

    async createPackages(req: any, res: any, next: any){
        let {name, price, service_id, monthly_pay} = req.body;
        let packageDetails = {
                name: name,
                price: price,
                service_id: service_id,
                monthly_pay: monthly_pay,
                created_at: new Date()
            }
        let sql2 = 'select name from packages where name =?'
        db.query(sql2, name , (err:any, result:any)=>{
            if(err) throw err;
            if(result !=""){
                return res.status(200).json({
                    message: "Package Name Already Exists"
                })
            }

            let sql1 = 'insert into packages set ?'
            db.query(sql1,packageDetails, (err:any , result: any)=>{
                if(err) throw err;
                return res.status(200).json({
                    message: "Package Registered Successfully"
                })
            })
        })  
    }

    async updatePackages(req: any , res: any , next: any){
        let package_id = req.params.package_id;
        let {name, price, service_id, monthly_pay} = req.body;
        let packageDetails = {
                name: name,
                price: price,
                service_id: service_id,
                monthly_pay: monthly_pay,
                created_at: new Date()
            }
        let sql = `UPDATE packages SET  ? where id = ${ package_id }`;
        db.query(sql , packageDetails , (err: any ,result: any)=>{
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

    async deletePackages(req: any , res: any , next : any){
        let package_id = req.params.package_id;

        let sql = 'delete from packages where id = ?';
        db.query(sql, package_id, (err: any, result: any)=>{
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