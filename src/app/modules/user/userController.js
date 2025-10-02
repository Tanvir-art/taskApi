import { userService } from "./userServices.js";

const signUp = async (req, res) => {
    try {
        // console.log("Signup request body:", req.body);
        const { name, email, password, role } = req.body;

        const user = await userService.signUp(name, email, password, role);

        res.status(201).json({
            status: "success",
            message: "User signed up successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await userService.login(email, password);

         
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // https হলে true
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,  
        });

    
        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                accessToken
            }
        });
    } catch (error) {
        res.status(401).json({
            status: "error",
            message: error.message
        });
    }
}

const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        // console.log("Refresh token from cookies:", token);
        const newAccessToken = await userService.refreshToken(token);

        res.status(200).json({
            status: "success",
            message: "Access token refreshed successfully",
            data: {
                accessToken: newAccessToken
            }
        });
    } catch (error) {
        res.status(403).json({
            status: "error",
            message: error.message
        });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        await userService.logout(token);

        res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" })
            .status(200)
            .json({
                status: "success",
                message: "User logged out successfully"
            });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message || "Something went wrong"
        });
    }
}

const getAllusers = async (req, res) => {
    try {
        const users = await userService.getAllusers();
        res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching users",
            error: error.message
        });
    }
}

export const userController = {
    signUp,
    login,
    refresh,
    logout,
    getAllusers
};
