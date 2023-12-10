import express from "express";
import { test, updateUser, deleteUser, getUserListings, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser ) // the endpoint will first go through the "verifyToken" middleware and then if all conditions are passed it'll pass to next controller "updateUser"
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings );
router.get("/:id", verifyToken, getUser);

export default router;