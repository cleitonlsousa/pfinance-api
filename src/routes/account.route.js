import { Router } from 'express';
import { create, update, find, remove } from '../controllers/account.controller.js';
import { accountBodyValidator } from '../middlewares/validator.manager.js';

const accountRouter = Router();

accountRouter.post('/v1/accounts', accountBodyValidator, async(req, res) => {
    /*
        #swagger.tags = ['Account']
        #swagger.security = [{
            "Authorization": []
        }]

        #swagger.parameters['Account'] = {
            description: "Create a account",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/AccountModel"}
        } 
    
    */
    await create(req, res);
});
accountRouter.put('/v1/accounts/:id', accountBodyValidator, async(req, res) => {
    /*
        #swagger.tags = ['Account']
        #swagger.security = [{
            "Authorization": []
        }]

        #swagger.parameters['Account'] = {
            description: "Update a account",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/AccountModel"}
        } 
    */
    await update(req, res);
});

accountRouter.get('/v1/accounts/:id', async(req, res) => {
    /*
        #swagger.tags = ['Account']
        #swagger.security = [{
            "Authorization": []
        }]
    */
    await find(req, res);
});

accountRouter.delete('/v1/accounts/:id', async(req, res) => {
    /*
        #swagger.tags = ['Account']
        #swagger.security = [{
            "Authorization": []
        }]
    */
    await remove(req, res);
});

export default accountRouter;