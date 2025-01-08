import express from "express";
import {
  login,
  logout,
  signup,
  getUser,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", getUser);

export default router;
