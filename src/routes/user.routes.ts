import { Router } from "express";
import { loginUser, newUser, obtenerUsuarios , obtenerUsuario, putUsuario, deleteUsuario} from "../controllers/user.controller";


const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/login/:id', obtenerUsuario)
router.get('/login', obtenerUsuarios)
router.put('/login/:id', putUsuario)
router.delete('/login/:id', deleteUsuario)







export default router;