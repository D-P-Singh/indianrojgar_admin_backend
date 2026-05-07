import jwt from "jsonwebtoken";

export const auth = async (
    req,
    res,
    next
) => {

    try {

        const token = req.cookies.token;

        if (!token) {

            return res.status(401).json({
                msg: "Unauthorized"
            });

        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            msg: "Invalid token"
        });

    }
};
export const authorizeRoles = (...roles) => {

    return (req, res, next) => {
        console.log("Authorizing roles:", req.user);
        //         if(!req.user.isVerified) {
        // console.log("User is not verified:", req.user);
        // res.redirect("/login");
        //             return res.status(403).json({
        //                 success: false,
        //                 msg: "Please verify your account to access this resource"
        //             });
        //         }
        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                msg: "Access denied"
            });

        }

        next();

    };
};