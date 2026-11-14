
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true
  },

  registrationDate: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    default: "registered"
  }
});

// Prevent duplicate registrations
registrationSchema.index(
  { user: 1, tournament: 1 },
  { unique: true }
);

const Registration = mongoose.model(
  "Registration",
  registrationSchema
);

export default Registration;
