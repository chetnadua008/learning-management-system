import { User } from "../models/user.model.js";

export const isInstructor = async (req, res, next) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);

        if (user.role !== "instructor") {
            return res.status(403).json({
                message: "Access Denied. Instructors only.",
                success: false
            });
        }
        next(); // You are cool. Pass.
    } catch (error) {
        console.log(error);
    }
}