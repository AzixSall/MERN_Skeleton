import mongoose from "mongoose";
import crypto from "crypto";
import { Document } from "mongoose";

interface UserMethods {
    authenticate(plainText: string): boolean;
    encryptPassword(password: string): string;
    makeSalt(): string;
}

export interface UserDocument extends Document, UserMethods {
    name: string;
    email: string;
    hashed_password: string;
    salt: string;
    _id: string;
    _password: string;
}

const UserSchema = new mongoose.Schema<UserDocument>({
    name : {
        type: String,
        trim : true,
        required: [true, 'Name is required']
    },
    email :{
        type: String,
        trim: true,
        unique: [true, 'Error'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required : [true, 'Email is required']
    },
    hashed_password: {
        type : String,
        required: [true, 'Password is required']
    },
    salt : String
}, {timestamps : true});

UserSchema.virtual('password')
  .set(function (this: UserDocument, password: string) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (this: UserDocument) {
    return this._password;
});

UserSchema.methods.authenticate = function (this: UserDocument, plainText: string): boolean {
    return this.encryptPassword(plainText) === this.hashed_password;
};
  
UserSchema.methods.encryptPassword = function (this: UserDocument, password: string): string {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
};
  
UserSchema.methods.makeSalt = function (this: UserDocument): string {
    return Math.round(new Date().valueOf() * Math.random()) + '';
};
  

UserSchema.path('hashed_password').validate(function (this: UserDocument) {
    if (this.hashed_password && this.hashed_password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters');
    }
    if (this.isNew && !this.hashed_password) {
      this.invalidate('password', 'Password must be defined');
    }
});
  

export default mongoose.model('User', UserSchema);