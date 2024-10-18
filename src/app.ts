import dotenv from "dotenv";
import cron from "node-cron";
import {
  fetchActions,
  saveActionsToDB,
} from "./services/eos-service/eosService";
import { connectToDatabase } from "./services/mongoose-service/mongooseService";

dotenv.config();

const startPolling = async () => {
  cron.schedule(process.env.SCHEDULE || "never", async () => {
    console.log("Fetching EOS actions...");
    const actions = await fetchActions();
    if (actions.length) {
      await saveActionsToDB(actions);
    } else {
      console.log("No actions received.");
    }
  });
};

const main = async () => {
  await connectToDatabase();
  await startPolling();
};

main();
