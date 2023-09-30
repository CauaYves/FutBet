import express, { Express } from "express"
import { connectDb, disconnectDB } from "./config/database";
import { loadEnv } from "./config/envs";
import cors from "cors";
import { betsRouter, gamesRouter, participantsRouter } from "./routes";

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/participants", participantsRouter)
  .use("/games", gamesRouter)
  .use("bets", betsRouter)
loadEnv();

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app