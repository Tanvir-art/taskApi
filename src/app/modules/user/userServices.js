
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateTokens.js";
import { userModel } from "./userModel.js";


const signUp = async (name, email, password, role = 'user') => {
    const existingUser = await userModel.findOne({ email });
    // console.log("Existing user:", existingUser);
    if (existingUser) {
        throw new Error("User already exists");
    }
    return await userModel.create({ name, email, password, role });
}


const login = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }


    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
}

const refreshToken = async (token) => {
    if (!token) throw new Error("No refresh token");

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user || user.refreshToken.trim() !== token.trim())
        res.status(403).json({ status: "error", message: "Forbidden" });

    return generateAccessToken(user._id.toString());
}

const logout = async (token) => {
    if (!token) return;

    const user = await userModel.findOne({ refreshToken: token });
    if (user) {
        user.refreshToken = "";
        await user.save();
    }
}

const getAllusers = async () => {
    return await userModel.find({}, "-password -refreshToken");
}

export const userService = {
    signUp,
    login,
    refreshToken,
    logout,
    getAllusers
};