import User from '../models/user';
import errorHandler from '../helpers/dbErrorHandler';
import { Request, Response, NextFunction } from 'express';



const create = async(req: Request, res: Response) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(200).json({message : 'User successfully signed up'});
    }
    catch(e){
        res.status(400).json({error: errorHandler.getErrorMessage(e)});
    }
}

const list = async(req: Request, res :Response) =>{
    try{
        let users = await User.find().select('name email updated created');
        res.status(200).json(users);
    }
    catch(e){
        res.status(500).json({error : errorHandler.getErrorMessage(e)});
    }
}


const userById = (req : Request, res : Response, next : NextFunction, id : string) =>{};
const read = (req : Request, res : Response) =>{};
const update = (req : Request, res : Response, next :  NextFunction) =>{};
const remove = (req : Request, res : Response, next : NextFunction) =>{};

export default{create, list, userById, read, update, remove};