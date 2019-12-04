import express from 'express';
import { promises, resolve } from 'dns';
import bodyParser from 'body-parser';

import userRoutes from './routes/user';
import customerRoutes from './routes/customer';
import serviceRoutes from './routes/service';
import packageRoutes from './routes/package';
import customerServiceRoutes from './routes/customerService';
import billingRoutes from './routes/billing';
import { rejects } from 'assert';
import morgan from 'morgan';

class App{
    public app: express.Application;


    constructor(){
        this.app = express();
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.urlencoded({extended : false}));
        this.app.use(bodyParser.json());
        this.routes();
        this.errorHandeller();
    }

    public routes(): void{
        this.app.use('/api/v1/users', userRoutes);
        this.app.use('/api/v1/customers', customerRoutes);
        this.app.use('/api/v1/services', serviceRoutes);
        this.app.use('/api/v1/packages', packageRoutes);
        this.app.use('/api/v1/customerServices', customerServiceRoutes);
        this.app.use('/api/v1/billings', billingRoutes);
    }

    public errorHandeller(): void{
        this.app.use((req, res, next) =>{
            const error = new Error('Not Found');
            error.stack = '404';
            next(error);
        });
        
        this.app.use((error: any, req: any, res: any, next: any) =>{
            res.status(error.stack || 500);
            res.json({
                message: error.message
            })
        })
    }

    public start(port: any){
        return new Promise((resolve, rejects)=>{
            this.app.listen(port, ()=>{
                resolve(port)
            }).on('error', (err: object)=>{
                rejects(err)
            })
        })
    }

}
export default App;
