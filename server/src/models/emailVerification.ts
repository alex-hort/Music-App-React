import { CallbackWithoutResultAndOptionalError, Model, model, Schema, Types,InferSchemaType  } from "mongoose";
import { hash, compare } from "bcrypt";

interface EmailVerificationTokenDocument {
  owner: Types.ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

type EmailVerificationTokenModel = Model<
  EmailVerificationTokenDocument,
  {},
  Methods
>;

const emailVerificationTokenSchema = new Schema<
  EmailVerificationTokenDocument,
  EmailVerificationTokenModel,
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
emailVerificationTokenSchema.pre("save", async function () {
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
  }
});

emailVerificationTokenSchema.methods.compareToken = async function (
  token: string
): Promise<boolean> {
  return compare(token, this.token);
};


const EmailVerificationToken = model<
  EmailVerificationTokenDocument,
  EmailVerificationTokenModel
>("EmailVerificationToken", emailVerificationTokenSchema);

export default EmailVerificationToken;