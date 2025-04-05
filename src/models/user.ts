import mongoose from "mongoose";
import crypto from "crypto";

interface UserMethods {
    authenticate(plainText: string): boolean;
    encryptPassword(password: string): string;
    makeSalt(): string;
}

interface UserDocument extends mongoose.Document, UserMethods {
    name: string;
    email: string;
    salt: string;
    hashed_password: string;
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

UserSchema.virtual('password').set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function(){
    return this.hashed_password;
});

UserSchema.methods = {
    authenticate : function(plainText : string){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword : function(password : string){
        if(!password) return '';
        try{
            return crypto
            .createHmac('sha', this.salt)
            .update(Buffer.from(password))
            .digest('hex')
        }
        catch(e){
            return '';
        }
    },
    makeSalt : function(){
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
}

UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password', 'Password must be at least 6 characters');
    }
    if(this.isNew && !this._password){
        this.invalidate('password', 'Password must be defined');
    }
}, undefined);

export default mongoose.model('User', UserSchema);