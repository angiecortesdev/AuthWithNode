import { Router } from "express";
import { getPlans } from "../controllers/planes.controller";
import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken, getPlans)

export default router;