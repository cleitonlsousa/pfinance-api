import { Router } from "express";
import { create, update, find, remove } from "../controllers/category.controller.js";
import { 
    categoryBodyValidator,
    validationResultExpress 
} from "../middlewares/validatorManager.js";

const router = Router();

router.post('/', categoryBodyValidator, create);
router.put("/:id", categoryBodyValidator, validationResultExpress, update);
router.get('/:id', find);
router.delete('/:id', remove);

export default router;