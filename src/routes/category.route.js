import { Router } from 'express';
import { create, update, find, findAll, remove } from '../controllers/category.controller.js';
import { categoryBodyValidator } from '../middlewares/validator.manager.js';
import { requireToken } from '../middlewares/require.token.js';

const categoryRouter = Router();

categoryRouter.post('/v1/categories', categoryBodyValidator, requireToken, async(req, res) => {
    /*
        #swagger.tags = ['Category']
        #swagger.security = [{
            "Authorization": []
        }]

        #swagger.parameters['Category'] = {
            description: "Create a new category",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/CategoryModel"}
        } 
    
    */
    await create(req, res);
});

categoryRouter.put('/v1/categories/:id', categoryBodyValidator, requireToken, async(req, res) => {
    /*
        #swagger.tags = ['Category']
        #swagger.security = [{
            "Authorization": []
        }]

        #swagger.parameters['Category'] = {
            description: "Update a category",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/CategoryModel"}
        } 
    
    */
    await update(req, res);
});

categoryRouter.get('/v1/categories/:id', requireToken, async(req, res) => {
    /*
        #swagger.tags = ['Category']
        #swagger.security = [{
            "Authorization": []
        }]
    
    */
    await find(req, res);
});

categoryRouter.get('/v1/categories', requireToken, async(req, res) => {
    /*
        #swagger.tags = ['Category']
        #swagger.security = [{
            "Authorization": []
        }]
    
    */
    await findAll(req, res);
});

categoryRouter.delete('/v1/categories/:id', requireToken, async(req, res) => {
    /*
        #swagger.tags = ['Category']
        #swagger.security = [{
            "Authorization": []
        }]
    
    */
    await remove(req, res);
});

export default categoryRouter;