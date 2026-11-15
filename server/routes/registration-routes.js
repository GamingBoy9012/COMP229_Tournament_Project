
import express from "express";

import {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration
} from "../controllers/registration-controller.js";

const router = express.Router();

// Create a registration
router.post("/", createRegistration);

// Get all registrations
router.get("/", getRegistrations);

// Get one registration
router.get("/:id", getRegistrationById);

// Update a registration
router.put("/:id", updateRegistration);

// Delete a registration
router.delete("/:id", deleteRegistration);

export default router;
