import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import tournamentRouter from "./routes/tournament-router.js";
import registrationRouter from "./routes/registration-routes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Tournament API
app.use("/api/tournaments", tournamentRouter);
app.use("/api/registrations", registrationRouter);

export default app;