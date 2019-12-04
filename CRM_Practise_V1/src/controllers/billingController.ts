import { Request , Response, Express} from 'express'
import db from '../../connection';
import fetch from 'node-fetch';
require('dotenv').config();
let jwt = require('jsonwebtoken');


export class BillingController {

    async getBillings(req: any, res: any , next: any){
        let sql = 'select * from billings'
        db.query(sql , (err:any , result:any)=>{
            if (err) throw err;
            return res.status(200).json({
                result
            })
        })
    }

    async createBillings(req: any, res: any, next: any){
        let {customer_id , service_id, package_id, discount , receivable } = req.body;
        if(customer_id == "" || service_id == "" || package_id == "" || discount == "" || receivable == ""){
            return res.status(400).json({
                message: "Please Fill up All Field"
            })
        }
        let sql = `select bills from customer_services where customer_id = ${ customer_id } and package_id = ${ package_id }`
        db.query(sql,(err: any, result:any)=>{
            if (err) throw err;
            
            let payable = result[0].bills;
            
            
            let BillingsDetails = {
                customer_id : customer_id,
                service_id: service_id,
                package_id: package_id,
                discount : discount,
                payable : db.escape(payable),
                receivable : receivable,
                created_at : new Date()
            }
            let due = payable - receivable
            if(due < 0){
                return res.status(200).json({
                    message: "Already Paid"
                })
            }
            let sql1 = `INSERT into billings SET ?` 
            db.query(sql1, BillingsDetails, function(err: any) {
                if (err) throw err;
                
                let sql2 = `UPDATE customer_services SET  bills = ${ db.escape(due) } where customer_id = ${ customer_id} and package_id = ${ package_id }`
                db.query(sql2,(err: any)=>{
                    if (err) throw err;
                    return res.status(200).json({
                    message: "Bill Successfully created"
                    })
                })
                
            });

        })
        
    }

    // async updateBillings(req: any , res: any , next: any){
    //     let billing_id = req.params.billing_id;
    //     let {customer_id , service_id, package_id, discount , receivable } = req.body;
    //     if(customer_id == "" || service_id == "" || package_id == "" || discount == "" || receivable == ""){
    //         return res.status(400).json({
    //             message: "Please Fill up All Field"
    //         })
    //     }
    //     let sql = `select bills from customer_services where customer_id = ${ customer_id } and package_id = ${ package_id }`
    //     db.query(sql,(err: any, result:any)=>{
    //         if (err) throw err;
    //         let payable = result[0].bills;
            
    //         let BillingsDetails = {
    //             customer_id : customer_id,
    //             service_id: service_id,
    //             package_id: package_id,
    //             discount : discount,
    //             payable : db.escape(payable),
    //             receivable : receivable
    //         }
    //         let sql1 = `UPDATE billings SET  ? where id = ${ billing_id }` 
    //         db.query(sql1, BillingsDetails, function(err: any, result: any) {
    //             if (err) throw err;
    //             let due = payable - receivable;
    //             let sql2 = `UPDATE customer_services SET  bills = ${ db.escape(due) } where customer_id = ${ customer_id} and package_id = ${ package_id }`
    //             db.query(sql2,(err: any)=>{
    //                 if (err) throw err;
    //                 return res.status(200).json({
    //                     message: 'Update Successfully',
    //                 })
    //             })  
    //         });
    //     })
    // }

    async deleteBillings(req: any , res: any , next : any){
        let Billing_id = req.params.Billing_id;


        let sql = 'delete from customer_services where id = ?';
        db.query(sql, Billing_id, (err: any, result: any)=>{
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