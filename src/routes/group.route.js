import { Router } from "express";
import { create, update, find, remove } from "../controllers/group.controller.js";
import { 
    groupBodyValidator,
    validationResultExpress 
} from "../middlewares/validatorManager.js";

const router = Router();

router.post('/', groupBodyValidator, create);
router.put("/:id", groupBodyValidator, validationResultExpress, update);
router.get('/:id', find);
router.delete('/:id', remove);

export default router;