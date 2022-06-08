import { Router } from 'express';
import { create, find, update } from '../controllers/user.controller.js';
import { userBodyCreateValidator } from '../middlewares/validator.manager.js'

const router = Router();

router.post('/v1/users', userBodyCreateValidator, async(req, res) => {
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
            "Authorization": []
        }]
    
        #swagger.parameters['user'] = {
            description: "Create a new user",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/CreateUserModel"}
        } 
    */
    await create(req, res);
});

router.put('/v1/users/:id', userBodyCreateValidator, async(req, res) => {
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
            "Authorization": []
        }]
    
        #swagger.parameters['user'] = {
            description: "Create a new user",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/UpdateUserModel"}
        } 
    */
    await update(req, res);
});

router.get('/v1/users/:id', userBodyCreateValidator, async(req, res) => {
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
            "Authorization": []
        }]
    
        #swagger.parameters['user'] = {
            description: "Create a new user",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/UpdateUserModel"}
        } 
    */
    await update(req, res);
});

export default router;