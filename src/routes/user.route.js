import { Router } from "express";
import { create, update, addGroup, removeGroup } from "../controllers/user.controller.js";
import { 
    userBodyCreateValidator,
    userGroupBodyValidator,
    validationResultExpress 
} from '../middlewares/validatorManager.js'

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
router.put('/v1/users/:id', userBodyCreateValidator, validationResultExpress, async(req, res) => {
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
router.post('/v1/users/addGroup', userGroupBodyValidator, async(req, res) => {
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
            "Authorization": []
        }]
    
        #swagger.parameters['user'] = {
            in: 'body',
            description: "Associate user to group",
            schema: { $ref: "#definitions/UserGroupModel"}
        } 
    */
    await addGroup(req, res);
});
router.post('/v1/users/removeGroup', userGroupBodyValidator, async(req, res) => {
     /*
        #swagger.tags = ['User']
        #swagger.security = [{
            "Authorization": []
        }]
    
        #swagger.parameters['user'] = {
            in: 'body',
            description: "Remove user to group",
            schema: { $ref: "#definitions/UserGroupModel"}
        } 
    */
    await removeGroup(req, res);
});

export default router;