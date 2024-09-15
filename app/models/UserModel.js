import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name: { type: String, },
    email: { type: String, required: [true, 'Email is required']},
    password: { type: String, required: [true, 'Password is required']}
});

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, userEmail: this.email, userName: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.statics.isUserExist = async function (email) {
    return await this.findOne({ email }, { _id: 1 });
}

export default mongoose.model("users", userSchema, "users");
