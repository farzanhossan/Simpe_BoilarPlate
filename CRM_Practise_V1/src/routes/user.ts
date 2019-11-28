// import { Request, Response, NextFunction, Router } from 'express';
import express from 'express'
import { UserController } from '../controllers/userControlller'
import CheckAuth from '../middleware/checkAuth';
import { request } from 'http';


class UserRouter{
    public router: express.Router;
    userController = new UserController();
    CheckAuth = new CheckAuth().checkAuth;


    constructor(){
        this.router = express.Router();
        this.routes();

    }

    routes(){
        try {
             this.router.get('/', this.CheckAuth('view_user'),this.userController.getUsers);
             this.router.post('/login', this.userController.login);
             this.router.post('/createRole', this.CheckAuth('create_role') ,this.userController.createRole);
             this.router.post('/createPermission',this.CheckAuth('create_role') ,this.userController.createPermission);
             this.router.post('/createRolePermission',this.CheckAuth('create_role') ,this.userController.createRolePermission);
             this.router.post('/createUser', this.CheckAuth('create_user') ,this.userController.createUser);
             this.router.get('/getRolePermission', this.CheckAuth('view_role') ,this.userController.getRolePermission);
             this.router.get('/getRole', this.CheckAuth('view_role') ,this.userController.getRole);
         } catch (error) {
            if (error) throw error;
        }
        
    }

}

const userRouter = new UserRouter();
export default userRouter.router;