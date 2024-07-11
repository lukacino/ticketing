import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signIn";
import { signUpRouter } from "./routes/signUp";
import { signOutRouter } from "./routes/signOut";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFountError } from "./errors/NotFoundError";
const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all("*", (req, res, next) => {
  next(new NotFountError());
});
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
