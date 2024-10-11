import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandeler } from "../utils/error.js";
export const test = (req, res) => {
    res.json({message:"API is working +_+"});
};
export const updateUser = async (req, res , next) => {
    if(req.user.id != req.params.userId) {
        return next(errorHandeler(403 , 'You are not allowed to update this user'));
    }
    if(req.body.password){
        if(req.body.password.length < 8 ) {
            return next(errorHandeler(403 , 'Password must be at least 8 characters'));
        }
        req.body.password = bcrypt.hashSync(req.body.password , 10);
    }
    if(req.body.username){
        if(req.body.username.length < 8 || req.body.username.length > 20 ){
            return next(errorHandeler(403 , 'Username must be at least 8 characters and at most 20 characters'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandeler(403 , 'Username can not be contain spaces'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandeler(403 , 'Username must be lowercase'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandeler(403 , 'Username can only contain characters or numbers'));
        }
    }try{
            const updateUser = await User.findByIdAndUpdate(req.params.userId, {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            } ,{new:true});
            const {password , ...rest} = updateUser._doc;
            res.status(200).json(rest);
        } catch(error){
            next(error);
        }
};

export const deleteUser = async (req , res , next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandeler(403 , 'You are not allowed to delete this user'));
    } try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted successfully");
    } catch(error){
        next(error);
    }
};