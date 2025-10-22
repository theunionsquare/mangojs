import { Types } from "@giusmento/mangojs-core";
import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";

export interface IGroup extends Document {
  userType: Types.entities.AuthUserType;
  uid: string;
  name: string;
  description: string;
  permissions: string;
}

const GroupSchema: Schema = new Schema({
  userType: { type: Schema.Types.String, required: true },
  uid: { type: Schema.Types.String, required: true, default: new ObjectId() },
  name: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  permissions: { type: Schema.Types.String, required: true },
});

export default mongoose.model<IGroup>("group", GroupSchema);
