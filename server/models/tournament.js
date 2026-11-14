import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

export default Tournament;