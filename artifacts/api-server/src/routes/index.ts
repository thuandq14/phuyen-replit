import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import propertiesRouter from "./properties";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/contact", contactRouter);
router.use("/properties", propertiesRouter);

export default router;
