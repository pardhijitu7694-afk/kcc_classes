const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
    if (!token) {
        return res.status(401).send({
            code: 100,
            status: "FAILED",
            message: "No token provided!",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                code: 100,
                status: "FAILED",
                message: "Invalid or expired token!",
            });
        }

        req.user = decoded; // decoded payload (id, email, role)
        next();
    });
};

module.exports = authMiddleware;
