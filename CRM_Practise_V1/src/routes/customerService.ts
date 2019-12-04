// import { Request, Response, NextFunction, Router } from 'express';
import express from 'express'
import { CustomerServiceController } from '../controllers/customerServiceController'
import CheckAuth from '../middleware/checkAuth';
import { request } from 'http';


class CustomerServiceRouter{
    public router: express.Router;
    customerServiceController = new CustomerServiceController();
    CheckAuth = new CheckAuth().checkAuth;


    constructor(){
        this.router = express.Router();
        this.routes();

    }

    routes(){
        try {
             this.router.get('/', this.CheckAuth('customer_service'),this.customerServiceController.getCustomerServices);
             this.router.post('/createCustomerService', this.CheckAuth('customer_service'),this.customerServiceController.createCustomerServices);
             this.router.put('/updateCustomerService/:customerService_id', this.CheckAuth('customer_service'),this.customerServiceController.updateCustomerServices);
             this.router.delete('/deleteCustomerService/:customerService_id', this.CheckAuth('customer_service'),this.customerServiceController.deleteCustomerServices);
             
         } catch (error) {
            if (error) throw error;
        }
        
    }

}

const customerServiceRouter = new CustomerServiceRouter();
export default customerServiceRouter.router;