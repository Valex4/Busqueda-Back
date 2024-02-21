import { Router } from "express";
import { logout, signIn, signUp } from "../controllers/authController.js";
import authorization from "../middleware/tokenValidate.js";
const routerAuth = Router();


routerAuth.post("/signin", signIn); //login
routerAuth.post("/signup",signUp); //registro
routerAuth.post("/logout", authorization,logout)

export default routerAuth;