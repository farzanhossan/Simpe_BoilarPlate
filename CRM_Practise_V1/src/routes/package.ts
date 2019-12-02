// import { Request, Response, NextFunction, Router } from 'express';
import express from 'express'
import { PackageController } from '../controllers/packageController'
import CheckAuth from '../middleware/checkAuth';
import { request } from 'http';


class ServiceRouter{
    public router: express.Router;
    packageController = new PackageController();
    CheckAuth = new CheckAuth().checkAuth;


    constructor(){
        this.router = express.Router();
        this.routes();

    }

    routes(){
        try {
             this.router.get('/', this.CheckAuth('view_package'),this.packageController.getPackage);
             this.router.post('/createPackage', this.CheckAuth('create_package'),this.packageController.createPackages);
             this.router.put('/updatePackage/:package_id', this.CheckAuth('update_package'),this.packageController.updatePackages);
             this.router.delete('/deletePackage/:package_id', this.CheckAuth('delete_package'),this.packageController.deletePackages);
             
         } catch (error) {
            if (error) throw error;
        }
        
    }

}

const serviceRouter = new ServiceRouter();
export default serviceRouter.router;