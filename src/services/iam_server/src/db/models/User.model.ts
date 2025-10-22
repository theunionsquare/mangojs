import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";
import { IGroup } from "./Group.model";
import { utils } from "@giusmento/mangojs-core";

export interface IUser extends Document {
  uid: string;
  firstName: string;
  lastName: string;
  username: number;
  email: string;
  phoneNumber: string;
  status: string;
  password: string;
  age: number;
  isActive: boolean;
  isVerified: boolean;
  magicLink: string;
  magicLinkExpireDate: Date;
  verifiedAt: Date;
  disabledAt: Date;
  createdAt: Date;
  updatedAt: Date;
  groups: Array<{}>;
}

const userSchema: Schema = new Schema(
  {
    uid: {
      type: Schema.Types.String,
      required: true,
      default: utils.generateUUID(),
    },
    status: { type: Schema.Types.String, default: "PENDING" },
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: false },
    username: { type: Schema.Types.String, required: false },
    email: { type: Schema.Types.String, required: true },
    isActive: { type: Schema.Types.Boolean, required: true },
    isVerified: { type: Schema.Types.Boolean, required: true },
    phoneNumber: { type: Schema.Types.String, required: false },
    password: { type: Schema.Types.String, required: false },
    groups: [{ type: Schema.Types.String }],
    age: { type: Schema.Types.Number, required: false, default: 0 },
    magicLink: { type: Schema.Types.String },
    magicLinkExpireDate: { type: Date },
    verifiedAt: { type: Date },
    disabledAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("user", userSchema);
