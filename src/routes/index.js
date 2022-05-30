import { Router } from "express";
const router = Router();

import categoryRouter from './category.route.js';
import groupRouter from './group.route.js';
import userRoute from './user.route.js';
import  accountRouter from './account.route.js';
import transactionRoute from './transaction.route.js';


router.use("/api", categoryRouter);
router.use("/api", groupRouter);
router.use("/api", userRoute);
router.use("/api", accountRouter);
router.use("/api", transactionRoute);

export default router;