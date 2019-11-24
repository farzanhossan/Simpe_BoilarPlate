// import { Request, Response, NextFunction, Router } from 'express';
import express from 'express'
import { UserController } from '../controllers/userControlller'
import CheckAuth from '../middleware/checkAuth';


class UserRouter{
    public router: express.Router;
    userController = new UserController();
    // CheckAuth = new CheckAuth();


    constructor(){
        this.router = express.Router();
        this.routes();

    }

    routes(){
        try {
             this.router.get('/',this.userController.getUsers);
         } catch (error) {
            if (error) throw error;
        }
        
    }

}

const userRouter = new UserRouter();
export default userRouter.router;