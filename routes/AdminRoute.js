import { Router } from "express"
import { addUser, adminLogin, getUsers, mapClient, updateAuthorization } from "../controller/AdminController.js";
const router = Router();

router.post("/login", adminLogin);
router.get("/users", getUsers);
router.patch("/user/:userId/authorization", updateAuthorization)
router.get("/user/:userId/add", addUser)
router.put("/map", mapClient)

export default router;