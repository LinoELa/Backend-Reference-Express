import express from "express";
const router = express.Router();

import { register } from "../controllers/authController.js";
// REGISTER  === AUTTHENTICACION | auth
/**
 * @POST /auth/register
 * @access  Public
 */

router.post("/register", register);

export default router;
