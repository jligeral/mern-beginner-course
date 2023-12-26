import express from "express";
import * as usersController from "../controllers/users-controller";

const router = express.Router();

router.post("/signup", usersController.signUp);

export default router;