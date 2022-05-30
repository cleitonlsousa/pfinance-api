import { Router } from "express";
import { create, update, find, remove } from "../controllers/transaction.controller.js";
import { 
    transactionBodyValidator,
    validationResultExpress 
} from "../middlewares/validatorManager.js";

const router = Router();

router.post('/', transactionBodyValidator, create);
router.put("/:id", transactionBodyValidator, validationResultExpress, update);
router.get('/:id', find);
router.delete('/:id', remove);

export default router;