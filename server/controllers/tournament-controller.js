import Tournament from "../models/tournament.js";

// Create a tournament
const createTournament = async (req, res) => {
    try {
        const tournament = new Tournament(req.body);
        const savedTournament = await tournament.save();

        res.status(201).json(savedTournament);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tournaments
const getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();

        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get one tournament
const getTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a tournament
const updateTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json(tournament);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a tournament
const deleteTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndDelete(req.params.id);

        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json({ message: "Tournament deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createTournament,
    getTournaments,
    getTournament,
    updateTournament,
    deleteTournament
};