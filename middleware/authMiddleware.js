const jwt = require("jsonwebtoken");
const supabase = require("../utils/supabaseClient");
const dotenv = require("dotenv");

dotenv.config();

const authenticate = async (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            message: "No token provided!",
        });
    }

    token = String(token).replace(/Bearer\s/i, "");

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded token:", decoded);

        req.user = decoded;
        console.log("User data from token:", req.user);

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// authMiddleware.js
const authenticateAdmin = async (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            message: "No token provided!",
        });
    }
    token = String(token).replace(/Bearer\s/i, "");

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Check if the decoded nim is in the list
        const nims = [
            "225150207111031",
            "215150607111002",
            "205150400111049",
            "215150707111033",
            "215150307111012",
            "225150707111005",
            "215150607111007",
            "215150207111050",
            "22150601111021",
            "225150607111025",
            "225150607111024",
            "225150701111035",
            "225150600111034",
            "225150407111023",
            "225150407111046",
            "215150401111030",
            "225150400111037",
            "215150307111012",
            "225150707111005",
            "225150200111035",
        ];

        if (!nims.includes(decoded.nim)) {
            throw new Error("Invalid NIM");
        }

        req.admin = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { authenticate, authenticateAdmin };
