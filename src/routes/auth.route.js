import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router()

router.post(
    '/register', 
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
    register
);

router.post(
    '/login',
    [
        body('email', 'e-mail incorreto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'minimo de 6 caracteres')
            .trim()
            .isLength({min: 6})
    ],
    validationResultExpress,
    login

);


export default router;