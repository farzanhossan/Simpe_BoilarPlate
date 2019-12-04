// import { Request, Response, NextFunction, Router } from 'express';
import express from 'express'
import { BillingController } from '../controllers/billingController'
import CheckAuth from '../middleware/checkAuth';
import { request } from 'http';


class BillingRouter{
    public router: express.Router;
    billingController = new BillingController();
    CheckAuth = new CheckAuth().checkAuth;


    constructor(){
        this.router = express.Router();
        this.routes();

    }

    routes(){
        try {
             this.router.get('/', this.CheckAuth('billing'),this.billingController.getBillings);
             this.router.post('/createBilling', this.CheckAuth('billing'),this.billingController.createBillings);
            //  this.router.put('/updateBilling/:billing_id', this.CheckAuth('billing'),this.billingController.updateBillings);
             this.router.delete('/deleteBilling/:billing_id', this.CheckAuth('billing'),this.billingController.deleteBillings);
             
         } catch (error) {
            if (error) throw error;
        }
        
    }

}

const billingRouter = new BillingRouter();
export default billingRouter.router;