import User from '../models/user';
import UserDocument from '../models/user';
import errorHandler from '../helpers/dbErrorHandler';
import { Request, Response, NextFunction } from 'express';
import { extend } from 'lodash';



const create = async(req: Request, res: Response) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(200).json({message : 'User successfully signed up'});
    }
    catch(e){
        res.status(400).json({error: errorHandler.getErrorMessage(e)});
    }
};

const list = async(req: Request, res :Response) =>{
    try{
        let users = await User.find().select('name email updated created');
        res.status(200).json(users);
    }
    catch(e){
        res.status(500).json({error : errorHandler.getErrorMessage(e)});
    }
}

const userById = async(req : Request, res : Response, next : NextFunction, id : string) =>{
    try {
        const user = await User.findById(id);
        if(!user){
            res.status(200).json({message : 'User unkown'});
        }
        req.profile = user || undefined;
        next();
    }
    catch (e){
        res.status(500).json({error : 'Could not retrive user'});
    }
};
const read = (req : Request, res : Response) =>{
    if(!req.profile){
        res.status(200).json({message : 'User unkown'});
        return;
    }
    req.profile.hashed_password = '';
    req.profile.salt = '';
    res.json(req.profile);
};
const update = async(req : Request, res : Response, next :  NextFunction) =>{
    try {
        let user = req.profile;
        user = extend(user, req.body);

        if(!user){
            res.status(200).json({message : 'User unkown'});
            return;
        }

        await user.save();
        req.profile = user;
        user.hashed_password = '';
        user.salt = '';
        res.json(user);
    } catch (error) {
        res.status(400).json({error : errorHandler.getErrorMessage(error)});
    }
};
const remove = async(req : Request, res : Response, next : NextFunction) =>{
    try {
        let user = req.profile;

        if(!user){
            res.status(200).json({message : 'User unkown'});
            return;
        }

        let deletedUser = await user.deleteOne();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json({error : errorHandler.getErrorMessage(error)});
    }
};

export default{create, list, userById, read, update, remove};