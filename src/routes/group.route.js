import { Router } from "express";
import { create, find, remove } from "../controllers/group.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = Router();

router.post(
    '/create', 
    [
        body('name', 'minimo de 3 caracteres')
            .trim()
            .isLength({min: 3})
    ], 
    validationResultExpress,
    create
);

router.get('/:id', find);
router.delete('/:id', remove);

export default router;