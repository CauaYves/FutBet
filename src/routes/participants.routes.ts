import { Router } from "express";
import { validateBody } from "../middlewares";
import { participantSchema } from "../schemas";
import { createParticipant } from "../controllers";

const participantsRouter = Router()

participantsRouter.post("/", validateBody(participantSchema), createParticipant)

export { participantsRouter }