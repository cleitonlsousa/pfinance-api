import { Router } from "express";
import { create, addGroup, removeGroup } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = Router();

router.post(
    '/create', 
    [
        body('name', 'minimo de 3 caracteres')
            .trim()
            .isLength({min: 3}),
        body('email', 'e-mail incorreto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'minimo de 6 caracteres')
            .trim()
            .isLength({min: 6})
    ], 
    validationResultExpress,
    create
);

router.post(
    '/addGroup', 
    [
        body('user_id', 'required').not().isEmpty(),
        body('group_id', 'required').not().isEmpty()
    ], 
    validationResultExpress,
    addGroup
);

router.post(
    '/removeGroup', 
    [
        body('user_id', 'required').not().isEmpty(),
        body('group_id', 'required').not().isEmpty()
    ], 
    validationResultExpress,
    removeGroup
);

export default router;