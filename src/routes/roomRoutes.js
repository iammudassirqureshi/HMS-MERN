import express from "express";
import {
  addRoom,
  updateRoomStatus,
  updateRoom,
  deleteRoom,
  roomReservation,
  getAllRooms,
  getRoomById,
  checkRoomAvailability,
  bookRoomOnline,
  confirmReservation,
} from "../controllers/roomController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { uploadImage } from "../utils/uploadManager.js";

const router = express.Router();

// only admin can access these routes
router.post(
  "/add",
  [protect],
  authorize("admin"),
  uploadImage.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "pictures", maxCount: 10 },
  ]),
  addRoom
);
router.put("/status", [protect], authorize("admin"), updateRoomStatus);
router.put(
  "/update",
  [protect],
  authorize("admin"),
  uploadImage.single("picture"),
  updateRoom
);
router.delete("/delete", [protect], authorize("admin"), deleteRoom);

// all users can access these routes with authentication
router.post("/reservation", [protect], roomReservation);

// all users can access these routes without authentication
router.get("/", getAllRooms);
router.get("/single", getRoomById);
router.get("/checkAvailability", checkRoomAvailability); // check room availability by check-in and check-out dates

router.post("/book", bookRoomOnline);
routerpost("/confirm", confirmReservation);

export default router;
