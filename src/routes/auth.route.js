import { Router } from 'express';
import { login, infoToken } from '../controllers/auth.controller.js';
import { bodyLoginValidator } from '../middlewares/validator.manager.js';
import { requireToken } from '../middlewares/require.token.js';

const router = Router();

router.post('/v1/login', bodyLoginValidator, async(req, res) => {
     /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
            "Authorization": []
        }]
    
        #swagger.parameters['auth'] = {
            description: "Login",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/LoginModel"}
        } 
    */
    await login(req, res);
});

router.get('/v1/info', requireToken, async(req, res) => {
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
            "Authorization": []
        }] 
    */
    await infoToken(req, res);
   
});

export default router;