import { Router } from "express";
import { create, update, addGroup, removeGroup } from "../controllers/user.controller.js";
import { 
    userBodyCreateValidator,
    userGroupBodyValidator,
    validationResultExpress 
} from '../middlewares/validatorManager.js'

const router = Router();

router.post('/', userBodyCreateValidator, create);
router.put("/:id", validationResultExpress, update);
router.post('/addGroup', userGroupBodyValidator, addGroup);
router.post('/removeGroup', userGroupBodyValidator, removeGroup);

export default router;