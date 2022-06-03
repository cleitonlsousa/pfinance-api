import { Router } from 'express';
import { create, update, find, remove, findAll } from '../controllers/transaction.controller.js';
import { transactionBodyValidator } from '../middlewares/validator.manager.js';

const transactionRouter = Router();

transactionRouter.post('/v1/transactions', transactionBodyValidator, async(req, res) => {
    /*
        #swagger.tags = ['Transaction']
        #swagger.security = [{
            "Authorization": []
        }]
    
        #swagger.parameters['Transaction'] = {
            in: 'body',
            description: "Create a transaction",
            schema: { $ref: "#definitions/TransactionModel"}
        } 
    */
    await create(req, res);
});

transactionRouter.put('/v1/transactions/:id', transactionBodyValidator, async(req, res) => {
    /*
        #swagger.tags = ['Transaction']
        #swagger.security = [{
            "Authorization": []
        }]
    
        #swagger.parameters['Transaction'] = {
            in: 'body',
            description: "Update a transaction",
            schema: { $ref: "#definitions/TransactionModel"}
        } 
    */
    await update(req, res);
});

transactionRouter.get('/v1/transactions/:id', async(req, res) => {
    /*
        #swagger.tags = ['Transaction']
        #swagger.security = [{
            "Authorization": []
        }]
    
    */
    await find(req, res);
});

transactionRouter.get('/v1/transactions', async(req, res) => {
    /*
        #swagger.tags = ['Transaction']
        #swagger.security = [{
            "Authorization": []
        }]
    
    */
    await findAll(req, res);
});

transactionRouter.delete('/v1/transactions/:id', async(req, res) => {
    /*
        #swagger.tags = ['Transaction']
        #swagger.security = [{
            "Authorization": []
        }]
    
    */
    await remove(req, res);
});

export default transactionRouter;