import { Router } from "express";
import {profileMiddleware,profileIdMiddleware} from "../middlewares/profile.middleware.js";
import { getProfile,getProfileId } from "../controllers/profile.controller.js";


const router = Router();
// Routes

router.get('/', (req, res) => {
    res.send('Home route');
})

router.get('/profile',profileMiddleware, getProfile)

router.get("/profile/:id",profileIdMiddleware,getProfileId );

export default router;