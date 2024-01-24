import { Router } from "express";
import { loginUser, newUser, obtenerUsuario } from "../controllers/user.controller";


const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/', obtenerUsuario)





export default router;