import { Router } from "express";
import { getAll, getClient, getUserByName, getUserByPhone } from "../controllers/usersController.js";
import authorization from "../middleware/tokenValidate.js";
const routerUser = Router();


routerUser.post("/phone", getUserByPhone); 
routerUser.post("/name",getUserByName); 
routerUser.get("/getAll",getAll);
routerUser.post("/client", authorization,getClient);


export default routerUser;