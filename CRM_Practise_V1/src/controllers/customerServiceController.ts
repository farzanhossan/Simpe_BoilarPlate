import { Request , Response, Express} from 'express'
import db from '../../connection';
import fetch from 'node-fetch';
require('dotenv').config();
let jwt = require('jsonwebtoken');


export class CustomerServiceController {

    async getCustomerServices(req: any, res: any , next: any){
        let tokenId = req.userData;
        let sql = 'select * from customer_services'
        db.query(sql , (err:any , result:any)=>{
            if (err) throw err;
            return res.status(200).json({
                result
            })
        })
    }

    async createCustomerServices(req: any, res: any, next: any){
        let {customer_id , service_id, package_id} = req.body;
        if(customer_id == "" || service_id == "" || package_id == ""){
            return res.status(400).json({
                message: "Please Fill up All Field"
            })
        }
        
        let sql = `select * from packages where id = ?`
        db.query(sql, package_id, (err: any, result: any)=>{
            if(err) throw err;
            let customerServicesDetails = {
                customer_id : customer_id,
                service_id : service_id,
                package_id : package_id,
                bills : result[0].price,
                created_at : new Date()
            }

            let sql1 = `INSERT into customer_services SET ?` 
            db.query(sql1, customerServicesDetails, function(err: any) {
                if (err) throw err;
                return res.status(200).json({
                    message: "Customer Services Successfully created"
                })
            });

        })
        
    }

    async updateCustomerServices(req: any , res: any , next: any){
        let customerService_id = req.params.customerService_id;
        let {customer_id , service_id, package_id, bills} = req.body;
        if(customer_id == "" || service_id == "" || package_id == ""){
            return res.status(400).json({
                message: "Please Fill up All Field"
            })
        }
        let customerServicesDetails = {
            customer_id : customer_id,
            service_id : service_id,
            package_id : package_id,
            bills: bills,
            created_at : new Date()
        }
        let sql = `UPDATE customer_services SET  ? where id = ${ customerService_id }`;
        db.query(sql , customerServicesDetails , (err: any ,result: any)=>{
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

    async deleteCustomerServices(req: any , res: any , next : any){
        let customerService_id = req.params.customerService_id;


        let sql = 'delete from customer_services where id = ?';
        db.query(sql, customerService_id, (err: any, result: any)=>{
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