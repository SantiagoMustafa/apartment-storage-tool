// Router
import { Router } from "express";

// Controllers
import AuthController from "./controller/authController";

export const auth = Router();

// Routes
auth.post("/user/register", AuthController.register);
auth.post("/user/login", AuthController.login);
auth.put("/user/update", AuthController.update);
auth.post("/user/loginWithToken", AuthController.loginWithToken);
auth.delete("/user/delete/:uuid", AuthController.delete);
