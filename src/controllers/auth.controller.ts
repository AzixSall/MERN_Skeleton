import User from '../models/user';
import { UserDocument } from '../models/user';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import { Request, Response, NextFunction } from 'express';


const signin = async(req: any, res: any) => {
    try {
      if (!req.body || !req.body.email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      
      let user = await User.findOne({ 'email': req.body.email }) as UserDocument;
      if(!user){
        return res.status(401).json({error: 'User not found'});
      }

      if(!user.authenticate(req.body.password)){
        return res.status(401).json({error : 'Email and password does not match'});
      }

      const token = jwt.sign({_id : user._id.toString()}, process.env.JWT_SECRET || 'very_secret_key');

      res.cookie('t', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }); // 1 day

      return res.json({
        token,
        user: {
            _id : user._id,
            name: user.name,
            email : user.email
        }
      });
    } catch (error) {
        return res.status(401).json({error : 'Could not sign in'});
    }
};

const signout = (req : Request, res : any) => {
    res.clearCookie('t');
    return res.status(200).json({message: 'User signed out'});
};

const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET || 'very_secret_key',
    algorithms: ['HS256']
  });
  

const hasAuthorization = (req : Request, res : Response, next: NextFunction) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!(authorized)){
        res.status(403).json({error : "User is not authorized"});
        return;
    }

    next()
};

export default { signin, signout, requireSignin, hasAuthorization }