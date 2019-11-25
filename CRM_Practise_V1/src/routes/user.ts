// import { Request, Response, NextFunction, Router } from 'express';
import express from 'express'
import { UserController } from '../controllers/userControlller'
import CheckAuth from '../middleware/checkAuth';


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
             this.router.get('/',this.CheckAuth ,this.userController.getUsers);
             this.router.post('/login',this.userController.login);
             this.router.post('/createRole',this.CheckAuth ,this.userController.createRole);
             this.router.post('/createPermission',this.CheckAuth ,this.userController.createPermission);
             this.router.post('/createRolePermission',this.CheckAuth ,this.userController.createRolePermission);



         } catch (error) {
            if (error) throw error;
        }
        
    }

}

const userRouter = new UserRouter();
export default userRouter.router;