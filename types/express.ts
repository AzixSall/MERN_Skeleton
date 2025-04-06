import { UserDocument } from "../src/models/user";

export {};

declare global {
  namespace Express {
    interface Request {
      profile?: UserDocument;
      auth?: any;
    }
  }
}
