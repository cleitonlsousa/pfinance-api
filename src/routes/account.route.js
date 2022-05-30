import { Router } from "express";
import { create, update, find, remove } from "../controllers/account.controller.js";
import { 
    accountBodyValidator,
    validationResultExpress 
} from "../middlewares/validatorManager.js";

const router = Router();

router.post('/', accountBodyValidator, create);
router.put("/:id", accountBodyValidator, validationResultExpress, update);
router.get('/:id', find);
router.delete('/:id', remove);

export default router;