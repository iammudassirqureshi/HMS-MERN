import express from "express";
import {
  addUser,
  getAllUsers,
  updateUser,
  deactivateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", getAllUsers);
router.put("/", updateUser);
router.put("/", deactivateUser);
router.delete("/", deleteUser);

export default router;
