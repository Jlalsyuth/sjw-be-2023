const axios = require("axios");
const supabase = require("../utils/supabaseClient");

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const admin = req.admin;

        // Check if the nim is in the list
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

        if (!nims.includes(admin.nim)) {
            return res.status(401).json({
                success: false,
                message: `No admin found with NIM ${admin.nim}`,
            });
        }

        const adminToken = jwt.sign(
            { nim: admin.nim },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Return the admin data from the decoded token
        res.status(200).json({
            success: true,
            data: {
                nim: admin.nim,
                nama: admin.nama,
                strata: admin.strata,
                fakultas: admin.fakultas,
                jurusan: admin.jurusan,
                prodi: admin.prodi,
                email_ub: admin.email_ub,
                angkatan: admin.angkatan,
                image: admin.image,
            },
            token: adminToken,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error during authentication.",
            error: error.message,
        });
    }
};

exports.showProfile = async (req, res) => {
    try {
        const adminData = req.admin;

        res.status(200).json({
            success: true,
            data: {
                nim: adminData.nim,
                nama: adminData.nama,
                strata: adminData.strata,
                fakultas: adminData.fakultas,
                jurusan: adminData.jurusan,
                prodi: adminData.prodi,
                email_ub: adminData.email_ub,
                angkatan: adminData.angkatan,
                image: adminData.image,
            },
        });
    } catch (error) {
        res.status(400).json({
            message: "Error showing profile: " + error.message,
        });
    }
};
