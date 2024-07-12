import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleWare from "../middleware/Authenticate.js";

const router = Router()

// for user
router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)


// to add favorites

router.post('/favorites', authMiddleWare, AuthController.addFavorites)
router.get('/favorites', authMiddleWare, AuthController.getFavorites);
router.post('/favorites/remove', authMiddleWare, AuthController.removeFavorite);


export default router