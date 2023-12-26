import mongoose from "mongoose";

/* Uncomment typeRoots and add ts-node in tsconfig.json to use this */

declare module "express-session" {
  interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}
