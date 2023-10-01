import express, { Express } from "express"
import { connectDb, disconnectDB } from "./config/database";
import { loadEnv } from "./config/envs";
import cors from "cors";
import { betsRouter, gamesRouter, participantsRouter } from "./routes/index";
loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("App running ok!"))
  .use("/participants", participantsRouter)
  .use("/games", gamesRouter)
  .use("/bets", betsRouter)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app