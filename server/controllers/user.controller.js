import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs";

export const test = (req, res) =>{
    res.json({
        messgae: "Hello User!"
    })
}

export const updateUser = async (req, res, next) => {
    // checking if "id" of cookies "req.user" is same as "req.params.id" the user who calls this endpoint
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!")); 

    try {
        // if password is sent in body then hashing the password
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // finding the user by "id" and updating them with new details
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true}) // the {new: true} is going to actually return and save this updated user with new information 

        // object destructure to remove password from being sent to the frontend json response
        const {password, ...data} = updatedUser._doc;

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your own account"));

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json({messgae: "User has been deleted"});
    } catch (error) {
        next(error);
    }
}