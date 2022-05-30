import { validationResult, body, param } from "express-validator";
import { Account } from '../models/account.js';

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export const userBodyCreateValidator = [
    body('name', 'minimo de 3 caracteres')
        .trim()
        .isLength({min: 3}),
    body('email', 'e-mail incorreto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'minimo de 6 caracteres')
        .trim()
        .isLength({min: 6}),
    validationResultExpress
];

export const userGroupBodyValidator = [
    body('user_id', 'required')
        .not()
        .isEmpty(),
    body('group_id', 'required')
        .not()
        .isEmpty(),
    validationResultExpress
];

export const groupBodyValidator = [
    body('name', 'minimo de 3 caracteres')
        .trim()
        .isLength({min: 3}),
    body('description', 'minimo de 3 caracteres')
        .trim()
    .isLength({min: 3}),
    validationResultExpress
];

export const categoryBodyValidator = [
    body('name', 'minimo de 3 caracteres')
        .trim()
        .isLength({min: 3}),
    body('description', 'minimo de 3 caracteres')
        .trim()
    .isLength({min: 3}),
    validationResultExpress
];

export const accountBodyValidator = [
    body('name', 'minimo de 3 caracteres')
        .trim()
        .isLength({min: 3}),
    body('type', 'required')
        .not()
        .isEmpty(),
    body('show_in_resume', 'required')
        .not()
        .isEmpty(),
    validationResultExpress
];


export const transactionBodyValidator = [
    body('type', 'tipo invalido')
        .custom(
            (value) => {
                if (value !== 'DEBITO' || value !== 'CREDITO') {
                    throw new Error("Tipo de transação inválido");
                }
                return value;
            }
        )
        .trim()
        .notEmpty(),
    body('value', 'required')
        .trim()
        .notEmpty(),
    body('date', 'required')
        .trim()
        .notEmpty(),
    body('user', 'required')
        .trim()
        .notEmpty(),
    body('account', 'required')
        .trim()
        .notEmpty(),
    body('category', 'required')
        .trim()
        .notEmpty(),
    body('recurring', 'required')
        .trim()
        .notEmpty(),
    body('group', 'required')
        .trim()
        .notEmpty(),
    body('split', 'required')
        .trim()
        .notEmpty(),
    validationResultExpress
];