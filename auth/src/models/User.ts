import mongoose from "mongoose";
import { Password } from "../services/password";
///An interfcace that describes properties
///that are required to create a new User
interface UserAtrb {
  email: string;
  password: string;
}
/// An interface that describes the properties
///that User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(atrb: UserAtrb): UserDoc;
}

///Interface that decribes the properties
///that User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchame = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchame.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchame.statics.build = (atrb: UserAtrb) => {
  return new User(atrb);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchame);

export { User };
