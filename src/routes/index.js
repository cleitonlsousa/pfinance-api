import { Router } from "express";
const router = Router();

import authRouter from './auth.route.js';
import categoryRouter from './category.route.js';
import userRoute from './user.route.js';
import accountRouter from './account.route.js';
import transactionRoute from './transaction.route.js';

router.use("/api", authRouter);
router.use("/api", categoryRouter);
router.use("/api", userRoute);
router.use("/api", accountRouter);
router.use("/api", transactionRoute);

export default router;