import { Router } from 'express';
import { create, update, find, remove } from '../controllers/account.controller.js';
import { accountBodyValidator } from '../middlewares/validator.manager.js';
import { requireToken } from '../middlewares/require.token.js';

const accountRouter = Router();

accountRouter.post('/v1/accounts', accountBodyValidator, requireToken, async(req, res) => {
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
accountRouter.put('/v1/accounts/:id', accountBodyValidator, requireToken, async(req, res) => {
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

accountRouter.get('/v1/accounts/:id', requireToken, async(req, res) => {
    /*
        #swagger.tags = ['Account']
        #swagger.security = [{
            "Authorization": []
        }]
    */
    await find(req, res);
});

accountRouter.delete('/v1/accounts/:id', requireToken, async(req, res) => {
    /*
        #swagger.tags = ['Account']
        #swagger.security = [{
            "Authorization": []
        }]
    */
    await remove(req, res);
});

export default accountRouter;