
import Registration from "../models/Registration.js";

// Register a user for a tournament
export const createRegistration = async (req, res) => {
  try {
    const { user, tournament } = req.body;

    // Check required fields
    if (!user || !tournament) {
      return res.status(400).json({
        message: "User and tournament are required"
      });
    }

    // Check duplicate registration
    const existingRegistration = await Registration.findOne({
      user: user,
      tournament: tournament
    });

    if (existingRegistration) {
      return res.status(409).json({
        message: "User is already registered"
      });
    }

    // Create registration
    const registration = new Registration({
      user: user,
      tournament: tournament
    });

    await registration.save();

    res.status(201).json({
      message: "Registration successful",
      registration: registration
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "User is already registered"
      });
    }

    res.status(400).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

// View all registrations
export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();

    res.json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Error getting registrations"
    });
  }
};

// View one registration
export const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(
      req.params.id
    );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found"
      });
    }

    res.json(registration);
  } catch (error) {
    res.status(400).json({
      message: "Invalid registration ID"
    });
  }
};

// Cancel a registration
export const deleteRegistration = async (req, res) => {
  try {
    const registration =
      await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found"
      });
    }

    res.json({
      message: "Registration cancelled"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error cancelling registration"
    });
  }
};
