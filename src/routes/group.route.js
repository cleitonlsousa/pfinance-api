import { Router } from "express";
import { create, update, find, remove } from "../controllers/group.controller.js";
import { 
    groupBodyValidator,
    validationResultExpress 
} from "../middlewares/validatorManager.js";

const groupRouter = Router();

groupRouter.post('/v1/groups', groupBodyValidator, async(req, res) => {
    /*
        #swagger.tags = ['Group']
        #swagger.security = [{
            "Authorization": []
        }]

        #swagger.parameters['Group'] = {
            description: "Create a new group",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/GroupModel"}
        } 
    
    */
    await create(req, res);
});

groupRouter.put("/v1/groups/:id", groupBodyValidator, validationResultExpress, async(req, res) => {
    /*
        #swagger.tags = ['Group']
        #swagger.security = [{
            "Authorization": []
        }]

        #swagger.parameters['Group'] = {
            description: "Update a group",
            in: 'body',
            required: true,
            schema: { $ref: "#definitions/GroupModel"}
        } 
    
    */
    await update(req, res);
});

groupRouter.get('/v1/groups/:id', async(req, res) => {
    /*
        #swagger.tags = ['Group']
        #swagger.security = [{
            "Authorization": []
        }]
    */
    await find(req, res);
});

groupRouter.delete('/v1/groups/:id', async(req, res) => {
    /*
        #swagger.tags = ['Group']
        #swagger.security = [{
            "Authorization": []
        }]
    
    */
    await remove(req, res);
});

export default groupRouter;