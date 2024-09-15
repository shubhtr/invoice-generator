import bcrypt from "bcrypt";
import AppError from "../utils/customError.js";
import constants from "../utils/constants.js";
import User from '../models/UserModel.js';


const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(AppError.Validation(constants.PROVIDE_ALL_FIELD));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(AppError.BadRequest(constants.INVALID_CREDENTIAL));
    }

    //
    // DO THIS AFTER IMPLEMENTING hashing of PWD
    //
    // const isPasswordCorrect = await user.comparePassword(password);
    // if (!isPasswordCorrect) {
    // return next(AppError.BadRequest(constants.INVALID_CREDENTIAL));
    // }
    //

    const token = await user.createJWT();
    const userInfo = {
        _id: user._id,
        name: user.name,
        email: email
    }

    return res.json({ user: userInfo, token });
};

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(AppError.Validation('Please provide all fields'))
    }

    // check if user exists
    const isUserExist = await User.isUserExist(email);
    if (isUserExist) {
        return next(AppError.Conflict('Email Already in use'))
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name, email, password: passwordHash
    });

    res.status(201).json({ message: 'User Created' });
};


export default { login, register };
