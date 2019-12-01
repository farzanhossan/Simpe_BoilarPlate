// import { Request, Response, NextFunction, Router } from 'express';
import express from 'express'
import { CustomerController } from '../controllers/customerController'
import CheckAuth from '../middleware/checkAuth';
import { request } from 'http';


class CustomerRouter{
    public router: express.Router;
    customerController = new CustomerController();
    CheckAuth = new CheckAuth().checkAuth;


    constructor(){
        this.router = express.Router();
        this.routes();

    }

    routes(){
        try {
             this.router.get('/', this.CheckAuth('view_customer'),this.customerController.getCustomers);
             this.router.post('/createCustomer', this.CheckAuth('create_customer'),this.customerController.createCustomers);
             this.router.put('/updateCustomer/:customer_id', this.CheckAuth('update_customer'),this.customerController.updateCustomers);
             this.router.delete('/deleteCustomer/:customer_id', this.CheckAuth('delete_customer'),this.customerController.deleteCustomers);
             this.router.post('/cost', this.CheckAuth('create_cost'),this.customerController.cost);
             
         } catch (error) {
            if (error) throw error;
        }
        
    }

}

const customerRouter = new CustomerRouter();
export default customerRouter.router;