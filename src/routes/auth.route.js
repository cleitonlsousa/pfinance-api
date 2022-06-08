import { Router } from 'express';
import { login, infoToken, refreshToken, logout } from '../controllers/auth.controller.js';
import { bodyLoginValidator } from '../middlewares/validator.manager.js';
import { requireToken } from '../middlewares/require.token.js';
import { requireRefreshToken } from '../middlewares/require.refresh.token.js'

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

router.post('/v1/refresh', requireRefreshToken, async(req, res) => {
    /*
       #swagger.tags = ['Auth']
       #swagger.security = [{
           "Authorization": []
       }]
   
       #swagger.parameters['auth'] = {
           description: "Refresh Token",
           in: 'body',
           required: true,
           schema: { $ref: "#definitions/LoginModel"}
       } 
   */
   await refreshToken(req, res);
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

router.get('/v1/logout', async(req, res) => {
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
            "Authorization": []
        }] 
    */
    await logout(req, res);
   
});

export default router;