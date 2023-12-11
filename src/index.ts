import { app } from "./app";
import { runDB } from "./db/connectToDB";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const startApp = async () => {
  if (process.env.DBName === "samyraiBack") {
    await runDB(process.env.DBName);
  } else {
    await runDB("samyraiBackTests");
  }
  app.listen(PORT, () => {
    console.log("Server has been started");
  });
};
startApp();
