import { Request , Response, Express} from 'express'
import db from '../../connection';
import fetch from 'node-fetch';
require('dotenv').config();
let jwt = require('jsonwebtoken');


export class UserController {

/// User Login

    async login(req: any, res: any, next: any){
        let {email, password } = req.body;
        if(email == "" || password == ""){
            res.status(400).json({
                message : "Please Insert Email and Password"
            })
        }else{
            let sql = 'select email from users where email = ?'
            db.query(sql,email,(err: any,result: any) => {
                if(err) throw err;
                if(result == ""){
                    res.status(400).json({
                        message : "Please Register"
                    })
                }else{
                    let sql1 = 'select * from users where email = ?'
                    let query =db.query(sql1, email,(err: any, result: any) =>{
                        if(err) throw err;
                        if(result[0].password == password){
                            let userId = {
                                id : result[0].id
                            }
                
                            let token = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
                            return res.status(200).json({
                                message: "Login Successful",
                                token: token
                            })
                        }
                    })                    
                }
            })
        }
    }

    /// Get All Users
    async getUsers(req: any, res: any){
        let sql1 = 'select name , email , phone_number ,role_id from users'
            db.query(sql1, (err:any , result: any)=>{
                if(err) throw err;
                return res.status(200).json({
                    result
                })
            })     
    }

    /// Create Users

    async createUser(req: any, res: any, next: any){
        let {name , email , password , phone_number , role_id} = req.body;

        let tokenId = req.userData;
        let userDetails = {
                name: name,
                email: email,
                password: password,
                phone_number: phone_number,
                role_id: role_id
            }
            let sql2 = 'select email from users where email=?'
            db.query(sql2, email , (err:any, result:any)=>{
                if(err) throw err;
                if(result !=""){
                    return res.status(200).json({
                        message: "Email Already Exists"
                    })
                }

                let sql1 = 'insert into users set ?'
                db.query(sql1,userDetails, (err:any , result: any)=>{
                    if(err) throw err;
                    return res.status(200).json({
                        message: "User Registered Successfully"
                    })
                })
            })  
    }
    /// Create Role
    async createRole(req: any, res: any, next: any){
        let tokenId = req.userData;
        let { role } = req.body;
        if(role == ""){
            return res.status(400).json({
                message: "Please Fill up All Field"
            })
        }
        let sql1 = `select role from roles where role = ${ db.escape(role) }`
        db.query(sql1,role,(err:any, result: any)=>{
            if (err) throw err;
            if(result != ""){
                return res.status(400).json({
                    message: "Roles Already Exists"
                })
            }else{
                let sql2 = `insert into roles set role = ${ db.escape(role)}`
                db.query(sql2, (err: any, result: any)=>{
                    if (err) throw err;
                    return res.status(200).json({
                        message: "Created Successfully"
                    })
                })
            }
        })
        
    }

    /// Create Permission
    async createPermission(req: any, res: any, next: any){
        let tokenId = req.userData;
        let sql = `select role_id from users where id = ?`
        db.query(sql, tokenId, (err:any , result: any)=>{
            if (err) throw err;
            if(result[0].role_id != 0){
                return res.status(400).json({
                    message: "Only Super-Admin Can Create Roles"
                })
            }
        })
        let { permission_name } = req.body;
        if(permission_name == ""){
            return res.status(400).json({
                message: "Please Fill up All Field"
            })
        }
        let sql1 = `select permission_name from permissions where permission_name = ${ db.escape(permission_name) }`
        db.query(sql1,db.escape(permission_name),(err:any, result: any)=>{
            if (err) throw err;
            if(result != ""){
                return res.status(400).json({
                    message: "Permission name Already Exists"
                })
            }else{
                let sql2 = `insert into permissions set permission_name = ${ db.escape(permission_name) }`
                db.query(sql2, (err: any, result: any)=>{
                    if (err) throw err;
                    return res.status(200).json({
                        message: "Created Successfully"
                    })
                })
            }
        })
    }

    /// Create Role-Permission

    async createRolePermission(req: any, res: any, next: any){
        let tokenId = req.userData;
        let {role_id , permission_id} = req.body;
        if(role_id == "" || permission_id == ""){
            return res.status(400).json({
                message: "Please Fill up All Field"
            })
        }
        let sql3 = `select * from role_permission where role_id = ${ role_id }`
        db.query(sql3, (err:any, result:any)=>{
            if (err) throw err;
            if(result != ""){
                return res.status(400).json({
                    message: "Roles - Permissions Already Exists"
                })
            }
        })
        for await (let item of permission_id){
            let sql1 = `INSERT into role_permission
                    SET role_id = ( SELECT id 
                                    FROM roles
                                    WHERE id = ${ role_id } ),
                    permission_id = ( SELECT id
                                    FROM permissions
                                    WHERE id = ${ item })`
            const query = db.query(sql1 , (err: any, result: any)=>{
                if (err) throw err;
            })
            const queryResult = await fetch(query);
            console.log("//////////////////////////");
        }
        console.log('object');
    }
}