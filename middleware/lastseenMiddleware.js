import User from "../models/User.js";

export const updateLastSeen = async (
    req,
    res,
    next
) => {
    if (req.user) {

        await User.findByIdAndUpdate(
            req.user.id,
            {
                lastSeen: new Date()
            }
        );
    }

    next();
};