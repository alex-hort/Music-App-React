import { CallbackWithoutResultAndOptionalError, Model, model, Schema, Types } from "mongoose";
import { hash, compare } from "bcrypt";

interface PasswordResetTokenDocument {
  owner: Types.ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

type PasswordResetTokenModel = Model<
  PasswordResetTokenDocument,
  {},
  Methods
>;

const passwordResetTokenSchema = new Schema<
  PasswordResetTokenDocument,
  PasswordResetTokenModel,
  Methods
>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now
  }
});

//  Sintaxis correcta para esta versión de mongoose
passwordResetTokenSchema.pre("save", async function () {
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
  }
});

passwordResetTokenSchema.methods.compareToken = async function (
  token: string
): Promise<boolean> {
  return compare(token, this.token);
};


const PasswordResetToken = model<
  PasswordResetTokenDocument,
  PasswordResetTokenModel
>("PasswordResetToken", passwordResetTokenSchema);

export default PasswordResetToken;