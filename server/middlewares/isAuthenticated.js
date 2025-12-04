import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config({})

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false,
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {//invalid token
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log(error)
    }
};
export default isAuthenticated;