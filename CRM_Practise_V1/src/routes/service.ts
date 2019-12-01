// import { Request, Response, NextFunction, Router } from 'express';
import express from 'express'
import { ServiceController } from '../controllers/serviceController'
import CheckAuth from '../middleware/checkAuth';
import { request } from 'http';


class ServiceRouter{
    public router: express.Router;
    serviceController = new ServiceController();
    CheckAuth = new CheckAuth().checkAuth;


    constructor(){
        this.router = express.Router();
        this.routes();

    }

    routes(){
        try {
             this.router.get('/', this.CheckAuth('view_service'),this.serviceController.getServices);
             this.router.post('/createService', this.CheckAuth('create_service'),this.serviceController.createServices);
             this.router.put('/updateService/:service_id', this.CheckAuth('update_service'),this.serviceController.updateServices);
             this.router.delete('/deleteService/:service_id', this.CheckAuth('delete_service'),this.serviceController.deleteServices);
             
         } catch (error) {
            if (error) throw error;
        }
        
    }

}

const serviceRouter = new ServiceRouter();
export default serviceRouter.router;