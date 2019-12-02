import { Request , Response, Express} from 'express'
import db from '../../connection';
import nodemailer from 'nodemailer';
import { O_NOFOLLOW } from 'constants';
require('dotenv').config();
let jwt = require('jsonwebtoken');



export class CustomerController {

    async getCustomers(req: any, res: any , next: any){
        let tokenId = req.userData;
        let sql = 'select * from customers'
        db.query(sql , (err:any , result:any)=>{
            if (err) throw err;
            return res.status(200).json({
                result
            })
        })
    }

    async createCustomers(req: any, res: any, next: any){
        let {name , email , password , phone_number, status, notes, service_id } = req.body;

        let tokenId = req.userData;
        let customerDetails = {
                name: name,
                email: email,
                password: password,
                phone_number: phone_number,
                status: status,
                notes: notes,
                service_id: service_id
            }

        let sql2 = 'select email from customers where email=?'
        db.query(sql2, email , (err:any, result:any)=>{
            if(err) throw err;
            if(result !=""){
                return res.status(200).json({
                    message: "Email Already Exists"
                })
            }

            let sql1 = 'insert into customers set ?'
            db.query(sql1,customerDetails, (err:any , result: any)=>{
                if(err) throw err;
                let transporter = nodemailer.createTransport({
                    host: 'smtp.mailtrap.io',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'c6d695b3f1d508', // generated ethereal user
                        pass: '816ed91f9e4e83'  // generated ethereal password
                    },
                    tls:{
                    rejectUnauthorized:false
                    }
                });
        
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Sheba Technology" <sheba@gmail.com>',
                    to: email,
                    subject: 'Being a member of Sheba',
                    text: 'Congrates!!!',
                };
        
                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error: any, info: any) => {
                    if (error) {
                        return console.log(error);
                    }
                    return res.status(200).json({
                        message: "Customer Registered Successfully",
                        info: info
                    })
                });
            })
        })  
    }

    async updateCustomers(req: any , res: any , next: any){
        let customer_id = req.params.customer_id;
        let {name , email , password , phone_number , status, notes, service_id } = req.body;
        let sql = `UPDATE customers SET  ? where id = ${ customer_id }`;
        let customerDetails = {
            name: name,
            email: email,
            password: password,
            phone_number: phone_number,
            status: status,
            notes: notes,
            service_id: service_id
        }

        db.query(sql , customerDetails , (err: any ,result: any)=>{
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

    async deleteCustomers(req: any , res: any , next : any){
        let customer_id = req.params.customer_id;
        let sql = 'delete from customers where id = ?';
        db.query(sql, customer_id, (err: any, result: any)=>{
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

    async cost(req: any , res: any , next : any){
        let {customer_id , discount , monthly_pay } = req.body;
        let costDetails = {
            customer_id: customer_id,
            discount: discount,
            monthly_pay: monthly_pay,
            created_at: new Date()
        }
        let sql = `select email from customers where id = ?`
        db.query(sql,customer_id,(err: any, result: any)=>{
            if(err) throw err;
            let email = result[0].email;
            let sql1 = `insert into cost_calculation set ?`
            db.query(sql1, costDetails,(err: any, result: any)=>{
                if (err) throw err;
                let transporter = nodemailer.createTransport({
                    host: 'smtp.mailtrap.io',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'c6d695b3f1d508', // generated ethereal user
                        pass: '816ed91f9e4e83'  // generated ethereal password
                    },
                    tls:{
                    rejectUnauthorized:false
                    }
                });
        
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Sheba Technology" <sheba@gmail.com>',
                    to: email,
                    subject: 'Payment',
                    text: `Your Payment Slip
                        paid : ${ monthly_pay }
                    `
                };
        
                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error: any, info: any) => {
                    if (error) {
                        return console.log(error);
                    }
                    return res.status(200).json({
                        message: "Cost-Calculation  Successful",
                        info: info
                    })
                });
            })
        })
    }

    async customerCommunication(req: any, res: any, next: any){
        let {customer_id , message } = req.body;
        let sql = `INSERT INTO customer_communication SET  ?`;
        let communicationDetails = {
            customer_id: customer_id,
            message: message
        }

        db.query(sql , communicationDetails , (err: any ,result: any)=>{
            if (err) throw err;
            return res.status(200).json({
                message: 'Inserted Successfully',
                result : result
            })
        })
    }

}



// async test(req: any , res: any , next : any){
        
// }